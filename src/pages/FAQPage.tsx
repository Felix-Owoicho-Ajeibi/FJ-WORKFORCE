import React, { useState, useMemo } from 'react';
import { useStore } from '../lib/store';
import { Link } from '../lib/router';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Building2,
  Users,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { faqs } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1', 'faq-3']);

  const categories = ['All', 'Candidates', 'Employers', 'Recruitment & Verification', 'General'];

  const publishedFaqs = useMemo(() => faqs.filter((f) => f.isPublished), [faqs]);

  const filteredFaqs = useMemo(() => {
    return publishedFaqs.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [publishedFaqs, selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-[#0B1E36] text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Knowledge Base
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Find answers to common questions about candidate registration, industrial staffing, employer contracts, and background verification.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search question or keyword (e.g. fees, CV, Ibeju-Lekki)..."
                className="w-full pl-11 pr-4 py-3 bg-white text-slate-800 text-xs sm:text-sm rounded-xl focus:outline-none shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQs Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#045B0D] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-heading text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#045B0D]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                        <p>{faq.answer}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            Category: {faq.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-xs">
                No questions found matching your search.
              </div>
            )}
          </div>

          {/* Help Callout */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-3">
            <h3 className="font-heading text-lg font-bold text-[#0B1E36]">
              Still have an unanswered question?
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our team in Ibeju-Lekki is available to discuss your specific corporate workforce needs or candidate enquiries.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-[#045B0D] text-white text-xs font-bold rounded-xl"
              >
                Contact Our Helpdesk
              </Link>
              <a
                href="https://wa.me/2349022542150?text=Hello%20F%26J%20Workforce%20Limited%2C%20I%20have%20an%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp Instant Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
