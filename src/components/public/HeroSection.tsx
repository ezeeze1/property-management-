import React from 'react';
import { Shield, Building, Award, CheckCircle, ArrowRight, UserCheck, Key, Lock, PhoneCall } from 'lucide-react';

interface HeroSectionProps {
  onViewProperties: () => void;
  onContactUs: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewProperties,
  onContactUs,
  onOpenAuth
}) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Real Estate Nigeria"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>SAMSON & SON LTD. • Official Property Management Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif leading-tight">
              Professional Property Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">You Can Trust</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              SAMSON & SON LTD. delivers corporate-grade residential and commercial property management across Nigeria. From guaranteed rent collection and automated tenancy renewal tracking to 24/7 maintenance dispatch and landlord asset valuation.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onViewProperties}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 text-sm sm:text-base transform hover:-translate-y-0.5"
              >
                <span>View Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewProperties}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all text-sm sm:text-base flex items-center gap-2"
              >
                <Building className="w-4 h-4 text-amber-400" />
                <span>Find a Property</span>
              </button>

              <button
                onClick={onContactUs}
                className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium px-5 py-3.5 rounded-xl border border-slate-800 transition-all text-sm flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Contact Us</span>
              </button>

              <div className="w-full sm:w-auto pt-2 sm:pt-0">
                <button
                  onClick={onOpenAuth}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-semibold underline underline-offset-4 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Existing Tenant Login →</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Rent Reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Direct Bank Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Rent Receipts</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Verified Portal
              </div>

              <h3 className="text-xl font-bold text-white font-serif mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Why Samson & Son Ltd.
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Over 15 years of excellence managing high-value assets in Victoria Island, Ikoyi, Lekki Phase 1, Maitama Abuja, and Port Harcourt.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">150+</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Managed Properties</div>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">98.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Occupancy Rate</div>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">₦2.4B+</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Rent Collected</div>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">24/7</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Maintenance Dispatch</div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-300 font-medium">Tenant Portal Access</span>
                </div>
                <button
                  onClick={onOpenAuth}
                  className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-semibold px-3 py-1.5 rounded-lg border border-amber-500/40 transition-colors"
                >
                  Enter Portal →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
