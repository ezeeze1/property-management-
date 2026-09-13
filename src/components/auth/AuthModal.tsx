import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { X, Lock, Mail, User as UserIcon, Phone, MapPin, KeyRound, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AuthModalProps {
  users: User[];
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ users, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('tenant@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Registration fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('tenant');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      onLoginSuccess(found);
    } else {
      setError('Invalid credentials. Please select one of the pre-configured demo accounts below.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) {
      setError('Please fill all required fields');
      return;
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: regName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      role: regRole,
      createdAt: new Date().toISOString()
    };
    onLoginSuccess(newUser);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  const handleQuickRoleSelect = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      onLoginSuccess(found);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            {mode === 'login' && 'SAMSON & SON Portal Access'}
            {mode === 'register' && 'Tenant Account Registration'}
            {mode === 'forgot' && 'Reset Portal Password'}
          </h2>
          <p className="text-xs text-slate-400">
            Secure, role-authorized tenancy and management portal
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1-Click Quick Role Switcher */}
        <div className="mb-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5" /> Quick Demo Role Switcher
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            <button
              onClick={() => handleQuickRoleSelect('usr-tenant-1')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2 rounded-lg text-left"
            >
              <div className="font-bold text-amber-300 truncate">John Doe</div>
              <div className="text-[10px] text-slate-400">Tenant (Penthouse)</div>
            </button>
            <button
              onClick={() => handleQuickRoleSelect('usr-admin-1')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2 rounded-lg text-left"
            >
              <div className="font-bold text-amber-300 truncate">Chief Samson</div>
              <div className="text-[10px] text-slate-400">Super Admin</div>
            </button>
            <button
              onClick={() => handleQuickRoleSelect('usr-landlord-1')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2 rounded-lg text-left"
            >
              <div className="font-bold text-amber-300 truncate">Alhaji Bello</div>
              <div className="text-[10px] text-slate-400">Landlord</div>
            </button>
            <button
              onClick={() => handleQuickRoleSelect('usr-accountant-1')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2 rounded-lg text-left"
            >
              <div className="font-bold text-amber-300 truncate">Amina Bello</div>
              <div className="text-[10px] text-slate-400">Accountant</div>
            </button>
            <button
              onClick={() => handleQuickRoleSelect('usr-agent-1')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2 rounded-lg text-left"
            >
              <div className="font-bold text-amber-300 truncate">Chidi Nwosu</div>
              <div className="text-[10px] text-slate-400">Agent</div>
            </button>
            <button
              onClick={() => handleQuickRoleSelect('usr-pm-1')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 p-2 rounded-lg text-left"
            >
              <div className="font-bold text-amber-300 truncate">Engr. Lawal</div>
              <div className="text-[10px] text-slate-400">Property Manager</div>
            </button>
          </div>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="tenant@gmail.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-slate-300 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-amber-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition-colors shadow-lg"
            >
              Log In to Portal
            </button>

            <div className="text-center pt-2">
              <span className="text-slate-400">Don't have an account? </span>
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-amber-400 font-bold hover:underline"
              >
                Register Here
              </button>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={regName}
                onChange={e => setRegName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Chief Babatunde"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="name@domain.ng"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="+234 803 000 0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Address / Property Unit</label>
              <input
                type="text"
                value={regAddress}
                onChange={e => setRegAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Victoria Island, Lagos"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Role</label>
              <select
                value={regRole}
                onChange={e => setRegRole(e.target.value as UserRole)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord / Owner</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition-colors shadow-lg mt-2"
            >
              Create Portal Account
            </button>

            <div className="text-center pt-2">
              <span className="text-slate-400">Already registered? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-amber-400 font-bold hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <div className="space-y-4 text-xs">
            {resetSent ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Reset Instructions Sent!</div>
                <p className="text-slate-400">We have sent password recovery instructions to {email}.</p>
                <button
                  onClick={() => setMode('login')}
                  className="mt-4 text-amber-400 font-bold underline"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <p className="text-slate-400">Enter your registered email address and we will dispatch a secure password reset link.</p>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-center text-slate-400 hover:text-white"
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
