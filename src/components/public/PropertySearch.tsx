import React from 'react';
import { Search, MapPin, Home, Tag, DollarSign, Bed, Bath, RotateCcw, Filter } from 'lucide-react';

interface PropertySearchProps {
  filters: {
    location: string;
    type: string;
    purpose: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    availability: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    location: string;
    type: string;
    purpose: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    availability: string;
  }>>;
  onReset: () => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  filters,
  setFilters,
  onReset
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-7xl mx-auto -mt-10 relative z-20">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base font-serif">
          <Filter className="w-5 h-5 text-amber-500" />
          <span>Find Available Properties</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-amber-600 font-medium flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" /> Location
          </label>
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
          >
            <option value="">All Locations</option>
            <option value="Victoria Island">Victoria Island, Lagos</option>
            <option value="Lekki Phase 1">Lekki Phase 1, Lagos</option>
            <option value="Ikoyi">Ikoyi, Lagos</option>
            <option value="Ikeja GRA">Ikeja GRA, Lagos</option>
            <option value="Maitama">Maitama, Abuja</option>
            <option value="Port Harcourt">Port Harcourt, Rivers</option>
          </select>
        </div>

        {/* Property Type Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-amber-500" /> Property Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Detached Duplex">Detached Duplex</option>
            <option value="Terrace">Terrace Duplex</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Commercial Office">Commercial Office</option>
            <option value="Retail Space">Retail Space</option>
          </select>
        </div>

        {/* Purpose Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-500" /> Purpose
          </label>
          <select
            name="purpose"
            value={filters.purpose}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
          >
            <option value="">Rent & Sale</option>
            <option value="Rent">For Rent</option>
            <option value="Sale">For Sale</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-amber-500" /> Status
          </label>
          <select
            name="availability"
            value={filters.availability}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
          >
            <option value="">All Statuses</option>
            <option value="Available">Available Now</option>
            <option value="Occupied">Occupied (Managed)</option>
          </select>
        </div>
      </div>

      {/* Second Filter Row: Bedrooms, Bathrooms, Min Price, Max Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-slate-500" /> Bedrooms
          </label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            <option value="">Any Beds</option>
            <option value="1">1+ Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 text-slate-500" /> Bathrooms
          </label>
          <select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            <option value="">Any Baths</option>
            <option value="1">1+ Bathrooms</option>
            <option value="2">2+ Bathrooms</option>
            <option value="3">3+ Bathrooms</option>
            <option value="4">4+ Bathrooms</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-slate-500" /> Min Price (₦)
          </label>
          <input
            type="number"
            name="minPrice"
            placeholder="e.g. 3000000"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-slate-500" /> Max Price (₦)
          </label>
          <input
            type="number"
            name="maxPrice"
            placeholder="e.g. 20000000"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
