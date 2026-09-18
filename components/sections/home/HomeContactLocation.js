'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { MapPin, ExternalLink, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitEnquiry, ENQUIRY_INTEREST_OPTIONS } from '@/lib/enquiry';
import { cn } from '@/lib/utils';

/**
 * 08 — HomeContactLocation: Editorial Split (Enquiry Form + Official Map)
 * 
 * LEFT:
 * - "Let's Talk About Land"
 * - Direct on-page enquiry form matching standard fields:
 *   Name, Phone, Email, Interest, Message
 * - Uses verified submitEnquiry with validation and confirmation.
 * 
 * RIGHT:
 * - "Find Earth Heritage"
 * - Official Google Maps embed in an integrated architectural container.
 * - Zero fabricated postal addresses or telephone numbers.
 */
export default function HomeContactLocation() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    interestedIn: 'General Enquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Please enter your contact phone number';
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 10) {
      errs.phoneNumber = 'Please enter a valid 10-digit number';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await submitEnquiry({
        ...formData,
        source: 'Corporate Home Page On-Page Form'
      });
      if (res.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(res.message || 'Unable to submit enquiry. Please try again.');
      }
    } catch {
      setSubmitError('A connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-location"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF7F2] text-[#111613] py-20 sm:py-28 lg:py-32 border-b border-[#E0D4BC] overflow-hidden"
      aria-label="Enquiry and Location"
    >
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-60" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* LEFT: Enquiry Form (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <MotionReveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8D8] border border-[#DDD3BF] text-xs font-mono font-semibold tracking-widest text-[#15341C] uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                  <span>Begin a Conversation</span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-[1.14]">
                  Let&rsquo;s Talk About Land
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.25}>
                <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed">
                  Inquiries are handled directly for farmland ownership and professional farm management conversations. Leave your details and our team will get in touch.
                </p>
              </MotionReveal>
            </div>

            {/* Form Card */}
            <MotionReveal delay={0.3} className="flex-1">
              <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#DDD3BF] p-6 sm:p-8 shadow-sm">
                {isSuccess ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#E8F5E9] border border-[#81C784] text-[#2E7D32] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7 text-[#2E7D32]" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-[#111613]">
                      Thank you for reaching out
                    </h3>
                    <p className="font-sans text-sm text-[#4E5B51] max-w-sm mx-auto leading-relaxed">
                      Our team at Earth Heritage has received your message and will connect with you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          fullName: '',
                          phoneNumber: '',
                          email: '',
                          interestedIn: 'General Enquiry',
                          message: ''
                        });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-semibold text-[#15341C] hover:underline pt-2"
                    >
                      <span>Send another inquiry</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {submitError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label htmlFor="home-name" className="block text-xs font-mono uppercase tracking-wider text-[#526356] font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        id="home-name"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your full name"
                        className={cn(
                          'w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#111613] placeholder-[#8C9B90] focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B]',
                          errors.fullName ? 'border-red-400' : 'border-[#DDD3BF]'
                        )}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Phone & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="home-phone" className="block text-xs font-mono uppercase tracking-wider text-[#526356] font-semibold mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="home-phone"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={cn(
                            'w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#111613] placeholder-[#8C9B90] focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B]',
                            errors.phoneNumber ? 'border-red-400' : 'border-[#DDD3BF]'
                          )}
                        />
                        {errors.phoneNumber && <p className="text-[11px] text-red-600 mt-1">{errors.phoneNumber}</p>}
                      </div>

                      <div>
                        <label htmlFor="home-email" className="block text-xs font-mono uppercase tracking-wider text-[#526356] font-semibold mb-1">
                          Email Address
                        </label>
                        <input
                          id="home-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3BF] text-sm text-[#111613] placeholder-[#8C9B90] focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B]"
                        />
                      </div>
                    </div>

                    {/* Interest Dropdown */}
                    <div>
                      <label htmlFor="home-interest" className="block text-xs font-mono uppercase tracking-wider text-[#526356] font-semibold mb-1">
                        Area of Interest
                      </label>
                      <select
                        id="home-interest"
                        value={formData.interestedIn}
                        onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3BF] text-sm text-[#111613] focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B]"
                      >
                        {ENQUIRY_INTEREST_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="home-message" className="block text-xs font-mono uppercase tracking-wider text-[#526356] font-semibold mb-1">
                        Message / Query
                      </label>
                      <textarea
                        id="home-message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you are looking for..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3BF] text-sm text-[#111613] placeholder-[#8C9B90] focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </MotionReveal>
          </div>

          {/* RIGHT: Official Google Maps Embed (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <MotionReveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8D8] border border-[#DDD3BF] text-xs font-mono font-semibold tracking-widest text-[#15341C] uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                  <span>Find Earth Heritage</span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-[1.14]">
                  Our Registered Location
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed">
                  Connect with Earth Heritage Private Limited on official Google Maps or navigate to our presence in Bengaluru, Karnataka.
                </p>
              </MotionReveal>
            </div>

            {/* Map Frame */}
            <MotionReveal delay={0.35} className="flex-1">
              <div className="h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDD3BF] bg-white shadow-sm flex flex-col justify-between min-h-[360px]">
                
                {/* Google Maps Iframe */}
                <div className="relative w-full flex-1 min-h-[280px] sm:min-h-[320px] bg-[#EFECE6]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0269684361006!2d77.49423207358898!3d12.970126114913551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d56f1c4cc8d%3A0x3806e5fa4984ee8!2sEarth%20Heritage%20Private%20Limited!5e0!3m2!1sen!2sin!4v1789637384205!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Earth Heritage Private Limited location on Google Maps"
                    className="w-full h-full block min-h-[280px]"
                  />
                </div>

                {/* Map Footer Bar */}
                <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#EAE0CD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#15341C] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-medium text-[#111613]">
                        Earth Heritage Private Limited
                      </h3>
                      <p className="text-xs font-sans text-[#5A695E]">
                        Bengaluru, Karnataka, India
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Earth+Heritage+Private+Limited"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#15341C] hover:text-[#1E460B] transition-colors py-2 px-3.5 rounded-full border border-[#D5C6A6] bg-white hover:bg-[#F5EEDB] shadow-xs"
                    aria-label="Open Earth Heritage Private Limited location in Google Maps"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                  </a>
                </div>

              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
