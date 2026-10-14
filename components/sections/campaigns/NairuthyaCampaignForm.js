'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { submitEnquiry } from '@/lib/enquiry';
import {
  Send,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NairuthyaCampaignForm({ className }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    parcelSize: '6,000 sq.ft',
    preferredDay: 'This Saturday Morning',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const parcelOptions = [
    '6,000 sq.ft',
    '10,000 sq.ft',
    'Contoured Acre'
  ];

  const timingOptions = [
    'Saturday Morning',
    'Sunday Morning',
    'Weekday Visit'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }
    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim() || undefined,
        interestedIn: 'Nairuthya Whispering Wood',
        source: 'Google Ads - Nairuthya Whispering Wood',
        message: `[Parcel Choice]: ${formData.parcelSize} | [Timing]: ${formData.preferredDay} | [Notes]: ${formData.message.trim() || 'None'}`
      };

      const result = await submitEnquiry(payload);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.error || 'Unable to submit enquiry. Please call us directly.');
      }
    } catch {
      setErrorMessage('A connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry-form"
      className={cn(
        'relative w-full py-20 sm:py-28 overflow-hidden bg-[#EFE8DC]',
        className
      )}
      style={{
        backgroundImage: "url('/images/campaign/paper_crush_bg.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '800px 800px'
      }}
      aria-label="Book a Private Site Visit"
    >
      {/* Soft translucent wash over paper texture */}
      <div className="absolute inset-0 bg-[#EFE8DC]/50 pointer-events-none" />

      {/* Decorative Botanical Leaf on Side */}
      <div className="absolute -top-10 -left-12 w-48 h-48 opacity-70 pointer-events-none mix-blend-multiply hidden sm:block">
        <Image
          src="/images/campaign/botanical_leaves.jpg"
          alt="Botanical Leaves Decoration"
          width={240}
          height={240}
          className="object-contain"
        />
      </div>

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Typography with Handwritten Doodle */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <MotionReveal delay={0.05}>
              <span className="inline-block font-serif italic text-lg sm:text-xl text-[#4A5F4B]">
                Take a pause &amp; visit the earth 🌿
              </span>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#243525] tracking-tight leading-tight">
                Book Your Private Farm Walkthrough
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="font-sans text-sm sm:text-base text-[#5E6B5D] leading-relaxed">
                Step onto the red-loam earth. Walk the stone terraces, inspect individual boundary beacons, review legal title papers, and discuss farm care with our agricultural directors.
              </p>
            </MotionReveal>
          </div>

          {/* Handcrafted Paper Card with Washi Tape Effect */}
          <MotionReveal delay={0.2}>
            <div className="relative mx-auto max-w-2xl">
              
              {/* Decorative Washi Tape on Top Center */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#DCD4C0]/85 backdrop-blur-[1px] rotate-[-1.5deg] border-t border-b border-white/50 shadow-sm z-20 pointer-events-none" />

              {/* Main Card Container (Torn/Deckle Edge Look on Paper Background) */}
              <div className="relative rounded-3xl bg-[#FAF7F2] border border-[#DDD5C5] p-7 sm:p-12 shadow-[0_16px_40px_rgba(70,60,40,0.1)]">
                
                {isSuccess ? (
                  <div className="py-10 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-[#E5ECE2] border border-[#B5C7B0] text-[#263828] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-[#263828]" aria-hidden="true" />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <span className="font-serif italic text-base text-[#4A5F4B] block">Reservation Confirmed 🌿</span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#243525]">
                        We Look Forward to Welcoming You
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#5E6B5D] leading-relaxed pt-2">
                        Our agrarian director will contact you via WhatsApp / Phone to confirm your walkthrough time and provide route guidance to Honnasandra.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            fullName: '',
                            phoneNumber: '',
                            email: '',
                            parcelSize: '6,000 sq.ft',
                            preferredDay: 'This Saturday Morning',
                            message: ''
                          });
                        }}
                        className="font-sans text-xs text-[#263828] uppercase tracking-wider underline hover:opacity-80 cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    
                    {/* Holding Context Pill */}
                    <div className="p-3 rounded-2xl bg-[#F0EAE0] border border-[#DDD3C2] flex items-center justify-between text-xs font-sans text-[#4A554A]">
                      <span className="text-[#786E5E]">Location</span>
                      <span className="font-serif font-medium text-[#243525]">Nairuthya Whispering Wood &bull; Honnasandra</span>
                    </div>

                    {/* Interactive Parcel Size Tags */}
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#5E6B5D] mb-2 font-medium">
                        Interested Farmland Parcel
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {parcelOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, parcelSize: opt }))}
                            className={cn(
                              'py-2.5 px-3 rounded-full text-xs font-sans font-medium transition-all text-center border cursor-pointer',
                              formData.parcelSize === opt
                                ? 'bg-[#263828] text-white border-[#263828] shadow-sm'
                                : 'bg-white text-[#4A554A] border-[#D6CDBC] hover:bg-[#F2ECE1]'
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Visit Window Tags */}
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#5E6B5D] mb-2 font-medium">
                        Preferred Walkthrough Window
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {timingOptions.map((tOpt) => (
                          <button
                            key={tOpt}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, preferredDay: tOpt }))}
                            className={cn(
                              'py-2.5 px-2.5 rounded-full text-xs font-sans font-medium transition-all text-center border cursor-pointer',
                              formData.preferredDay === tOpt
                                ? 'bg-[#263828] text-white border-[#263828] shadow-sm'
                                : 'bg-white text-[#4A554A] border-[#D6CDBC] hover:bg-[#F2ECE1]'
                            )}
                          >
                            {tOpt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label htmlFor="campaign-name" className="block text-xs font-sans uppercase tracking-wider text-[#5E6B5D] mb-1.5 font-medium">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="campaign-name"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="e.g. Anand Sharma"
                        disabled={isSubmitting}
                        className={cn(
                          'w-full px-4 py-3.5 rounded-2xl bg-white border text-sm text-[#243525] placeholder-[#9CA7A0] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263828] focus-visible:border-[#263828]',
                          errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-[#D6CDBC]'
                        )}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Phone & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="campaign-phone" className="block text-xs font-sans uppercase tracking-wider text-[#5E6B5D] mb-1.5 font-medium">
                          Mobile Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="campaign-phone"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={formData.phoneNumber}
                          onChange={(e) => {
                            const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData((prev) => ({ ...prev, phoneNumber: onlyNums }));
                            if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                          }}
                          placeholder="10-digit mobile number"
                          disabled={isSubmitting}
                          className={cn(
                            'w-full px-4 py-3.5 rounded-2xl bg-white border text-sm text-[#243525] placeholder-[#9CA7A0] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263828] focus-visible:border-[#263828]',
                            errors.phoneNumber ? 'border-red-400 bg-red-50/20' : 'border-[#D6CDBC]'
                          )}
                        />
                        {errors.phoneNumber && <p className="text-[11px] text-red-600 mt-1">{errors.phoneNumber}</p>}
                      </div>

                      <div>
                        <label htmlFor="campaign-email" className="block text-xs font-sans uppercase tracking-wider text-[#5E6B5D] mb-1.5 font-medium">
                          Email Address <span className="text-[#8C7D6B] font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          id="campaign-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }));
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="name@example.com"
                          disabled={isSubmitting}
                          className={cn(
                            'w-full px-4 py-3.5 rounded-2xl bg-white border text-sm text-[#243525] placeholder-[#9CA7A0] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263828] focus-visible:border-[#263828]',
                            errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#D6CDBC]'
                          )}
                        />
                        {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Optional Message */}
                    <div>
                      <label htmlFor="campaign-notes" className="block text-xs font-sans uppercase tracking-wider text-[#5E6B5D] mb-1.5 font-medium">
                        Notes or Questions <span className="text-[#8C7D6B] font-normal lowercase">(optional)</span>
                      </label>
                      <textarea
                        id="campaign-notes"
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="e.g. Visiting with family, interested in corner plots or teak timber..."
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D6CDBC] text-sm text-[#243525] placeholder-[#9CA7A0] resize-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#263828] focus-visible:border-[#263828]"
                      />
                    </div>

                    {/* Error Alert */}
                    {errorMessage && (
                      <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Action: Dark Olive Button */}
                    <button
                      id="campaign-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#263828] hover:bg-[#1E2E20] active:scale-[0.99] text-white font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263828]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                          <span>Booking Your Visit...</span>
                        </>
                      ) : (
                        <>
                          <span>Book a Site Visit &rarr;</span>
                          <Send className="w-3.5 h-3.5 text-white/90" aria-hidden="true" />
                        </>
                      )}
                    </button>

                    {/* Trust Subtext */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] font-sans text-[#786E5E]">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4A5F4B]" />
                        Direct Developer Consultation
                      </span>
                      <span>&bull;</span>
                      <span>Clear Titled Ownership</span>
                      <span>&bull;</span>
                      <span>Zero Brokerage</span>
                    </div>

                  </form>
                )}

              </div>
            </div>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
