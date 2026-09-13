import React from 'react';
import { Property } from '../../types';
import { MapPin, Bed, Bath, ShieldCheck, Eye, MessageSquare, Tag } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
  whatsAppNumber: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onEnquire,
  whatsAppNumber
}) => {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(property.price);

  const formattedWhatsApp = whatsAppNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hello SAMSON & SON LTD, I am interested in property: ${property.title} (Ref ID: ${property.id}) at ${property.location}. Please provide inspection details.`
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Property Thumbnail Image */}
      <div className="relative h-64 overflow-hidden bg-slate-900">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

        {/* Status Tag */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-md ${
            property.status === 'Available'
              ? 'bg-emerald-600/90 text-white'
              : property.status === 'Occupied'
              ? 'bg-slate-900/90 text-amber-400 border border-amber-500/30'
              : 'bg-amber-600/90 text-white'
          }`}>
            {property.status}
          </span>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900/80 text-white border border-slate-700/50">
            {property.purpose}
          </span>
        </div>

        {/* Furnished Tag */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-slate-950/80 text-slate-300 backdrop-blur-sm border border-slate-800">
            {property.furnishedStatus}
          </span>
        </div>

        {/* Bottom Image Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <div className="text-[10px] text-amber-300 font-medium uppercase tracking-wider">
              {property.period === 'annual' ? 'Per Annum' : property.period}
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-serif drop-shadow-md">
              {formattedPrice}
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-sm">
            {property.type}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors font-serif">
            {property.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        {/* Specs Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1 font-medium">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1 font-medium">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Title
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => onViewDetails(property)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" /> View Details
          </button>

          <a
            href={`https://wa.me/${formattedWhatsApp}?text=${encodedMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Enquire
          </a>
        </div>
      </div>
    </div>
  );
};
