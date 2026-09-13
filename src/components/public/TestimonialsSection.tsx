import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { Star, Quote, PlusCircle, CheckCircle2, User } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onSubmitTestimonial: (test: { customerName: string; customerRole: string; comment: string; rating: number }) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onSubmitTestimonial
}) => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    customerRole: 'Tenant',
    comment: '',
    rating: 5
  });

  const approvedList = (testimonials || []).filter(t => t.approved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitTestimonial(form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setForm({ customerName: '', customerRole: 'Tenant', comment: '', rating: 5 });
    }, 2000);
  };

  return (
    <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Client Satisfaction
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              What Tenants & Landlords Say About SAMSON & SON LTD.
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Share Your Experience
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approvedList.map(item => (
            <div
              key={item.id}
              className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl relative"
            >
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-4 right-4" />
              
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center gap-3">
                {item.photoUrl ? (
                  <img src={item.photoUrl} alt={item.customerName} className="w-10 h-10 rounded-full object-cover border border-amber-500/30" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    {item.customerName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-white">{item.customerName}</div>
                  <div className="text-[10px] text-amber-400 font-medium">{item.customerRole || 'Verified Client'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-md w-full text-white space-y-4 shadow-2xl relative">
            <h3 className="text-lg font-bold font-serif text-white">Submit Customer Review</h3>

            {submitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Review Submitted!</div>
                <p className="text-xs text-slate-400">Thank you. Your feedback will be reviewed and published shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={e => setForm({ ...form, customerName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Chief Adeyemi"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">Role / Property</label>
                  <input
                    type="text"
                    value={form.customerRole}
                    onChange={e => setForm({ ...form, customerRole: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="e.g. Tenant at Royal Palm Penthouse"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value={5}>5 Stars - Outstanding Service</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Share your experience with SAMSON & SON LTD property management..."
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-1/2 bg-slate-800 text-slate-300 font-medium py-2 rounded-xl text-xs hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-amber-500 text-slate-950 font-bold py-2 rounded-xl text-xs hover:bg-amber-400"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
