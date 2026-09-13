import React from 'react';
import { SystemSettings } from '../../types';
import { Building2, MapPin, Phone, Mail, ShieldCheck, ArrowUpRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  settings: SystemSettings;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, setActiveTab, onOpenAuth }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white font-serif tracking-tight">
                SAMSON & SON <span className="text-amber-400">LTD.</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              SAMSON & SON LTD. is a premier property management and real estate advisory firm operating across Nigeria. We deliver transparent, secure, and professional tenancy management solutions for residential and commercial landlords and tenants.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Certified Real Estate Estate Surveyors & Valuers (NIESV)</span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 border-b border-amber-500/30 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('properties')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Property Listings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  About Company
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('testimonials')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Client Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Tenant */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 border-b border-amber-500/30 pb-2">
              Tenant Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={onOpenAuth} className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
                  Tenant Login <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faq')} className="hover:text-amber-400 transition-colors">
                  Rent Payment FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faq')} className="hover:text-amber-400 transition-colors">
                  Maintenance SLA
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-amber-400 transition-colors">
                  Submit Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-amber-400 transition-colors">
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 border-b border-amber-500/30 pb-2">
              Head Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                Business Hours: Mon - Fri (8:00 AM - 6:00 PM WAT)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">SAMSON & SON LTD.</span> All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => setActiveTab('faq')} className="hover:text-slate-300">FAQ</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
