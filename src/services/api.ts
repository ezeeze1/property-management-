import {
  User,
  Property,
  Tenancy,
  Payment,
  Receipt,
  MaintenanceRequest,
  TenancyDocument,
  InspectionReport,
  Notification,
  Enquiry,
  Testimonial,
  FAQ,
  SystemSettings,
  AuditLog,
  ReminderLog
} from '../types';

import {
  INITIAL_USERS,
  INITIAL_PROPERTIES,
  INITIAL_TENANCIES,
  INITIAL_PAYMENTS,
  INITIAL_RECEIPTS,
  INITIAL_MAINTENANCE_REQUESTS,
  INITIAL_DOCUMENTS,
  INITIAL_INSPECTION_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ENQUIRIES,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_SETTINGS,
  INITIAL_AUDIT_LOGS,
  INITIAL_REMINDER_LOGS
} from '../data/initialData';

// Helper for fetch with JSON fallback
async function fetchJson<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

export const api = {
  getSettings: () => fetchJson<SystemSettings>('/api/settings', undefined, INITIAL_SETTINGS),
  updateSettings: (settings: Partial<SystemSettings>) =>
    fetchJson<{ success: boolean; settings: SystemSettings }>('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    }, { success: true, settings: { ...INITIAL_SETTINGS, ...settings } }),

  getProperties: () => fetchJson<Property[]>('/api/properties', undefined, INITIAL_PROPERTIES),
  addProperty: (prop: Omit<Property, 'id' | 'createdAt'>) =>
    fetchJson<Property>('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prop)
    }, { ...prop, id: `prop-${Date.now()}`, createdAt: new Date().toISOString() }),

  updateProperty: (id: string, prop: Partial<Property>) =>
    fetchJson<Property>(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prop)
    }, { ...INITIAL_PROPERTIES[0], ...prop, id }),

  deleteProperty: (id: string) =>
    fetchJson<{ success: boolean }>(`/api/properties/${id}`, { method: 'DELETE' }, { success: true }),

  getUsers: () => fetchJson<User[]>('/api/users', undefined, INITIAL_USERS),
  createUser: (user: Omit<User, 'id' | 'createdAt'>) =>
    fetchJson<User>('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }, { ...user, id: `usr-${Date.now()}`, createdAt: new Date().toISOString() }),

  getTenancies: () => fetchJson<Tenancy[]>('/api/tenancies', undefined, INITIAL_TENANCIES),

  getPayments: () => fetchJson<Payment[]>('/api/payments', undefined, INITIAL_PAYMENTS),
  submitPayment: (payment: Omit<Payment, 'id' | 'status' | 'createdAt'>) =>
    fetchJson<Payment>('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment)
    }, { ...payment, id: `pay-${Date.now()}`, status: 'Pending Verification', createdAt: new Date().toISOString() }),

  verifyPayment: (id: string, verifierName: string) =>
    fetchJson<{ success: boolean; payment: Payment; receipt: Receipt }>(`/api/payments/${id}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verifierName })
    }, {
      success: true,
      payment: { ...INITIAL_PAYMENTS[1], status: 'Confirmed', verifiedBy: verifierName, verificationDate: new Date().toISOString() },
      receipt: INITIAL_RECEIPTS[0]
    }),

  rejectPayment: (id: string, reason: string) =>
    fetchJson<{ success: boolean; payment: Payment }>(`/api/payments/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    }, {
      success: true,
      payment: { ...INITIAL_PAYMENTS[1], status: 'Rejected', rejectionReason: reason }
    }),

  getReceipts: () => fetchJson<Receipt[]>('/api/receipts', undefined, INITIAL_RECEIPTS),

  getMaintenanceRequests: () => fetchJson<MaintenanceRequest[]>('/api/maintenance', undefined, INITIAL_MAINTENANCE_REQUESTS),
  getMaintenance: () => fetchJson<MaintenanceRequest[]>('/api/maintenance', undefined, INITIAL_MAINTENANCE_REQUESTS),
  submitMaintenance: (maint: Omit<MaintenanceRequest, 'id' | 'status' | 'dateReported'>) =>
    fetchJson<MaintenanceRequest>('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(maint)
    }, { ...maint, id: `maint-${Date.now()}`, status: 'Submitted', dateReported: new Date().toISOString().split('T')[0] }),
  submitMaintenanceRequest: (maint: Omit<MaintenanceRequest, 'id' | 'status' | 'dateReported'>) =>
    fetchJson<MaintenanceRequest>('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(maint)
    }, { ...maint, id: `maint-${Date.now()}`, status: 'Submitted', dateReported: new Date().toISOString().split('T')[0] }),

  updateMaintenance: (id: string, updates: Partial<MaintenanceRequest>) =>
    fetchJson<MaintenanceRequest>(`/api/maintenance/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }, { ...INITIAL_MAINTENANCE_REQUESTS[0], ...updates, id }),
  updateMaintenanceStatus: (id: string, status: MaintenanceRequest['status'], comment?: string) =>
    fetchJson<MaintenanceRequest>(`/api/maintenance/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, comment })
    }, { ...INITIAL_MAINTENANCE_REQUESTS[0], status, id }),

  getDocuments: () => fetchJson<TenancyDocument[]>('/api/documents', undefined, INITIAL_DOCUMENTS),

  createProperty: (prop: Omit<Property, 'id' | 'createdAt'>) =>
    fetchJson<Property>('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prop)
    }, { ...prop, id: `prop-${Date.now()}`, createdAt: new Date().toISOString() }),

  updatePropertyStatus: (id: string, status: Property['status']) =>
    fetchJson<Property>(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }, { ...INITIAL_PROPERTIES[0], status, id }),

  markNotificationRead: (id: string) =>
    fetchJson<{ success: boolean }>('/api/notifications/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }, { success: true }),

  triggerRentReminder: (tenancyId: string) =>
    fetchJson<{ success: boolean }>('/api/reminders/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenancyId })
    }, { success: true }),

  getInspections: () => fetchJson<InspectionReport[]>('/api/inspections', undefined, INITIAL_INSPECTION_REPORTS),
  addInspection: (insp: Omit<InspectionReport, 'id' | 'createdAt'>) =>
    fetchJson<InspectionReport>('/api/inspections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(insp)
    }, { ...insp, id: `insp-${Date.now()}`, createdAt: new Date().toISOString() }),

  getEnquiries: () => fetchJson<Enquiry[]>('/api/enquiries', undefined, INITIAL_ENQUIRIES),
  submitEnquiry: (enq: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) =>
    fetchJson<Enquiry>('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enq)
    }, { ...enq, id: `enq-${Date.now()}`, status: 'New', createdAt: new Date().toISOString() }),

  getTestimonials: () => fetchJson<Testimonial[]>('/api/testimonials', undefined, INITIAL_TESTIMONIALS),
  submitTestimonial: (test: Omit<Testimonial, 'id' | 'approved' | 'createdAt'>) =>
    fetchJson<Testimonial>('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test)
    }, { ...test, id: `test-${Date.now()}`, approved: false, createdAt: new Date().toISOString() }),

  approveTestimonial: (id: string, approved: boolean) =>
    fetchJson<Testimonial>(`/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved })
    }, { ...INITIAL_TESTIMONIALS[0], approved, id }),

  getFaqs: () => fetchJson<FAQ[]>('/api/faqs', undefined, INITIAL_FAQS),

  getNotifications: () => fetchJson<Notification[]>('/api/notifications', undefined, INITIAL_NOTIFICATIONS),
  markNotificationsRead: (id?: string, userId?: string) =>
    fetchJson<{ success: boolean }>('/api/notifications/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, userId })
    }, { success: true }),

  getAuditLogs: () => fetchJson<AuditLog[]>('/api/audit-logs', undefined, INITIAL_AUDIT_LOGS),
  getReminderLogs: () => fetchJson<ReminderLog[]>('/api/reminder-logs', undefined, INITIAL_REMINDER_LOGS),

  triggerRemindersCheck: () =>
    fetchJson<{ success: boolean; reminderLogs: ReminderLog[] }>('/api/reminders/trigger', {
      method: 'POST'
    }, { success: true, reminderLogs: INITIAL_REMINDER_LOGS })
};
