'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Facebook
} from 'lucide-react';
import { submitEnquiry, ENQUIRY_INTEREST_OPTIONS } from '@/lib/enquiry';
import { getWhatsAppUrl } from '@/data/company';
import { cn } from '@/lib/utils';

/**
 * 08 — HomeContactLocation: Exact Match to Layout Format
 * 
 * Layout Hierarchy:
 * - TOP ROW (2 Columns):
 *   - LEFT: Contact Form (Your Name, Your Email, Phone / Subject, Area of Interest, Your Message, Send Message button).
 *   - RIGHT: "Get In Touch" (Contact Us eyebrow, Get In Touch title, narrative, 2x2 Grid [Call Us, Email Us, Website, Address], Follow Us On social icons).
 * - BOTTOM ROW (Full Width):
 *   - Interactive Google Maps Embed spanning 100% across below both columns!
 */
export default function HomeContactLocation() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    interestedIn: 'General Enquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Please enter your phone number';
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 10) {
      errs.phoneNumber = 'Please enter a valid 10-digit phone number';
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
        source: 'Corporate Home Page Get In Touch Form'
      });
      if (res.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(res.message || 'Unable to submit message. Please try again.');
      }
    } catch {
      setSubmitError('A connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsAppUrl = getWhatsAppUrl();

  return (
    <section
      id="contact-location"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF7F2] text-[#111613] pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 overflow-hidden"
      aria-label="Contact and Location"
    >
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-50 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* =========================================================================
            TOP ROW: 2 COLUMNS (LEFT = FORM, RIGHT = GET IN TOUCH)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-18 items-start mb-14 sm:mb-18">
          
          {/* -------------------------------------------------------------
              LEFT COLUMN: CONTACT FORM (6 cols on lg)
              ------------------------------------------------------------- */}
          <div className="lg:col-span-6">
            <MotionReveal delay={0.1}>
              {isSuccess ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#DDD3BF] shadow-sm text-center space-y-4">
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
                        email: '',
                        phoneNumber: '',
                        interestedIn: 'General Enquiry',
                        message: ''
                      });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-semibold text-[#15341C] hover:underline pt-2 cursor-pointer"
                  >
                    <span>Send another inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Your Name */}
                  <div>
                    <label htmlFor="touch-name" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="touch-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Full Name"
                      className={cn(
                        'w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border text-sm text-[#111613] placeholder-[#A0ACA2] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]',
                        errors.fullName ? 'border-red-400' : 'border-[#DDD3BF]'
                      )}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Your Email */}
                  <div>
                    <label htmlFor="touch-email" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                      Your Email
                    </label>
                    <input
                      id="touch-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address"
                      className={cn(
                        'w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border text-sm text-[#111613] placeholder-[#A0ACA2] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]',
                        errors.email ? 'border-red-400' : 'border-[#DDD3BF]'
                      )}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone & Area of Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="touch-phone" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="touch-phone"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={cn(
                          'w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border text-sm text-[#111613] placeholder-[#A0ACA2] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]',
                          errors.phoneNumber ? 'border-red-400' : 'border-[#DDD3BF]'
                        )}
                      />
                      {errors.phoneNumber && <p className="text-[11px] text-red-600 mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                      <label htmlFor="touch-interest" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                        Area of Interest
                      </label>
                      <select
                        id="touch-interest"
                        value={formData.interestedIn}
                        onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-[#DDD3BF] text-sm text-[#111613] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
                      >
                        {ENQUIRY_INTEREST_OPTIONS.map((opt) => {
                          const val = typeof opt === 'string' ? opt : opt.value;
                          const label = typeof opt === 'string' ? opt : opt.label;
                          return (
                            <option key={val} value={val}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Your Message */}
                  <div>
                    <label htmlFor="touch-message" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      id="touch-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Message"
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-[#DDD3BF] text-sm text-[#111613] placeholder-[#A0ACA2] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C] resize-none"
                    />
                  </div>

                  {/* Send Message Button (Styled like reference mockup) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3.5 px-8 rounded-xl bg-[#C6923C] hover:bg-[#B3812E] text-white text-xs font-semibold uppercase tracking-[0.16em] shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </MotionReveal>
          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: "GET IN TOUCH" CONTACT DETAILS (6 cols on lg)
              ------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <MotionReveal delay={0.15}>
              <div className="space-y-3">
                <span className="font-serif italic text-base sm:text-lg text-[#C6923C]">
                  Contact Us
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-tight">
                  Get In Touch
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#4E5C50] leading-relaxed max-w-lg">
                  Direct conversations on farmland ownership and professional farm management, or to schedule a private guided estate walkthrough across our managed acreage.
                </p>
              </div>
            </MotionReveal>

            {/* 2x2 Contact Info Grid */}
            <MotionReveal delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Call Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-[#D5C09D] bg-white flex items-center justify-center text-[#C6923C] shrink-0 shadow-xs">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base font-medium text-[#111613]">
                      Call Us
                    </h4>
                    <p className="font-sans text-xs sm:text-[13px] text-[#5A695E]">
                      Direct &bull; WhatsApp Available
                    </p>
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-sans text-xs font-semibold text-[#15341C] hover:text-[#1E460B] hover:underline transition-colors"
                    >
                      Connect on WhatsApp &rarr;
                    </a>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-[#D5C09D] bg-white flex items-center justify-center text-[#C6923C] shrink-0 shadow-xs">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base font-medium text-[#111613]">
                      Email Us
                    </h4>
                    <a
                      href="mailto:contact@earthheritage.in"
                      className="block font-sans text-xs sm:text-[13px] text-[#5A695E] hover:text-[#15341C] transition-colors"
                    >
                      contact@earthheritage.in
                    </a>
                    <span className="text-[11px] font-mono text-[#8C7A5A]">
                      Prompt Response
                    </span>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-[#D5C09D] bg-white flex items-center justify-center text-[#C6923C] shrink-0 shadow-xs">
                    <Globe className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base font-medium text-[#111613]">
                      Website
                    </h4>
                    <p className="font-sans text-xs sm:text-[13px] text-[#5A695E]">
                      www.earthheritage.in
                    </p>
                    <span className="text-[11px] font-mono text-[#8C7A5A]">
                      Corporate Portal
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-[#D5C09D] bg-white flex items-center justify-center text-[#C6923C] shrink-0 shadow-xs">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base font-medium text-[#111613]">
                      Registered Office
                    </h4>
                    <p className="font-sans text-xs sm:text-[13px] text-[#5A695E] leading-snug">
                      Nagarabhavi, Bengaluru, Karnataka 560091
                    </p>
                  </div>
                </div>

              </div>
            </MotionReveal>

            {/* Follow Us On */}
            <MotionReveal delay={0.35}>
              <div className="space-y-3 pt-4 border-t border-[#EAE0CD]">
                <h4 className="font-serif text-sm font-medium text-[#111613]">
                  Follow Us On
                </h4>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
                    { icon: Twitter, label: 'Twitter', href: 'https://x.com' },
                    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' }
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full bg-[#C6923C] hover:bg-[#B3812E] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-105 active:scale-95"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </MotionReveal>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM ROW: FULL WIDTH GOOGLE MAPS EMBED (SPANS BELOW BOTH)
            ========================================================================= */}
        <MotionReveal delay={0.4}>
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDD3BF] bg-white shadow-[0_12px_36px_rgba(17,22,19,0.06)]">
            
            {/* Full Width Map Container */}
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] bg-[#EFECE6]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0269684361006!2d77.49423207358898!3d12.970126114913551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d56f1c4cc8d%3A0x3806e5fa4984ee8!2sEarth%20Heritage%20Private%20Limited!5e0!3m2!1sen!2sin!4v1789637384205!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Earth Heritage Private Limited location on Google Maps"
                className="w-full h-full block"
              />
            </div>

            {/* Map Bottom Information Bar */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#EAE0CD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15341C] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-[#111613]">
                    Earth Heritage Private Limited
                  </h4>
                  <p className="text-xs font-sans text-[#5A695E]">
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Earth+Heritage+Private+Limited"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#15341C] hover:text-[#1E460B] transition-colors py-2 px-4 rounded-full border border-[#D5C6A6] bg-[#FAF7F2] hover:bg-[#F5EEDB] shadow-xs"
                aria-label="Open Earth Heritage Private Limited location in Google Maps"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
              </a>
            </div>

          </div>
        </MotionReveal>

      </Container>
    </section>
  );
}
