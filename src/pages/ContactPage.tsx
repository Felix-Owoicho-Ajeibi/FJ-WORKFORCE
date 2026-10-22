import React, { useState } from 'react';
import { useStore } from '../lib/store';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { sendContactMessage } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      sendContactMessage({
        name,
        email,
        phone,
        subject,
        message
      });

      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Contact error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-[#0B1E36] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Get In Touch
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Contact F&J Workforce Limited
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Our corporate office is located on Eleko Beach Road, Ibeju-Lekki, Lagos State. Reach out for recruitment enquiries, employer workforce solutions, or candidate assistance.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 5 Columns: Official Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <h3 className="font-heading text-xl font-bold text-[#0B1E36] border-b border-slate-100 pb-3">
                  Corporate Office Information
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Physical Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Registered Office Address:</span>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Eleko Beach Road, Ibeju-Lekki, Lagos State, Nigeria.
                      </p>
                      <span className="text-[11px] text-[#045B0D] font-medium block mt-1">
                        Convenient access to Lekki Free Zone & Lekki Deep Sea Port
                      </span>
                    </div>
                  </div>

                  {/* Telephone Numbers */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Telephone & WhatsApp:</span>
                      <p className="text-slate-600 mt-0.5 flex flex-wrap gap-2">
                        <a href="tel:09116176563" className="hover:text-[#045B0D] font-semibold">
                          09116176563
                        </a>
                        <span className="text-slate-400">|</span>
                        <a href="tel:09022542150" className="hover:text-[#045B0D] font-semibold">
                          09022542150
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Electronic Mail:</span>
                      <a
                        href="mailto:info@fjworkforce.com.ng"
                        className="text-slate-600 hover:text-[#045B0D] font-semibold block mt-0.5"
                      >
                        info@fjworkforce.com.ng
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E8F5E9] text-[#045B0D] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Operating Hours:</span>
                      <p className="text-slate-600 mt-0.5">
                        Monday – Friday: 8:00 AM – 5:00 PM<br />
                        Saturday & Sunday: Emergency Shift Operations Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Location Map Mockup Card */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">Location Coordinates: Ibeju-Lekki</span>
                  <span className="text-[11px] text-emerald-400">Eleko Junction Corridor</span>
                </div>
                <div className="p-6 bg-slate-100 text-center space-y-2 border-b border-slate-200">
                  <MapPin className="w-8 h-8 text-red-600 mx-auto animate-bounce" />
                  <h4 className="font-heading text-sm font-bold text-slate-800">
                    Eleko Beach Road, Ibeju-Lekki
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Minutes from Eleko Junction, Dangote Jetty, and Lekki Coastal Road extension.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Eleko+Beach+Road+Ibeju+Lekki+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#045B0D] hover:underline pt-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#045B0D]">
                  Direct Message Desk
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">
                  Send Us an Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Whether you are an employer seeking talent or a professional with questions, our administrative team is ready to assist.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-6 bg-[#E8F5E9] border border-emerald-300 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#045B0D] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-[#045B0D]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-700 max-w-md mx-auto">
                    Thank you for reaching out to F&J Workforce Limited. Your enquiry has been routed to our correspondence team.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-4 py-2 bg-[#045B0D] text-white text-xs font-bold rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Adebayo Johnson"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08012345678"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Inquiry Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Partnership or Verification Inquiry"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please write your questions or comments here..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11851E]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-bold bg-[#045B0D] hover:bg-[#11851E] text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to F&J Workforce</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
