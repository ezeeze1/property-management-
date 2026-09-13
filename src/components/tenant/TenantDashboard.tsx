import React, { useState } from 'react';
import {
  User,
  Property,
  Tenancy,
  Payment,
  Receipt,
  MaintenanceRequest,
  TenancyDocument,
  Notification,
  SystemSettings
} from '../../types';
import {
  Building2,
  Clock,
  Calendar,
  DollarSign,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Send,
  Wrench,
  FileText,
  Bell,
  User as UserIcon,
  ShieldCheck,
  Download,
  Eye,
  PlusCircle,
  MessageSquare,
  Upload,
  ChevronRight,
  Info
} from 'lucide-react';

interface TenantDashboardProps {
  currentUser: User;
  properties: Property[];
  tenancies: Tenancy[];
  payments: Payment[];
  receipts: Receipt[];
  maintenanceRequests: MaintenanceRequest[];
  documents: TenancyDocument[];
  notifications: Notification[];
  settings: SystemSettings;
  onSubmitPayment: (payment: Omit<Payment, 'id' | 'status' | 'createdAt'>) => void;
  onSubmitMaintenance: (maint: Omit<MaintenanceRequest, 'id' | 'status' | 'dateReported'>) => void;
  onViewReceipt: (receipt: Receipt) => void;
  onMarkNotificationRead: (id: string) => void;
  onUpdateProfile: (updatedUser: Partial<User>) => void;
}

export const TenantDashboard: React.FC<TenantDashboardProps> = ({
  currentUser,
  properties,
  tenancies,
  payments,
  receipts,
  maintenanceRequests,
  documents,
  notifications,
  settings,
  onSubmitPayment,
  onSubmitMaintenance,
  onViewReceipt,
  onMarkNotificationRead,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pay' | 'receipts' | 'maintenance' | 'documents' | 'notifications' | 'profile'>('overview');
  const [copiedBank, setCopiedBank] = useState(false);

  // Forms
  const [paymentForm, setPaymentForm] = useState({
    amount: 0,
    paymentMethod: 'Bank Transfer' as const,
    reference: '',
    bankUsed: 'Guaranty Trust Bank',
    paymentDate: new Date().toISOString().split('T')[0],
    description: 'Rent renewal payment',
    receiptProofUrl: ''
  });
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const [maintForm, setMaintForm] = useState({
    roomLocation: '',
    category: 'Plumbing' as any,
    priority: 'Medium' as any,
    description: '',
    photoUrl: ''
  });
  const [maintSubmitted, setMaintSubmitted] = useState(false);

  // User's assigned property & tenancy
  const safeProperties = properties || [];
  const safeTenancies = tenancies || [];
  const tenantProperty = safeProperties.find(p => p.id === currentUser.propertyId) || safeProperties[0];
  const tenantTenancy = safeTenancies.find(t => t.tenantId === currentUser.id) || {
    id: 'tenancy-default',
    tenantId: currentUser.id,
    propertyId: tenantProperty?.id || 'prop-1',
    rentAmount: tenantProperty?.price || 6500000,
    startDate: '2025-10-25',
    expiryDate: '2026-10-25',
    renewalDate: '2026-10-25',
    depositPaid: tenantProperty?.price || 6500000,
    status: 'Due Soon' as const,
    gracePeriodDays: 7,
    outstandingBalance: 0
  };

  // Calculate Days Remaining
  const expiryDateObj = new Date(tenantTenancy.expiryDate);
  const todayObj = new Date();
  const diffTime = expiryDateObj.getTime() - todayObj.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const tenantPayments = (payments || []).filter(p => p.tenantId === currentUser.id);
  const tenantReceipts = (receipts || []).filter(r => r.tenantId === currentUser.id);
  const tenantMaintenance = (maintenanceRequests || []).filter(m => m.tenantId === currentUser.id);
  const tenantDocuments = (documents || []).filter(d => d.tenantId === currentUser.id || d.tenantId === 'all');
  const tenantNotifications = (notifications || []).filter(n => n.userId === currentUser.id);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(settings.bankDetails.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitPayment({
      tenantId: currentUser.id,
      tenantName: currentUser.name,
      propertyId: tenantProperty.id,
      propertyTitle: tenantProperty.title,
      amount: paymentForm.amount || tenantTenancy.rentAmount,
      paymentMethod: paymentForm.paymentMethod,
      reference: paymentForm.reference || `TRX-SSL-${Date.now().toString().slice(-6)}`,
      bankUsed: paymentForm.bankUsed,
      paymentDate: paymentForm.paymentDate,
      description: paymentForm.description,
      receiptProofUrl: paymentForm.receiptProofUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
    });
    setPaymentSubmitted(true);
  };

  const handleMaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitMaintenance({
      tenantId: currentUser.id,
      tenantName: currentUser.name,
      propertyId: tenantProperty.id,
      propertyTitle: tenantProperty.title,
      roomLocation: maintForm.roomLocation || 'Living Room',
      category: maintForm.category,
      priority: maintForm.priority,
      description: maintForm.description,
      photoUrl: maintForm.photoUrl
    });
    setMaintSubmitted(true);
    setMaintForm({ roomLocation: '', category: 'Plumbing', priority: 'Medium', description: '', photoUrl: '' });
  };

  const formattedRent = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(tenantTenancy.rentAmount);

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      
      {/* Top Banner Header */}
      <div className="bg-slate-950 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>SAMSON & SON LTD. • Official Tenant Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Property Unit: <span className="text-slate-200 font-medium">{tenantProperty.title}</span> ({tenantProperty.location})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('pay')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <DollarSign className="w-4 h-4" /> Pay Rent Renewal
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Wrench className="w-4 h-4 text-amber-400" /> Report Maintenance
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-800 gap-2 pb-2 text-xs font-semibold no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Status', icon: <Building2 className="w-4 h-4" /> },
            { id: 'pay', label: 'Pay Rent (Bank Transfer)', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'receipts', label: 'Rent Receipts', icon: <FileText className="w-4 h-4" /> },
            { id: 'maintenance', label: 'Maintenance Portal', icon: <Wrench className="w-4 h-4" /> },
            { id: 'documents', label: 'Tenancy Documents', icon: <Download className="w-4 h-4" /> },
            { id: 'notifications', label: `Notifications (${tenantNotifications.filter(n => !n.isRead).length})`, icon: <Bell className="w-4 h-4" /> },
            { id: 'profile', label: 'Profile Settings', icon: <UserIcon className="w-4 h-4" /> }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* PROMINENT RENT RENEWAL COUNTDOWN WIDGET */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-6 sm:p-8 text-slate-950 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 bg-slate-950/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-slate-950 border border-slate-950/30">
                    <Clock className="w-4 h-4" /> Rent Renewal Monitoring Engine
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-950 tracking-tight">
                    Rent expires in {daysRemaining} days
                  </h2>
                  
                  <p className="text-sm font-semibold text-slate-950/80 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Next Renewal Date: <span className="underline font-bold">{new Date(tenantTenancy.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </p>
                </div>

                <div className="bg-slate-950 text-white p-5 rounded-2xl border border-amber-400/30 shadow-xl space-y-3 shrink-0 max-w-xs w-full">
                  <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">Annual Rent Amount</div>
                  <div className="text-2xl font-extrabold font-serif text-white">{formattedRent}</div>
                  
                  <button
                    onClick={() => setActiveTab('pay')}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <DollarSign className="w-4 h-4" /> Renew Tenancy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-1">
                <div className="text-xs text-slate-400 font-semibold uppercase">Current Property</div>
                <div className="text-base font-bold text-white line-clamp-1">{tenantProperty.title}</div>
                <div className="text-[11px] text-amber-400">{tenantProperty.location}</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-1">
                <div className="text-xs text-slate-400 font-semibold uppercase">Payment Status</div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    tenantTenancy.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : tenantTenancy.status === 'Due Soon'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {tenantTenancy.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Grace Period: {tenantTenancy.gracePeriodDays} Days</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-1">
                <div className="text-xs text-slate-400 font-semibold uppercase">Outstanding Balance</div>
                <div className="text-xl font-extrabold text-white font-serif">₦{tenantTenancy.outstandingBalance.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400">Zero Overdue Rent</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-1">
                <div className="text-xs text-slate-400 font-semibold uppercase">Open Maintenance</div>
                <div className="text-xl font-extrabold text-amber-400 font-serif">
                  {tenantMaintenance.filter(m => m.status !== 'Closed' && m.status !== 'Resolved').length} Active
                </div>
                <div className="text-[11px] text-slate-400">24/7 Facility Response</div>
              </div>
            </div>

            {/* Recent Payment & Maintenance Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Payment Submissions */}
              <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <h3 className="font-bold font-serif text-white text-base">Recent Rent Submissions</h3>
                  <button onClick={() => setActiveTab('pay')} className="text-xs text-amber-400 font-semibold hover:underline">
                    + Pay Rent
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {tenantPayments.length === 0 ? (
                    <div className="text-slate-400 text-center py-4">No recent payment records</div>
                  ) : (
                    tenantPayments.map(p => (
                      <div key={p.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700/80 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white">₦{p.amount.toLocaleString()}</div>
                          <div className="text-slate-400 text-[11px]">{p.paymentDate} • Ref: {p.reference}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          p.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : p.status === 'Pending Verification'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Maintenance Tracker */}
              <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <h3 className="font-bold font-serif text-white text-base">Active Maintenance Requests</h3>
                  <button onClick={() => setActiveTab('maintenance')} className="text-xs text-amber-400 font-semibold hover:underline">
                    + Report Issue
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {tenantMaintenance.length === 0 ? (
                    <div className="text-slate-400 text-center py-4">No active maintenance requests</div>
                  ) : (
                    tenantMaintenance.map(m => (
                      <div key={m.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700/80 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-white">{m.category}</span>
                            <span className="text-[10px] text-slate-400 ml-2">({m.roomLocation})</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                            {m.status}
                          </span>
                        </div>
                        <p className="text-slate-400 line-clamp-1">{m.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PAY RENT TAB */}
        {activeTab === 'pay' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Official SAMSON & SON LTD Bank Details */}
            <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                  Verified Corporate Bank Account
                </div>
                <h3 className="text-xl font-bold font-serif text-white">Direct Bank Transfer Details</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Transfer rent payments directly to SAMSON & SON LTD official rent collection account.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Bank Name</div>
                  <div className="text-base font-bold text-white">{settings.bankDetails.bankName}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Account Name</div>
                  <div className="text-sm font-bold text-amber-400">{settings.bankDetails.accountName}</div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Account Number</div>
                    <div className="text-2xl font-mono font-extrabold text-white tracking-widest">
                      {settings.bankDetails.accountNumber}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyAccount}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    {copiedBank ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedBank ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> Transfer Narration Instructions:
                </div>
                <p className="text-[11px] leading-relaxed">
                  {settings.bankDetails.paymentInstructions} (Example narration: <span className="font-mono text-white">"John Doe - Penthouse 4B"</span>).
                </p>
              </div>
            </div>

            {/* Payment Proof Submission Form */}
            <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Submit Transfer Verification Form</h3>
                <p className="text-xs text-slate-400 mt-1">
                  After completing your bank transfer, submit your transaction details below for accountant verification and receipt generation.
                </p>
              </div>

              {paymentSubmitted ? (
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-4">
                  <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Payment Submission Received!</h4>
                  <div className="inline-block bg-amber-500/10 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/30">
                    Status: Pending Verification
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you! Your bank transfer details have been dispatched to our financial team. Once verified, your status will update to <span className="text-emerald-400 font-bold">Confirmed</span> and your official receipt will be issued.
                  </p>
                  <button
                    onClick={() => setPaymentSubmitted(false)}
                    className="bg-slate-800 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    Submit Another Payment
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Amount Paid (₦) *</label>
                      <input
                        type="number"
                        required
                        value={paymentForm.amount || tenantTenancy.rentAmount}
                        onChange={e => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Payment Date *</label>
                      <input
                        type="date"
                        required
                        value={paymentForm.paymentDate}
                        onChange={e => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Bank Used *</label>
                      <input
                        type="text"
                        required
                        value={paymentForm.bankUsed}
                        onChange={e => setPaymentForm({ ...paymentForm, bankUsed: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                        placeholder="e.g. GTBank, Zenith, Access"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Transaction Ref / Session ID *</label>
                      <input
                        type="text"
                        required
                        value={paymentForm.reference}
                        onChange={e => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                        placeholder="TRX-1092837465"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Payment Description</label>
                    <input
                      type="text"
                      value={paymentForm.description}
                      onChange={e => setPaymentForm({ ...paymentForm, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Optional Receipt Screenshot URL / Attachment</label>
                    <input
                      type="text"
                      value={paymentForm.receiptProofUrl}
                      onChange={e => setPaymentForm({ ...paymentForm, receiptProofUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="https://..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <Send className="w-4 h-4" /> Submit Payment Verification
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

        {/* RECEIPTS TAB */}
        {activeTab === 'receipts' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">Official Rent Receipts</h3>

            <div className="space-y-4">
              {tenantReceipts.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs bg-slate-900 rounded-xl border border-slate-700">
                  No confirmed receipts generated yet. Receipts appear automatically once bank transfers are verified.
                </div>
              ) : (
                tenantReceipts.map(rec => (
                  <div key={rec.id} className="bg-slate-900 border border-slate-700 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-amber-400 font-mono">{rec.receiptNumber}</div>
                      <div className="text-sm font-bold text-white">{rec.propertyTitle}</div>
                      <div className="text-xs text-slate-400">
                        Amount Paid: <span className="text-emerald-400 font-bold">₦{rec.amountPaid.toLocaleString()}</span> • Paid on {rec.paymentDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewReceipt(rec)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                      >
                        <Eye className="w-4 h-4" /> View & Print Receipt
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MAINTENANCE TAB */}
        {activeTab === 'maintenance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Create Maintenance Request */}
            <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold font-serif text-white">Report Maintenance Issue</h3>

              {maintSubmitted && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Request Logged Successfully!
                </div>
              )}

              <form onSubmit={handleMaintSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Issue Category *</label>
                  <select
                    value={maintForm.category}
                    onChange={e => setMaintForm({ ...maintForm, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Water">Water Treatment / Pump</option>
                    <option value="Security">Security / Smart Locks</option>
                    <option value="Air Conditioning">Air Conditioning (HVAC)</option>
                    <option value="Generator/Power">Generator / Power ATS</option>
                    <option value="Roofing">Roofing / Ceiling</option>
                    <option value="Structural">Structural Wall / Paint</option>
                    <option value="Other">Other Facility Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority Level *</label>
                  <select
                    value={maintForm.priority}
                    onChange={e => setMaintForm({ ...maintForm, priority: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="Low">Low - Routine</option>
                    <option value="Medium">Medium - Standard</option>
                    <option value="High">High - Urgent</option>
                    <option value="Emergency">Emergency - Immediate Action</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Room / Location inside Property</label>
                  <input
                    type="text"
                    required
                    value={maintForm.roomLocation}
                    onChange={e => setMaintForm({ ...maintForm, roomLocation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                    placeholder="e.g. Master Bedroom AC Unit"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Detailed Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={maintForm.description}
                    onChange={e => setMaintForm({ ...maintForm, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                    placeholder="Describe the issue..."
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Photo Attachment URL</label>
                  <input
                    type="text"
                    value={maintForm.photoUrl}
                    onChange={e => setMaintForm({ ...maintForm, photoUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                    placeholder="https://..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Wrench className="w-4 h-4" /> Submit Maintenance Request
                </button>
              </form>
            </div>

            {/* Request Tracker List */}
            <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold font-serif text-white">Track Maintenance Progress</h3>

              <div className="space-y-4 text-xs">
                {tenantMaintenance.map(req => (
                  <div key={req.id} className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white text-sm">{req.category}</div>
                        <div className="text-slate-400">{req.roomLocation} • Reported: {req.dateReported}</div>
                      </div>
                      <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-bold uppercase text-[10px]">
                        {req.status}
                      </span>
                    </div>

                    {/* Progress Bar Workflow */}
                    <div className="pt-2">
                      <div className="text-[10px] text-slate-400 mb-1 flex justify-between font-semibold">
                        <span>Submitted</span>
                        <span>Assigned</span>
                        <span>In Progress</span>
                        <span>Resolved</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full transition-all duration-500"
                          style={{
                            width:
                              req.status === 'Submitted' ? '25%' :
                              req.status === 'Assigned' ? '50%' :
                              req.status === 'In Progress' ? '75%' : '100%'
                          }}
                        />
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed pt-1">{req.description}</p>

                    {req.comments && req.comments.length > 0 && (
                      <div className="pt-2 border-t border-slate-800 space-y-1">
                        <div className="text-[10px] text-amber-400 font-bold">Activity Updates:</div>
                        {req.comments.map((c, idx) => (
                          <div key={idx} className="bg-slate-900 p-2 rounded text-[11px] text-slate-300">
                            <span className="font-bold text-white">{c.author} ({c.role}):</span> {c.comment}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">Tenancy Document Vault</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {tenantDocuments.map(doc => (
                <div key={doc.id} className="bg-slate-900 border border-slate-700 p-5 rounded-xl flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-400" /> {doc.title}
                    </div>
                    <div className="text-slate-400">Category: {doc.category} • {doc.uploadDate}</div>
                  </div>

                  <button
                    onClick={() => alert(`Opening secure document view: ${doc.title}`)}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">Notification Log</h3>

            <div className="space-y-3 text-xs">
              {tenantNotifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => onMarkNotificationRead(n.id)}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                    !n.isRead
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-sm text-white">{n.title}</div>
                    <span className="text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-slate-300">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl max-w-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">Profile & Contact Information</h3>

            <form
              onSubmit={e => {
                e.preventDefault();
                alert('Profile updated successfully!');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                  onChange={e => onUpdateProfile({ name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full bg-slate-950/60 border border-slate-800 text-slate-500 rounded-xl px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={currentUser.phone}
                    onChange={e => onUpdateProfile({ phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Emergency Contact</label>
                <input
                  type="text"
                  defaultValue={currentUser.emergencyContact || 'Mary Doe (+234 813 999 0022)'}
                  onChange={e => onUpdateProfile({ emergencyContact: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-xs"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
