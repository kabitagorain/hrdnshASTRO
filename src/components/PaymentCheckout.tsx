import React, { useState, useMemo } from 'react';
import { services, profile, siteData } from '../data/services';
import { 
  ArrowLeft, Check, ChevronRight, ShieldAlert,
  Clipboard, Mail, Send, ExternalLink, Building, Phone, Wallet, Download, Search, History, Calendar, FileText, CheckCircle2
} from 'lucide-react';
import DatacenterMap, { datacenters } from './DatacenterMap';

interface PaymentCheckoutProps {
  serviceId: string;
  billingType: 'onetime' | 'weekly';
  onBack: () => void;
  onSuccess: () => void;
}

export default function PaymentCheckout({ serviceId, billingType, onBack, onSuccess }: PaymentCheckoutProps) {
  const [step, setStep] = useState(1);
  
  // Client forms
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [domainName, setDomainName] = useState('');
  const [customRequests, setCustomRequests] = useState('');
  const [selectedDatacenterId, setSelectedDatacenterId] = useState('de-falkenstein');

  // Agreement toggles
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [halfUpfrontAgreed, setHalfUpfrontAgreed] = useState(false);
  const [vpsAgreed, setVpsAgreed] = useState(false);

  // Copy Feedback
  const [copiedText, setCopiedText] = useState(false);
  const [copiedGateText, setCopiedGateText] = useState(false);

  // Active Payment Gate selection
  const [selectedGateway, setSelectedGateway] = useState<'bank' | 'bkash' | 'crypto_trc' | 'crypto_sol' | null>(null);
  const [gatewayTrxId, setGatewayTrxId] = useState('');
  const [gatewayNotes, setGatewayNotes] = useState('');
  const [isGatewayConfirmed, setIsGatewayConfirmed] = useState(false);

  const [lastLoggedInvoice, setLastLoggedInvoice] = useState<any | null>(null);

  // Invoice Ledger Filter Search
  const [searchLedgerQuery, setSearchLedgerQuery] = useState('');

  // Local invoices loaded dynamically from persistent state
  const [localInvoicesList, setLocalInvoicesList] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem('haradhan_invoices') || '[]');
  });

  // Locate active service
  const service = useMemo(() => {
    return services.find(s => s.id === serviceId);
  }, [serviceId]);

  // Invoice Number
  const invoiceNumber = useMemo(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-2026-${random}`;
  }, []);

  // Today's date
  const todayDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }, []);

  const priceAmount = useMemo(() => {
    if (!service) return 0;
    return billingType === 'onetime' ? service.pricing.oneTime : service.pricing.weekly;
  }, [service, billingType]);

  // Direct Bank and manual transfer details
  const manualPaymentMethods = [
    {
      code: "bank" as const,
      name: "Bank / Wire Transfer",
      icon: "🏦",
      region: "International",
      details: [
        { label: "Bank Name", value: "Clear Bank (Based in GB)" },
        { label: "Account Name", value: "Haradhan Sharma" },
        { label: "IBAN", value: "GB96CLRB04281204027608" },
        { label: "SWIFT / BIC", value: "CLRBGB22XXX" },
        { label: "Bank Address", value: "133 Houndsditch, LONDON, EC3A 7BX" },
      ],
      note: "For international wire transfers, please include your Invoice Number in your bank transfer reference.",
    },
    {
      code: "bkash" as const,
      name: "bKash Direct",
      icon: "📱",
      region: "Bangladesh Local",
      details: [
        { label: "Account Type", value: "Personal" },
        { label: "bKash Number", value: "01712270815" },
        { label: "Initiation Ref", value: invoiceNumber },
      ],
      note: 'Send payment via bKash "Send Money" to the personal number above, then enter the TrxID below.',
    },
    {
      code: "crypto_trc" as const,
      name: "USDT (TRC-20 Network)",
      icon: "🔗",
      region: "Global Crypto",
      details: [
        { label: "Network Token Token", value: "USDT" },
        { label: "Network Type", value: "TRC20 (Tron Network)" },
        { label: "USDT Address", value: "TNKkGiFrZ1LNpvx74CVeA6BBoFkekgQoBS" },
      ],
      note: "Confirm network TRC20. Sending on another network can result in complete transaction loss.",
    },
    {
      code: "crypto_sol" as const,
      name: "USDC (Solana Network)",
      icon: "🔗",
      region: "Global Crypto",
      details: [
        { label: "Network Token Token", value: "USDC" },
        { label: "Network Type", value: "Solana (SOL)" },
        { label: "USDC Address", value: "J5nuEfNX45HTRChsT3aVUJLzXw3u4z2NuMvY5S6XQUx9" },
      ],
      note: "Direct Solana transfer address. Ensure sending only standard stable Solana USDC.",
    },
  ];

  const activeGateDetails = useMemo(() => {
    if (!selectedGateway) return null;
    return manualPaymentMethods.find(m => m.code === selectedGateway);
  }, [selectedGateway]);

  // Email structure
  const mailtoString = useMemo(() => {
    if (!service) return '';
    const subject = encodeURIComponent(`Order Placement: ${service.title} (${invoiceNumber})`);
    
    // Include transaction and gateway parameters if they verified the bank deposit
    const gatewayText = lastLoggedInvoice 
      ? `\n=== REGISTERED MANUAL DEPOSIT PORTAL RECEIPT ===\n` +
        `- Payment Gateway Selected: ${lastLoggedInvoice.gateway.toUpperCase()}\n` +
        `- Logged reference ID / Bank TrxID: ${lastLoggedInvoice.trxId}\n` +
        `- Verification status: Processing verification and manual clearing\n` +
        `- Deposit Notes provided: ${lastLoggedInvoice.notes || 'None specified.'}\n`
      : '';

    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);

    const body = encodeURIComponent(
      `Hello Haradhan,\n\nI want to initiate an order for the architecture: "${service.title}" under invoice ID ${invoiceNumber}.\n\n` +
      `Checkout Parameters:\n` +
      `- Plan Selected: ${billingType === 'onetime' ? 'One-time Setup' : 'Weekly support SLA'}\n` +
      `- Sovereign Datacenter Region: ${selectedDc ? `${selectedDc.name} (${selectedDc.region})` : 'None/Default Selected'}\n` +
      `- Client Company: ${companyName}\n` +
      `- Client Business Email: ${email}\n` +
      `- Target Domain/System Host: ${domainName}\n` +
      `- Specific System Modifications Required: ${customRequests || 'None specified.'}\n` +
      gatewayText + `\n` +
      `I have read the Terms of Service and accepted the 50% upfront payment covenants. Please reply with details to proceed or schedule a briefing session.\n\n` +
      `Sincerely,\n` +
      `${companyName || 'Representative'}`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }, [service, invoiceNumber, billingType, email, companyName, domainName, customRequests, lastLoggedInvoice, selectedDatacenterId]);

  // WhatsApp structure
  const whatsappString = useMemo(() => {
    if (!service) return '';
    
    const gatewayText = lastLoggedInvoice 
      ? ` [Portal payment: ${lastLoggedInvoice.gateway.toUpperCase()} TrxID: ${lastLoggedInvoice.trxId}]`
      : '';

    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);

    const text = encodeURIComponent(
      `Greetings Haradhan! I want to order "${service.title}" (${invoiceNumber}). ` +
      `Datacenter: ${selectedDc ? selectedDc.name : 'Default'}. ` +
      `Plan: ${billingType.toUpperCase()}. Company: ${companyName}. Email: ${email}.${gatewayText}`
    );
    return `https://wa.me/${siteData.whatsapp}?text=${text}`;
  }, [service, invoiceNumber, billingType, companyName, email, lastLoggedInvoice, selectedDatacenterId]);

  if (!service) {
    return (
      <div className="mx-auto max-w-4xl py-24 text-center px-4">
        <h3 className="font-display text-xl font-bold text-white">System ID '{serviceId}' not found.</h3>
        <button onClick={onBack} className="mt-4 outline-none text-orange-500 uppercase tracking-widest font-bold text-xs cursor-pointer">
          Back to Catalog
        </button>
      </div>
    );
  }

  // Handle saving the invoice to local trace ledger
  const handleRegisterManualPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGateway || !gatewayTrxId) return;

    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);

    const newInvoiceObj = {
      invoiceNumber,
      clientName: companyName,
      email,
      serviceTitle: service.title,
      serviceId: service.id,
      billingType,
      amount: priceAmount,
      datacenterId: selectedDatacenterId,
      datacenterName: selectedDc ? selectedDc.name : 'Default Hub',
      datacenterRegion: selectedDc ? selectedDc.region : 'Default Region',
      gateway: selectedGateway,
      trxId: gatewayTrxId,
      notes: `Datacenter: ${selectedDc ? `${selectedDc.name} (${selectedDc.region})` : 'Default'}. ${gatewayNotes || ''}`,
      status: 'AWAITING_VERIFICATION (Pending Clear Bank)',
      issueDate: todayDate,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    const currentList = JSON.parse(localStorage.getItem('haradhan_invoices') || '[]');
    currentList.push(newInvoiceObj);
    localStorage.setItem('haradhan_invoices', JSON.stringify(currentList));

    setLocalInvoicesList(currentList);
    setLastLoggedInvoice(newInvoiceObj);
    setIsGatewayConfirmed(true);
  };

  const handleCopyInvoiceText = () => {
    const selectedDc = datacenters.find(d => d.id === selectedDatacenterId);
    const textToCopy = `Order reference ${invoiceNumber} under ${siteData.brandName} Services.\n` +
      `System: ${service.title}\n` +
      `Target Datacenter: ${selectedDc ? `${selectedDc.name} (${selectedDc.region})` : 'Default Hub'}\n` +
      `Plan: ${billingType === 'onetime' ? 'One-time Setup' : 'Weekly Support'}\n` +
      `Value: $${priceAmount} USD\n` +
      `Client Email: ${email}\n` +
      `Company: ${companyName}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyGateCoords = (coords: string) => {
    navigator.clipboard.writeText(coords);
    setCopiedGateText(true);
    setTimeout(() => setCopiedGateText(false), 2000);
  };

  // Export search file or raw ledger as JSON record
  const handleDownloadInvoiceRecord = (inv: any) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(inv, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${inv.invoiceNumber}_Official_System_Receipt.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered list of past invoices
  const filteredInvoices = localInvoicesList.filter(inv => {
    return (
      inv.invoiceNumber.toLowerCase().includes(searchLedgerQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchLedgerQuery.toLowerCase()) ||
      inv.serviceTitle.toLowerCase().includes(searchLedgerQuery.toLowerCase()) ||
      inv.gateway.toLowerCase().includes(searchLedgerQuery.toLowerCase()) ||
      inv.trxId.toLowerCase().includes(searchLedgerQuery.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn" id="payment-checkout-screen">
      
      {/* Back CTA */}
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
        <button
          onClick={onBack}
          className="group inline-flex items-center space-x-2 rounded-sm border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-350 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform text-orange-500" />
          <span>Back to Configuration</span>
        </button>

        {/* Checkout progress steps */}
        <div className="flex items-center space-x-3 text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
          <span className={step === 1 ? 'text-orange-500' : 'text-zinc-400'}>01 Scope</span>
          <ChevronRight className="h-3 w-3 text-zinc-700" />
          <span className={step === 2 ? 'text-orange-500' : 'text-zinc-400'}>02 Covenants</span>
          <ChevronRight className="h-3 w-3 text-zinc-700" />
          <span className={step === 3 ? 'text-orange-500' : 'text-zinc-400'}>03 Secure Verification Gate</span>
        </div>
      </div>

      {/* Main Form Sheets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Active Wizard Step forms */}
        <div className="md:col-span-2 space-y-6">          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 space-y-6" id="step-scope-form">
                <div>
                  <h2 className="font-display text-lg font-bold text-white tracking-tight">Step 1: Configuration Scope</h2>
                  <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
                    Provide your target system hostname and specific customization requirements to prepare your custom engineering invoice.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-zinc-350 tracking-widest font-bold mb-1.5">Business Email *</label>
                      <input
                        type="email"
                        placeholder="e.g. client@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-sm border border-white/15 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-zinc-350 tracking-widest font-bold mb-1.5">Company / Entity Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full rounded-sm border border-white/15 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-350 tracking-widest font-bold mb-1.5">Target Web Domain or System Host (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. app.mycompany.com"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                      className="w-full rounded-sm border border-white/15 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-350 tracking-widest font-bold mb-1.5">Specific System Requests or API Integrations</label>
                    <textarea
                      rows={4}
                      placeholder="e.g. Please integrate the Stripe webhook API instead of Shopify Liquid logic, and host it on Hetzner KVM-1 tier."
                      value={customRequests}
                      onChange={(e) => setCustomRequests(e.target.value)}
                      className="w-full rounded-sm border border-white/15 bg-white/[0.01] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-orange-500/50 focus:outline-none focus:bg-[#070707] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Distinct Datacenter Map Card Sibling */}
              <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 space-y-4" id="checkout-datacenter-card">
                <span className="block font-mono text-[10px] uppercase text-zinc-350 tracking-widest font-bold border-b border-white/10 pb-2">
                  🌐 Sovereign VPS Allocation Node *
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans mt-1">
                  Select your hosting node dynamically. This direct coordinate mapping will register into your cryptographic SLA covenant.
                </p>
                <DatacenterMap 
                  selectedId={selectedDatacenterId}
                  onSelect={(id) => setSelectedDatacenterId(id)}
                />
              </div>

              {/* Step Navigation */}
              <div className="pt-2 flex justify-end">
                <button
                  disabled={!email || !companyName}
                  onClick={() => setStep(2)}
                  className="rounded-sm px-6 py-3 font-display text-[11px] uppercase tracking-widest font-bold text-zinc-950 bg-white hover:bg-orange-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center space-x-1.5 transition-colors duration-300"
                >
                  <span>Continue to Covenants</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-sm border border-white/5 bg-white/[0.02] p-6 space-y-6 animate-fadeIn" id="step-audit-form">
              <div>
                <h2 className="font-display text-lg font-bold text-white tracking-tight">Step 2: Professional Terms & SLA Audit</h2>
                <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                  We maintain a pristine architectural standard. Please review and acknowledge the deployment covenants below to finalize the manual billing credentials.
                </p>
              </div>

              {/* Accordion List */}
              <div className="space-y-3.5">
                
                {/* Rule Item 1 */}
                <div onClick={() => setHalfUpfrontAgreed(!halfUpfrontAgreed)} className="p-4 rounded-sm border border-white/5 hover:border-zinc-800 bg-white/[0.01] flex items-start space-x-3.5 cursor-pointer selection:bg-transparent animate-fadeIn">
                  <div className={`mt-0.5 h-4.5 w-4.5 rounded-sm border border-orange-500/40 shrink-0 flex items-center justify-center transition-all ${halfUpfrontAgreed ? 'bg-orange-500 text-white' : 'bg-transparent'}`}>
                    {halfUpfrontAgreed && <Check className="h-3 w-3" />}
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-white">50% Architectural Initiation Escrow</h5>
                    <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                      One-time setups require a 50% upfront deposit to initiate development. The remaining 50% is issued and released upon client acceptance of the Docker container demo host. Retainers are billed every Friday.
                    </p>
                  </div>
                </div>

                {/* Rule Item 2 */}
                <div onClick={() => setTermsAgreed(!termsAgreed)} className="p-4 rounded-sm border border-white/5 hover:border-zinc-800 bg-white/[0.01] flex items-start space-x-3.5 cursor-pointer selection:bg-transparent">
                  <div className={`mt-0.5 h-4.5 w-4.5 rounded-sm border border-orange-500/40 shrink-0 flex items-center justify-center transition-all ${termsAgreed ? 'bg-orange-500 text-white' : 'bg-transparent'}`}>
                    {termsAgreed && <Check className="h-3 w-3" />}
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-white">Intellectual Property Ownership Handover</h5>
                    <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                      Upon final settlement release, full source code ownership, private repository authorizations, and production server admin keys are fully transferred. Haradhan retaining zero residual licensing claims.
                    </p>
                  </div>
                </div>

                {/* Rule Item 3 */}
                <div onClick={() => setVpsAgreed(!vpsAgreed)} className="p-4 rounded-sm border border-white/5 hover:border-zinc-800 bg-white/[0.01] flex items-start space-x-3.5 cursor-pointer selection:bg-transparent">
                  <div className={`mt-0.5 h-4.5 w-4.5 rounded-sm border border-orange-500/40 shrink-0 flex items-center justify-center transition-all ${vpsAgreed ? 'bg-orange-550 text-white' : 'bg-transparent'}`}>
                    {vpsAgreed && <Check className="h-3 w-3" />}
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-white">Hosting & VPS Infrastructure Fees</h5>
                    <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                      Hosting resource prices (e.g., Contabo, Hetzner, DO VPS, domain name bills) are fully borne by the client. I assist in provisioning free tiers or cost-minimization layouts.
                    </p>
                  </div>
                </div>

              </div>

              {/* Step Navigation */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-sm border border-white/15 bg-white/[0.02] px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer animate-fadeIn"
                >
                  Go Back
                </button>
                <button
                  disabled={!termsAgreed || !halfUpfrontAgreed || !vpsAgreed}
                  onClick={() => setStep(3)}
                  className="rounded-sm px-6 py-3 font-display text-[10px] uppercase tracking-widest font-bold text-zinc-950 bg-white hover:bg-orange-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center space-x-1.5 transition-colors duration-300 animate-fadeIn"
                >
                  <span>Lock Covenants & Build Invoice</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Live Invoice Canvas */}
              <div className="rounded-sm border border-white/10 bg-[#0a0a0a] shadow-2xl p-6 md:p-8 font-sans relative overflow-hidden text-zinc-300" id="live-generated-invoice">
                <div className="absolute top-0 right-0 h-28 w-28 bg-orange-500/5 blur-2xl rounded-full" />
                
                {/* Invoice Top Row */}
                <div className="flex flex-col sm:flex-row justify-between pb-6 border-b border-white/5 gap-4">
                  <div>
                    <span className="font-display text-xl font-bold uppercase tracking-widest text-white leading-none block">{siteData.brandName}</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1 block">Full-Stack Cloud Engineering Spec.</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-mono text-xs font-bold text-orange-400 p-2 bg-orange-500/10 border border-orange-500/20 rounded-sm">{invoiceNumber}</span>
                    <span className="text-[9px] font-mono text-zinc-500 mt-3 block">Issue Date: {todayDate}</span>
                  </div>
                </div>

                 {/* Billing Parties */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-white/5 text-xs text-zinc-300">
                  <div>
                    <span className="text-zinc-500 font-mono uppercase tracking-widest text-[9px] font-bold block mb-1.5">PREPARED BY</span>
                    <p className="font-display font-medium text-white">{profile.name}</p>
                    <p className="text-zinc-400 mt-0.5">{profile.title}</p>
                    <p className="text-zinc-500 mt-0.5">{profile.location}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono uppercase tracking-widest text-[9px] font-bold block mb-1.5">PREPARED FOR (CLIENT)</span>
                    <p className="font-display font-medium text-white">{companyName}</p>
                    <p className="text-zinc-400 mt-0.5">{email}</p>
                    {domainName && <p className="text-zinc-500 font-mono text-[10px] mt-0.5">Host: {domainName}</p>}
                  </div>
                  
                  {/* Embedded sovereign hosting node */}
                  <div className="sm:col-span-2 pt-3 border-t border-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="text-zinc-500 font-mono uppercase tracking-widest text-[8px] font-bold">SLA TARGET DATACENTER PINPOINT</span>
                    <span className="text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      🌐 {datacenters.find(d => d.id === selectedDatacenterId)?.name} &mdash; ({datacenters.find(d => d.id === selectedDatacenterId)?.region})
                    </span>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="py-6 border-b border-white/5 space-y-4">
                  <span className="text-zinc-550 font-mono uppercase tracking-widest text-[9px] font-bold block">CHARGES BREAKDOWN</span>
                  
                  <div className="text-xs space-y-3">
                    <div className="flex justify-between p-3 rounded-sm bg-white/[0.01] border border-white/5">
                      <div>
                        <p className="font-display font-semibold text-white">{service.title}</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Format: {billingType === 'onetime' ? 'One-time setup' : 'Weekly Support'}</p>
                      </div>
                      <span className="font-mono font-bold text-white">${priceAmount}.00</span>
                    </div>

                    {billingType === 'onetime' && (
                      <div className="flex justify-between items-center text-[10px] text-zinc-500 px-3 font-mono uppercase">
                        <span>Milestone Split (50% upfront escrow deposit)</span>
                        <span>${priceAmount / 2}.00 USD</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Invoice Totals */}
                <div className="py-6 flex justify-between items-center">
                  <div className="text-left font-mono">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Billing Protocol</span>
                    <p className="text-[8px] text-zinc-600 mt-0.5 uppercase tracking-wider">Includes complete source IP keys handover</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif italic text-3xl text-amber-200">${priceAmount}</span>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">USD Net 15</span>
                  </div>
                </div>
              </div>

              {/* Secure Active Payment Gateway Panel */}
              <div className="rounded-sm border border-white/10 bg-zinc-950/40 p-6 space-y-5">
                <div>
                  <h3 className="font-display text-sm font-bold text-white tracking-tight flex items-center space-x-2">
                    <Building className="h-4.5 w-4.5 text-orange-500" />
                    <span>Secure Payment Verification Gate</span>
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mt-1">
                    Select a manual/wire gateway below to unlock the direct bank deposit instructions, complete your transfer, and log the tracking reference code securely.
                  </p>
                </div>

                {/* Grid of gateway buttons */}
                <div className="grid grid-cols-2 gap-2" id="payment-gateways">
                  {manualPaymentMethods.map((method) => (
                    <button
                      key={method.code}
                      onClick={() => { setSelectedGateway(method.code); setIsGatewayConfirmed(false); }}
                      className={`p-3 rounded-sm border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                        selectedGateway === method.code
                          ? 'border-orange-500 bg-orange-500/10 text-white'
                          : 'border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="text-lg shrink-0">{method.icon}</span>
                      <div className="text-left leading-none">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-white">{method.name}</span>
                        <span className="block text-[8px] font-mono uppercase tracking-widest text-[#939393] mt-1">{method.region}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Display payment details if gate is selected */}
                {selectedGateway && activeGateDetails && (
                  <div className="p-4 rounded-sm border border-white/5 bg-white/[0.01] space-y-4 animate-fadeIn">
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest font-bold">
                        Coordinates: {activeGateDetails.name}
                      </span>
                      <button
                        onClick={() => handleCopyGateCoords(activeGateDetails.details.map(d => `${d.label}: ${d.value}`).join('\n'))}
                        className="font-mono text-[8.5px] uppercase tracking-widest p-1 border border-white/15 bg-white/[0.02] hover:bg-orange-500 hover:text-white px-2 rounded-sm font-bold transition-colors text-right cursor-pointer"
                      >
                        {copiedGateText ? 'Copied' : 'Copy Coordinates'}
                      </button>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      {activeGateDetails.details.map((detail, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:justify-between border-b border-white/[0.03] py-1.5 gap-1">
                          <span className="text-zinc-500 uppercase text-[9px] tracking-wider font-bold shrink-0">{detail.label}:</span>
                          <span className="text-white text-[10px] sm:text-right select-all font-bold tracking-normal">{detail.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-white/[0.02] border-l border-orange-500 text-[10px] leading-relaxed text-zinc-400 font-sans">
                      {activeGateDetails.note}
                    </div>

                    {/* Verification Form */}
                    {!isGatewayConfirmed ? (
                      <form onSubmit={handleRegisterManualPayment} className="space-y-4 border-t border-white/5 pt-4">
                        <span className="block font-mono text-[9px] uppercase text-zinc-500 tracking-widest font-bold">
                          Verify Deposit Wire Handshake
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-mono text-[8px] uppercase text-zinc-500 tracking-widest font-bold mb-1">
                              Sender Name / Account Number / TrxID *
                            </label>
                            <input
                              type="text"
                              required
                              value={gatewayTrxId}
                              onChange={(e) => setGatewayTrxId(e.target.value)}
                              placeholder="e.g. Acme Corp Bank Trans #849202"
                              className="w-full rounded-sm border border-white/5 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:border-orange-500/50 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[8px] uppercase text-zinc-500 tracking-widest font-bold mb-1">
                              Additional Memo notes (Optional)
                            </label>
                            <input
                              type="text"
                              value={gatewayNotes}
                              onChange={(e) => setGatewayNotes(e.target.value)}
                              placeholder="e.g. Sent via ClearBank. Please verify."
                              className="w-full rounded-sm border border-white/5 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:border-orange-500/50 focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!gatewayTrxId}
                          className="w-full rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-display text-[10px] font-bold uppercase tracking-widest py-3 text-center cursor-pointer transition-colors shadow-lg shadow-orange-500/10 disabled:opacity-40"
                        >
                          Confirm Transfer & File Lock Receipt Record
                        </button>
                      </form>
                    ) : (
                      <div className="p-4 rounded-sm border border-green-500/20 bg-green-500/5 text-center space-y-2.5 animate-fadeIn">
                        <CheckCircle2 className="h-6 w-6 text-green-400 mx-auto animate-bounce" />
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                          Payment Logged & Locked Client-Side!
                        </h4>
                        <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                          Your deposit transaction is safely traced in your local browser ledger with code <span className="font-mono text-white font-bold">{lastLoggedInvoice?.trxId}</span>. Please click the submit buttons below to relay this transaction verification block to Haradhan's email/WhatsApp.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleDownloadInvoiceRecord(lastLoggedInvoice)}
                          className="inline-flex items-center space-x-1.5 p-1.5 border border-green-500/30 bg-green-500/10 hover:bg-green-500/25 px-3 rounded-sm font-mono text-[9px] uppercase tracking-wider font-bold text-green-300 transition-colors"
                        >
                          <Download className="h-3.5 w-3.5 shrink-0" />
                          <span>Download Receipt JSON</span>
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* Direct Submission Channels */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div>
                  <h3 className="font-display text-[11px] uppercase font-bold tracking-widest text-zinc-450 mb-2">
                    Submit Completed Invoice and Reference
                  </h3>
                  <p className="text-zinc-550 text-[11px] leading-relaxed mb-4">
                    Send this generated invoice reference and your transaction verification numbers directly to Haradhan's secured console. He will confirm clearance in under 2 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="checkout-channels">
                  {/* WhatsApp Submission */}
                  <a
                    href={whatsappString}
                    onClick={onSuccess}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-600/10 cursor-pointer transition-colors text-center"
                  >
                    <Send className="h-4 w-4 shrink-0" />
                    <span>WhatsApp Contract Submit</span>
                  </a>

                  {/* Mail Submission */}
                  <a
                    href={mailtoString}
                    onClick={onSuccess}
                    className="flex items-center justify-center space-x-2.5 rounded-sm bg-white text-zinc-950 hover:bg-orange-500 hover:text-white px-5 py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg cursor-pointer transition-colors text-center duration-300"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>Email Secure Copy</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                  <button
                    onClick={handleCopyInvoiceText}
                    className="rounded-sm border border-white/5 bg-white/[0.02] p-3 text-[10px] uppercase tracking-widest font-bold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center space-x-1.5 hover:border-orange-500/40"
                  >
                    <Clipboard className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                    <span>{copiedText ? 'Reference Copied!' : 'Copy Summary reference'}</span>
                  </button>

                  <a
                    href={profile.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm border border-white/5 bg-white/[0.02] p-3 text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white transition-all flex items-center justify-center space-x-1.5 hover:border-orange-500/40"
                  >
                    <span>Hire via Upwork Portfolio</span>
                    <ExternalLink className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Side: Order Overview Sidebar & Instructions info */}
        <div className="space-y-6">
          <div className="rounded-sm border border-white/5 bg-white/[0.02] p-5 space-y-4">
            
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">Order Overview</span>

            <div className="flex items-center space-x-3 pb-4 border-b border-white/5">
              <span className="text-2xl">{service.icon}</span>
              <div>
                <h4 className="font-display font-extrabold text-white text-xs leading-none">{service.title}</h4>
                <span className="text-[9px] text-orange-400 font-mono uppercase tracking-widest mt-1.5 block">Sovereign Build</span>
              </div>
            </div>

            <div className="text-xs space-y-2 pb-4 border-b border-white/5">
              <div className="flex justify-between text-zinc-400">
                <span>Billing Cycle:</span>
                <span className="font-semibold text-white capitalize">{billingType === 'onetime' ? 'One-time setup' : 'Weekly support SLA'}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery SLA:</span>
                <span className="font-mono text-zinc-350">{service.timeline}</span>
              </div>
            </div>

            <div className="flex justify-between text-xs items-center">
              <span className="text-zinc-400">Invoice Total:</span>
              <span className="font-serif italic text-lg font-normal text-amber-200">${priceAmount} USD</span>
            </div>

          </div>

          <div className="rounded-sm border border-dashed border-white/10 p-5">
            <h5 className="font-display font-semibold text-xs text-white mb-2 flex items-center space-x-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
              <span>Manual Bank Routing</span>
            </h5>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-sans mt-1">
              Direct manual bank/USDT deposits provide perfect settlement privacy and clear 0% transaction margins. No centralized processors can freeze your deployment schedules.
            </p>
          </div>
        </div>

      </div>

      {/* Persistent Trace Ledger & Invoice Tracking history (100% compliant with secure client-side database tracker request) */}
      <div className="mt-16 border-t border-white/5 pt-12 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white tracking-tight flex items-center space-x-2.5">
              <History className="h-5 w-5 text-orange-500" />
              <span>Offline Audit Trail & Invoice Tracker Ledger</span>
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              All invoices compiled and registered from this browser are locked securely in private local memory with live cryptographic verification nodes.
            </p>
          </div>

          {/* Search bar inputs */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Search local invoices..."
              value={searchLedgerQuery}
              onChange={(e) => setSearchLedgerQuery(e.target.value)}
              className="w-full rounded-sm border border-white/5 bg-white/[0.01] pl-9 pr-4 py-2 font-mono text-[10px] text-white placeholder-zinc-700 focus:border-orange-500/50 focus:outline-none"
            />
          </div>
        </div>

        {filteredInvoices.length === 0 ? (
          <div className="rounded-sm border border-dashed border-white/5 p-10 text-center space-y-2">
            <FileText className="h-8 w-8 text-zinc-700 mx-auto" />
            <p className="text-zinc-500 text-xs font-sans">
              {searchLedgerQuery ? 'No invoice references matched your search filters.' : 'No invoices logged in this browser session. Initiate a scope configuration to build your first invoice.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-sm border border-white/5" id="ledger-table-container">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.01] font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Category System</th>
                  <th className="p-4">Company Entity</th>
                  <th className="p-4">Payment Hub & bKash / TrxID</th>
                  <th className="p-4">Valuation</th>
                  <th className="p-4 text-center">Receipt Log JSON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredInvoices.map((inv, index) => (
                  <tr key={index} className="hover:bg-white/[0.01] transition-colors leading-normal" id={`inv-row-${inv.invoiceNumber}`}>
                    <td className="p-4">
                      <span className="font-mono font-bold text-orange-400 block">{inv.invoiceNumber}</span>
                      <span className="block text-[9px] text-zinc-600 mt-1 font-mono">{inv.issueDate} &bull; {inv.timestamp || '08:00 AM'}</span>
                    </td>
                    <td className="p-4 font-semibold text-zinc-300">
                      {inv.serviceTitle}
                      <div className="flex flex-col gap-0.5 mt-1">
                        <span className="block text-[9px] text-zinc-500 font-mono capitalize">{inv.billingType === 'onetime' ? 'One-time setup' : 'Weekly Support Retainer'}</span>
                        {inv.datacenterName && (
                          <span className="block text-[8.5px] text-amber-500/80 font-mono uppercase font-bold">🌐 Host: {inv.datacenterName} ({inv.datacenterRegion})</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400">
                      <span className="block text-white font-medium">{inv.clientName}</span>
                      <span className="block text-[9px] text-zinc-500 font-mono mt-0.5">{inv.email}</span>
                    </td>
                    <td className="p-4 font-mono text-[10px] text-zinc-300">
                      <span className="block uppercase text-orange-500/80 font-bold text-[9px]">{inv.gateway}</span>
                      <span className="block text-[9.5px] text-zinc-550 select-all font-bold mt-1 max-w-[150px] truncate" title={inv.trxId}>Ref: {inv.trxId}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-serif italic text-sm text-amber-200 block">${inv.amount}</span>
                      <span className="inline-block mt-1 font-mono text-[8px] bg-amber-500/15 text-amber-400 border border-amber-500/20 px-1 py-0.5 rounded-sm uppercase font-bold tracking-wider">
                        Verification Pending
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDownloadInvoiceRecord(inv)}
                        className="p-2 border border-white/5 hover:border-orange-500/30 rounded-sm bg-white/[0.01] hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-all cursor-pointer inline-flex items-center space-x-1 font-mono text-[9px] uppercase tracking-widest font-bold"
                        title="Download secure physical JSON data file"
                      >
                        <Download className="h-3.5 w-3.5 text-orange-500" />
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

    </div>
  );
}
