'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { submitEnquiry, ENQUIRY_INTEREST_OPTIONS } from '@/lib/enquiry';
import { getWhatsAppUrl, companyData } from '@/data/company';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Globe,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Facebook
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NairuthyaCampaignForm({ className }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    interestedIn: 'Nairuthya Whispering Wood',
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
    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phoneNumber = 'Please enter your 10-digit phone number';
    } else if (cleanPhone.length !== 10) {
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
        source: 'Landing Page - Nairuthya Whispering Wood'
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

  const interestOptions = [
    'Nairuthya Whispering Wood',
    ...ENQUIRY_INTEREST_OPTIONS.filter((opt) => opt !== 'General Enquiry'),
    'General Enquiry'
  ];

  return (
    <section
      id="enquiry-form"
      className={cn(
        'relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden bg-[#EFE8DC]',
        className
      )}
      style={{
        backgroundImage: "url('/images/campaign/paper_crush_bg.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '800px 800px'
      }}
      aria-label="Contact and Walkthrough Form"
    >
      {/* Soft translucent wash over paper texture */}
      <div className="absolute inset-0 bg-[#EFE8DC]/50 pointer-events-none" />

      {/* Decorative Botanical Leaf on Side */}
      <div className="absolute -top-10 -left-12 w-48 h-48 opacity-60 pointer-events-none mix-blend-multiply hidden sm:block">
        <Image
          src="/images/campaign/botanical_leaves.jpg"
          alt="Botanical Leaves Decoration"
          width={240}
          height={240}
          className="object-contain"
        />
      </div>

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <MotionReveal delay={0.05}>
            <span className="inline-block font-serif italic text-base sm:text-lg text-[#4A5F4B]">
              Experience Nairuthya Whispering Wood 🌿
            </span>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#243525] tracking-tight leading-tight">
              Book Your Private Farm Walkthrough
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#5E6B5D] leading-relaxed max-w-xl mx-auto">
              Step onto the red-loam earth. Walk the stone terraces, inspect individual boundary beacons, review legal title papers, and discuss farm care with our agricultural directors.
            </p>
          </MotionReveal>
        </div>

        {/* =========================================================================
            CARD CONTAINER: Centered with margins so the background texture shows
            ========================================================================= */}
        <MotionReveal delay={0.2}>
          <div className="max-w-6xl mx-auto relative">
            
            {/* Decorative Washi Tape Accent on Top Center */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#DCD4C0]/85 backdrop-blur-[1px] rotate-[-1deg] border-t border-b border-white/60 shadow-xs z-20 pointer-events-none" />

            {/* Main Card with 50/50 Equal Division (Matching Home Page) */}
            <div className="rounded-3xl bg-[#FAF7F2] border border-[#DDD3C2] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(40,32,20,0.08)] relative">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-start">
                
                {/* -------------------------------------------------------------
                    LEFT COLUMN: CONTACT FORM (Equally divided 50%)
                    Matching Home Page Form Fields Exactly
                    ------------------------------------------------------------- */}
                <div>
                  {isSuccess ? (
                    <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#DDD3BF] shadow-xs text-center space-y-4">
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
                            interestedIn: 'Nairuthya Whispering Wood',
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
                        <label htmlFor="landing-name" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                          Your Name
                        </label>
                        <input
                          id="landing-name"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }}
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
                        <label htmlFor="landing-email" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                          Your Email
                        </label>
                        <input
                          id="landing-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="Email Address"
                          className={cn(
                            'w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border text-sm text-[#111613] placeholder-[#A0ACA2] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]',
                            errors.email ? 'border-red-400' : 'border-[#DDD3BF]'
                          )}
                        />
                        {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                      </div>

                      {/* Phone Number & Area of Interest */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="landing-phone" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                            Phone Number
                          </label>
                          <input
                            id="landing-phone"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            value={formData.phoneNumber}
                            onChange={(e) => {
                              const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setFormData({ ...formData, phoneNumber: onlyNums });
                              if (errors.phoneNumber) {
                                setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                              }
                            }}
                            onKeyDown={(e) => {
                              if (
                                ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                                (e.ctrlKey || e.metaKey)
                              ) {
                                return;
                              }
                              if (!/^[0-9]$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="10-digit mobile number"
                            className={cn(
                              'w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border text-sm text-[#111613] placeholder-[#A0ACA2] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]',
                              errors.phoneNumber ? 'border-red-400' : 'border-[#DDD3BF]'
                            )}
                          />
                          {errors.phoneNumber && <p className="text-[11px] text-red-600 mt-1">{errors.phoneNumber}</p>}
                        </div>

                        <div>
                          <label htmlFor="landing-interest" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                            Area of Interest
                          </label>
                          <select
                            id="landing-interest"
                            value={formData.interestedIn}
                            onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                            className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-[#DDD3BF] text-sm text-[#111613] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
                          >
                            {interestOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Your Message */}
                      <div>
                        <label htmlFor="landing-message" className="block text-xs font-sans font-medium text-[#4E5C50] mb-1.5">
                          Your Message
                        </label>
                        <textarea
                          id="landing-message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Message"
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-[#DDD3BF] text-sm text-[#111613] placeholder-[#A0ACA2] shadow-xs focus:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C] resize-none"
                        />
                      </div>

                      {/* Send Message Button: EXACT background color & style from Home Page (#C6923C) */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3.5 px-8 rounded-xl bg-[#C6923C] hover:bg-[#B3812E] text-white text-xs font-semibold uppercase tracking-[0.16em] shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>SENDING MESSAGE...</span>
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
                </div>

                {/* -------------------------------------------------------------
                    RIGHT COLUMN: "GET IN TOUCH" (Equally divided 50%)
                    Matching Home Page Layout Exactly
                    ------------------------------------------------------------- */}
                <div className="space-y-8 lg:pl-4">
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

                  {/* 2x2 Contact Info Grid (Call Us, Email Us, Website, Registered Office) */}
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
                          href="mailto:support@earthheritage.in"
                          className="block font-sans text-xs sm:text-[13px] text-[#5A695E] hover:text-[#15341C] transition-colors"
                        >
                          support@earthheritage.in
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

                    {/* Registered Office */}
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

                  {/* Follow Us On (Matching Home Page) */}
                  <div className="space-y-3 pt-4 border-t border-[#EAE0CD]">
                    <h4 className="font-serif text-sm font-medium text-[#111613]">
                      Follow Us On
                    </h4>
                    <div className="flex items-center gap-2.5">
                      {[
                        { icon: Instagram, label: 'Instagram', href: companyData.social.instagram },
                        { icon: Linkedin, label: 'LinkedIn', href: companyData.social.linkedin },
                        { icon: Youtube, label: 'YouTube', href: companyData.social.youtube },
                        { icon: Twitter, label: 'Twitter', href: 'https://x.com' },
                        { icon: Facebook, label: 'Facebook', href: companyData.social.facebook }
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

                </div>

              </div>

            </div>

          </div>
        </MotionReveal>

      </Container>
    </section>
  );
}
