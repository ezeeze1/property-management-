import React, { useState, useEffect } from 'react';
import {
  User,
  Property,
  Tenancy,
  Payment,
  Receipt,
  MaintenanceRequest,
  TenancyDocument,
  Notification,
  FAQ,
  Testimonial,
  SystemSettings,
  AuditLog
} from './types';
import { api } from './services/api';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Components
import { HeroSection } from './components/public/HeroSection';
import { PropertySearch } from './components/public/PropertySearch';
import { PropertyCard } from './components/public/PropertyCard';
import { PropertyDetailModal } from './components/public/PropertyDetailModal';
import { ServicesSection } from './components/public/ServicesSection';
import { AboutSection } from './components/public/AboutSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { FaqSection } from './components/public/FaqSection';
import { ContactSection } from './components/public/ContactSection';

// Portal Components
import { TenantDashboard } from './components/tenant/TenantDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { ReceiptModal } from './components/common/ReceiptModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'properties' | 'services' | 'about' | 'contact' | 'tenant-portal' | 'admin-portal'>('home');

  // Application State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenancies, setTenancies] = useState<Tenancy[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [documents, setDocuments] = useState<TenancyDocument[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<SystemSettings>({
    companyName: 'SAMSON & SON LTD.',
    address: '14 Marina Road, Victoria Island, Lagos State, Nigeria',
    phone: '+234 803 111 2233',
    email: 'info@samsonandson.com',
    whatsAppNumber: '+2348031112233',
    rcNumber: 'RC-1092837',
    bankDetails: {
      bankName: 'Guaranty Trust Bank (GTB)',
      accountName: 'SAMSON & SON LTD. - CLIENT RENT ACCOUNT',
      accountNumber: '0123456789',
      paymentInstructions: 'Please include your Full Name and Property Unit ID as the transfer description/narration.'
    },
    enableSmsNotifications: true,
    enableEmailNotifications: true
  });

  // Modal Controls
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Property Search Filters
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    purpose: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    availability: ''
  });

  // Fetch initial data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [
          fetchedProps,
          fetchedUsers,
          fetchedTenancies,
          fetchedPayments,
          fetchedReceipts,
          fetchedMaint,
          fetchedDocs,
          fetchedNotifs,
          fetchedFaqs,
          fetchedTests,
          fetchedLogs,
          fetchedSettings
        ] = await Promise.all([
          api.getProperties(),
          api.getUsers(),
          api.getTenancies(),
          api.getPayments(),
          api.getReceipts(),
          api.getMaintenanceRequests(),
          api.getDocuments(),
          api.getNotifications(),
          api.getFaqs(),
          api.getTestimonials(),
          api.getAuditLogs(),
          api.getSettings()
        ]);

        setProperties(fetchedProps || []);
        setUsers(fetchedUsers || []);
        setTenancies(fetchedTenancies || []);
        setPayments(fetchedPayments || []);
        setReceipts(fetchedReceipts || []);
        setMaintenanceRequests(fetchedMaint || []);
        setDocuments(fetchedDocs || []);
        setNotifications(fetchedNotifs || []);
        setFaqs(fetchedFaqs || []);
        setTestimonials(fetchedTests || []);
        setAuditLogs(fetchedLogs || []);
        if (fetchedSettings) setSettings(fetchedSettings);

        // Default current user to John Doe (Tenant) for immediate interactive experience
        const safeUsers = fetchedUsers || [];
        const defaultTenant = safeUsers.find(u => u.role === 'tenant') || safeUsers[0];
        if (defaultTenant) setCurrentUser(defaultTenant);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      }
    }
    loadData();
  }, []);

  // Filter properties logic
  const filteredProperties = (properties || []).filter(p => {
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.purpose && p.purpose !== filters.purpose) return false;
    if (filters.availability && p.status !== filters.availability) return false;
    if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
    if (filters.bathrooms && p.bathrooms < Number(filters.bathrooms)) return false;
    if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
    return true;
  });

  // Reset Search Filters
  const handleResetFilters = () => {
    setFilters({
      location: '',
      type: '',
      purpose: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      availability: ''
    });
  };

  // Auth Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    if (user.role === 'tenant') {
      setCurrentPage('tenant-portal');
    } else {
      setCurrentPage('admin-portal');
    }
  };

  const handleRoleSwitch = (role: string) => {
    const matched = users.find(u => u.role === role);
    if (matched) {
      setCurrentUser(matched);
      if (role === 'tenant') {
        setCurrentPage('tenant-portal');
      } else {
        setCurrentPage('admin-portal');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  // Payment Verification Workflow Handler
  const handleVerifyPayment = async (paymentId: string) => {
    try {
      const updated = await api.verifyPayment(paymentId, currentUser?.name || 'Administrator');
      setPayments(prev => prev.map(p => p.id === paymentId ? updated : p));

      // Refresh receipts and notifications
      const [fetchedReceipts, fetchedNotifs, fetchedLogs] = await Promise.all([
        api.getReceipts(),
        api.getNotifications(),
        api.getAuditLogs()
      ]);
      setReceipts(fetchedReceipts);
      setNotifications(fetchedNotifs);
      setAuditLogs(fetchedLogs);
    } catch (err) {
      console.error('Failed to verify payment:', err);
    }
  };

  const handleRejectPayment = async (paymentId: string, reason: string) => {
    try {
      const updated = await api.rejectPayment(paymentId, reason);
      setPayments(prev => prev.map(p => p.id === paymentId ? updated : p));
    } catch (err) {
      console.error('Failed to reject payment:', err);
    }
  };

  // Tenant Payment Submission Handler
  const handleSubmitPayment = async (paymentData: Omit<Payment, 'id' | 'status' | 'createdAt'>) => {
    try {
      const newPayment = await api.submitPayment(paymentData);
      setPayments(prev => [newPayment, ...prev]);

      // Refresh audit logs & notifications
      const [fetchedNotifs, fetchedLogs] = await Promise.all([
        api.getNotifications(),
        api.getAuditLogs()
      ]);
      setNotifications(fetchedNotifs);
      setAuditLogs(fetchedLogs);
    } catch (err) {
      console.error('Failed to submit payment:', err);
    }
  };

  // Maintenance Request Handler
  const handleSubmitMaintenance = async (maintData: Omit<MaintenanceRequest, 'id' | 'status' | 'dateReported'>) => {
    try {
      const newMaint = await api.submitMaintenanceRequest(maintData);
      setMaintenanceRequests(prev => [newMaint, ...prev]);
    } catch (err) {
      console.error('Failed to submit maintenance request:', err);
    }
  };

  const handleUpdateMaintenanceStatus = async (requestId: string, status: MaintenanceRequest['status'], comment?: string) => {
    try {
      const updated = await api.updateMaintenanceStatus(requestId, status, comment);
      setMaintenanceRequests(prev => prev.map(m => m.id === requestId ? updated : m));
    } catch (err) {
      console.error('Failed to update maintenance status:', err);
    }
  };

  // Property Handlers
  const handleAddProperty = async (propData: Omit<Property, 'id' | 'createdAt'>) => {
    try {
      const created = await api.createProperty(propData);
      setProperties(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to create property:', err);
    }
  };

  const handleUpdatePropertyStatus = async (propertyId: string, status: Property['status']) => {
    try {
      const updated = await api.updatePropertyStatus(propertyId, status);
      setProperties(prev => prev.map(p => p.id === propertyId ? updated : p));
    } catch (err) {
      console.error('Failed to update property status:', err);
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      await api.deleteProperty(propertyId);
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    } catch (err) {
      console.error('Failed to delete property:', err);
    }
  };

  // Enquiry & Testimonial Handlers
  const handleSubmitEnquiry = async (enquiry: any) => {
    try {
      await api.submitEnquiry(enquiry);
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
    }
  };

  const handleSubmitTestimonial = async (testData: { customerName: string; customerRole: string; comment: string; rating: number }) => {
    try {
      const newTest = await api.submitTestimonial(testData);
      setTestimonials(prev => [newTest, ...prev]);
    } catch (err) {
      console.error('Failed to submit testimonial:', err);
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Failed to mark notification read:', err);
    }
  };

  const handleSendReminder = async (tenancyId: string) => {
    try {
      await api.triggerRentReminder(tenancyId);
      alert('Automatic 60-day Rent Renewal Notice dispatched via SMS & Email!');
      const fetchedNotifs = await api.getNotifications();
      setNotifications(fetchedNotifs);
    } catch (err) {
      console.error('Failed to trigger rent reminder:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Corporate Navbar */}
      <Navbar
        currentUser={currentUser}
        notifications={notifications}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onLogoutClick={handleLogout}
        onSelectRole={handleRoleSwitch}
        onRoleSwitch={handleRoleSwitch}
        onMarkNotificationRead={handleMarkNotificationRead}
        activeTab={currentPage}
        setActiveTab={setCurrentPage}
        settings={settings}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            <HeroSection
              onBrowseProperties={() => setCurrentPage('properties')}
              onContactAgent={() => setCurrentPage('contact')}
            />

            {/* Filter Search Bar */}
            <div className="px-4 sm:px-6 lg:px-8">
              <PropertySearch
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
              />
            </div>

            {/* Featured Properties Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
                    Exclusive Titled Real Estate
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
                    Featured Properties in Nigeria
                  </h2>
                  <p className="text-slate-600 text-sm max-w-xl">
                    Verified luxury apartments, duplexes, commercial offices, and penthouses in Victoria Island, Lekki, Ikoyi, Maitama, and Port Harcourt.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentPage('properties')}
                  className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all shrink-0"
                >
                  View All {properties.length} Properties →
                </button>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.slice(0, 6).map(prop => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onViewDetails={p => setSelectedProperty(p)}
                    onEnquire={p => setSelectedProperty(p)}
                    whatsAppNumber={settings.whatsAppNumber}
                  />
                ))}
              </div>
            </section>

            <ServicesSection onContact={() => setCurrentPage('contact')} />
            <AboutSection />
            <TestimonialsSection testimonials={testimonials} onSubmitTestimonial={handleSubmitTestimonial} />
            <FaqSection faqs={faqs} />
            <ContactSection settings={settings} onSubmitEnquiry={handleSubmitEnquiry} />
          </div>
        )}

        {/* VIEW 2: PUBLIC PROPERTIES MARKETPLACE */}
        {currentPage === 'properties' && (
          <div className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Real Estate Marketplace
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
                  Available Titled Properties
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  Explore verified residential and commercial spaces managed exclusively by SAMSON & SON LTD.
                </p>
              </div>

              <PropertySearch
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
                {filteredProperties.map(prop => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onViewDetails={p => setSelectedProperty(p)}
                    onEnquire={p => setSelectedProperty(p)}
                    whatsAppNumber={settings.whatsAppNumber}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SERVICES */}
        {currentPage === 'services' && (
          <ServicesSection onContact={() => setCurrentPage('contact')} />
        )}

        {/* VIEW 4: ABOUT COMPANY */}
        {currentPage === 'about' && (
          <AboutSection />
        )}

        {/* VIEW 5: CONTACT */}
        {currentPage === 'contact' && (
          <ContactSection settings={settings} onSubmitEnquiry={handleSubmitEnquiry} />
        )}

        {/* VIEW 6: TENANT PORTAL */}
        {currentPage === 'tenant-portal' && (
          currentUser && currentUser.role === 'tenant' ? (
            <TenantDashboard
              currentUser={currentUser}
              properties={properties}
              tenancies={tenancies}
              payments={payments}
              receipts={receipts}
              maintenanceRequests={maintenanceRequests}
              documents={documents}
              notifications={notifications}
              settings={settings}
              onSubmitPayment={handleSubmitPayment}
              onSubmitMaintenance={handleSubmitMaintenance}
              onViewReceipt={r => setSelectedReceipt(r)}
              onMarkNotificationRead={handleMarkNotificationRead}
              onUpdateProfile={updated => setCurrentUser(prev => prev ? { ...prev, ...updated } : prev)}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <h2 className="text-2xl font-bold font-serif">Tenant Portal Access Required</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Please log in with a tenant account to access rent payment tools, digital receipts, and maintenance tracking.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs"
              >
                Log In to Tenant Portal
              </button>
            </div>
          )
        )}

        {/* VIEW 7: ADMIN PORTAL */}
        {currentPage === 'admin-portal' && (
          currentUser && currentUser.role !== 'tenant' ? (
            <AdminDashboard
              currentUser={currentUser}
              properties={properties}
              tenancies={tenancies}
              payments={payments}
              receipts={receipts}
              maintenanceRequests={maintenanceRequests}
              auditLogs={auditLogs}
              settings={settings}
              users={users}
              onVerifyPayment={handleVerifyPayment}
              onRejectPayment={handleRejectPayment}
              onAddProperty={handleAddProperty}
              onUpdatePropertyStatus={handleUpdatePropertyStatus}
              onDeleteProperty={handleDeleteProperty}
              onUpdateMaintenanceStatus={handleUpdateMaintenanceStatus}
              onUpdateSettings={s => setSettings(s)}
              onViewReceipt={r => setSelectedReceipt(r)}
              onSendReminder={handleSendReminder}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <h2 className="text-2xl font-bold font-serif">Corporate Management Access Required</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Please log in with an administrative, accountant, property manager, or agent credential.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-slate-900 text-amber-400 font-bold px-6 py-3 rounded-xl text-xs"
              >
                Log In as Administrator
              </button>
            </div>
          )
        )}

      </main>

      {/* Global Corporate Footer */}
      <Footer settings={settings} onNavigate={setCurrentPage} />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        settings={settings}
        onClose={() => setSelectedProperty(null)}
        onSubmitEnquiry={handleSubmitEnquiry}
      />

      {/* Receipt View & Print Modal */}
      <ReceiptModal
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          users={users}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}
