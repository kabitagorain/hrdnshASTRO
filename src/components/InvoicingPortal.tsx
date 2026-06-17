import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, Plus, Trash2, FileText, Download, Globe, ShieldCheck, Mail, Send, CheckCircle2, Search, History, Clipboard, AlertCircle, Sparkles, Receipt, Database, Calendar, LogIn, ExternalLink, RefreshCw, LogOut, Check
} from 'lucide-react';
import { profile, siteData, services } from '../data/services';
import DatacenterMap, { datacenters } from './DatacenterMap';
import { initAuth, googleSignIn, logout } from '../lib/firebase';
import { createCRMSpreadsheet, syncLeadsToSheet, syncBookingsToSheet, syncInvoicesToSheet } from '../lib/sheetsService';

interface InvoiceListItem {
  id: string;
  name: string;
  qty: number;
  rate: number;
}

interface InvoicingPortalProps {
  onBackToHome?: () => void;
}

export default function InvoicingPortal({ onBackToHome }: InvoicingPortalProps) {
  // Navigation wizard state
  const [step, setStep] = useState(1);

  // Invoice parameters
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [invoiceTitle, setInvoiceTitle] = useState('Custom Tech Stack Integration & Scoping');
  const [paymentSchedule, setPaymentSchedule] = useState('50% Upfront, 50% Post-Acceptance');
  
  // Line Items
  const [lineItems, setLineItems] = useState<InvoiceListItem[]>([
    { id: '1', name: 'Cloud Infrastructure Setup (Hetzner VPS / Docker)', qty: 1, rate: 450 },
    { id: '2', name: 'Custom DB optimization and master-slave migration', qty: 1, rate: 350 }
  ]);

  // Dynamic Item Inputs
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemRate, setNewItemRate] = useState(100);

  // Gateway parameters
  const [selectedGateway, setSelectedGateway] = useState<'bank' | 'bkash' | 'crypto_trc' | 'crypto_sol' | null>('bank');
  const [trxId, setTrxId] = useState('');
  const [userMemo, setUserMemo] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  // Load Invoices from LocalStorage
  const [pastInvoices, setPastInvoices] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Service Scoper States
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [billingModel, setBillingModel] = useState<'oneTime' | 'weekly'>('oneTime');
  const [selectedDatacenterId, setSelectedDatacenterId] = useState('de-falkenstein');

  // Sovereign CRM & Google Sheets Sync States
  const [activeSection, setActiveSection] = useState<'billing' | 'crm'>('billing');
  const [crmLeads, setCrmLeads] = useState<any[]>([]);
  const [crmBookings, setCrmBookings] = useState<any[]>([]);
  const [crmSpreadsheetId, setCrmSpreadsheetId] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<any | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSyncingLeads, setIsSyncingLeads] = useState(false);
  const [isSyncingBookings, setIsSyncingBookings] = useState(false);
  const [isSyncingInvoices, setIsSyncingInvoices] = useState(false);
  const [syncTriggered, setSyncTriggered] = useState(false);
  const [sheetsError, setSheetsError] = useState<string | null>(null);

  const ADMIN_EMAILS = useMemo(() => {
    const rawEmails = (import.meta as any).env.VITE_ADMIN_EMAIL || '';
    const emailList = rawEmails.split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean);
    // Explicitly authorize both developers/admins as robust defaults
    if (!emailList.includes('npa.hanging@gmail.com')) {
      emailList.push('npa.hanging@gmail.com');
    }
    if (!emailList.includes('kabitagorain6@gmail.com')) {
      emailList.push('kabitagorain6@gmail.com');
    }
    return emailList;
  }, []);

  const isUserAdmin = useMemo(() => {
    if (!googleUser || !googleUser.email) return false;
    return ADMIN_EMAILS.includes(googleUser.email.toLowerCase());
  }, [googleUser, ADMIN_EMAILS]);

  const invoiceNumber = useMemo(() => {
    return `INV-DIRECT-${Math.floor(1000 + Math.random() * 9000)}`;
  }, [step === 1]); // Reset number when restarting form

  const todayDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }, []);

  // Sync with Local storage and Google CRM info
  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('haradhan_invoices') || '[]');
    setPastInvoices(loaded);

    const leads = JSON.parse(localStorage.getItem('haradhan_leads') || '[]');
    setCrmLeads(leads);

    const bookings = JSON.parse(localStorage.getItem('haradhan_bookings') || '[]');
    setCrmBookings(bookings);

    const savedSheetId = localStorage.getItem('haradhan_crm_spreadsheet_id');
    if (savedSheetId) {
      setCrmSpreadsheetId(savedSheetId);
    }

    // Monitor Sheets integration authorization status
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setGoogleUser(currentUser);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );

    return () => unsubscribe();
  }, []);

  // Quick Preset Templates to speed up client inputs
  const presetTemplates = [
    {
      title: "Hourly Consulting retainer block",
      items: [
        { id: 't1', name: 'Senior Architectural consulting retainer block', qty: 10, rate: 85 }
      ],
      payment: '100% Retainer Pre-payment'
    },
    {
      title: "Full custom cloud migrations",
      items: [
        { id: 't2', name: 'Hetzner cluster scaling & Dockerization', qty: 1, rate: 600 },
        { id: 't3', name: 'Postgres high-availability pipeline optimization', qty: 1, rate: 400 }
      ],
      payment: '50% Upfront escrow, 50% post-delivery'
    }
  ];

  const handleApplyTemplate = (tpl: typeof presetTemplates[0]) => {
    setSelectedServiceId('');
    setInvoiceTitle(tpl.title);
    setPaymentSchedule(tpl.payment);
    setLineItems(tpl.items.map((it, idx) => ({
      id: String(idx + 1),
      name: it.name,
      qty: it.qty,
      rate: it.rate
    })));
  };

  const handleApplyServiceTemplate = (serviceId: string, model: 'oneTime' | 'weekly' = 'oneTime') => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    setSelectedServiceId(serviceId);
    setInvoiceTitle(service.title);

    if (model === 'oneTime') {
      setPaymentSchedule('50% Upfront, 50% Post-Acceptance');
      const totalVal = service.pricing.oneTime;
      const primaryItemRate = Math.round(totalVal * 0.55);
      const remainingRatePool = totalVal - primaryItemRate;
      
      const deliverablesToUse = service.deliverables.slice(0, 4);
      const itemizedRate = deliverablesToUse.length > 0 
        ? Math.floor(remainingRatePool / deliverablesToUse.length) 
        : 0;
      
      const newItems: InvoiceListItem[] = [
        {
          id: 'primary',
          name: `Core Architecture Setup & Secure VPS Hosting for ${service.title}`,
          qty: 1,
          rate: primaryItemRate
        }
      ];
      
      deliverablesToUse.forEach((del, idx) => {
        const rateVal = idx === deliverablesToUse.length - 1 
          ? remainingRatePool - (itemizedRate * (deliverablesToUse.length - 1))
          : itemizedRate;
          
        newItems.push({
          id: `del-${idx}`,
          name: `${del} Engine`,
          qty: 1,
          rate: rateVal
        });
      });

      setLineItems(newItems);
    } else {
      setPaymentSchedule('100% Retainer Pre-payment');
      const newItems: InvoiceListItem[] = [
        {
          id: 'weekly-retainer',
          name: `Weekly Engineering Sprint Block (SLA: ${service.title})`,
          qty: 2, // Standard 2-week block
          rate: service.pricing.weekly
        },
        {
          id: 'weekly-sla',
          name: `Continuous Integration Deployments, Hardened Docker Backups & SLA Monitoring`,
          qty: 1,
          rate: 0
        }
      ];
      setLineItems(newItems);
    }
  };

  const handleAddItem = () => {
    if (!newItemName || newItemQty <= 0 || newItemRate < 0) return;
    const newItem: InvoiceListItem = {
      id: String(Date.now()),
      name: newItemName,
      qty: newItemQty,
      rate: newItemRate
    };
    setLineItems([...lineItems, newItem]);
    setNewItemName('');
    setNewItemQty(1);
    setNewItemRate(100);
  };

  const handleRemoveItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return lineItems.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  }, [lineItems]);

  // Payment gateways
  const gateways = [
    {
      code: "bank" as const,
      name: "Bank Wire Transfer",
      icon: "🏦",
      region: "Global Wise / Direct Swift",
      details: [
        { label: "Bank Institution", value: "Clear Bank (London HQ)" },
        { label: "Account Holder", value: "Haradhan Sharma" },
        { label: "IBAN Code", value: "GB96CLRB04281204027608" },
        { label: "SWIFT / BIC Address", value: "CLRBGB22XXX" },
        { label: "Bank HQ Address", value: "133 Houndsditch, LONDON, EC3A 7BX" },
      ],
      description: "Direct bank transfer. Optimal for invoice values over $500. Zero intermediate processor risk."
    },
    {
      code: "bkash" as const,
      name: "bKash Transfer",
      icon: "📱",
      region: "Bangladesh Domestic",
      details: [
        { label: "Payment Channel", value: "bKash Send Money" },
        { label: "Phone Identifier", value: "01712270815" },
        { label: "Account Class", value: "Personal Wallet" },
        { label: "Initial Invoice Code", value: invoiceNumber },
      ],
      description: "Bangladesh immediate mobile wallet payment. Transfers processed inside 2 minutes."
    },
    {
      code: "crypto_trc" as const,
      name: "Tether (TRC-20 USDT)",
      icon: "₮",
      region: "Decentralized Stablecoin",
      details: [
        { label: "Network Protocol", value: "TRC20 (Tron Virtual Engine)" },
        { label: "Receiver Address", value: "TNKkGiFrZ1LNpvx74CVeA6BBoFkekgQoBS" },
        { label: "Accepted Token", value: "USDT Tether only" },
      ],
      description: "Decentralized trustless escrow settlement. Please execute transfer only on direct TRC-20 paths."
    },
    {
      code: "crypto_sol" as const,
      name: "USDC (Solana Native)",
      icon: "◎",
      region: "High-Speed Web3 Engine",
      details: [
        { label: "Blockchain Path", value: "Solana Network" },
        { label: "Destination Address", value: "J5nuEfNX45HTRChsT3aVUJLzXw3u4z2NuMvY5S6XQUx9" },
        { label: "Token Asset", value: "USDC Token" },
      ],
      description: "Immediate low-gas settlement. Ensure using standard Solana network parameters."
    }
  ];

  const activeGateway = useMemo(() => {
    return gateways.find(g => g.code === selectedGateway) || gateways[0];
  }, [selectedGateway]);

  // Action links handles
  const mailtoString = useMemo(() => {
    const subject = encodeURIComponent(`Technical Bill Locked: ${invoiceTitle} (${invoiceNumber})`);
    const lineItemDetailsText = lineItems.map(item => ` - ${item.name} (Qty ${item.qty} x $${item.rate}) = $${item.qty * item.rate}`).join('\n');
    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);
    
    const depositLog = isLogged 
      ? `=== TRANSACTION SUBMISSION REGISTER ===\n` +
          `- Clearing Gateway: ${selectedGateway?.toUpperCase()}\n` +
          `- Logged Reference hash: ${trxId}\n` +
          `- Additional Notes: ${userMemo || 'None'}\n`
      : '';

    const body = encodeURIComponent(
      `Hello Haradhan,\n\nI have generated and verified a custom roadmap invoice for my project.\n\n` +
      `Invoice ID: ${invoiceNumber}\n` +
      `Platform Scope: ${invoiceTitle}\n` +
      `Allocated Datacenter Region: ${selectedDc ? `${selectedDc.name} (${selectedDc.region})` : 'None Selected'}\n` +
      `Payment Covenant Plan: ${paymentSchedule}\n\n` +
      `Line Items Compiled:\n` + lineItemDetailsText + `\n\n` +
      `Total Invoice Valuation: $${subtotal} USD\n\n` +
      depositLog + `\n` +
      `Client Coordinates:\n` +
      `- Entity Name: ${clientName}\n` +
      `- Contact Email: ${clientEmail}\n\n` +
      `Please review and confirm receipt clearance.\n\n` +
      `Sincerely,\n` +
      `${clientName || 'Client representative'}`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }, [lineItems, subtotal, invoiceTitle, invoiceNumber, clientName, clientEmail, paymentSchedule, selectedGateway, trxId, isLogged, userMemo, selectedDatacenterId]);

  const whatsappString = useMemo(() => {
    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);
    const text = encodeURIComponent(
      `Greetings Haradhan! I have generated custom invoice ${invoiceNumber} under the billing portal.\n` +
      `Scope: ${invoiceTitle}.\nDatacenter: ${selectedDc ? selectedDc.name : 'Default'}.\nTotal: $${subtotal} USD.\nClient: ${clientName} (${clientEmail}). ` +
      (isLogged ? `Logged [${selectedGateway?.toUpperCase()}] Reference hash: ${trxId}` : '')
    );
    return `https://wa.me/${siteData.whatsapp}?text=${text}`;
  }, [invoiceTitle, invoiceNumber, subtotal, clientName, clientEmail, isLogged, selectedGateway, trxId, selectedDatacenterId]);

  // Handle lodging local record and saving to audit history
  const handleLockAndSettle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || !clientName) return;

    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);

    const loggedInvoice = {
      invoiceNumber,
      clientName,
      email: clientEmail || 'direct-client@custom-billing.com',
      serviceTitle: invoiceTitle,
      billingType: 'custom',
      amount: subtotal,
      datacenterId: selectedDatacenterId,
      datacenterName: selectedDc ? selectedDc.name : 'Default Hub',
      datacenterRegion: selectedDc ? selectedDc.region : 'Default Region',
      gateway: selectedGateway || 'not_specified',
      trxId,
      notes: `Datacenter: ${selectedDc ? `${selectedDc.name} (${selectedDc.region})` : 'Default'}. ${userMemo || 'Direct custom invoice generated online'}`,
      status: 'AWAITING_VERIFICATION (Direct Audit Ledger)',
      issueDate: todayDate,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const loaded = JSON.parse(localStorage.getItem('haradhan_invoices') || '[]');
    loaded.push(loggedInvoice);
    localStorage.setItem('haradhan_invoices', JSON.stringify(loaded));
    setPastInvoices(loaded);
    setIsLogged(true);
  };

  const handleCopyCoords = () => {
    const dataStr = activeGateway.details.map(d => `${d.label}: ${d.value}`).join('\n');
    navigator.clipboard.writeText(dataStr);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleCopyInvoiceRef = () => {
    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);
    const tBody = lineItems.map(item => ` - ${item.name} (x${item.qty}): $${item.qty * item.rate}`).join('\n');
    const summary = `Invoice Reference: ${invoiceNumber}\n` +
      `Owner Entity: ${clientName || 'Client'}\n` +
      `Project Title: ${invoiceTitle}\n` +
      `Target Datacenter: ${selectedDc ? `${selectedDc.name} (${selectedDc.region})` : 'Default Hub'}\n` +
      `Subtotal: $${subtotal} USD\n` +
      `Deliverables:\n${tBody}`;

    navigator.clipboard.writeText(summary);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleDownloadInvoiceRecord = (inv: any) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(inv, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${inv.invoiceNumber}_Custom_Direct_Receipt.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleConnectSheets = async () => {
    setIsAuthLoading(true);
    setSheetsError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
      }
    } catch (err: any) {
      console.error("Sheets authorization failed:", err);
      setSheetsError(err.message || 'Authorization failed.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleDisconnectSheets = async () => {
    try {
      await logout();
      setGoogleUser(null);
      setGoogleToken(null);
    } catch (err: any) {
      console.error("Logout failed:", err);
    }
  };

  const handleCreateCRMSheet = async () => {
    if (!googleToken) return;
    setSheetsError(null);
    setIsSyncingLeads(true);
    try {
      const title = 'Haradhan Portfolio CRM - Leads & Invoices';
      const sheetId = await createCRMSpreadsheet(googleToken, title);
      setCrmSpreadsheetId(sheetId);
      localStorage.setItem('haradhan_crm_spreadsheet_id', sheetId);
    } catch (err: any) {
      console.error("Failed to create spreadsheet:", err);
      setSheetsError(err.message || 'Failed to create spreadsheet.');
    } finally {
      setIsSyncingLeads(false);
    }
  };

  const handlePushSync = async () => {
    if (!googleToken || !crmSpreadsheetId) return;
    setSheetsError(null);
    setSyncTriggered(false);

    // Sync Leads
    if (crmLeads.length > 0) {
      setIsSyncingLeads(true);
      try {
        const mappedLeads = crmLeads.map(l => ({
          id: l.id,
          name: l.name,
          email: l.email,
          message: l.message,
          source: l.source,
          date: l.date
        }));
        await syncLeadsToSheet(googleToken, crmSpreadsheetId, mappedLeads);
      } catch (err: any) {
        console.error("Leads sync failed:", err);
        setSheetsError(`Leads sync failed: ${err.message || err}`);
      } finally {
        setIsSyncingLeads(false);
      }
    }

    // Sync Bookings
    if (crmBookings.length > 0) {
      setIsSyncingBookings(true);
      try {
        const mappedBookings = crmBookings.map(b => ({
          bookingId: b.bookingId,
          clientName: b.clientName,
          clientEmail: b.clientEmail,
          date: b.date,
          time: b.time,
          details: b.details,
          created: b.created,
          location: b.location || 'Google Meet'
        }));
        await syncBookingsToSheet(googleToken, crmSpreadsheetId, mappedBookings);
      } catch (err: any) {
        console.error("Bookings sync failed:", err);
        setSheetsError(prev => `${prev ? prev + ' | ' : ''}Bookings sync failed: ${err.message || err}`);
      } finally {
        setIsSyncingBookings(false);
      }
    }

    // Sync Invoices
    if (pastInvoices.length > 0) {
      setIsSyncingInvoices(true);
      try {
        const mappedInvoices = pastInvoices.map(inv => ({
          invoiceNumber: inv.invoiceNumber,
          clientName: inv.clientName,
          clientEmail: inv.email,
          serviceTitle: inv.serviceTitle,
          billingType: inv.billingType || 'custom',
          amount: inv.amount,
          gateway: inv.gateway,
          trxId: inv.trxId,
          status: inv.status,
          issueDate: inv.issueDate,
          datacenterName: inv.datacenterName,
          datacenterRegion: inv.datacenterRegion,
          notes: inv.notes
        }));
        await syncInvoicesToSheet(googleToken, crmSpreadsheetId, mappedInvoices);
      } catch (err: any) {
        console.error("Invoices sync failed:", err);
        setSheetsError(prev => `${prev ? prev + ' | ' : ''}Invoices sync failed: ${err.message || err}`);
      } finally {
        setIsSyncingInvoices(false);
      }
    }

    setSyncTriggered(true);
    setTimeout(() => setSyncTriggered(false), 5000);
  };

  const handleDeleteLead = (id: string) => {
    const updated = crmLeads.filter(l => l.id !== id);
    setCrmLeads(updated);
    localStorage.setItem('haradhan_leads', JSON.stringify(updated));
  };

  const handleDeleteBooking = (id: string) => {
    const updated = crmBookings.filter(b => b.bookingId !== id);
    setCrmBookings(updated);
    localStorage.setItem('haradhan_bookings', JSON.stringify(updated));
  };

  // Filter local history
  const filteredInvoices = useMemo(() => {
    return pastInvoices.filter(inv => {
      const q = searchQuery.toLowerCase();
      return (
        inv.invoiceNumber?.toLowerCase().includes(q) ||
        inv.clientName?.toLowerCase().includes(q) ||
        inv.serviceTitle?.toLowerCase().includes(q) ||
        inv.gateway?.toLowerCase().includes(q) ||
        inv.trxId?.toLowerCase().includes(q)
      );
    });
  }, [pastInvoices, searchQuery]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="direct-invoice-portal">
      
      {/* Portal Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex rounded-sm border border-amber-500/20 bg-amber-500/10 px-3 py-1 font-mono text-[9px] font-bold text-amber-400 uppercase tracking-widest">
          Sovereign Control Center &bull; CRM & Financial Ledgers
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white leading-none">
          Haradhan Portfolio <span className="font-serif italic text-amber-200 font-normal">Administration Suite</span>
        </h1>
        <p className="text-zinc-500 text-xs font-sans leading-relaxed">
          Manage your consulting pipeline, direct client statement of work billing setups, and instantly synchronize offline lead lists to secure Google Sheets spreadsheets.
        </p>
      </div>

      {/* Admin Tab Switchers */}
      <div className="flex border-b border-white/5 mb-8 justify-center sm:justify-start">
        <button
          onClick={() => setActiveSection('billing')}
          className={`px-5 py-3 font-display text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
            activeSection === 'billing'
              ? 'border-amber-500 text-white bg-white/[0.01]'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          💳 Invoicing & Billing Engine
        </button>
        <button
          onClick={() => {
            setActiveSection('crm');
            const leads = JSON.parse(localStorage.getItem('haradhan_leads') || '[]');
            setCrmLeads(leads);
            const bookings = JSON.parse(localStorage.getItem('haradhan_bookings') || '[]');
            setCrmBookings(bookings);
          }}
          className={`px-5 py-3 font-display text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
            activeSection === 'crm'
              ? 'border-amber-500 text-white bg-white/[0.01]'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          📊 CRM Leads & Sheets Sync
        </button>
      </div>

      {activeSection === 'billing' ? (
        <>
          {/* Wizard Header Paths */}
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
            <button
              onClick={onBackToHome}
              className="group inline-flex items-center space-x-2 rounded-sm border border-white/5 bg-white/[0.02] px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform text-orange-400" />
              <span>Home Suite</span>
            </button>

            <div className="flex items-center space-x-3 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
              <button 
                type="button"
                onClick={() => { setStep(1); setIsLogged(false); }}
                className={step === 1 ? 'text-amber-500' : 'text-zinc-500'}
              >
                01 Write Scope
              </button>
              <span className="text-zinc-800">&gt;</span>
              <span className={step === 2 ? 'text-amber-500' : 'text-zinc-500'}>
                02 Verify Settle Gate
              </span>
            </div>
          </div>

          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Form Composer: Left 2 Cols */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Quick Presets Frame */}
            <div className="rounded-sm border border-white/5 bg-white/[0.01] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>Synchronized System & Service Scoper</span>
                </h4>
                <span className="rounded bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 text-[8px] font-mono text-orange-400 uppercase tracking-widest font-bold">14 Core Systems</span>
              </div>
              
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                Align the direct invoice parameters with your actual pre-existing systems. Selecting an option below auto-populates its exact structured deliverables, rate formulas, and timelines into the live statement of work.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Service Selector Dropdown */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[8px] uppercase text-zinc-505 tracking-wider font-bold">Matched Deployment System</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => {
                      const id = e.target.value;
                      if (id) {
                        handleApplyServiceTemplate(id, billingModel);
                      } else {
                        setSelectedServiceId('');
                      }
                    }}
                    className="w-full h-[38px] rounded-sm border border-white/5 bg-[#0e0e0e] px-3 text-xs text-white uppercase tracking-wider focus:border-amber-500/50 focus:outline-[#ffaa00] focus:bg-[#070707]"
                  >
                    <option value="" className="lowercase text-zinc-650">-- SELECT STANDARD SERVICE TEMPLATE --</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id} className="bg-[#050510] text-[11px] font-medium font-sans">
                        {s.icon} {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Billing Model & Speed Toggle */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[8px] uppercase text-zinc-550 tracking-wider font-bold">Pricing Framework & Rate Cap</label>
                  <div className="flex items-center space-x-1.5 bg-zinc-950 p-1.5 h-[38px] rounded-sm border border-white/5">
                    <button
                      type="button"
                      disabled={!selectedServiceId}
                      onClick={() => {
                        setBillingModel('oneTime');
                        handleApplyServiceTemplate(selectedServiceId, 'oneTime');
                      }}
                      className={`flex-grow h-full text-[8.5px] font-mono font-bold uppercase rounded-sm transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none ${
                        billingModel === 'oneTime'
                          ? 'bg-amber-500/10 border border-amber-500/30 text-orange-400 font-bold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      Fixed Project (${services.find(s => s.id === selectedServiceId)?.pricing.oneTime || '0'})
                    </button>
                    <button
                      type="button"
                      disabled={!selectedServiceId}
                      onClick={() => {
                        setBillingModel('weekly');
                        handleApplyServiceTemplate(selectedServiceId, 'weekly');
                      }}
                      className={`flex-grow h-full text-[8.5px] font-mono font-bold uppercase rounded-sm transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none ${
                        billingModel === 'weekly'
                          ? 'bg-amber-500/10 border border-amber-500/30 text-orange-400 font-bold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      Weekly SLA (${services.find(s => s.id === selectedServiceId)?.pricing.weekly || '0'}/wk)
                    </button>
                  </div>
                </div>
              </div>

              {/* General Work Quick Presets (Fallback/Hourly blocks) */}
              <div className="pt-2 border-t border-white/[0.03]">
                <span className="block font-mono text-[8px] uppercase text-zinc-550 tracking-widest font-bold mb-2">Or quick-apply general consulting hours</span>
                <div className="flex flex-wrap gap-2">
                  {presetTemplates.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-[#121212] border border-white/5 text-[9.5px] font-mono font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {tpl.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Bill Properties */}
            <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 space-y-4">
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2">
                1. Contract & Entity Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase text-zinc-550 tracking-widest font-bold mb-1.5">Your Company Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. BlueSky Ventures Ltd"
                    className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-amber-500/50 focus:outline-none focus:bg-[#070707]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-zinc-550 tracking-widest font-bold mb-1.5">Contact Billing Email *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. accounting@bluesky.co"
                    className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-amber-500/50 focus:outline-none focus:bg-[#070707]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase text-zinc-550 tracking-widest font-bold mb-1.5">Scope Title Summary</label>
                  <input
                    type="text"
                    value={invoiceTitle}
                    onChange={(e) => setInvoiceTitle(e.target.value)}
                    placeholder="e.g. Custom Node Backend Audit"
                    className="w-full rounded-sm border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-amber-500/50 focus:outline-none focus:bg-[#070707]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-zinc-550 tracking-widest font-bold mb-1.5">Acceptance Milestone Agreement</label>
                  <select
                    value={paymentSchedule}
                    onChange={(e) => setPaymentSchedule(e.target.value)}
                    className="w-full h-[37px] rounded-sm border border-white/5 bg-white/[0.01] px-3 text-xs text-white focus:border-amber-500/50 focus:outline-none focus:bg-[#070707]"
                  >
                    <option className="bg-[#050505]" value="50% Upfront, 50% Post-Acceptance">50% Upfront, 50% Post-Acceptance</option>
                    <option className="bg-[#050505]" value="100% Pre-payment Retainer">100% Pre-payment Retainer</option>
                    <option className="bg-[#050505]" value="100% Post-Delivery Settlement">100% Post-Delivery Settlement</option>
                    <option className="bg-[#050505]" value="Custom Milestones (Detailed in body)">Custom Milestones (Detailed in body)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Line Items Builder */}
            <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 space-y-4">
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2">
                2. Live Itemized Deliverables Table
              </h3>

              {/* Existing Items */}
              <div className="space-y-2">
                {lineItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded bg-white/[0.01] border border-white/5 text-xs gap-3"
                  >
                    <div className="space-y-1">
                      <span className="font-display font-bold text-white text-xs">{item.name}</span>
                      <span className="block text-[10px] text-zinc-500 font-mono">
                        Billing rate: ${item.rate} USD x {item.qty} quantity block
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 self-end sm:self-auto">
                      <span className="font-mono font-bold text-white">${item.qty * item.rate}.00</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-zinc-600 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Remove Deliverable"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {lineItems.length === 0 && (
                  <div className="p-8 text-center border border-dashed border-white/5 rounded text-zinc-600 font-sans text-xs">
                    Please compile at least one item below to lock valuations correctly.
                  </div>
                )}
              </div>

              {/* Add New Line Item Form */}
              <div className="bg-white/[0.01] border border-white/5 p-4 rounded-sm space-y-3">
                <span className="block font-mono text-[9px] uppercase text-zinc-500 font-bold tracking-wider">Add Custom Line Item Deliverable</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="e.g. AWS Multi-Region Replication setup"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="w-full h-9 rounded-sm border border-white/5 bg-zinc-950/50 px-3 text-xs text-white placeholder-zinc-700 focus:border-amber-500/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      title="Quantity"
                      value={newItemQty === 0 ? '' : newItemQty}
                      onChange={(e) => setNewItemQty(Number(e.target.value))}
                      className="w-full h-9 rounded-sm border border-white/5 bg-zinc-950/50 px-3 text-xs text-white focus:border-amber-500/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min={0}
                      placeholder="Rate ($)"
                      title="Rate per item"
                      value={newItemRate === 0 ? '' : newItemRate}
                      onChange={(e) => setNewItemRate(Number(e.target.value))}
                      className="w-full h-9 rounded-sm border border-white/5 bg-zinc-950/50 px-3 text-xs text-white focus:border-amber-500/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!newItemName}
                    className="inline-flex items-center space-x-1.5 px-4 h-8 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-[10px] uppercase font-bold tracking-wide rounded cursor-pointer disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Insert Deliverable</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Geographic Datacenter Allocation Map Card */}
            <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 space-y-4">
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2">
                3. Physical Server Host Allocation Map
              </h3>
              <p className="text-[10px] text-zinc-550 leading-relaxed font-sans mt-1">
                Select your legal jurisdiction and hosting hub directly. Your chosen datacenter registers as SOW metadata for continuous latency optimization SLA.
              </p>
              <DatacenterMap 
                selectedId={selectedDatacenterId} 
                onSelect={(id) => setSelectedDatacenterId(id)} 
              />
            </div>

            {/* Advance Forward CTA */}
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!clientName || !clientEmail || lineItems.length === 0}
                onClick={() => setStep(2)}
                className="group inline-flex items-center space-x-2 rounded-sm bg-white hover:bg-amber-500 text-zinc-950 hover:text-white px-8 py-3.5 font-display text-[10px] uppercase tracking-widest font-bold shadow-xl transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer duration-300"
              >
                <span>Generate Verified Billing Coordinates</span>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500 group-hover:text-white" />
              </button>
            </div>

          </div>

          {/* Right Preview Column */}
          <div className="space-y-6">
            <div className="rounded-sm border border-white/5 bg-[#0a0a0a] p-5 space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">Dynamic Pre-Calculations</span>
              
              <div className="space-y-3 pb-4 border-b border-white/5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-450 font-medium">Deliverables Count:</span>
                  <span className="font-mono text-white text-xs font-bold">{lineItems.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-450 font-medium">Schedule Plan:</span>
                  <span className="text-zinc-300 capitalize text-right text-[10.5px] max-w-[130px] truncate">{paymentSchedule}</span>
                </div>
              </div>

              <div className="flex justify-between text-xs items-center">
                <span className="text-zinc-450 font-medium">Dynamic Valuation:</span>
                <span className="font-serif italic text-2xl font-normal text-amber-200">${subtotal} USD</span>
              </div>
            </div>

            <div className="rounded-sm border border-dashed border-white/10 p-5 space-y-2 text-xs">
              <h5 className="font-display font-semibold text-white">Prism Settlement Security</h5>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                These dynamic calculations compile straight into standard PDF/JSON representations processed entirely in the offline browser stack. No third-party API exposure translates to zero centralized merchant leak risk.
              </p>
            </div>
          </div>

        </div>
      ) : (
        // Step 2: Financial Routing Coordinates & Submission Frame
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
          
          {/* SECURE DIRECT RECEIPT SHEET IN 2 COLS */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Live Rendered Custom Invoice Canvas */}
            <div className="rounded-sm border border-white/10 bg-[#0a0a0a] shadow-2xl p-6 md:p-8 font-sans relative overflow-hidden" id="custom-compiled-invoice-sheet">
              <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/5 blur-2xl rounded-full" />

              {/* Invoice Top line */}
              <div className="flex flex-col sm:flex-row justify-between pb-6 border-b border-white/5 gap-4">
                <div>
                  <span className="font-display text-xl font-bold uppercase tracking-widest text-white leading-none block">{siteData.brandName}</span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1 block">Full-Stack Cloud Consulting</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-mono text-xs font-bold text-amber-500 p-2 bg-amber-500/10 border border-amber-500/20 rounded-sm">{invoiceNumber}</span>
                  <span className="text-[9px] font-mono text-zinc-500 mt-3 block">Issue Date: {todayDate}</span>
                </div>
              </div>

              {/* Billing Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-white/5 text-xs text-zinc-300">
                <div>
                  <span className="text-zinc-550 font-mono uppercase tracking-widest text-[9px] font-bold block mb-1.5">PREPARED BY (FACILITATOR)</span>
                  <p className="font-display font-semibold text-white">{profile.name}</p>
                  <p className="text-zinc-400 mt-0.5">{profile.title}</p>
                  <p className="text-zinc-500 font-mono text-[9px] mt-0.5">Mailing ID: haradhan.sharma@gmail.com</p>
                </div>
                <div>
                  <span className="text-zinc-550 font-mono uppercase tracking-widest text-[9px] font-bold block mb-1.5">PREPARED FOR (CLIENT REPRESENTATIVE)</span>
                  <p className="font-display font-semibold text-white">{clientName}</p>
                  <p className="text-zinc-400 mt-0.5">{clientEmail}</p>
                  <p className="text-zinc-500 font-mono text-[9.5px] mt-0.5">Agreement SLA: {paymentSchedule}</p>
                </div>
                <div className="sm:col-span-2 pt-3 border-t border-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-zinc-550 font-mono uppercase tracking-widest text-[8px] font-bold">SOVEREIGN HOSTING ALLOCATION</span>
                  <span className="text-amber-200 font-mono text-[10px] font-bold uppercase tracking-wider">
                    🌐 {datacenters.find(d => d.id === selectedDatacenterId)?.name} &mdash; {datacenters.find(d => d.id === selectedDatacenterId)?.region}
                  </span>
                </div>
              </div>

              {/* Compiled Line Deliverables Grid */}
              <div className="py-6 border-b border-white/5 space-y-3">
                <span className="text-zinc-550 font-mono uppercase tracking-widest text-[9px] font-bold block mb-3">CUSTOM BILL CHARGES DETAIL</span>
                
                <div className="text-xs space-y-2">
                  {lineItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-3 rounded-sm bg-white/[0.01] border border-white/5">
                      <div>
                        <p className="font-display font-semibold text-white">{item.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Quantity: {item.qty} units &bull; Rate: ${item.rate} USD</p>
                      </div>
                      <span className="font-mono font-bold text-white">${item.qty * item.rate}.00</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Subtotal Summary */}
              <div className="py-6 flex justify-between items-center bg-white/[0.01] px-4 border border-dashed border-white/5 rounded-sm">
                <div className="text-left font-mono">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Billing Currency Protocol</span>
                  <p className="text-[8.5px] text-zinc-650 uppercase tracking-wider mt-1">Settles straight with 0% intermediate fees</p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic text-3xl text-amber-200">${subtotal}</span>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-bold mt-1">USD Value NET 15</span>
                </div>
              </div>

            </div>

            {/* SECURE DEDICATED MANUAL TRANSACTION DEPOSIT PORTAL GATE */}
            <div className="rounded-sm border border-white/10 bg-[#070707] p-6 space-y-6">
              
              <div>
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-amber-400" />
                  <span>Choose Direct Settlement Route</span>
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed mt-1">
                  We process direct transfers natively via Clear Bank Swift, bKash (Bangladesh), TRC20 USDT, and Solana USDC. Select a routing channel below to access the payment details.
                </p>
              </div>

              {/* Selection Grids */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {gateways.map((gate) => (
                  <button
                    key={gate.code}
                    onClick={() => { setSelectedGateway(gate.code); setIsLogged(false); setTrxId(''); }}
                    className={`p-3 rounded-sm border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                      selectedGateway === gate.code
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="text-lg">{gate.icon}</span>
                    <div className="text-left">
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-white leading-none">{gate.name.split(' ')[0]}</span>
                      <span className="block text-[7px] text-zinc-550 font-mono uppercase tracking-widest mt-1 font-bold">{gate.region.split(' ')[0]}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Gateway Information Sheet */}
              {activeGateway && (
                <div className="p-4 rounded border border-white/5 bg-white/[0.01] space-y-4 animate-fadeIn">
                  
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest font-bold">
                      Direct Coordinates &mdash; {activeGateway.name}
                    </span>
                    <button
                      onClick={handleCopyCoords}
                      className="font-mono text-[8px] uppercase tracking-widest border border-white/10 hover:border-amber-500/40 bg-zinc-950 hover:bg-amber-500 hover:text-white px-2 py-1 rounded transition-colors cursor-pointer font-bold"
                    >
                      {copiedCoords ? 'Copied Coordinates' : 'Copy Values'}
                    </button>
                  </div>

                  {/* Lines of values to pay */}
                  <div className="space-y-2 text-xs font-mono">
                    {activeGateway.details.map((dt, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:justify-between border-b border-white/[0.03] py-1.5 gap-1">
                        <span className="text-zinc-500 uppercase text-[9px] tracking-wider font-bold shrink-0">{dt.label}:</span>
                        <span className="text-white text-[10px] sm:text-right select-all font-bold tracking-normal">{dt.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[2026-06-15] text-[10px] text-zinc-500 leading-relaxed font-sans">
                    {activeGateway.description}
                  </p>

                  {/* Manual Handshake verification form */}
                  {!isLogged ? (
                    <form onSubmit={handleLockAndSettle} className="space-y-3.5 border-t border-white/5 pt-4">
                      <span className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold">
                        Acknowledge and Register Deposit Hash
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] uppercase text-zinc-500 tracking-widest font-bold mb-1">
                            Deposit Reference / Bank TX# / TrxID *
                          </label>
                          <input
                            type="text"
                            required
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value)}
                            placeholder="e.g. bKash TxID 8JKN94O2"
                            className="w-full rounded-sm border border-white/5 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:border-amber-500/50 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] uppercase text-zinc-500 tracking-widest font-bold mb-1">
                            Additional Verification Memo
                          </label>
                          <input
                            type="text"
                            value={userMemo}
                            onChange={(e) => setUserMemo(e.target.value)}
                            placeholder="e.g. Sent 50% deposit via USDT TRC20"
                            className="w-full rounded-sm border border-white/5 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:border-amber-500/50 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!trxId}
                        className="w-full rounded-sm bg-orange-600 hover:bg-orange-500 text-white font-display text-[10px] font-bold uppercase tracking-widest py-3 text-center transition-colors cursor-pointer disabled:opacity-40"
                      >
                        File Transfer Reference onto Browser Audit Trail
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded border border-emerald-500/20 bg-emerald-500/[0.03] space-y-3 text-center animate-fadeIn">
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto animate-bounce" />
                      <h4 className="font-display font-medium text-xs uppercase tracking-wider text-white">
                        Direct Deposit Traced & Cached!
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-sans leading-relaxed max-w-md mx-auto">
                        Your direct invoice settlement parameter has been registered on-site with local tracer Ref ID: <span className="font-mono text-white select-all font-bold">{trxId}</span>. Please trigger the contract submit buttons below to sync this metadata with Haradhan.
                      </p>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);
                          handleDownloadInvoiceRecord({
                            invoiceNumber,
                            clientName,
                            clientEmail,
                            title: invoiceTitle,
                            schedule: paymentSchedule,
                            valuation: subtotal,
                            lineItems,
                            datacenter: selectedDc ? `${selectedDc.name} (${selectedDc.region})` : 'Default Hub',
                            gateway: selectedGateway,
                            trxId,
                            memo: userMemo,
                            certifiedDate: todayDate
                          });
                        }}
                        className="inline-flex items-center space-x-1.5 p-1.5 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/25 px-3 rounded-sm font-mono text-[9px] uppercase tracking-wider font-bold text-emerald-300 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5 shrink-0" />
                        <span>Save Audit JSON Invoice Receipt</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* TRANSMISSION PORTAL TO SEND RECEIPT TO ME */}
            <div className="space-y-4 pt-1 border-t border-white/5">
              <div>
                <h4 className="font-display text-[10.5px] uppercase font-bold tracking-widest text-zinc-550">
                  Transmit Generated Bill Metadata & Reference Details
                </h4>
                <p className="text-zinc-600 text-[11px] leading-relaxed">
                  Send this compiled layout with your logged clearing transaction codes directly to Haradhan. This syncs up his central ledger for immediate manual reconciliation, taking less than 2 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="submission-channels-wrapper">
                <a
                  href={whatsappString}
                  className="flex items-center justify-center space-x-2.5 rounded bg-emerald-600 hover:bg-emerald-500 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-600/10 transition-all text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  <span>WhatsApp Settlement Report</span>
                </a>

                <a
                  href={mailtoString}
                  className="flex items-center justify-center space-x-2.5 rounded bg-white hover:bg-amber-500 text-zinc-950 hover:text-white px-5 py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg transition-all text-center duration-300"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>Email Compliant Bill Copy</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyInvoiceRef}
                className="w-full rounded border border-white/5 bg-white/[0.01] hover:border-amber-500/40 p-3 text-[10.5px] uppercase tracking-widest font-bold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Clipboard className="h-4 w-4 text-amber-500" />
                <span>{copiedRef ? 'Summary Text Copied!' : 'Copy Itemized text Summary to clipboard'}</span>
              </button>
            </div>

          </div>

          {/* FAQ & Quick Actions Columns */}
          <div className="space-y-6 text-xs text-zinc-400">
            
            <div className="rounded-sm border border-white/5 bg-white/[0.02] p-5 space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">Invoice Information</span>
              
              <div className="space-y-2 pb-3 border-b border-white/5">
                <span className="block text-zinc-500 uppercase text-[8px] font-mono tracking-wider font-bold">VALUATION:</span>
                <span className="text-2xl font-serif italic text-amber-200 block">${subtotal} USD</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Ref ID:</span>
                  <span className="font-mono text-white font-semibold">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-550">Agreement:</span>
                  <span className="text-white text-right max-w-[120px] truncate" title={paymentSchedule}>{paymentSchedule}</span>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-dashed border-white/10 p-5 space-y-3 leading-relaxed">
              <div className="flex items-center space-x-1.5 text-amber-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <h5 className="font-display font-semibold">Self-Reconciling Protocol</h5>
              </div>
              <p className="text-[10px] text-zinc-500 font-sans">
                Direct invoicing bypasses standard marketplace structures to minimize cost margins. Haradhan uses safe manually verified clearing paths. All contracts come with signed source delivery templates, guaranteed.
              </p>
            </div>

            <button
              onClick={() => { setStep(1); setIsLogged(false); }}
              className="w-full text-center py-2 border border-white/5 hover:border-amber-500/20 rounded bg-[#0a0a0a] hover:bg-white/[0.03] text-zinc-300 font-mono text-[9.5px] uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              Back to Invoicing Composer
            </button>

          </div>

        </div>
      )}

      {/* PERSISTENT REAL-TIME OFFLINE LEDGER HISTORY & SEARCH ATTACHMENT */}
      <div className="mt-16 border-t border-white/5 pt-12 space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <History className="h-5 w-5 text-amber-500 shrink-0" />
              <span>Offline Ledger History Trace</span>
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              Your local browser safely caches transactions filed on this site for direct self-reconciliation.
            </p>
          </div>

          {/* Search strip block */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Filter Ledger details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded bg-white/[0.01] border border-white/5 pl-9 pr-4 py-2 font-mono text-[10px] text-white placeholder-zinc-700 focus:border-amber-500/50 focus:outline-none"
            />
          </div>
        </div>

        {filteredInvoices.length === 0 ? (
          <div className="rounded border border-dashed border-white/5 p-12 text-center text-zinc-550 space-y-2">
            <Receipt className="h-7 w-7 mx-auto text-zinc-805 opacity-50" />
            <p className="text-xs font-sans">
              No direct payments cached matching filters. Go compile / register reference hashes to log receipt nodes.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded border border-white/5" id="direct-ledgers-table-wrapper">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.01] font-mono text-[9.5px] uppercase tracking-widest text-[#606060] font-bold">
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Statement Title / SOW</th>
                  <th className="p-4">Billing Company</th>
                  <th className="p-4">Deposit Hub / bKash</th>
                  <th className="p-4">Valuation</th>
                  <th className="p-4 text-center">Receipt JSON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-zinc-350">
                {filteredInvoices.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors leading-normal" id={`direct-inv-row-${inv.invoiceNumber}`}>
                    <td className="p-4">
                      <span className="font-mono font-bold text-amber-500 block">{inv.invoiceNumber}</span>
                      <span className="block text-[9.5px] text-zinc-650 mt-1 font-mono">{inv.issueDate} &bull; {inv.timestamp || '08:00 AM'}</span>
                    </td>
                    <td className="p-4 font-semibold text-zinc-300">
                      {inv.serviceTitle}
                      <div className="flex flex-col gap-0.5 mt-1">
                        <span className="block text-[9px] text-[#808080] font-mono uppercase tracking-wider">{inv.billingType || 'custom direct'}</span>
                        {inv.datacenterName && (
                          <span className="block text-[8.5px] text-amber-500/80 font-mono uppercase font-bold">🌐 Host: {inv.datacenterName} ({inv.datacenterRegion})</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="block text-white font-medium">{inv.clientName}</span>
                      <span className="block text-[10px] text-zinc-600 font-mono mt-0.5">{inv.email}</span>
                    </td>
                    <td className="p-4 font-mono text-[10px]">
                      <span className="text-amber-500/80 font-bold uppercase block text-[9.5px]">{inv.gateway}</span>
                      <span className="block text-zinc-550 text-[9.5px] font-bold truncate mt-1 max-w-[150px]" title={inv.trxId}>Ref Hash: {inv.trxId}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-serif italic text-sm text-amber-200 font-bold block">${inv.amount} USD</span>
                      <span className="inline-block mt-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Awaiting Verification
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDownloadInvoiceRecord(inv)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 border border-white/5 hover:border-amber-500/20 bg-zinc-950/20 hover:bg-[#121212] transition-colors rounded-sm font-mono text-[9px] uppercase tracking-wider font-bold text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
      </>
      ) : (
        /* CRM WORKSPACE & GOOGLE SHEETS INTERACTIVE SETUP */
        <div className="space-y-8 animate-fadeIn" id="crm-sheets-workspace">
          
          {(!googleUser || !isUserAdmin) ? (
            <div className="rounded-sm border border-white/5 bg-[#0a0a0a] p-8 text-center max-w-sm mx-auto space-y-6 my-12 shadow-2xl">
              <div className="mx-auto h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-medium text-sm lg:text-base text-white">Administrator Access Required</h3>
                <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                  The Google Sheets CRM contains private client records and transaction logs. Please sign in as the authorized administrator to unlock access.
                </p>
              </div>

              {googleUser && !isUserAdmin && (
                <div className="p-3.5 bg-rose-500/5 border border-rose-500/10 rounded font-mono text-[10px] text-rose-400 leading-normal text-left">
                  <span className="text-[#808080]">Current email:</span> <span className="font-bold text-white break-all">{googleUser.email}</span>
                  <div className="mt-1.5 text-zinc-500 text-[9px] leading-snug">Only authorized administrators are allowed to access this registry (Authorized: <span className="text-amber-300 font-bold">{ADMIN_EMAILS.join(', ')}</span>).</div>
                </div>
              )}

              <div className="pt-2 flex flex-col items-center justify-center">
                {!googleUser ? (
                  <button
                    onClick={handleConnectSheets}
                    disabled={isAuthLoading}
                    type="button"
                    className="gsi-material-button mx-auto text-xs font-bold"
                  >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                      <div className="gsi-material-button-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                      </div>
                      <span className="gsi-material-button-contents text-zinc-950 font-bold uppercase tracking-wider text-[9px] font-mono">Sign in with Google</span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={handleDisconnectSheets}
                    className="inline-flex justify-center items-center space-x-1.5 px-4.5 py-2.5 border border-white/5 hover:border-zinc-300 bg-white/5 hover:bg-white/10 text-white rounded-sm font-mono text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5 text-rose-450" />
                    <span>Use Admin Account</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Main Integration Setup Card */}
          <div className="rounded-sm border border-white/5 bg-[#0a0a0a] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-white flex items-center space-x-2">
                  <Database className="h-5 w-5 text-orange-500 animate-pulse" />
                  <span>Google Sheets CRM Integration Hub</span>
                </h2>
                <p className="text-zinc-500 text-xs mt-1">
                  Connect your Google Sheets spreadsheet to act as an offline-first high-fidelity Leads & billing CRM database.
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <span className={`h-2.5 w-2.5 rounded-full ${googleToken ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-zinc-400">
                  {googleToken ? 'Connected' : 'Offline Mode'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Connection & Account Controls */}
              <div className="space-y-4">
                <h3 className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider font-bold">1. Google Authorization</h3>
                
                {googleUser ? (
                  <div className="rounded-sm border border-white/5 bg-white/[0.01] p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      {googleUser.photoURL ? (
                        <img src={googleUser.photoURL} alt="Google Avatar" className="h-9 w-9 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono flex items-center justify-center font-bold text-xs">
                          {googleUser.displayName?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <h4 className="font-display font-medium text-xs text-white leading-none">{googleUser.displayName || 'Authorized User'}</h4>
                        <p className="font-mono text-[9.5px] text-zinc-555 mt-1">{googleUser.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleDisconnectSheets}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-white/5 hover:border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 hover:text-white rounded-sm font-mono text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Disconnect Workspace</span>
                    </button>
                  </div>
                ) : (
                  <div className="rounded-sm border border-white/5 bg-white/[0.01] p-5 text-center space-y-4">
                    <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                      Connect your Google Account with Spreadsheet permissions to bind this site to your secure Sheets.
                    </p>
                    
                    <button
                      onClick={handleConnectSheets}
                      disabled={isAuthLoading}
                      type="button"
                      className="gsi-material-button mx-auto text-xs font-bold"
                    >
                      <div className="gsi-material-button-state"></div>
                      <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          </svg>
                        </div>
                        <span className="gsi-material-button-contents text-zinc-950 font-bold uppercase tracking-wider text-[9px] font-mono">Sign in with Google Sheets</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Spreadsheet Bind & Master Sync Controls */}
              <div className="space-y-4">
                <h3 className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider font-bold">2. CRM Spreadsheet Link</h3>
                
                <div className="rounded-sm border border-white/5 bg-white/[0.01] p-4 space-y-4">
                  {crmSpreadsheetId ? (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="block text-[8px] font-mono text-[#808080] uppercase tracking-widest font-bold">Connected CRM Spreadsheet ID</span>
                        <div className="flex items-center space-x-1.5 font-mono text-[9px] bg-black/40 border border-white/5 p-2 rounded text-zinc-400 uppercase select-all truncate">
                          <span>{crmSpreadsheetId}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        <a
                          href={`https://docs.google.com/spreadsheets/d/${crmSpreadsheetId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-2 border border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-white rounded-sm font-mono text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Launch Spreadsheet</span>
                        </a>

                        <button
                          onClick={handleCreateCRMSheet}
                          disabled={!googleToken || isSyncingLeads}
                          type="button"
                          className="inline-flex items-center space-x-1 px-3 py-2 border border-white/5 bg-[#141414] hover:bg-[#1a1a1a] hover:border-white/10 text-zinc-400 hover:text-white rounded-sm font-mono text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <span>Re-Create Sheet CRM</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 space-y-3">
                      <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                        No CRM Spreadsheet bound. Automatically generate a spreadsheet containing Leads, Bookings, and Invoices sheets.
                      </p>
                      
                      <button
                        onClick={handleCreateCRMSheet}
                        disabled={!googleToken || isSyncingLeads}
                        type="button"
                        className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-sm bg-white hover:bg-amber-500 hover:text-white text-zinc-950 font-mono text-[9px] uppercase tracking-widest font-bold shadow-xl transition-all cursor-pointer disabled:opacity-35 disabled:bg-zinc-800 disabled:text-zinc-650 disabled:pointer-events-none"
                      >
                        {isSyncingLeads ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                        <span>Initialize Google Sheet CRM Setup</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sync Hub Execution Banner */}
            {googleToken && crmSpreadsheetId && (
              <div className="border-t border-white/5 pt-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="font-display font-semibold text-xs text-white">Consolidated Sync Actions</h4>
                  <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
                    This logs all local storage data ({crmLeads.length} leads, {crmBookings.length} bookings, {pastInvoices.length} invoices) into their respective worksheets on your Google Sheet.
                  </p>
                </div>

                <div className="flex items-center space-x-3.5">
                  <button
                    onClick={handlePushSync}
                    disabled={isSyncingLeads || isSyncingBookings || isSyncingInvoices}
                    type="button"
                    className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-sm bg-orange-500 text-white hover:bg-orange-600 font-mono text-[10px] uppercase tracking-widest font-bold shadow-xl cursor-pointer transition-colors duration-300 disabled:opacity-40"
                  >
                    {isSyncingLeads || isSyncingBookings || isSyncingInvoices ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3.5 w-3.5" />
                    )}
                    <span>Push Sync to Sheet CRM</span>
                  </button>

                  {syncTriggered && (
                    <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider animate-fadeIn">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>Sync Successful!</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error notifications */}
            {sheetsError && (
              <div className="rounded-sm border border-rose-500/10 bg-rose-500/5 p-3.5 flex items-start space-x-3 text-xs text-rose-400">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-mono font-bold uppercase text-[9px] tracking-wider">Sheets Synchronization Warning</span>
                  <p className="font-sans text-[11px] leading-relaxed mt-1 text-zinc-400">{sheetsError}</p>
                </div>
              </div>
            )}

          </div>

          {/* CRM Leads and Bookings Local Explorer Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Leads Column */}
            <div className="rounded-sm border border-white/5 bg-[#0a0a0a] p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-orange-400" />
                  <span>Collected Warm Leads ({crmLeads.length})</span>
                </h3>
              </div>

              {crmLeads.length === 0 ? (
                <div className="py-12 border border-dashed border-white/5 text-center text-zinc-550 text-xs font-sans rounded-sm">
                  No leads compiled on client contact form yet.
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {crmLeads.map((lead, idx) => (
                    <div key={idx} className="rounded-sm border border-white/5 bg-white/[0.01] p-3.5 space-y-2.5 relative group hover:border-orange-500/25 transition-colors">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="absolute right-3.5 top-3.5 text-zinc-650 hover:text-rose-500 rounded p-1 transition-colors hover:bg-white/[0.02] cursor-pointer"
                        title="Purge lead from cache"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <div className="pr-6 space-y-1">
                        <span className="font-mono text-[8px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{lead.id}</span>
                        <h4 className="font-display font-bold text-xs text-white">{lead.name}</h4>
                        <span className="block text-[10px] text-zinc-500 font-mono">{lead.email}</span>
                      </div>

                      <div className="border-t border-white/5 pt-2 space-y-1.5">
                        <p className="text-[10px] text-zinc-400 italic font-sans break-words leading-relaxed">
                          "{lead.message}"
                        </p>
                        <div className="flex justify-between items-center font-mono text-[8.5px] text-zinc-600">
                          <span>Via: {lead.source || 'Direct Website Form'}</span>
                          <span>{lead.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bookings Column */}
            <div className="rounded-sm border border-white/5 bg-[#0a0a0a] p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <span>Sovereign Scheduled Bookings ({crmBookings.length})</span>
                </h3>
              </div>

              {crmBookings.length === 0 ? (
                <div className="py-12 border border-dashed border-white/5 text-center text-zinc-550 text-xs font-sans rounded-sm">
                  No consultations booked via calendar scheduler yet.
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {crmBookings.map((b, idx) => (
                    <div key={idx} className="rounded-sm border border-white/5 bg-white/[0.01] p-3.5 space-y-2.5 relative group hover:border-orange-500/25 transition-colors">
                      <button
                        onClick={() => handleDeleteBooking(b.bookingId)}
                        className="absolute right-3.5 top-3.5 text-zinc-650 hover:text-rose-500 rounded p-1 transition-colors hover:bg-white/[0.02] cursor-pointer"
                        title="Purge booking from cache"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <div className="pr-6 space-y-1">
                        <span className="font-mono text-[8px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{b.bookingId}</span>
                        <h4 className="font-display font-bold text-xs text-white">{b.clientName}</h4>
                        <span className="block text-[10px] text-zinc-500 font-mono">{b.clientEmail}</span>
                      </div>

                      <div className="border-t border-white/5 pt-2 space-y-1.5">
                        <div className="flex items-center space-x-2 font-mono text-[9px] text-[#ffaa00] font-bold uppercase tracking-wider">
                          <span>📅 {b.date}</span>
                          <span>⏰ {b.time} (UTC)</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 italic font-sans break-words leading-relaxed">
                          Brief: "{b.details}"
                        </p>
                        <div className="flex justify-between items-center font-mono text-[8.5px] text-zinc-600">
                          <span>Channel: {b.location || 'Meet Session'}</span>
                          <span>Scheduled On: {b.created ? new Date(b.created).toLocaleDateString() : 'Pending'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          </>
          )}
        </div>
      )}

    </div>
  );
}
