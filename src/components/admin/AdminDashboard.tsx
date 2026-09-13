import React, { useState } from 'react';
import {
  User,
  Property,
  Tenancy,
  Payment,
  Receipt,
  MaintenanceRequest,
  SystemSettings,
  AuditLog
} from '../../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  LayoutDashboard,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  PlusCircle,
  FileText,
  ShieldCheck,
  Wrench,
  Search,
  Settings,
  ListFilter,
  Eye,
  Trash2,
  Edit3,
  Send,
  AlertTriangle,
  History,
  Copy,
  Lock
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  properties: Property[];
  tenancies: Tenancy[];
  payments: Payment[];
  receipts: Receipt[];
  maintenanceRequests: MaintenanceRequest[];
  auditLogs: AuditLog[];
  settings: SystemSettings;
  users: User[];
  onVerifyPayment: (paymentId: string) => void;
  onRejectPayment: (paymentId: string, reason: string) => void;
  onAddProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  onUpdatePropertyStatus: (propertyId: string, status: Property['status']) => void;
  onDeleteProperty: (propertyId: string) => void;
  onUpdateMaintenanceStatus: (requestId: string, status: MaintenanceRequest['status'], comment?: string) => void;
  onUpdateSettings: (newSettings: SystemSettings) => void;
  onViewReceipt: (receipt: Receipt) => void;
  onSendReminder: (tenancyId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  properties,
  tenancies,
  payments,
  receipts,
  maintenanceRequests,
  auditLogs,
  settings,
  users,
  onVerifyPayment,
  onRejectPayment,
  onAddProperty,
  onUpdatePropertyStatus,
  onDeleteProperty,
  onUpdateMaintenanceStatus,
  onUpdateSettings,
  onViewReceipt,
  onSendReminder
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'payments' | 'properties' | 'tenancies' | 'landlords' | 'maintenance' | 'audit' | 'settings'>('overview');
  
  // Property Creation Modal State
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [newProp, setNewProp] = useState({
    title: '',
    location: 'Victoria Island, Lagos',
    price: 5000000,
    period: 'annual' as const,
    type: 'Apartment' as const,
    purpose: 'Rent' as const,
    bedrooms: 3,
    bathrooms: 3,
    shortDescription: '',
    description: '',
    amenitiesStr: '24/7 Security, Standby Generator, Swimming Pool, Parking',
    status: 'Available' as const,
    furnishedStatus: 'Furnished' as const,
    agencyFeePercent: 10,
    legalFeePercent: 5,
    cautionFee: 500000,
    termsAndConditions: 'Standard 1-year residential tenancy lease. Refundable caution deposit on exit inspection.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
  });

  // Recharts Chart Data
  const revenueChartData = [
    { month: 'Jan', collected: 12500000, target: 15000000 },
    { month: 'Feb', collected: 18000000, target: 15000000 },
    { month: 'Mar', collected: 14200000, target: 15000000 },
    { month: 'Apr', collected: 21000000, target: 20000000 },
    { month: 'May', collected: 16500000, target: 20000000 },
    { month: 'Jun', collected: 25000000, target: 22000000 }
  ];

  const safeProperties = properties || [];
  const safePayments = payments || [];
  const safeTenancies = tenancies || [];
  const safeMaintenanceRequests = maintenanceRequests || [];

  const occupancyChartData = [
    { name: 'Available', value: safeProperties.filter(p => p.status === 'Available').length },
    { name: 'Occupied', value: safeProperties.filter(p => p.status === 'Occupied').length },
    { name: 'Under Maintenance', value: safeProperties.filter(p => p.status === 'Maintenance').length }
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  const pendingPayments = safePayments.filter(p => p.status === 'Pending Verification');
  const confirmedPayments = safePayments.filter(p => p.status === 'Confirmed');

  const totalCollected = confirmedPayments.reduce((acc, p) => acc + p.amount, 0);
  const totalExpected = safeTenancies.reduce((acc, t) => acc + t.rentAmount, 0);
  const totalOutstanding = safeTenancies.reduce((acc, t) => acc + t.outstandingBalance, 0);

  const handleCreatePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProperty({
      title: newProp.title,
      location: newProp.location,
      price: newProp.price,
      period: newProp.period,
      type: newProp.type,
      purpose: newProp.purpose,
      bedrooms: newProp.bedrooms,
      bathrooms: newProp.bathrooms,
      shortDescription: newProp.shortDescription || newProp.title,
      description: newProp.description || newProp.title,
      amenities: newProp.amenitiesStr.split(',').map(s => s.trim()),
      images: [newProp.imageUrl],
      status: newProp.status,
      furnishedStatus: newProp.furnishedStatus,
      agencyFeePercent: newProp.agencyFeePercent,
      legalFeePercent: newProp.legalFeePercent,
      cautionFee: newProp.cautionFee,
      termsAndConditions: newProp.termsAndConditions
    });
    setShowAddPropertyModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>SAMSON & SON LTD. • Corporate Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              Management & Accounting Suite
            </h1>
            <p className="text-xs text-slate-400">
              Authorized User: <span className="text-amber-400 font-bold">{currentUser.name}</span> ({currentUser.role.toUpperCase()})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddPropertyModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Add New Property Listing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-800 gap-2 pb-2 text-xs font-semibold no-scrollbar">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'payments', label: `Pending Payments (${pendingPayments.length})`, icon: <DollarSign className="w-4 h-4" /> },
            { id: 'properties', label: `Properties (${properties.length})`, icon: <Building2 className="w-4 h-4" /> },
            { id: 'tenancies', label: `Tenancies (${tenancies.length})`, icon: <Users className="w-4 h-4" /> },
            { id: 'maintenance', label: `Maintenance (${maintenanceRequests.length})`, icon: <Wrench className="w-4 h-4" /> },
            { id: 'audit', label: 'Audit Trail Logs', icon: <History className="w-4 h-4" /> },
            { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setAdminTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                adminTab === t.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            
            {/* High Level Financial Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-1 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Total Rent Collections</div>
                <div className="text-2xl font-extrabold text-amber-400 font-serif">₦{totalCollected.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400">Verified Direct Bank Transfers</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-1 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Pending Verifications</div>
                <div className="text-2xl font-extrabold text-amber-400 font-serif">{pendingPayments.length} Payments</div>
                <div className="text-[11px] text-amber-300">Requires Accountant Sign-off</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-1 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Occupancy Rate</div>
                <div className="text-2xl font-extrabold text-white font-serif">
                  {Math.round((safeProperties.filter(p => p.status === 'Occupied').length / (safeProperties.length || 1)) * 100)}%
                </div>
                <div className="text-[11px] text-slate-400">{safeProperties.filter(p => p.status === 'Occupied').length} of {safeProperties.length} Units Occupied</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-1 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Active Maintenance</div>
                <div className="text-2xl font-extrabold text-red-400 font-serif">
                  {safeMaintenanceRequests.filter(m => m.status !== 'Closed' && m.status !== 'Resolved').length} Open
                </div>
                <div className="text-[11px] text-slate-400">Field Engineers Dispatched</div>
              </div>
            </div>

            {/* Visual Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold font-serif text-white">Monthly Rent Collection Trends (₦)</h3>
                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                        formatter={(val: number) => [`₦${val.toLocaleString()}`, 'Amount']}
                      />
                      <Bar dataKey="collected" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold font-serif text-white">Portfolio Occupancy Breakdown</h3>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={occupancyChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {occupancyChartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-around text-xs pt-2 border-t border-slate-800">
                  <span className="text-emerald-400">Available: {safeProperties.filter(p => p.status === 'Available').length}</span>
                  <span className="text-amber-400">Occupied: {safeProperties.filter(p => p.status === 'Occupied').length}</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PENDING BANK TRANSFER VERIFICATION */}
        {adminTab === 'payments' && (
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <div>
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                Mandatory Accounting Verification Workflow
              </div>
              <h3 className="text-xl font-bold font-serif text-white">Pending Bank Transfer Queue</h3>
              <p className="text-xs text-slate-400 mt-1">
                All bank transfers require manual verification by an authorized administrator/accountant prior to receipt generation.
              </p>
            </div>

            {pendingPayments.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs bg-slate-950 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                No pending payments requiring verification.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingPayments.map(p => (
                  <div key={p.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400 font-mono">Ref: {p.reference}</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2.5 py-0.5 rounded-full uppercase">
                          Pending Verification
                        </span>
                      </div>
                      <div className="text-base font-bold text-white">{p.tenantName}</div>
                      <div className="text-xs text-slate-400">
                        Property: <span className="text-white font-semibold">{p.propertyTitle}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Bank Used: <span className="text-white">{p.bankUsed}</span> • Date: {p.paymentDate}
                      </div>
                    </div>

                    <div className="text-left lg:text-right space-y-2 shrink-0">
                      <div className="text-xs text-slate-400 uppercase font-semibold">Amount Transferred</div>
                      <div className="text-2xl font-extrabold text-amber-400 font-serif">
                        ₦{p.amount.toLocaleString()}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => onVerifyPayment(p.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Verify & Issue Receipt
                        </button>
                        <button
                          onClick={() => onRejectPayment(p.id, 'Bank transfer unverified or incorrect reference.')}
                          className="bg-red-600/80 hover:bg-red-600 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Confirmed Payments Table */}
            <div className="pt-8 border-t border-slate-800 space-y-4">
              <h4 className="text-base font-bold font-serif text-white">Confirmed Payments History</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Reference</th>
                      <th className="p-3">Tenant Name</th>
                      <th className="p-3">Property</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {confirmedPayments.map(p => {
                      const matchedReceipt = receipts.find(r => r.paymentId === p.id);
                      return (
                        <tr key={p.id} className="hover:bg-slate-950/50">
                          <td className="p-3 font-mono text-amber-400">{p.reference}</td>
                          <td className="p-3 font-bold text-white">{p.tenantName}</td>
                          <td className="p-3">{p.propertyTitle}</td>
                          <td className="p-3 font-bold text-emerald-400">₦{p.amount.toLocaleString()}</td>
                          <td className="p-3">{p.paymentDate}</td>
                          <td className="p-3">
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase">
                              Confirmed
                            </span>
                          </td>
                          <td className="p-3">
                            {matchedReceipt && (
                              <button
                                onClick={() => onViewReceipt(matchedReceipt)}
                                className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                              >
                                <Eye className="w-3.5 h-3.5" /> View Receipt
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PROPERTIES MANAGEMENT */}
        {adminTab === 'properties' && (
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Corporate Property Inventory</h3>
                <p className="text-xs text-slate-400">Manage listings, edit status, and review amenities.</p>
              </div>

              <button
                onClick={() => setShowAddPropertyModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4" /> Add Property
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(p => (
                <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative h-48">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        p.status === 'Available' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-amber-400'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-xs text-amber-400 font-semibold">{p.type} • {p.location}</div>
                      <h4 className="text-sm font-bold text-white font-serif line-clamp-1">{p.title}</h4>
                      <div className="text-lg font-extrabold text-amber-400 font-serif">
                        ₦{p.price.toLocaleString()} / year
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs mt-2">
                    <select
                      value={p.status}
                      onChange={e => onUpdatePropertyStatus(p.id, e.target.value as any)}
                      className="bg-slate-900 text-xs border border-slate-700 text-white rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>

                    <button
                      onClick={() => onDeleteProperty(p.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-slate-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TENANCIES */}
        {adminTab === 'tenancies' && (
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">Tenancy Leases & Renewal Engine</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Tenant Name</th>
                    <th className="p-3">Rent Amount</th>
                    <th className="p-3">Expiry Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tenancies.map(t => {
                    const matchedUser = users.find(u => u.id === t.tenantId);
                    return (
                      <tr key={t.id} className="hover:bg-slate-950/50">
                        <td className="p-3 font-bold text-white">{matchedUser?.name || t.tenantId}</td>
                        <td className="p-3 font-bold text-amber-400">₦{t.rentAmount.toLocaleString()}</td>
                        <td className="p-3">{t.expiryDate}</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            t.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onSendReminder(t.id)}
                            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-1"
                          >
                            <Send className="w-3.5 h-3.5" /> Dispatch Renewal Notice
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: MAINTENANCE DISPATCHER */}
        {adminTab === 'maintenance' && (
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">Facility Maintenance Dispatcher</h3>

            <div className="space-y-4 text-xs">
              {maintenanceRequests.map(m => (
                <div key={m.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{m.category}</span>
                      <span className="bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                        {m.priority}
                      </span>
                    </div>
                    <div className="text-slate-400">Tenant: <span className="text-white font-semibold">{m.tenantName}</span> • Property: {m.propertyTitle} ({m.roomLocation})</div>
                    <p className="text-slate-300 pt-1">{m.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={m.status}
                      onChange={e => onUpdateMaintenanceStatus(m.id, e.target.value as any)}
                      className="bg-slate-900 text-xs border border-slate-700 text-white rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Assigned">Assigned (Engr. Dispatched)</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT TRAIL LOGS */}
        {adminTab === 'audit' && (
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">System Audit Trail Logs</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-950/50">
                      <td className="p-3 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-3 font-bold text-white">{log.userName}</td>
                      <td className="p-3 text-amber-400 font-semibold">{log.action}</td>
                      <td className="p-3 text-slate-300">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: SYSTEM SETTINGS */}
        {adminTab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-3xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">System Configuration & Bank Details</h3>

            <form
              onSubmit={e => {
                e.preventDefault();
                alert('System settings updated successfully!');
              }}
              className="space-y-4 text-xs"
            >
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="font-bold text-amber-400 uppercase text-[11px]">Corporate Bank Account (Public to Tenants)</div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Bank Name</label>
                  <input
                    type="text"
                    value={settings.bankDetails.bankName}
                    onChange={e => onUpdateSettings({ ...settings, bankDetails: { ...settings.bankDetails, bankName: e.target.value } })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Account Name</label>
                  <input
                    type="text"
                    value={settings.bankDetails.accountName}
                    onChange={e => onUpdateSettings({ ...settings, bankDetails: { ...settings.bankDetails, accountName: e.target.value } })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Account Number</label>
                  <input
                    type="text"
                    value={settings.bankDetails.accountNumber}
                    onChange={e => onUpdateSettings({ ...settings, bankDetails: { ...settings.bankDetails, accountNumber: e.target.value } })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="font-bold text-amber-400 uppercase text-[11px]">SMS & Email Provider API Integration</div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="font-bold text-white">Termii / Twilio SMS Provider</div>
                    <div className="text-[10px] text-slate-400">Environment key: TERMII_SMS_API_KEY</div>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full text-[10px]">
                    READY (LIVE API ENV)
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs"
              >
                Save System Configuration
              </button>
            </form>
          </div>
        )}

      </div>

      {/* ADD PROPERTY MODAL */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 p-6 sm:p-8 rounded-2xl max-w-2xl w-full text-white space-y-4 my-8">
            <h3 className="text-xl font-bold font-serif text-white">Add New Property Listing</h3>

            <form onSubmit={handleCreatePropertySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={newProp.title}
                  onChange={e => setNewProp({ ...newProp, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  placeholder="e.g. Sovereign Heights 4 Bed Detached Duplex"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location *</label>
                  <select
                    value={newProp.location}
                    onChange={e => setNewProp({ ...newProp, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="Victoria Island, Lagos">Victoria Island, Lagos</option>
                    <option value="Lekki Phase 1, Lagos">Lekki Phase 1, Lagos</option>
                    <option value="Ikoyi, Lagos">Ikoyi, Lagos</option>
                    <option value="Ikeja GRA, Lagos">Ikeja GRA, Lagos</option>
                    <option value="Maitama, Abuja">Maitama, Abuja</option>
                    <option value="Port Harcourt">Port Harcourt, Rivers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₦ / year) *</label>
                  <input
                    type="number"
                    required
                    value={newProp.price}
                    onChange={e => setNewProp({ ...newProp, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Property Type</label>
                  <select
                    value={newProp.type}
                    onChange={e => setNewProp({ ...newProp, type: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Detached Duplex">Detached Duplex</option>
                    <option value="Terrace">Terrace Duplex</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial Office">Commercial Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={newProp.bedrooms}
                    onChange={e => setNewProp({ ...newProp, bedrooms: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={newProp.bathrooms}
                    onChange={e => setNewProp({ ...newProp, bathrooms: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProp.imageUrl}
                  onChange={e => setNewProp({ ...newProp, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="w-1/2 bg-slate-800 text-slate-300 font-bold py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
                >
                  Create Property Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
