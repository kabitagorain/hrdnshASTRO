/**
 * Google Sheets Integration Service
 * Manages CRM synchronization for Leads, Bookings, and Invoices.
 */

export interface CRMLead {
  id: string;
  name: string;
  email: string;
  message: string;
  source: string;
  date: string;
}

export interface CRMBooking {
  bookingId: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  details: string;
  created: string;
  location: string;
}

export interface CRMInvoice {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  serviceTitle: string;
  billingType: string;
  amount: number;
  gateway: string;
  trxId: string;
  status: string;
  issueDate: string;
  datacenterName?: string;
  datacenterRegion?: string;
  notes?: string;
}

/**
 * Creates a new Google Spreadsheet to act as the CRM.
 */
export async function createCRMSpreadsheet(accessToken: string, title: string): Promise<string> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title || 'Haradhan Portfolio CRM'
      },
      sheets: [
        { properties: { title: 'Leads' } },
        { properties: { title: 'Bookings' } },
        { properties: { title: 'Invoices' } }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create spreadsheet: ${errText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;

  // Now seed the headers for each sheet tab
  await seedSheetHeaders(accessToken, spreadsheetId);

  return spreadsheetId;
}

/**
 * Seed headers for each worksheet
 */
async function seedSheetHeaders(accessToken: string, spreadsheetId: string) {
  const headers = {
    'Leads!A1:F1': [['Lead ID', 'Name', 'Email/Contact', 'Inquiry/Message', 'Acquisition Source', 'Captured Timestamp']],
    'Bookings!A1:H1': [['Booking ID', 'Client Name', 'Client Email', 'Meeting Date', 'Meeting Time (UTC)', 'Details/Brief', 'Scheduled On', 'Location Link']],
    'Invoices!A1:L1': [['Invoice Number', 'Client Name', 'Client Email', 'Architecture Title', 'Billing Type', 'Value (USD)', 'Payment Method', 'Transaction ID', 'Status', 'Date Certified', 'Sovereign Node Name', 'Internal Admin Notes']]
  };

  for (const [range, values] of Object.entries(headers)) {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values })
    });
  }
}

/**
 * Bulk insert/sync Lead records to Google Sheet
 */
export async function syncLeadsToSheet(accessToken: string, spreadsheetId: string, leads: CRMLead[]): Promise<boolean> {
  if (!leads.length) return true;

  const rows = leads.map(lead => [
    lead.id,
    lead.name,
    lead.email,
    lead.message,
    lead.source,
    lead.date
  ]);

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Leads!A2:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: rows
    })
  });

  return response.ok;
}

/**
 * Bulk insert/sync Bookings records to Google Sheet
 */
export async function syncBookingsToSheet(accessToken: string, spreadsheetId: string, bookings: CRMBooking[]): Promise<boolean> {
  if (!bookings.length) return true;

  const rows = bookings.map(b => [
    b.bookingId,
    b.clientName,
    b.clientEmail,
    b.date,
    b.time,
    b.details,
    b.created,
    b.location
  ]);

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Bookings!A2:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: rows
    })
  });

  return response.ok;
}

/**
 * Bulk insert/sync Invoices to Google Sheet
 */
export async function syncInvoicesToSheet(accessToken: string, spreadsheetId: string, invoices: CRMInvoice[]): Promise<boolean> {
  if (!invoices.length) return true;

  const rows = invoices.map(inv => [
    inv.invoiceNumber,
    inv.clientName,
    inv.clientEmail,
    inv.serviceTitle,
    inv.billingType,
    inv.amount,
    inv.gateway,
    inv.trxId,
    inv.status,
    inv.issueDate,
    inv.datacenterName ? `${inv.datacenterName} (${inv.datacenterRegion || ''})` : 'Default Hub',
    inv.notes || ''
  ]);

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Invoices!A2:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: rows
    })
  });

  return response.ok;
}
