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

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Chief Samson Olatunji',
    email: 'admin@samsonandson.com',
    phone: '+234 803 111 2233',
    role: 'super_admin',
    address: '14 Marina Road, Victoria Island, Lagos',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'usr-pm-1',
    name: 'Engr. Babatunde Lawal',
    email: 'pm@samsonandson.com',
    phone: '+234 802 334 5566',
    role: 'property_manager',
    address: 'Admiralty Way, Lekki Phase 1, Lagos',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    id: 'usr-landlord-1',
    name: 'Alhaji Ibrahim Bello',
    email: 'bello@bello-holdings.com',
    phone: '+234 805 777 8899',
    role: 'landlord',
    address: 'Maitama District, Abuja',
    assignedProperties: ['prop-1', 'prop-3'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'usr-agent-1',
    name: 'Chidi Nwosu',
    email: 'agent@samsonandson.com',
    phone: '+234 809 222 3344',
    role: 'agent',
    address: 'Ikeja GRA, Lagos',
    assignedProperties: ['prop-1', 'prop-2', 'prop-4'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    createdAt: '2024-02-10T11:00:00Z'
  },
  {
    id: 'usr-accountant-1',
    name: 'Amina Bello, ACA',
    email: 'accounts@samsonandson.com',
    phone: '+234 812 444 5566',
    role: 'accountant',
    address: 'Victoria Island, Lagos',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    createdAt: '2024-02-15T12:00:00Z'
  },
  {
    id: 'usr-tenant-1',
    name: 'John Doe',
    email: 'tenant@gmail.com',
    phone: '+234 813 999 0011',
    role: 'tenant',
    address: 'Royal Palm Heights, Unit 4B, Victoria Island, Lagos',
    emergencyContact: 'Mary Doe (+234 813 999 0022)',
    propertyId: 'prop-1',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 'usr-tenant-2',
    name: 'Dr. Elizabeth Okonjo',
    email: 'elizabeth.o@healthmail.ng',
    phone: '+234 803 555 1212',
    role: 'tenant',
    address: 'Pinnacle Terrace, House 12, Lekki Phase 1, Lagos',
    emergencyContact: 'Prof. Okonjo (+234 803 555 1313)',
    propertyId: 'prop-2',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300',
    createdAt: '2024-03-10T14:00:00Z'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Royal Palm Heights - Luxury 3 Bedroom Penthouse',
    location: 'Victoria Island, Lagos',
    address: '12 Bishop Aboyade Cole Street, Victoria Island',
    city: 'Lagos',
    type: 'Penthouse',
    purpose: 'Rent',
    price: 6500000,
    period: 'annual',
    bedrooms: 3,
    bathrooms: 4,
    toilets: 4,
    furnishedStatus: 'Furnished',
    status: 'Occupied',
    description: 'An ultra-luxurious 3-bedroom penthouse featuring panoramic ocean views, private elevator access, 24/7 uninterrupted power supply, industrial water treatment plant, infinity swimming pool, fully equipped gymnasium, automated smart home lighting, and 24-hour uniformed security with CCTV coverage.',
    shortDescription: '3-Bed Penthouse with sea view, 24/7 power, smart home features, pool & gym.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: [
      '24/7 Power (Mains & Standby Gen)',
      'Uniformed Security & Access Control',
      'CCTV Surveillance',
      'Treated Water Plant',
      'Swimming Pool',
      'Fitness Gym',
      'Fitted Italian Kitchen',
      'Elevator',
      '2 Dedicated Parking Bays'
    ],
    depositAmount: 6500000,
    cautionFee: 300000,
    agencyFeePercent: 10,
    legalFeePercent: 10,
    termsAndConditions: '1-year upfront rent required. Service charge is ₦850,000 per annum covering power, diesel, security, and waste management. No commercial subletting.',
    landlordId: 'usr-landlord-1',
    currentTenantId: 'usr-tenant-1',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'prop-2',
    title: 'Pinnacle Terrace - Executive 4 Bedroom Fully Serviced Duplex',
    location: 'Lekki Phase 1, Lagos',
    address: 'Plot 18, Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    type: 'Terrace',
    purpose: 'Rent',
    price: 5200000,
    period: 'annual',
    bedrooms: 4,
    bathrooms: 5,
    toilets: 5,
    furnishedStatus: 'Semi-Furnished',
    status: 'Occupied',
    description: 'Contemporary 4-bedroom terrace duplex with BQ in a high-brow gated estate in Lekki Phase 1. Features modern finishings, pop ceilings, heat extractor, electric fence, paved compound, and dedicated transformer.',
    shortDescription: 'Modern 4-Bed Terrace with BQ, gated estate, uninterrupted electricity & drainage.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: [
      '24/7 Power Backup',
      'Gated Community Security',
      'Boys Quarters (BQ)',
      'Prepaid Meter',
      'Balcony Views',
      'Inbuilt Sound System'
    ],
    depositAmount: 5200000,
    cautionFee: 250000,
    agencyFeePercent: 10,
    legalFeePercent: 10,
    termsAndConditions: 'Standard 12-month lease. Refundable caution fee of ₦250,000. Service charge covers waste, security, and compound lighting.',
    landlordId: 'usr-landlord-1',
    currentTenantId: 'usr-tenant-2',
    createdAt: '2024-01-12T11:00:00Z'
  },
  {
    id: 'prop-3',
    title: 'Samson Plaza - Grade A Commercial Office Space (350 sqm)',
    location: 'Maitama, Abuja',
    address: '45 Aguiyi Ironsi Way, Maitama, Abuja',
    city: 'Abuja',
    type: 'Commercial Office',
    purpose: 'Rent',
    price: 18000000,
    period: 'annual',
    bedrooms: 0,
    bathrooms: 6,
    toilets: 8,
    furnishedStatus: 'Unfurnished',
    status: 'Available',
    description: 'Prime Grade-A commercial office space in the diplomatic district of Maitama, Abuja. Ideal for corporate headquarters, multinational firms, banks, or diplomatic missions. High speed fiber internet, central air conditioning, dual elevators, heavy-duty Caterpillar generators.',
    shortDescription: '350sqm Prime Grade-A commercial office space in diplomatic Maitama, Abuja.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: [
      'Dual 500kVA Generators',
      'Central Chilled Water HVAC',
      'High-Speed Fiber Optic Internet',
      'Underground Basement Parking',
      'Fire Suppression & Sprinkler System',
      'Executive Restrooms & Boardroom Provisions'
    ],
    depositAmount: 18000000,
    cautionFee: 1000000,
    agencyFeePercent: 10,
    legalFeePercent: 10,
    termsAndConditions: 'Minimum 2-year commercial lease agreement. Customizable partitions permitted upon layout approval by SAMSON & SON LTD engineering team.',
    landlordId: 'usr-landlord-1',
    createdAt: '2024-02-01T09:00:00Z'
  },
  {
    id: 'prop-4',
    title: 'Bourdillon Crest - 5 Bedroom Detached Villa with Pool',
    location: 'Ikoyi, Lagos',
    address: '8 Bourdillon Road, Ikoyi, Lagos',
    city: 'Lagos',
    type: 'Detached Duplex',
    purpose: 'Rent',
    price: 25000000,
    period: 'annual',
    bedrooms: 5,
    bathrooms: 6,
    toilets: 7,
    furnishedStatus: 'Furnished',
    status: 'Available',
    description: 'Exquisite 5-bedroom detached mansion set on 1,200 sqm of lush landscaped gardens in prestigious Bourdillon, Ikoyi. Features private swimming pool, private cinema room, gourmet chef kitchen, automated security shutters, 2-room staff quarters, and high-capacity inverter solar setup.',
    shortDescription: 'Ultra-exclusive 5-bed mansion in Ikoyi with private pool, cinema room & solar array.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: [
      'Solar Hybrid Energy System',
      'Private Swimming Pool',
      'In-House Private Cinema',
      'Landscaped Gardens',
      '2 Rooms BQ',
      'Smart Lock Access Control'
    ],
    depositAmount: 25000000,
    cautionFee: 1500000,
    agencyFeePercent: 10,
    legalFeePercent: 10,
    termsAndConditions: '1 or 2 years lease term. Comprehensive estate inventory report performed prior to handover.',
    createdAt: '2024-02-15T15:00:00Z'
  },
  {
    id: 'prop-5',
    title: 'GRA Haven - 2 Bedroom Luxury Serviced Apartment',
    location: 'Ikeja GRA, Lagos',
    address: '14 Isaac John Street, Ikeja GRA, Lagos',
    city: 'Lagos',
    type: 'Apartment',
    purpose: 'Rent',
    price: 3800000,
    period: 'annual',
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    furnishedStatus: 'Furnished',
    status: 'Available',
    description: 'Tastefully furnished 2-bedroom luxury apartment located in serene Ikeja GRA close to Lagos International Airport. Comes fully serviced with high-speed WiFi, satellite TV, daily housekeeping options, and 24-hour power security.',
    shortDescription: 'Furnished 2-Bed Serviced Apartment in Ikeja GRA close to Airport.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: [
      'High Speed Fiber Internet',
      '24/7 Electricity',
      'Air Conditioning in All Rooms',
      'Water Heater System',
      'Washing Machine & Dryer',
      'Ample Parking Space'
    ],
    depositAmount: 3800000,
    cautionFee: 200000,
    agencyFeePercent: 10,
    legalFeePercent: 10,
    termsAndConditions: 'Annual tenancy agreement. Ideal for expatriates, corporate executives, and diplomats.',
    createdAt: '2024-02-20T11:00:00Z'
  },
  {
    id: 'prop-6',
    title: 'Trans-Amadi Commercial Hub - Industrial Warehouse & Showroom',
    location: 'Port Harcourt, Rivers State',
    address: '32 Trans-Amadi Industrial Layout, Port Harcourt',
    city: 'Port Harcourt',
    type: 'Retail Space',
    purpose: 'Rent',
    price: 12000000,
    period: 'annual',
    bedrooms: 0,
    bathrooms: 4,
    toilets: 4,
    furnishedStatus: 'Unfurnished',
    status: 'Available',
    description: 'Heavy duty industrial warehouse and commercial showroom with high head room, heavy vehicle access, loading bay, perimeter security wire, and administrative offices.',
    shortDescription: 'Industrial warehouse and showroom facility in Trans-Amadi PH.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: [
      'Heavy Logistics Truck Dock',
      '3-Phase Industrial Power Connection',
      'Security Post & Electric Fencing',
      'Administrative Office Block'
    ],
    depositAmount: 12000000,
    cautionFee: 500000,
    agencyFeePercent: 10,
    legalFeePercent: 10,
    termsAndConditions: '3-year lease term renewable.',
    createdAt: '2024-03-01T10:00:00Z'
  }
];

export const INITIAL_TENANCIES: Tenancy[] = [
  {
    id: 'tenancy-1',
    tenantId: 'usr-tenant-1',
    propertyId: 'prop-1',
    rentAmount: 6500000,
    startDate: '2025-10-25',
    expiryDate: '2026-10-25', // Exactly 42 days from today in mock scenario
    renewalDate: '2026-10-25',
    depositPaid: 6500000,
    status: 'Due Soon',
    gracePeriodDays: 7,
    outstandingBalance: 0,
    lastReminderSentAt: '2026-09-01T10:00:00Z',
    lastReminderType: '60 days before expiry'
  },
  {
    id: 'tenancy-2',
    tenantId: 'usr-tenant-2',
    propertyId: 'prop-2',
    rentAmount: 5200000,
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    renewalDate: '2026-12-31',
    depositPaid: 5200000,
    status: 'Active',
    gracePeriodDays: 7,
    outstandingBalance: 0
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-101',
    tenantId: 'usr-tenant-1',
    tenantName: 'John Doe',
    propertyId: 'prop-1',
    propertyTitle: 'Royal Palm Heights - Luxury 3 Bedroom Penthouse',
    amount: 6500000,
    paymentMethod: 'Bank Transfer',
    reference: 'TRX-SSL-2025-001',
    bankUsed: 'Guaranty Trust Bank (GTB)',
    paymentDate: '2025-10-20',
    description: 'Annual rent renewal payment for 2025-2026 tenancy period',
    status: 'Confirmed',
    verifiedBy: 'Amina Bello (Accountant)',
    verificationDate: '2025-10-21',
    createdAt: '2025-10-20T14:30:00Z'
  },
  {
    id: 'pay-102',
    tenantId: 'usr-tenant-1',
    tenantName: 'John Doe',
    propertyId: 'prop-1',
    propertyTitle: 'Royal Palm Heights - Luxury 3 Bedroom Penthouse',
    amount: 6500000,
    paymentMethod: 'Bank Transfer',
    reference: 'TRX-SSL-2026-089',
    bankUsed: 'Zenith Bank Plc',
    paymentDate: '2026-09-10',
    description: 'Upcoming rent renewal transfer submission for period Oct 2026 - Oct 2027',
    receiptProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    status: 'Pending Verification',
    createdAt: '2026-09-10T16:45:00Z'
  }
];

export const INITIAL_RECEIPTS: Receipt[] = [
  {
    id: 'rec-101',
    receiptNumber: 'SSL-REC-2025-001',
    paymentId: 'pay-101',
    tenantId: 'usr-tenant-1',
    tenantName: 'John Doe',
    propertyId: 'prop-1',
    propertyTitle: 'Royal Palm Heights - Luxury 3 Bedroom Penthouse',
    amountPaid: 6500000,
    paymentMethod: 'Direct Bank Transfer',
    transactionReference: 'TRX-SSL-2025-001',
    paymentDate: '2025-10-20',
    rentPeriodStart: '2025-10-25',
    rentPeriodEnd: '2026-10-25',
    nextRentDueDate: '2026-10-25',
    issuedAt: '2025-10-21T09:00:00Z',
    companyInfo: {
      name: 'SAMSON & SON LTD.',
      address: '14 Marina Road, Victoria Island, Lagos, Nigeria',
      phone: '+234 803 111 2233',
      email: 'finance@samsonandson.com'
    }
  }
];

export const INITIAL_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'maint-1',
    tenantId: 'usr-tenant-1',
    tenantName: 'John Doe',
    propertyId: 'prop-1',
    propertyTitle: 'Royal Palm Heights - Penthouse Unit 4B',
    roomLocation: 'Master En-Suite Bathroom',
    category: 'Plumbing',
    priority: 'High',
    description: 'Water pressure in the master shower mixer valve dropped significantly after municipal pipe maintenance.',
    status: 'In Progress',
    assignedStaffId: 'usr-pm-1',
    assignedStaffName: 'Engr. Babatunde Lawal',
    dateReported: '2026-09-08',
    comments: [
      {
        author: 'John Doe',
        role: 'Tenant',
        comment: 'Reported issue along with photo of shower pressure test.',
        date: '2026-09-08T09:00:00Z'
      },
      {
        author: 'Engr. Babatunde Lawal',
        role: 'Property Manager',
        comment: 'Plumber dispatched with replacement pressure regulator valve.',
        date: '2026-09-09T11:30:00Z'
      }
    ]
  },
  {
    id: 'maint-2',
    tenantId: 'usr-tenant-2',
    tenantName: 'Dr. Elizabeth Okonjo',
    propertyId: 'prop-2',
    propertyTitle: 'Pinnacle Terrace - House 12',
    roomLocation: 'Living Room Generator Switch',
    category: 'Generator/Power',
    priority: 'Emergency',
    description: 'Automatic Transfer Switch (ATS) delay timer tripped during power transition.',
    status: 'Resolved',
    assignedStaffId: 'usr-pm-1',
    assignedStaffName: 'Engr. Babatunde Lawal',
    dateReported: '2026-08-20',
    dateResolved: '2026-08-21',
    comments: [
      {
        author: 'Engr. Babatunde Lawal',
        role: 'Property Manager',
        comment: 'Replaced 100A ATS contactor coil. System re-tested and operational.',
        date: '2026-08-21T14:00:00Z'
      }
    ]
  }
];

export const INITIAL_DOCUMENTS: TenancyDocument[] = [
  {
    id: 'doc-1',
    title: 'Tenancy Agreement 2025-2026',
    category: 'Tenancy Agreement',
    tenantId: 'usr-tenant-1',
    propertyId: 'prop-1',
    fileUrl: '#',
    fileType: 'PDF',
    uploadDate: '2025-10-25'
  },
  {
    id: 'doc-2',
    title: 'Official Rent Receipt SSL-REC-2025-001',
    category: 'Rent Receipt',
    tenantId: 'usr-tenant-1',
    propertyId: 'prop-1',
    fileUrl: '#',
    fileType: 'PDF',
    uploadDate: '2025-10-21'
  },
  {
    id: 'doc-3',
    title: 'Pre-Occupancy Property Condition Report',
    category: 'Inspection Report',
    tenantId: 'usr-tenant-1',
    propertyId: 'prop-1',
    fileUrl: '#',
    fileType: 'PDF',
    uploadDate: '2025-10-24'
  }
];

export const INITIAL_INSPECTION_REPORTS: InspectionReport[] = [
  {
    id: 'insp-1',
    propertyId: 'prop-1',
    propertyTitle: 'Royal Palm Heights - Luxury 3 Bed Penthouse',
    tenantId: 'usr-tenant-1',
    tenantName: 'John Doe',
    inspectorName: 'Chidi Nwosu (Agent)',
    inspectionDate: '2026-06-15',
    condition: 'Excellent',
    issuesFound: 'Minor wear on balcony railing paint due to sea breeze corrosion.',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    ],
    comments: 'Tenant maintains property exceptionally well. All electrical and AC units functioning at full capacity.',
    recommendedAction: 'Apply marine-grade anti-rust paint touch-up during annual maintenance routine.',
    createdAt: '2026-06-15T14:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'usr-tenant-1',
    title: 'Rent Expiry Warning',
    message: 'Your tenancy for Royal Palm Heights Penthouse expires on 25 October 2026 (42 days remaining). Please make early arrangements for rent renewal.',
    type: 'Rent Reminder',
    isRead: false,
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'usr-tenant-1',
    title: 'Bank Transfer Payment Submitted',
    message: 'Your payment submission of ₦6,500,000 for rent renewal (Ref: TRX-SSL-2026-089) has been received and is currently Pending Verification by our accounts team.',
    type: 'Payment Confirmation',
    isRead: false,
    createdAt: '2026-09-10T16:46:00Z'
  },
  {
    id: 'notif-3',
    userId: 'usr-tenant-1',
    title: 'Maintenance Update',
    message: 'Engr. Babatunde Lawal updated status on request #maint-1 (Plumbing) to In Progress.',
    type: 'Maintenance Update',
    isRead: true,
    createdAt: '2026-09-09T11:30:00Z'
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    name: 'Chief Oladipo Johnson',
    email: 'oladipo.j@johnsoncorps.com',
    phone: '+234 802 999 8877',
    propertyId: 'prop-3',
    propertyTitle: 'Samson Plaza - Commercial Office Space',
    subject: 'Lease Terms Inquiry for Commercial Space in Abuja',
    message: 'Good day. Our financial consulting firm is interested in leasing 350 sqm at Samson Plaza Maitama. Please send full breakdown of service charge and utility provisions.',
    status: 'New',
    createdAt: '2026-09-11T10:15:00Z'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Barrister Kenneth Nwachukwu',
    customerRole: 'Commercial Lease Tenant, Lagos',
    comment: 'SAMSON & SON LTD has managed our corporate offices in Victoria Island for over 6 years. Their maintenance response speed and transparent invoicing set the benchmark in Nigerian real estate.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    approved: true,
    createdAt: '2024-05-10T10:00:00Z'
  },
  {
    id: 'test-2',
    customerName: 'Mrs. Folake Adebayo',
    customerRole: 'Property Owner / Landlord',
    comment: 'As a diaspora property owner living in London, handing my residential apartments to SAMSON & SON LTD was the best decision. Zero vacancy rates, automated rent collection, and detailed financial reports every quarter.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    approved: true,
    createdAt: '2024-06-18T14:30:00Z'
  },
  {
    id: 'test-3',
    customerName: 'Engr. Donald Ebere',
    customerRole: 'Residential Tenant, Lekki Phase 1',
    comment: 'The tenant portal makes paying rent and submitting maintenance requests completely stress-free. Receipts are generated automatically, and automatic renewal reminders prevent any last-minute rushes.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    approved: true,
    createdAt: '2024-07-22T09:15:00Z'
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I pay my rent through the SAMSON & SON LTD tenant portal?',
    answer: 'Log into your tenant dashboard, navigate to the "Pay Rent" section, and view SAMSON & SON LTD official bank details. Make a direct bank transfer, then fill out the payment submission form with your transaction reference number and optional receipt proof. Our accounts team will verify your transfer and issue an official receipt.',
    category: 'Rent Payment',
    order: 1
  },
  {
    id: 'faq-2',
    question: 'When do rent renewal reminders start sending?',
    answer: 'Our automated rent renewal monitoring engine begins sending notification alerts 60 days prior to your tenancy expiry date. Additional reminders are dispatched at 30 days, 14 days, 7 days, 3 days, 1 day, and on the exact renewal due date via both Email and SMS.',
    category: 'Rent Renewal',
    order: 2
  },
  {
    id: 'faq-3',
    question: 'How quickly are maintenance requests attended to?',
    answer: 'Emergency requests (e.g., severe power failure or major plumbing leaks) are assigned within 1 hour. High-priority items are addressed within 24 hours, while routine items are handled within 48 to 72 hours. You can monitor the real-time status tracker in your tenant portal.',
    category: 'Maintenance',
    order: 3
  },
  {
    id: 'faq-4',
    question: 'Where can I access my official tenancy agreement and receipts?',
    answer: 'All official documents including your Tenancy Agreement, verified Rent Receipts, and Property Inspection Reports are permanently stored under the "Tenancy Documents" tab in your tenant portal and can be viewed or printed at any time.',
    category: 'Agreements',
    order: 4
  },
  {
    id: 'faq-5',
    question: 'What fees are included in the property deposit?',
    answer: 'Standard tenancy packages typically require 1-year rent in advance, a refundable Caution Deposit (for damages), legal fees (5-10%), agency commission (10%), and applicable annual Estate Service Charges.',
    category: 'General',
    order: 5
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  companyName: 'SAMSON & SON LTD.',
  tagline: 'Professional Property Management You Can Trust',
  address: '14 Marina Road, Victoria Island, Lagos State, Nigeria',
  phone: '+234 803 111 2233',
  email: 'info@samsonandson.com',
  whatsAppNumber: '+2348031112233',
  currencySymbol: '₦',
  bankDetails: {
    bankName: 'Guaranty Trust Bank (GTB)',
    accountName: 'SAMSON & SON LTD. - CLIENT RENT ACCOUNT',
    accountNumber: '0123456789',
    paymentInstructions: 'Please state your Tenant Name & Property Unit as the transaction narration or transfer remarks.',
    sortCode: '058152012'
  },
  reminderConfig: {
    scheduleDays: [60, 30, 14, 7, 3, 1, 0, -1],
    emailEnabled: true,
    smsEnabled: true,
    smsTemplate: 'Dear {{tenantName}}, your rent for {{propertyName}} expires on {{expiryDate}}. Amount due: ₦{{rentAmount}}. Please log into SAMSON & SON LTD portal to complete renewal.',
    emailSubjectTemplate: 'SAMSON & SON LTD. - Tenancy Rent Renewal Notice for {{propertyName}}'
  },
  smsProvider: 'Termii (Nigeria)',
  emailProvider: 'SendGrid',
  paymentGateway: 'Bank Transfer'
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'usr-admin-1',
    userName: 'Chief Samson Olatunji',
    userRole: 'super_admin',
    action: 'Payment Verified',
    details: 'Verified bank transfer TRX-SSL-2025-001 of ₦6,500,000 for tenant John Doe (Penthouse 4B)',
    timestamp: '2025-10-21T09:00:00Z',
    ipAddress: '102.89.23.12'
  },
  {
    id: 'log-2',
    userId: 'usr-pm-1',
    userName: 'Engr. Babatunde Lawal',
    userRole: 'property_manager',
    action: 'Maintenance Assigned',
    details: 'Assigned plumbing maintenance request #maint-1 to vendor QuickFix Ltd.',
    timestamp: '2026-09-09T11:30:00Z',
    ipAddress: '102.89.44.88'
  }
];

export const INITIAL_REMINDER_LOGS: ReminderLog[] = [
  {
    id: 'remlog-1',
    tenantId: 'usr-tenant-1',
    tenantName: 'John Doe',
    propertyTitle: 'Royal Palm Heights - Luxury 3 Bedroom Penthouse',
    daysUntilExpiry: 60,
    channel: 'Both',
    status: 'Delivered',
    sentAt: '2026-09-01T10:00:00Z',
    messagePreview: 'Dear John Doe, your rent for Royal Palm Heights expires on 25 October 2026. Please renew early.'
  }
];
