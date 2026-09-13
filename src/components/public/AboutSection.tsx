import React from 'react';
import { ShieldCheck, Award, Target, Eye, Users, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Established Real Estate Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 leading-tight">
              About SAMSON & SON LTD.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              SAMSON & SON LTD. is a premier property management company registered in Nigeria (RC-1092837). Founded on the core principles of integrity, transparency, efficiency, and exceptional client care, we bridge the gap between discerning property owners and valued tenants.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              With a diversified portfolio of residential penthouses, luxury duplexes, commercial office plazas, and industrial warehouses in Lagos, Abuja, and Port Harcourt, SAMSON & SON LTD. leverages modern property technologies to automate rent renewals, issue digital receipts, and dispatch prompt facility maintenance.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-extrabold text-amber-600 font-serif">15+ Years</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Industry Experience</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-extrabold text-amber-600 font-serif">100%</div>
                <div className="text-xs text-slate-600 font-medium mt-1">Transparent Accounting</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                alt="Samson & Son Corporate Office"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl max-w-xs hidden sm:block border border-slate-800">
              <ShieldCheck className="w-8 h-8 text-amber-400 mb-2" />
              <div className="text-sm font-bold font-serif">Corporate Trust</div>
              <div className="text-xs text-slate-400 mt-1">Authorized bank transfer accounts & audited lease records for complete peace of mind.</div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To deliver seamless, technology-driven property management solutions that preserve asset capital value for landlords while ensuring comfortable, secure, and stress-free living for tenants.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To remain the most trusted, reliable, and technologically advanced property management institution across Sub-Saharan Africa.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Our Core Values</h3>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Integrity & Absolute Honesty</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Timely Rent Dispositions</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 24/7 Facility Responsiveness</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Rigorous Title Verification</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
