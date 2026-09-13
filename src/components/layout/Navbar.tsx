import React, { useState } from 'react';
import { User, Notification, SystemSettings } from '../../types';
import {
  Building2,
  ShieldCheck,
  Phone,
  MessageSquare,
  Bell,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  settings: SystemSettings;
  notifications?: Notification[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth?: () => void;
  onLoginClick?: () => void;
  onSelectRole?: (roleId: string) => void;
  onRoleSwitch?: (roleId: string) => void;
  onLogout?: () => void;
  onLogoutClick?: () => void;
  onMarkNotificationRead?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  settings,
  notifications = [],
  activeTab,
  setActiveTab,
  onOpenAuth,
  onLoginClick,
  onSelectRole,
  onRoleSwitch,
  onLogout,
  onLogoutClick,
  onMarkNotificationRead
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const handleOpenAuth = onOpenAuth || onLoginClick || (() => {});
  const handleSelectRole = onSelectRole || onRoleSwitch || (() => {});
  const handleLogoutAction = onLogout || onLogoutClick || (() => {});

  const safeNotifications = notifications || [];
  const userNotifications = currentUser
    ? safeNotifications.filter(n => n.userId === currentUser.id || currentUser.role === 'super_admin')
    : [];
  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const formattedWhatsApp = settings.whatsAppNumber.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> RC-1092837 Registered Property Managers
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-amber-400" /> {settings.phone}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Demo Login Selector */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 text-amber-400 hover:text-amber-300 px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-500/30 transition-all"
              >
                <KeyRound className="w-3 h-3" />
                <span>Demo Switch Role</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-800 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                    Switch User Account
                  </div>
                  <button
                    onClick={() => { handleSelectRole('usr-tenant-1'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <div>
                      <div className="font-medium text-amber-400">John Doe</div>
                      <div className="text-[10px] text-slate-400">Tenant (Penthouse 4B)</div>
                    </div>
                    {currentUser?.id === 'usr-tenant-1' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => { handleSelectRole('usr-admin-1'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <div>
                      <div className="font-medium text-amber-400">Chief Samson</div>
                      <div className="text-[10px] text-slate-400">Super Admin</div>
                    </div>
                    {currentUser?.id === 'usr-admin-1' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => { handleSelectRole('usr-landlord-1'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <div>
                      <div className="font-medium text-amber-400">Alhaji Bello</div>
                      <div className="text-[10px] text-slate-400">Landlord / Owner</div>
                    </div>
                    {currentUser?.id === 'usr-landlord-1' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => { handleSelectRole('usr-agent-1'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <div>
                      <div className="font-medium text-amber-400">Chidi Nwosu</div>
                      <div className="text-[10px] text-slate-400">Property Agent</div>
                    </div>
                    {currentUser?.id === 'usr-agent-1' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              )}
            </div>

            <a
              href={`https://wa.me/${formattedWhatsApp}?text=Hello%20SAMSON%20%26%20SON%20LTD%2C%20I%20would%20like%20to%20make%20a%20property%20enquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-md text-xs font-semibold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-serif">
              SAMSON & SON <span className="text-amber-400 text-xs font-sans font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">LTD.</span>
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide uppercase">
              Property Management Services
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {[
            { id: 'home', label: 'Home' },
            { id: 'properties', label: 'Properties' },
            { id: 'services', label: 'Services' },
            { id: 'about', label: 'About Us' },
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'faq', label: 'FAQ' },
            { id: 'contact', label: 'Contact' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors py-1 ${
                activeTab === item.id
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA / Portal Access */}
        <div className="hidden sm:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {/* Notification Icon */}
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full relative transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-slate-800 font-semibold text-slate-200 flex justify-between items-center">
                      <span>Notifications</span>
                      <span className="text-[10px] text-amber-400 font-mono">{unreadCount} unread</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/50">
                      {userNotifications.length === 0 ? (
                        <div className="p-4 text-center text-slate-400">No notifications</div>
                      ) : (
                        userNotifications.slice(0, 5).map(n => (
                          <div
                            key={n.id}
                            onClick={() => onMarkNotificationRead?.(n.id)}
                            className={`p-3 cursor-pointer hover:bg-slate-800 transition-colors ${
                              !n.isRead ? 'bg-amber-500/5 border-l-2 border-amber-400' : ''
                            }`}
                          >
                            <div className="font-semibold text-slate-200">{n.title}</div>
                            <div className="text-slate-400 mt-0.5 line-clamp-2">{n.message}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{new Date(n.createdAt).toLocaleDateString()}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Portal Button based on Role */}
              <button
                onClick={() => {
                  if (currentUser.role === 'tenant') handleNavClick('tenant-portal');
                  else handleNavClick('admin-portal');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>
                  {currentUser.role === 'tenant' ? 'Tenant Portal' : 'Management Portal'}
                </span>
              </button>

              <button
                onClick={handleLogoutAction}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-red-400 bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenAuth}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>Tenant Login / Portal</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {currentUser && (
            <button
              onClick={() => {
                if (currentUser.role === 'tenant') handleNavClick('tenant-portal');
                else handleNavClick('admin-portal');
              }}
              className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-md text-xs font-bold"
            >
              Portal
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 font-medium">
            {[
              { id: 'home', label: 'Home' },
              { id: 'properties', label: 'Properties' },
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'About Us' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' },
              ...(currentUser
                ? [
                    {
                      id: currentUser.role === 'tenant' ? 'tenant-portal' : 'admin-portal',
                      label: currentUser.role === 'tenant' ? 'Tenant Portal' : 'Admin Portal'
                    }
                  ]
                : [])
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm ${
                  activeTab === item.id
                    ? 'bg-amber-500/10 text-amber-400 font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => { setMobileMenuOpen(false); handleOpenAuth(); }}
                className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-lg text-center text-sm"
              >
                Portal Login
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogoutAction(); }}
                className="w-full bg-slate-800 text-red-400 font-semibold py-2 rounded-lg text-center text-sm flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
