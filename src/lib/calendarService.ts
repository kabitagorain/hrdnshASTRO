export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  htmlLink?: string;
  hangoutLink?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
}

/**
 * Fetches Google Calendar events for a specific date range (entire day in UTC).
 */
export async function fetchCalendarEvents(
  accessToken: string,
  dateStr: string
): Promise<GoogleCalendarEvent[]> {
  try {
    // Construct the start and end of the selected day in ISO format
    const timeMin = `${dateStr}T00:00:00Z`;
    const timeMax = `${dateStr}T23:59:59Z`;

    const params = new URLSearchParams({
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy: 'startTime',
    });

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Google Calendar API Error: ${res.statusText} - ${errorText}`);
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error('Failed to fetch calendar events:', error);
    throw error;
  }
}

/**
 * Checks if a specific target date and time slot is occupied by any existing events.
 */
export function checkSlotAvailability(
  slotDate: string,
  slotTime: string,
  events: GoogleCalendarEvent[]
): { isOccupied: boolean; conflictingEventSummary?: string } {
  // A slot is UTC, of duration 30 minutes
  const [hours, minutes] = slotTime.split(':');
  const slotStart = new Date(`${slotDate}T${hours}:${minutes}:00Z`);
  const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000); // 30 minutes later

  for (const event of events) {
    const startStr = event.start.dateTime || event.start.date;
    const endStr = event.end.dateTime || event.end.date;

    if (!startStr || !endStr) continue;

    const eventStart = new Date(startStr);
    const eventEnd = new Date(endStr);

    // Overlap formula: Start1 < End2 AND End1 > Start2
    if (slotStart < eventEnd && slotEnd > eventStart) {
      return {
        isOccupied: true,
        conflictingEventSummary: event.summary || 'Busy Slot',
      };
    }
  }

  return { isOccupied: false };
}

/**
 * Creates a Google Calendar event with automatic Google Meet integration,
 * inviting both Haradhan Sharma and the customer.
 */
export async function createGoogleCalendarEvent(
  accessToken: string,
  params: {
    clientName: string;
    clientEmail: string;
    hostEmail: string;
    dateStr: string;
    timeStr: string;
    notes: string;
  }
): Promise<{ hangoutLink?: string; htmlLink?: string }> {
  const [hours, minutes] = params.timeStr.split(':');
  const slotStart = new Date(`${params.dateStr}T${hours}:${minutes}:00Z`);
  const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000); // 30 mins

  const eventBody = {
    summary: `Technical Scoping Session: ${params.clientName} & Haradhan Sharma`,
    description: `Hello ${params.clientName},\n\nThis session has been automatically scheduled and synchronous meeting notes will be logged.\n\nDescription of goals:\n${params.notes || 'No custom notes provided.'}\n\nCoordinators:\n- Haradhan Sharma (AI Automation & DevOps Expert)\n- ${params.clientName} (${params.clientEmail})`,
    start: {
      dateTime: slotStart.toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: slotEnd.toISOString(),
      timeZone: 'UTC',
    },
    attendees: [
      { email: params.hostEmail, responseStatus: 'accepted' },
      { email: params.clientEmail }
    ],
    // Request Google Meet creation
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
    reminders: {
      useDefault: true,
    },
  };

  // We append conferenceDataVersion=1 query parameter to ensure Google Meet is created
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventBody),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create calendar event: ${res.statusText} - ${errorText}`);
  }

  const result = await res.json();
  const hangoutLink = result.hangoutLink || result.conferenceData?.entryPoints?.find(
    (ep: any) => ep.entryPointType === 'video'
  )?.uri;

  return {
    hangoutLink: hangoutLink,
    htmlLink: result.htmlLink,
  };
}
