import React, { useState } from 'react';
import { Property, SystemSettings } from '../../types';
import {
  X,
  MapPin,
  Bed,
  Bath,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Calendar,
  Send,
  Building,
  DollarSign,
  FileText,
  ChevronLeft,
  ChevronRight,
  PhoneCall
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  settings: SystemSettings;
  onClose: () => void;
  onSubmitEnquiry: (enquiry: { name: string; email: string; phone: string; message: string; propertyId: string; propertyTitle: string }) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  settings,
  onClose,
  onSubmitEnquiry
}) => {
  if (!property) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'terms' | 'schedule'>('overview');
  const [enquirySent, setEnquirySent] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello, I am interested in scheduling an inspection for ${property.title} in ${property.location}.`
  });

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(property.price);

  const cautionFormatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(property.cautionFee);

  const agencyCalculated = (property.price * property.agencyFeePercent) / 100;
  const legalCalculated = (property.price * property.legalFeePercent) / 100;
  const totalUpfront = property.price + property.cautionFee + agencyCalculated + legalCalculated;

  const totalUpfrontFormatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(totalUpfront);

  const formattedWhatsApp = settings.whatsAppNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hello SAMSON & SON LTD, I wish to inspect ${property.title} (${property.location}). Please confirm agent availability.`
  );

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEnquiry({
      ...formState,
      propertyId: property.id,
      propertyTitle: property.title
    });
    setEnquirySent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 z-10">
          <div>
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              {property.purpose} • {property.type}
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif line-clamp-1">{property.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Gallery Slider */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 h-72 sm:h-96 shadow-inner">
            <img
              src={property.images[activeImgIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIndex((activeImgIndex - 1 + property.images.length) % property.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImgIndex((activeImgIndex + 1) % property.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-xl backdrop-blur-md">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImgIndex === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Location</div>
                <div className="font-bold line-clamp-1">{property.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Bedrooms</div>
                <div className="font-bold">{property.bedrooms} Beds</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Bathrooms</div>
                <div className="font-bold">{property.bathrooms} Baths</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Status</div>
                <div className="font-bold text-emerald-700">{property.status}</div>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
            {[
              { id: 'overview', label: 'Property Overview' },
              { id: 'amenities', label: 'Amenities & Features' },
              { id: 'terms', label: 'Financials & Lease Terms' },
              { id: 'schedule', label: 'Schedule Inspection' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`pb-2 transition-all ${
                  activeTab === t.id
                    ? 'text-amber-600 border-b-2 border-amber-500 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
              <p>{property.description}</p>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <span className="font-bold">Managed exclusively by SAMSON & SON LTD:</span> All rent payments are processed directly into SAMSON & SON LTD official corporate accounts. Verified digital receipts are issued automatically.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="bg-slate-900 text-white p-5 rounded-xl space-y-3">
                <div className="text-xs text-slate-400 font-semibold uppercase">Total Upfront Estimate Breakdown</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2 border-t border-slate-800">
                  <div>
                    <div className="text-slate-400">Annual Rent</div>
                    <div className="text-base font-bold text-amber-400">{formattedPrice}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Caution Deposit</div>
                    <div className="text-base font-bold text-white">{cautionFormatted}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Agency ({property.agencyFeePercent}%)</div>
                    <div className="text-base font-bold text-white">₦{agencyCalculated.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Legal ({property.legalFeePercent}%)</div>
                    <div className="text-base font-bold text-white">₦{legalCalculated.toLocaleString()}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-300">Estimated Total Package:</span>
                  <span className="text-xl font-extrabold text-amber-400 font-serif">{totalUpfrontFormatted}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
                <div className="font-bold text-slate-900 mb-1">Standard Terms & Conditions:</div>
                {property.termsAndConditions}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              {enquirySent ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Inspection Request Submitted!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you! An assigned SAMSON & SON LTD property manager will reach out to you at {formState.phone} within 2 hours to confirm your property viewing time.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase">Book a physical or virtual inspection</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                        placeholder="Chief Bamidele"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                        placeholder="+234 803 000 0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="bamidele@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Inspection Note / Preferred Date</label>
                    <textarea
                      rows={2}
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Send className="w-4 h-4" /> Submit Inspection Schedule
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Bottom Direct CTA Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${formattedWhatsApp}?text=${encodedMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Agent Now
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" /> Call {settings.phone}
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-2"
            >
              Close Window
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
