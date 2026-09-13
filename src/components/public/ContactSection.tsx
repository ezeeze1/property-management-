import React, { useState } from 'react';
import { SystemSettings } from '../../types';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  settings: SystemSettings;
  onSubmitEnquiry: (enq: { name: string; email: string; phone: string; subject: string; message: string }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, onSubmitEnquiry }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Property Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEnquiry(form);
    setSubmitted(true);
  };

  const formattedWhatsApp = settings.whatsAppNumber.replace(/[^0-9]/g, '');

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
            Contact SAMSON & SON LTD.
          </h2>
          <p className="text-slate-600 text-sm">
            Have a question about renting, property management for your building, or tenancy renewal? Speak directly with our corporate advisory team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

              <h3 className="text-xl font-bold font-serif text-amber-400">Headquarters Info</h3>
              
              <div className="space-y-5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Office Address</div>
                    <div className="mt-0.5 text-slate-400">{settings.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Direct Phone Lines</div>
                    <div className="mt-0.5 text-slate-400">{settings.phone} / +234 802 334 5566</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Corporate Email</div>
                    <div className="mt-0.5 text-slate-400">{settings.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Business Hours</div>
                    <div className="mt-0.5 text-slate-400">Monday - Friday: 8:00 AM - 6:00 PM WAT</div>
                    <div className="text-slate-500 text-[10px]">Saturday: 9:00 AM - 2:00 PM (Emergency Desk 24/7)</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${formattedWhatsApp}?text=Hello%20SAMSON%20%26%20SON%20LTD%2C%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Connect via WhatsApp
                </a>
              </div>
            </div>

            {/* Simulated Map Container */}
            <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center space-y-2">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" /> Interactive Location Map
              </div>
              <div className="h-40 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-semibold relative overflow-hidden border border-slate-300">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                  alt="Victoria Island Lagos Map"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center text-white font-bold text-xs">
                  Victoria Island, Lagos HQ
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-6">Send an Official Message</h3>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Enquiry Received!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for contacting SAMSON & SON LTD. Your message has been logged under reference #{Date.now()}. An advisory agent will respond via email/phone shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'General Property Enquiry', message: '' }); }}
                  className="mt-4 bg-slate-900 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="e.g. Chief Oladipo"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="+234 803 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="oladipo@domain.com"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="General Property Enquiry">General Property Enquiry</option>
                    <option value="Rent Renewal Inquiry">Rent Renewal Inquiry</option>
                    <option value="Property Management Services">Property Management Services (Landlord)</option>
                    <option value="Maintenance Assistance">Maintenance Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message Detail *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Official Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
