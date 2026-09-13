import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
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
} from './src/data/initialData';
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
} from './src/types';

// In-Memory Database Store for SAMSON & SON LTD
let dbUsers: User[] = [...INITIAL_USERS];
let dbProperties: Property[] = [...INITIAL_PROPERTIES];
let dbTenancies: Tenancy[] = [...INITIAL_TENANCIES];
let dbPayments: Payment[] = [...INITIAL_PAYMENTS];
let dbReceipts: Receipt[] = [...INITIAL_RECEIPTS];
let dbMaintenance: MaintenanceRequest[] = [...INITIAL_MAINTENANCE_REQUESTS];
let dbDocuments: TenancyDocument[] = [...INITIAL_DOCUMENTS];
let dbInspections: InspectionReport[] = [...INITIAL_INSPECTION_REPORTS];
let dbNotifications: Notification[] = [...INITIAL_NOTIFICATIONS];
let dbEnquiries: Enquiry[] = [...INITIAL_ENQUIRIES];
let dbTestimonials: Testimonial[] = [...INITIAL_TESTIMONIALS];
let dbFaqs: FAQ[] = [...INITIAL_FAQS];
let dbSettings: SystemSettings = { ...INITIAL_SETTINGS };
let dbAuditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
let dbReminderLogs: ReminderLog[] = [...INITIAL_REMINDER_LOGS];

function addAuditLog(userName: string, userRole: any, action: string, details: string) {
  const log: AuditLog = {
    id: `log-${Date.now()}`,
    userId: 'usr-current',
    userName,
    userRole,
    action,
    details,
    timestamp: new Date().toISOString(),
    ipAddress: '127.0.0.1'
  };
  dbAuditLogs.unshift(log);
}

// Background Rent Expiry Monitoring Engine
function runRentRenewalEngine() {
  const today = new Date();
  
  dbTenancies.forEach(tenancy => {
    const expiry = new Date(tenancy.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Check if days remaining matches any configured schedule
    const schedule = dbSettings.reminderConfig.scheduleDays;
    const tenant = dbUsers.find(u => u.id === tenancy.tenantId);
    const property = dbProperties.find(p => p.id === tenancy.propertyId);

    if (tenant && property) {
      // Update tenancy status
      if (daysRemaining <= 0 && tenancy.status !== 'Renewed' && tenancy.status !== 'Terminated') {
        tenancy.status = 'Overdue';
      } else if (daysRemaining <= 60 && daysRemaining > 0 && tenancy.status === 'Active') {
        tenancy.status = 'Due Soon';
      }

      // Check for duplicate reminder on same day
      const alreadySent = dbReminderLogs.some(
        l => l.tenantId === tenant.id && l.daysUntilExpiry === daysRemaining
      );

      if (schedule.includes(daysRemaining) && !alreadySent) {
        // Log SMS/Email send
        const reminder: ReminderLog = {
          id: `remlog-${Date.now()}-${Math.floor(Math.random()*1000)}`,
          tenantId: tenant.id,
          tenantName: tenant.name,
          propertyTitle: property.title,
          daysUntilExpiry: daysRemaining,
          channel: 'Both',
          status: 'Delivered',
          sentAt: new Date().toISOString(),
          messagePreview: `[AUTOMATED ${daysRemaining}d REMINDER] Dear ${tenant.name}, your rent for ${property.title} expires on ${tenancy.expiryDate}. Amount: ₦${tenancy.rentAmount.toLocaleString()}.`
        };
        dbReminderLogs.unshift(reminder);

        // Add Notification inside app
        dbNotifications.unshift({
          id: `notif-${Date.now()}`,
          userId: tenant.id,
          title: `Rent Expiry Alert (${daysRemaining} Days)`,
          message: `Your rent for ${property.title} expires on ${tenancy.expiryDate}. Please renew via Bank Transfer on your SAMSON & SON LTD dashboard.`,
          type: 'Rent Reminder',
          isRead: false,
          createdAt: new Date().toISOString()
        });
      }
    }
  });
}

// Run engine periodically every 5 minutes on server
setInterval(runRentRenewalEngine, 5 * 60 * 1000);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', company: 'SAMSON & SON LTD.' });
  });

  // System Settings
  app.get('/api/settings', (req, res) => {
    res.json(dbSettings);
  });

  app.put('/api/settings', (req, res) => {
    dbSettings = { ...dbSettings, ...req.body };
    addAuditLog('Admin', 'super_admin', 'Update Settings', 'Updated company banking and reminder configuration');
    res.json({ success: true, settings: dbSettings });
  });

  // Properties
  app.get('/api/properties', (req, res) => {
    res.json(dbProperties);
  });

  app.post('/api/properties', (req, res) => {
    const newProp: Property = {
      ...req.body,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    dbProperties.unshift(newProp);
    addAuditLog('Admin', 'super_admin', 'Add Property', `Added property: ${newProp.title}`);
    res.json(newProp);
  });

  app.put('/api/properties/:id', (req, res) => {
    const idx = dbProperties.findIndex(p => p.id === req.params.id);
    if (idx !== -1) {
      dbProperties[idx] = { ...dbProperties[idx], ...req.body };
      addAuditLog('Admin', 'super_admin', 'Update Property', `Updated property: ${dbProperties[idx].title}`);
      res.json(dbProperties[idx]);
    } else {
      res.status(404).json({ error: 'Property not found' });
    }
  });

  app.delete('/api/properties/:id', (req, res) => {
    const prop = dbProperties.find(p => p.id === req.params.id);
    dbProperties = dbProperties.filter(p => p.id !== req.params.id);
    if (prop) {
      addAuditLog('Admin', 'super_admin', 'Delete Property', `Archived property: ${prop.title}`);
    }
    res.json({ success: true });
  });

  // Users / Tenants
  app.get('/api/users', (req, res) => {
    res.json(dbUsers);
  });

  app.post('/api/users', (req, res) => {
    const newUser: User = {
      ...req.body,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    dbUsers.push(newUser);
    addAuditLog('Admin', 'super_admin', 'Create User', `Created account for ${newUser.name} (${newUser.role})`);
    res.json(newUser);
  });

  // Tenancies
  app.get('/api/tenancies', (req, res) => {
    res.json(dbTenancies);
  });

  // Payments
  app.get('/api/payments', (req, res) => {
    res.json(dbPayments);
  });

  app.post('/api/payments', (req, res) => {
    const newPay: Payment = {
      ...req.body,
      id: `pay-${Date.now()}`,
      status: 'Pending Verification',
      createdAt: new Date().toISOString()
    };
    dbPayments.unshift(newPay);

    addAuditLog(newPay.tenantName, 'tenant', 'Submit Payment', `Submitted ₦${newPay.amount.toLocaleString()} bank transfer (Ref: ${newPay.reference})`);

    // Notify Admins
    dbNotifications.unshift({
      id: `notif-${Date.now()}`,
      userId: 'usr-admin-1',
      title: 'New Payment Pending Verification',
      message: `${newPay.tenantName} submitted ₦${newPay.amount.toLocaleString()} for ${newPay.propertyTitle} (Ref: ${newPay.reference}).`,
      type: 'Payment Confirmation',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    res.json(newPay);
  });

  app.post('/api/payments/:id/verify', (req, res) => {
    const pay = dbPayments.find(p => p.id === req.params.id);
    if (!pay) return res.status(404).json({ error: 'Payment not found' });

    pay.status = 'Confirmed';
    pay.verifiedBy = req.body.verifierName || 'Amina Bello (Accountant)';
    pay.verificationDate = new Date().toISOString();

    // Auto Generate Receipt
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const receipt: Receipt = {
      id: `rec-${Date.now()}`,
      receiptNumber: `SSL-REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      paymentId: pay.id,
      tenantId: pay.tenantId,
      tenantName: pay.tenantName,
      propertyId: pay.propertyId,
      propertyTitle: pay.propertyTitle,
      amountPaid: pay.amount,
      paymentMethod: pay.paymentMethod,
      transactionReference: pay.reference,
      paymentDate: pay.paymentDate,
      rentPeriodStart: new Date().toISOString().split('T')[0],
      rentPeriodEnd: nextYear.toISOString().split('T')[0],
      nextRentDueDate: nextYear.toISOString().split('T')[0],
      issuedAt: new Date().toISOString(),
      companyInfo: {
        name: dbSettings.companyName,
        address: dbSettings.address,
        phone: dbSettings.phone,
        email: dbSettings.email
      }
    };
    dbReceipts.unshift(receipt);

    // Update Tenancy Status
    const tenancy = dbTenancies.find(t => t.tenantId === pay.tenantId);
    if (tenancy) {
      tenancy.status = 'Renewed';
      tenancy.expiryDate = nextYear.toISOString().split('T')[0];
      tenancy.renewalDate = nextYear.toISOString().split('T')[0];
    }

    // Notify Tenant
    dbNotifications.unshift({
      id: `notif-${Date.now()}`,
      userId: pay.tenantId,
      title: 'Rent Payment Confirmed',
      message: `Your payment of ₦${pay.amount.toLocaleString()} (Ref: ${pay.reference}) has been confirmed! Receipt ${receipt.receiptNumber} is now available in your documents.`,
      type: 'Payment Confirmation',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    addAuditLog(pay.verifiedBy, 'accountant', 'Verify Payment', `Confirmed payment ${pay.reference} and issued receipt ${receipt.receiptNumber}`);

    res.json({ success: true, payment: pay, receipt });
  });

  app.post('/api/payments/:id/reject', (req, res) => {
    const pay = dbPayments.find(p => p.id === req.params.id);
    if (!pay) return res.status(404).json({ error: 'Payment not found' });

    pay.status = 'Rejected';
    pay.rejectionReason = req.body.reason || 'Transaction reference mismatch or funds uncredited';

    dbNotifications.unshift({
      id: `notif-${Date.now()}`,
      userId: pay.tenantId,
      title: 'Payment Verification Unsuccessful',
      message: `Your submitted payment of ₦${pay.amount.toLocaleString()} could not be verified. Reason: ${pay.rejectionReason}. Please contact SAMSON & SON LTD accounts.`,
      type: 'Payment Confirmation',
      isRead: false,
      createdAt: new Date().toISOString()
    });

    addAuditLog('Accountant', 'accountant', 'Reject Payment', `Rejected payment ${pay.reference}: ${pay.rejectionReason}`);

    res.json({ success: true, payment: pay });
  });

  // Receipts
  app.get('/api/receipts', (req, res) => {
    res.json(dbReceipts);
  });

  // Maintenance
  app.get('/api/maintenance', (req, res) => {
    res.json(dbMaintenance);
  });

  app.post('/api/maintenance', (req, res) => {
    const newMaint: MaintenanceRequest = {
      ...req.body,
      id: `maint-${Date.now()}`,
      status: 'Submitted',
      dateReported: new Date().toISOString().split('T')[0],
      comments: [
        {
          author: req.body.tenantName,
          role: 'Tenant',
          comment: 'Submitted maintenance issue request.',
          date: new Date().toISOString()
        }
      ]
    };
    dbMaintenance.unshift(newMaint);
    addAuditLog(newMaint.tenantName, 'tenant', 'Submit Maintenance', `Submitted maintenance request for ${newMaint.category} at ${newMaint.propertyTitle}`);
    res.json(newMaint);
  });

  app.put('/api/maintenance/:id', (req, res) => {
    const idx = dbMaintenance.findIndex(m => m.id === req.params.id);
    if (idx !== -1) {
      const old = dbMaintenance[idx];
      dbMaintenance[idx] = { ...old, ...req.body };
      addAuditLog('Manager', 'property_manager', 'Update Maintenance', `Updated maintenance request #${old.id} status to ${req.body.status || old.status}`);
      res.json(dbMaintenance[idx]);
    } else {
      res.status(404).json({ error: 'Maintenance request not found' });
    }
  });

  // Inspections
  app.get('/api/inspections', (req, res) => {
    res.json(dbInspections);
  });

  app.post('/api/inspections', (req, res) => {
    const newInsp: InspectionReport = {
      ...req.body,
      id: `insp-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    dbInspections.unshift(newInsp);
    addAuditLog(newInsp.inspectorName, 'agent', 'Add Inspection', `Recorded property inspection report for ${newInsp.propertyTitle}`);
    res.json(newInsp);
  });

  // Enquiries
  app.get('/api/enquiries', (req, res) => {
    res.json(dbEnquiries);
  });

  app.post('/api/enquiries', (req, res) => {
    const newEnq: Enquiry = {
      ...req.body,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    dbEnquiries.unshift(newEnq);
    res.json(newEnq);
  });

  // Testimonials
  app.get('/api/testimonials', (req, res) => {
    res.json(dbTestimonials);
  });

  app.post('/api/testimonials', (req, res) => {
    const newTest: Testimonial = {
      ...req.body,
      id: `test-${Date.now()}`,
      approved: false,
      createdAt: new Date().toISOString()
    };
    dbTestimonials.unshift(newTest);
    res.json(newTest);
  });

  app.put('/api/testimonials/:id', (req, res) => {
    const idx = dbTestimonials.findIndex(t => t.id === req.params.id);
    if (idx !== -1) {
      dbTestimonials[idx] = { ...dbTestimonials[idx], ...req.body };
      res.json(dbTestimonials[idx]);
    } else {
      res.status(404).json({ error: 'Testimonial not found' });
    }
  });

  // FAQs
  app.get('/api/faqs', (req, res) => {
    res.json(dbFaqs);
  });

  // Notifications
  app.get('/api/notifications', (req, res) => {
    res.json(dbNotifications);
  });

  app.post('/api/notifications/read', (req, res) => {
    const { id, userId } = req.body;
    if (id) {
      dbNotifications = dbNotifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    } else if (userId) {
      dbNotifications = dbNotifications.map(n => n.userId === userId ? { ...n, isRead: true } : n);
    }
    res.json({ success: true });
  });

  // Audit Logs
  app.get('/api/audit-logs', (req, res) => {
    res.json(dbAuditLogs);
  });

  // Reminder Logs
  app.get('/api/reminder-logs', (req, res) => {
    res.json(dbReminderLogs);
  });

  // Trigger Renewal Check manually
  app.post('/api/reminders/trigger', (req, res) => {
    runRentRenewalEngine();
    res.json({ success: true, reminderLogs: dbReminderLogs });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SAMSON & SON LTD.] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
