export type UserRole = 
  | 'super_admin'
  | 'property_manager'
  | 'agent'
  | 'accountant'
  | 'maintenance_staff'
  | 'landlord'
  | 'tenant';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  address?: string;
  emergencyContact?: string;
  avatarUrl?: string;
  propertyId?: string; // Assigned property for tenants
  assignedProperties?: string[]; // Property IDs for landlords/agents
  createdAt: string;
}

export type PropertyType = 'Apartment' | 'Detached Duplex' | 'Semi-Detached' | 'Terrace' | 'Penthouse' | 'Commercial Office' | 'Retail Space';
export type PropertyPurpose = 'Rent' | 'Sale';
export type PropertyStatus = 'Available' | 'Occupied' | 'Reserved' | 'Under Maintenance' | 'Unavailable';

export interface Property {
  id: string;
  title: string;
  location: string;
  address: string;
  city: string; // Lagos, Abuja, Port Harcourt, etc.
  type: PropertyType;
  purpose: PropertyPurpose;
  price: number; // In Naira (₦)
  period?: 'annual' | 'monthly' | 'total'; // For rent or sale
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  furnishedStatus: 'Furnished' | 'Unfurnished' | 'Semi-Furnished';
  status: PropertyStatus;
  description: string;
  shortDescription: string;
  images: string[];
  amenities: string[];
  depositAmount: number;
  cautionFee: number;
  agencyFeePercent: number;
  legalFeePercent: number;
  termsAndConditions: string;
  landlordId?: string;
  currentTenantId?: string;
  createdAt: string;
}

export interface Tenancy {
  id: string;
  tenantId: string;
  propertyId: string;
  rentAmount: number;
  startDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  renewalDate: string; // YYYY-MM-DD
  depositPaid: number;
  status: 'Active' | 'Due Soon' | 'Overdue' | 'Renewed' | 'Terminated';
  gracePeriodDays: number;
  outstandingBalance: number;
  lastReminderSentAt?: string;
  lastReminderType?: string;
}

export type PaymentMethod = 'Bank Transfer' | 'Paystack (Online)' | 'Flutterwave (Online)';
export type PaymentStatus = 'Pending Verification' | 'Confirmed' | 'Rejected';

export interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyTitle: string;
  amount: number;
  paymentMethod: PaymentMethod;
  reference: string;
  bankUsed?: string;
  paymentDate: string;
  description: string;
  receiptProofUrl?: string;
  status: PaymentStatus;
  verifiedBy?: string;
  verificationDate?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  paymentId: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyTitle: string;
  amountPaid: number;
  paymentMethod: string;
  transactionReference: string;
  paymentDate: string;
  rentPeriodStart: string;
  rentPeriodEnd: string;
  nextRentDueDate: string;
  issuedAt: string;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

export type MaintenanceCategory = 
  | 'Plumbing' 
  | 'Electrical' 
  | 'Water' 
  | 'Security' 
  | 'Roofing' 
  | 'Air Conditioning' 
  | 'Generator/Power' 
  | 'Structural' 
  | 'Other';

export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Emergency';
export type MaintenanceStatus = 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyTitle: string;
  roomLocation: string;
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  description: string;
  photoUrl?: string;
  status: MaintenanceStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  dateReported: string;
  dateResolved?: string;
  comments?: { author: string; role: string; comment: string; date: string }[];
}

export interface TenancyDocument {
  id: string;
  title: string;
  category: 'Tenancy Agreement' | 'Rent Receipt' | 'Inspection Report' | 'Notice' | 'Other';
  tenantId: string;
  propertyId: string;
  fileUrl: string;
  fileType: string;
  uploadDate: string;
}

export interface InspectionReport {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantId?: string;
  tenantName?: string;
  inspectorName: string;
  inspectionDate: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  issuesFound: string;
  photos: string[];
  comments: string;
  recommendedAction: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'Rent Reminder' | 'Payment Confirmation' | 'Maintenance Update' | 'Announcement' | 'Inspection Notice' | 'Document Update';
  isRead: boolean;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  propertyTitle?: string;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerRole?: string; // e.g., "Tenant at Ikoyi Heights", "Landlord"
  comment: string;
  rating: number; // 1-5
  photoUrl?: string;
  approved: boolean;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Rent Payment' | 'Rent Renewal' | 'Maintenance' | 'Agreements' | 'Inspections' | 'General';
  order: number;
}

export interface ReminderConfig {
  scheduleDays: number[]; // e.g. [60, 30, 14, 7, 3, 1, 0, -1]
  emailEnabled: boolean;
  smsEnabled: boolean;
  smsTemplate: string;
  emailSubjectTemplate: string;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  paymentInstructions: string;
  sortCode?: string;
}

export interface SystemSettings {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  whatsAppNumber: string;
  currencySymbol: string;
  bankDetails: BankDetails;
  reminderConfig: ReminderConfig;
  smsProvider: 'Twilio' | 'Termii (Nigeria)' | 'Mock / Test Mode';
  emailProvider: 'SendGrid' | 'SMTP' | 'Mock / Test Mode';
  paymentGateway: 'Bank Transfer' | 'Paystack' | 'Flutterwave';
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface ReminderLog {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyTitle: string;
  daysUntilExpiry: number;
  channel: 'Email' | 'SMS' | 'Both';
  status: 'Sent' | 'Delivered' | 'Failed';
  sentAt: string;
  messagePreview: string;
}
