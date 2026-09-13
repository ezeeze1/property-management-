import React, { useState } from 'react';
import { Property, User, Tenancy } from '../../types';
import { X, UserPlus, Building2, Calendar, DollarSign, Mail, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface RegisterTenantModalProps {
  properties: Property[];
  currentUser: User;
  onClose: () => void;
  onRegisterTenant: (data: {
    tenantName: string;
    email: string;
    phone: string;
    propertyId: string;
    rentAmount: number;
    startDate: string;
    expiryDate: string;
    emergencyContact?: string;
  }) => void;
}

export const RegisterTenantModal: React.FC<RegisterTenantModalProps> = ({
  properties,
  currentUser,
  onClose,
  onRegisterTenant
}) => {
  const [tenantName, setTenantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  
  const safeProperties = properties || [];
  const availableProperties = safeProperties.filter(p => p.status === 'Available') || safeProperties;
  
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    availableProperties[0]?.id || safeProperties[0]?.id || ''
  );

  const selectedProp = safeProperties.find(p => p.id === selectedPropertyId);
  const [rentAmount, setRentAmount] = useState<number>(selectedProp ? selectedProp.price : 5000000);

  const todayStr = new Date().toISOString().split('T')[0];
  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
  const nextYearStr = nextYearDate.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [expiryDate, setExpiryDate] = useState(nextYearStr);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePropertyChange = (propId: string) => {
    setSelectedPropertyId(propId);
    const p = safeProperties.find(prop => prop.id === propId);
    if (p) {
      setRentAmount(p.price);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!tenantName || !email || !phone || !selectedPropertyId) {
      setError('Please fill in all required fields (Name, Email, Phone, and Property Assignment).');
      return;
    }

    onRegisterTenant({
      tenantName,
      email,
      phone,
      propertyId: selectedPropertyId,
      rentAmount,
      startDate,
      expiryDate,
      emergencyContact
    });

    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authorized Portal Action • {currentUser.role.toUpperCase()}</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-white">
              Register New Tenant Account
            </h2>
            <p className="text-xs text-slate-400">
              Grant tenant portal access and issue a formal tenancy lease agreement.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs">
            {error}
          </div>
        )}

        {success ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white font-serif">Tenant Account Created!</h3>
            <p className="text-xs text-slate-400">
              {tenantName} has been registered and assigned to {selectedProp?.title}. Account credentials dispatched.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            
            {/* Personal Details */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                1. Tenant Profile Information
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={tenantName}
                  onChange={e => setTenantName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g. Chief Babatunde Adeleke"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="tenant@domain.ng"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="+234 803 000 1122"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Emergency Contact (Optional)</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={e => setEmergencyContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g. Mrs. Mary Adeleke (+234 802 111 2233)"
                />
              </div>
            </div>

            {/* Property & Lease Details */}
            <div className="space-y-3 pt-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                2. Property Assignment & Lease Terms
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Property Unit *</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedPropertyId}
                    onChange={e => handlePropertyChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    {safeProperties.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} — {p.location} ({p.status})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Annual Rent (₦) *</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      required
                      value={rentAmount}
                      onChange={e => setRentAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lease Start *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lease Expiry *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={expiryDate}
                      onChange={e => setExpiryDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Register & Assign Tenant
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
