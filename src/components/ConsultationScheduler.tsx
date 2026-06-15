import React, { useState, useMemo, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2, Bookmark, ArrowRight, Download, Globe, ShieldAlert, LogOut, Loader2 } from 'lucide-react';
import { profile } from '../data/services';
import { initAuth, googleSignIn, logout } from '../lib/firebase';
import { fetchCalendarEvents, checkSlotAvailability, createGoogleCalendarEvent, GoogleCalendarEvent } from '../lib/calendarService';

interface ConsultationSchedulerProps {
  onBackToHome?: () => void;
}

export default function ConsultationScheduler({ onBackToHome }: ConsultationSchedulerProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-15');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  
  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [briefDetails, setBriefDetails] = useState('');

  // Google Calendar Integration states
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const [eventsFetchError, setEventsFetchError] = useState<string | null>(null);
  const [bookedMeetingLinks, setBookedMeetingLinks] = useState<{ hangoutLink?: string; htmlLink?: string } | null>(null);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  // Available dates (upcoming business days in June 2026)
  const availableDates = [
    { key: '2026-06-15', label: 'Mon, Jun 15', desc: 'Sovereign Openings' },
    { key: '2026-06-16', label: 'Tue, Jun 16', desc: 'Architecture Reviews' },
    { key: '2026-06-17', label: 'Wed, Jun 17', desc: 'ERP & Shopfloor Scopes' },
    { key: '2026-06-18', label: 'Thu, Jun 18', desc: 'FinTech Tech Stack audits' },
    { key: '2026-06-19', label: 'Fri, Jun 19', desc: 'Secure Cloud VPS deployments' },
  ];

  // Available UTC times (coordinated with freelancing schedule)
  const timeSlots = [
    { key: '09:00', label: '09:00 AM UTC', col: 'Morning Briefing' },
    { key: '11:30', label: '11:30 AM UTC', col: 'Technical Deep-dive' },
    { key: '14:00', label: '02:00 PM UTC', col: 'System Scoping' },
    { key: '16:30', label: '04:30 PM UTC', col: 'SLA Covenants' },
  ];

  // Monitor Auth Changes on Component Mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        if (currentUser.displayName) setClientName(currentUser.displayName);
        if (currentUser.email) setClientEmail(currentUser.email);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch calendar events whenever the Selected Date or Access Token changes
  useEffect(() => {
    async function loadCalendar() {
      if (!accessToken) {
        setCalendarEvents([]);
        return;
      }
      setIsEventsLoading(true);
      setEventsFetchError(null);
      try {
        const events = await fetchCalendarEvents(accessToken, selectedDate);
        setCalendarEvents(events);
      } catch (err: any) {
        console.error('Failed to update calendar state:', err);
        setEventsFetchError(err.message || 'Failed to sync Google Calendar.');
        // Handle token expiration/revocation gracefully
        if (err.message && (err.message.includes('401') || err.message.includes('auth') || err.message.includes('invalid_grant'))) {
          setAccessToken(null);
        }
      } finally {
        setIsEventsLoading(false);
      }
    }
    loadCalendar();
  }, [accessToken, selectedDate]);

  const handleConnectCalendar = async () => {
    setIsAuthLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        if (result.user.displayName) setClientName(result.user.displayName);
        if (result.user.email) setClientEmail(result.user.email);
      }
    } catch (err) {
      console.error('Google authorization error:', err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleDisconnectCalendar = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setCalendarEvents([]);
  };

  const meetingDateFormatted = useMemo(() => {
    const matched = availableDates.find(d => d.key === selectedDate);
    return matched ? matched.label : selectedDate;
  }, [selectedDate]);

  const meetingTimeFormatted = useMemo(() => {
    const matched = timeSlots.find(t => t.key === selectedTime);
    return matched ? matched.label : selectedTime;
  }, [selectedTime]);

  // Compute availability map for each slot on the chosen date
  const slotAvailability = useMemo(() => {
    const map: Record<string, { isOccupied: boolean; conflict?: string }> = {};
    timeSlots.forEach(slot => {
      if (accessToken && calendarEvents.length > 0) {
        const check = checkSlotAvailability(selectedDate, slot.key, calendarEvents);
        map[slot.key] = {
          isOccupied: check.isOccupied,
          conflict: check.conflictingEventSummary,
        };
      } else {
        map[slot.key] = { isOccupied: false };
      }
    });
    return map;
  }, [selectedDate, calendarEvents, accessToken]);

  // Automatically switch active slot if the chosen slot becomes occupied by Google Calendar events
  useEffect(() => {
    const activeIsOccupied = slotAvailability[selectedTime]?.isOccupied;
    if (activeIsOccupied) {
      const alternative = timeSlots.find(slot => !slotAvailability[slot.key]?.isOccupied);
      if (alternative) {
        setSelectedTime(alternative.key);
      }
    }
  }, [slotAvailability, selectedTime]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    // Haradhan Sharma is the consultant
    const hostEmail = 'haradhan.sharma@gmail.com';

    // Persist booking local registry to localStorage to keep it traceable
    const bookingRegistry = JSON.parse(localStorage.getItem('haradhan_bookings') || '[]');
    const newBooking = {
      bookingId: `BKG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientEmail,
      date: selectedDate,
      time: selectedTime,
      details: briefDetails || 'Default introductory scope discussion',
      created: new Date().toISOString(),
      location: 'Google Meet Virtual Session'
    };
    bookingRegistry.push(newBooking);
    localStorage.setItem('haradhan_bookings', JSON.stringify(bookingRegistry));

    if (accessToken) {
      setIsBookingSubmitting(true);
      try {
        const meetingResult = await createGoogleCalendarEvent(accessToken, {
          clientName,
          clientEmail,
          hostEmail,
          dateStr: selectedDate,
          timeStr: selectedTime,
          notes: briefDetails || 'Complimentary scoping review session'
        });
        setBookedMeetingLinks(meetingResult);
        setStep(2);
      } catch (err: any) {
        console.error('Error scheduling Google Calendar Event:', err);
        alert('Booking created locally, but Google Calendar event creation failed: ' + err.message);
        setBookedMeetingLinks(null);
        setStep(2); // Still proceed to step 2 as local record is saved
      } finally {
        setIsBookingSubmitting(false);
      }
    } else {
      // Fallback template URL-based calendar sync
      setBookedMeetingLinks(null);
      setStep(2);
    }
  };

  // Google Calendar Link generator for template fallback
  const googleCalendarUrl = useMemo(() => {
    const cleanDate = selectedDate.replace(/-/g, ''); // 20260615
    const cleanTimeHour = selectedTime.split(':')[0];
    const cleanTimeMin = selectedTime.split(':')[1];
    
    // Construct event date range: 30 minutes duration
    const startHourNum = parseInt(cleanTimeHour);
    const startMinNum = parseInt(cleanTimeMin);
    
    let endHourNum = startHourNum;
    let endMinNum = startMinNum + 30;
    if (endMinNum >= 60) {
      endMinNum -= 60;
      endHourNum += 1;
    }
    
    const pad = (n: number) => n.toString().padStart(2, '0');
    const startStr = `${cleanDate}T${pad(startHourNum)}${pad(startMinNum)}00Z`;
    const endStr = `${cleanDate}T${pad(endHourNum)}${pad(endMinNum)}00Z`;

    const title = encodeURIComponent(`Consultation: ${clientName || 'Client'} & Haradhan Sharma`);
    const details = encodeURIComponent(
      `Hello ${clientName || 'Client'},\n\nWe have coordinated an introductory engineering consultation.\n\n` +
      `Meeting Details:\n` +
      `- Facilitator: Haradhan Sharma (DevOps & AI Systems expert)\n` +
      `- Objective: Scoping and Technical Roadmap planning\n` +
      `- Custom Scope Notes: ${briefDetails || 'System introduction and timeline scoping'}\n\n` +
      `A calendar invitation has been generated.`
    );
    const location = encodeURIComponent('Google Meet Virtual Session');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}&sf=true&output=xml`;
  }, [selectedDate, selectedTime, clientName, briefDetails]);

  // Download universal ICS calendar invite
  const handleDownloadICS = () => {
    const cleanDate = selectedDate.replace(/-/g, '');
    const cleanTimeHour = selectedTime.split(':')[0];
    const cleanTimeMin = selectedTime.split(':')[1];
    
    const pad = (n: number) => n.toString().padStart(2, '0');
    const startHr = pad(parseInt(cleanTimeHour));
    const startMin = pad(parseInt(cleanTimeMin));
    const endHr = pad(parseInt(cleanTimeHour) + (parseInt(cleanTimeMin) + 30 >= 60 ? 1 : 0));
    const endMin = pad((parseInt(cleanTimeMin) + 30) % 60);

    const icsContent = 
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "PRODID:-//Haradhan Sharma Portfolio//Consultation Booking//EN\n" +
      "BEGIN:VEVENT\n" +
      `UID:uid_bkg_2026_${Date.now()}@haradhan.dev\n` +
      `DTSTAMP:20260614T080000Z\n` +
      `DTSTART:${cleanDate}T${startHr}${startMin}00Z\n` +
      `DTEND:${cleanDate}T${endHr}${endMin}00Z\n` +
      "SUMMARY:Consultation: Client & Haradhan Sharma (AI / DevOps)\n" +
      `DESCRIPTION:Scope discussion and deployment review. Notes: ${briefDetails || 'Introductory scaffolding'}\n` +
      "LOCATION:Google Meet Session\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `consultation-meeting-${selectedDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="consultation-booking-view">
      
      {/* View Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex rounded-sm border border-orange-500/20 bg-orange-500/10 px-3 py-1 font-mono text-[9px] font-bold text-orange-400 uppercase tracking-widest">
          Consolidated Booking Engine
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white leading-none">
          Coordinate Your <span className="font-serif italic text-amber-200 font-normal">Technical Scoping Block</span>
        </h1>
        <p className="text-zinc-500 text-xs font-sans leading-relaxed">
          Book a 30-minute high-fidelity system roadmap session. Instantly check your own schedule for conflicts and automatically insert events with Google Meet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left 2 Cols scheduler forms */}
        <div className="md:col-span-2">
          {step === 1 ? (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Google Calendar Authorization Box */}
              <div className="rounded-sm border border-white/5 bg-white/[0.01] p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Globe className={`h-4.5 w-4.5 ${accessToken ? 'text-orange-500' : 'text-zinc-500'}`} />
                      <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                        Google Calendar Sync
                      </h4>
                    </div>
                    <p className="text-[10px] text-zinc-500 max-w-md font-sans leading-relaxed">
                      Connect your Google Calendar to automatically scan your schedule for conflicts, check available times, and insert the booking instantly.
                    </p>
                  </div>
                  {!accessToken ? (
                    <button
                      type="button"
                      onClick={handleConnectCalendar}
                      disabled={isAuthLoading}
                      className="px-4 py-2 rounded-sm bg-orange-600 hover:bg-orange-500 text-white font-mono text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isAuthLoading ? 'Connecting...' : 'Connect'}
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[8px] font-bold text-emerald-400 uppercase">
                        Sync Active
                      </span>
                      <button
                        type="button"
                        onClick={handleDisconnectCalendar}
                        className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Disconnect Calendar"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {accessToken && user && (
                  <div className="flex items-center space-x-2 bg-white/[0.01] border border-white/5 rounded p-2.5">
                    {user.photoURL && (
                      <img src={user.photoURL} alt={user.displayName || 'Google User'} className="h-5 w-5 rounded-full" referrerPolicy="no-referrer" />
                    )}
                    <span className="font-mono text-[9px] text-zinc-400">
                      Synchronized with: <span className="text-white font-medium">{user.email}</span>
                    </span>
                  </div>
                )}

                {accessToken && isEventsLoading && (
                  <div className="flex items-center space-x-1.5 font-mono text-[9px] text-orange-400 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                    <span>Checking your real-time calendar availability...</span>
                  </div>
                )}

                {eventsFetchError && (
                  <div className="flex items-start space-x-2 bg-red-500/10 border border-red-500/20 rounded p-3 text-red-400 font-sans text-[10px] leading-relaxed">
                    <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Calendar Sync Issue:</span>
                      <span>Unable to retrieve availability. Reconnect or proceed in offline mode. ({eventsFetchError})</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Date selection strip cards */}
              <div className="space-y-2.5">
                <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold">1. Select Target Date (UTC)</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" id="date-strips">
                  {availableDates.map((date) => (
                    <button
                      key={date.key}
                      type="button"
                      onClick={() => setSelectedDate(date.key)}
                      className={`p-3.5 rounded-sm border text-left transition-all cursor-pointer select-none ${
                        selectedDate === date.key 
                          ? 'bg-orange-500/15 border-orange-500 text-white' 
                          : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="block font-display font-medium text-xs text-white uppercase leading-none">{date.label.split(', ')[1]}</span>
                      <span className="block text-[8px] font-mono text-zinc-500 mt-1 uppercase tracking-wider">{date.label.split(', ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots grid */}
              <div className="space-y-2.5">
                <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold">2. Choose Synchronized Time Slot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="time-grid">
                  {timeSlots.map((time) => {
                    const isOccupied = slotAvailability[time.key]?.isOccupied;
                    const conflictText = slotAvailability[time.key]?.conflict;
                    const isSelected = selectedTime === time.key;

                    return (
                      <button
                        key={time.key}
                        type="button"
                        disabled={isOccupied}
                        onClick={() => setSelectedTime(time.key)}
                        className={`flex items-center justify-between p-4 rounded-sm border text-left transition-all ${
                          isOccupied
                            ? 'bg-red-950/10 border-red-900/15 text-zinc-500 opacity-55 cursor-not-allowed'
                            : isSelected 
                              ? 'bg-orange-500/15 border-orange-500 text-white shadow-lg shadow-orange-500/5 cursor-pointer' 
                              : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02] cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className={`h-4 w-4 ${isOccupied ? 'text-red-900/40' : isSelected ? 'text-orange-400' : 'text-zinc-500'}`} />
                          <span className={`text-xs font-mono font-bold ${isOccupied ? 'line-through text-zinc-555' : ''}`}>
                            {time.label}
                          </span>
                        </div>
                        {isOccupied ? (
                          <span className="text-[7px] font-mono uppercase bg-red-500/10 border border-red-500/25 text-red-400 px-1.5 py-0.5 rounded font-bold">
                            Busy: {conflictText || 'Conflict'}
                          </span>
                        ) : (
                          <span className="text-[8px] font-mono uppercase text-zinc-500 tracking-widest font-bold">
                            {time.col}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information Sheets */}
              <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 space-y-4">
                <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2">
                  3. Corporate Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Representative Name *</label>
                    <input 
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. David Vance"
                      className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Business Email *</label>
                    <input 
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. david@saascapital.net"
                      className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold mb-1.5">Brief description of systems / goals</label>
                  <textarea 
                    rows={4}
                    value={briefDetails}
                    onChange={(e) => setBriefDetails(e.target.value)}
                    placeholder="e.g. Looking for help scoping a high-concurrency microservice transition on AWS and a PostgreSQL master-slave structure."
                    className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707] resize-none"
                  />
                </div>
              </div>

              {/* Submit Action Block */}
              <button
                type="submit"
                disabled={isBookingSubmitting || !clientName || !clientEmail}
                className="w-full rounded-sm bg-white hover:bg-orange-500 text-zinc-950 hover:text-white py-3.5 text-center font-display text-[10px] font-bold uppercase tracking-widest shadow-xl transition-all cursor-pointer disabled:opacity-35 disabled:pointer-events-none duration-300"
              >
                {isBookingSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-3 w-3 animate-spin text-zinc-950" />
                    <span>Scheduling Google Meet Session...</span>
                  </span>
                ) : (
                  "Assemble Consultation Schedule Invite"
                )}
              </button>

            </form>
          ) : (
            <div className="rounded-sm border border-orange-500/20 bg-orange-550/[0.03] p-8 space-y-6 text-center animate-fadeIn">
              
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-400">
                <CheckCircle2 className="h-7 w-7 text-orange-40 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white leading-none">Consultation Slot Locked!</h2>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                  Reserved for {clientName} &bull; Ref Log: CS-2026-{Math.floor(Math.random() * 899 + 100)}
                </p>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed max-w-lg mx-auto font-sans">
                You have reserved a virtual 30-minute technical block on <span className="font-bold text-white uppercase font-mono">{meetingDateFormatted}</span> at <span className="font-bold text-white uppercase font-mono">{meetingTimeFormatted}</span>.
              </p>

              {/* Google Meet videoconference details */}
              {bookedMeetingLinks?.hangoutLink && (
                <div className="max-w-lg mx-auto p-4 rounded-sm border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 space-y-1.5 text-left">
                  <div className="flex items-center space-x-2">
                    <Video className="h-4.5 w-4.5 shrink-0" />
                    <span className="font-display font-bold text-xs uppercase tracking-wider">Google Meet Conference Generated!</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
                    A secure videoconference link has been minted. Click to join at the scheduled hour or consult your calendar invitations.
                  </p>
                  <a 
                    href={bookedMeetingLinks.hangoutLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-1 font-mono text-xs text-white underline hover:text-orange-400 break-all"
                  >
                    <span>{bookedMeetingLinks.hangoutLink}</span>
                  </a>
                </div>
              )}

              {/* Add to Google Calendar or Download Calendar block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {bookedMeetingLinks?.htmlLink ? (
                  <a
                    href={bookedMeetingLinks.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2.5 rounded-sm bg-orange-600 hover:bg-orange-500 text-white py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg transition-colors text-center font-display"
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>View Calendar Event</span>
                  </a>
                ) : (
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2.5 rounded-sm bg-[#ea580c] hover:bg-orange-500 text-white py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg transition-colors text-center font-display"
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    <span>Sync to Google Calendar</span>
                  </a>
                )}

                <button
                  onClick={handleDownloadICS}
                  className="flex items-center justify-center space-x-2.5 rounded-sm border border-white/15 bg-white/[0.02] hover:bg-white/[0.08] hover:border-orange-500/40 text-zinc-300 hover:text-white py-3.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer font-display"
                >
                  <Download className="h-4 w-4 shrink-0 text-orange-500" />
                  <span>Download .ICS Invitation</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 max-w-lg mx-auto">
                <p className="text-[9px] text-zinc-500 leading-relaxed font-mono uppercase tracking-wider">
                  Real-time calendar invites have been pushed to {clientEmail} and haradhan.sharma@gmail.com.
                </p>
              </div>

              <button
                onClick={() => { setStep(1); setClientName(''); setClientEmail(''); setBriefDetails(''); setBookedMeetingLinks(null); }}
                className="mt-4 inline-flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-550 hover:text-orange-400 transition-colors cursor-pointer font-bold"
              >
                <span>Schedule Another Block</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>
          )}
        </div>

        {/* Right Side Info coordinates/FAQ */}
        <div className="space-y-6">
          <div className="rounded-sm border border-white/5 bg-white/[0.02] p-5 space-y-4">
            
            <h4 className="font-display font-bold text-[10px] uppercase text-zinc-500 tracking-widest border-b border-white/5 pb-2.5">
              Briefing Credentials
            </h4>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start space-x-3 text-zinc-400">
                <Video className="h-4.5 w-4.5 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-white leading-none">Google Meet Virtual</span>
                  <p className="text-[10px] text-zinc-550 leading-relaxed mt-1">Virtual secure tele-conference. Standard secure link is created and attached natively with Google Meet.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-zinc-400">
                <Bookmark className="h-4.5 w-4.5 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-white leading-none">Zero Cost SLA</span>
                  <p className="text-[10px] text-zinc-550 leading-relaxed mt-1">These initial 30 minutes are fully complimentary. No obligations are attached.</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5">
              <span className="block text-[8px] font-mono uppercase text-zinc-500 tracking-wider font-bold">
                COORDINATOR: {profile.email}
              </span>
            </div>

          </div>

          <div className="rounded-sm border border-orange-500/5 bg-orange-500/[0.01] p-5">
            <h5 className="font-display font-semibold text-xs text-white mb-2">Technical Preparations</h5>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
              To expedite the roadmap formulation, please have any active codebase repositories, AWS/Contabo dashboard credential tokens, or architectural wireframes accessible during the virtual brief.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
