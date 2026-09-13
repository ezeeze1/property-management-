import React from 'react';
import {
  Building2,
  Home,
  FileCheck2,
  Coins,
  Wrench,
  SearchCheck,
  Building,
  Briefcase,
  KeyRound,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  onContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onContact }) => {
  const services = [
    {
      icon: <Home className="w-6 h-6 text-amber-500" />,
      title: 'Residential Property Management',
      description: 'End-to-end management of luxury apartments, duplexes, penthouses, and residential estates. Complete tenant screening, lease enforcement, and routine maintenance.'
    },
    {
      icon: <Building2 className="w-6 h-6 text-amber-500" />,
      title: 'Commercial Property Management',
      description: 'Corporate office plazas, retail complexes, and industrial warehouses in Lagos, Abuja, and Port Harcourt. Service charge budgeting, HVAC maintenance, and security administration.'
    },
    {
      icon: <KeyRound className="w-6 h-6 text-amber-500" />,
      title: 'Property Leasing',
      description: 'Strategic tenant matching for high-net-worth individuals, diplomatic missions, and corporate executives. Pre-vetted tenancy agreements and inventory reports.'
    },
    {
      icon: <Building className="w-6 h-6 text-amber-500" />,
      title: 'Property Sales & Acquisition',
      description: 'Buying and selling verified titled real estate (Certificate of Occupancy, Governor’s Consent). Transparent valuation and legal title verification.'
    },
    {
      icon: <Coins className="w-6 h-6 text-amber-500" />,
      title: 'Rent Collection & Accounting',
      description: 'Automated rent collection, digital receipt issuance, direct bank payment verification, and quarterly financial accounting for landlords.'
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-amber-500" />,
      title: 'Tenant Management & Portal Services',
      description: 'Dedicated tenant self-service portal featuring 60-day automated rent renewal reminders, digital lease document access, and instant payment logs.'
    },
    {
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      title: 'Property Maintenance & Emergency Repairs',
      description: '24/7 facility response for plumbing, electrical systems, generators, water treatment plants, and structural repairs managed by certified engineers.'
    },
    {
      icon: <SearchCheck className="w-6 h-6 text-amber-500" />,
      title: 'Property Inspection & Condition Reports',
      description: 'Routine quarterly inspections, pre-occupancy condition logs, and move-out assessments to preserve landlord capital value.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: 'Facility Management',
      description: 'Comprehensive estate services including 24/7 uniformed security, waste management, swimming pool maintenance, and green landscaping.'
    },
    {
      icon: <Briefcase className="w-6 h-6 text-amber-500" />,
      title: 'Real Estate Consultancy & Advisory',
      description: 'Expert market analysis, yield optimization, feasibility studies, and legal advisory for property developers and diaspora investors.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Professional Real Estate Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
            Comprehensive Property Services by SAMSON & SON LTD.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We provide full-spectrum property management, tenancy administration, and facility engineering designed for discerning landlords, tenants, and institutional investors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md group-hover:bg-amber-500 transition-colors">
                  <div className="group-hover:text-slate-950 transition-colors">
                    {srv.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-amber-600 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Corporate Service</span>
                <button
                  onClick={onContact}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  Inquire <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
