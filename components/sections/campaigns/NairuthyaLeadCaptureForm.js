'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { submitNairuthyaEnquiry, NAIRUTHYA_INTEREST_OPTIONS } from '@/lib/nairuthyaEnquiry';

/**
 * Dedicated Lead Capture Form Component for Nairuthya Whispering Wood
 * Route: /form/nairuthya-whispering-wood
 *
 * Visual Reference: Preserves 100% of the provided Earth Heritage visual reference:
 * - Brand styling: Forest green (#164b37), soft cream (#faf8f1), deep ink (#20352b).
 * - Split card layout (0.86fr intro column / 1.14fr form area) with mobile-responsive stack.
 * - Exact field labels, placeholders, dropdown options, and consent statement.
 * - Pure Tailwind CSS utility classes ensure zero-delay instant rendering on page refresh (no FOUC).
 * - Submits exclusively to POST /api/nairuthya-enquiries via submitNairuthyaEnquiry.
 * - Redirects to /lp/nairuthya-whispering-wood ONLY upon confirmed successful database insertion.
 * - Never redirects on error; displays clear user feedback while preserving entered state.
 * - STRICTLY ZERO tracking / analytics code.
 */
export default function NairuthyaLeadCaptureForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    interest: 'Schedule a Site Visit',
    visitDate: '',
    consent: false
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute today's local date for min date restriction
  const minDate = useMemo(() => {
    try {
      const today = new Date();
      return new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    } catch {
      return '';
    }
  }, []);

  // Filter dropdown options to the primary ones from the reference design
  const dropdownOptions = useMemo(() => {
    const primaryOptions = [
      'Schedule a Site Visit',
      'Pricing & Plot Details',
      'Request a Call Back'
    ];
    return primaryOptions.filter((opt) => NAIRUTHYA_INTEREST_OPTIONS.includes(opt));
  }, []);

  const validate = () => {
    const errors = {};
    const trimmedName = formData.fullName.trim();
    if (!trimmedName) {
      errors.fullName = 'Please enter your full name.';
    } else if (trimmedName.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    } else if (trimmedName.length > 100) {
      errors.fullName = 'Full name cannot exceed 100 characters.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errors.phone = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    const trimmedEmail = formData.email.trim();
    if (trimmedEmail) {
      if (trimmedEmail.length > 255) {
        errors.email = 'Email address cannot exceed 255 characters.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    const trimmedLocation = formData.location.trim();
    if (trimmedLocation && trimmedLocation.length > 120) {
      errors.location = 'Location cannot exceed 120 characters.';
    }

    if (!formData.interest || !NAIRUTHYA_INTEREST_OPTIONS.includes(formData.interest)) {
      errors.interest = 'Please select a valid area of interest.';
    }

    if (formData.visitDate) {
      if (formData.visitDate < minDate) {
        errors.visitDate = 'Preferred visit date cannot be in the past.';
      }
    }

    if (!formData.consent) {
      errors.consent = 'Please agree to the contact consent statement to proceed.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSubmitError(Object.values(validationErrors)[0]);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const cleanPhone = formData.phone.replace(/\D/g, '');

      const res = await submitNairuthyaEnquiry({
        fullName: formData.fullName.trim(),
        phone: cleanPhone,
        email: formData.email.trim() || undefined,
        location: formData.location.trim() || undefined,
        interest: formData.interest,
        preferredVisitDate: formData.visitDate || undefined,
        consent: formData.consent
      });

      if (res && res.success) {
        // ONLY redirect after confirmed successful database insertion
        router.push('/lp/nairuthya-whispering-wood');
      } else {
        setSubmitError(res?.message || 'Unable to submit your enquiry at this time. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      const serverMessage =
        err?.errors && typeof err.errors === 'object'
          ? Object.values(err.errors)[0]
          : err?.message || 'A connection error occurred. Please try again.';

      setSubmitError(serverMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e7f0e6] via-[#faf8f1] to-[#eaf1e7] py-6 sm:py-12 px-0 flex items-center justify-center box-border">
      <main className="w-full max-w-[1040px] my-4 md:my-6 mx-auto px-4 sm:px-[18px] box-border">
        <section
          className="grid grid-cols-1 md:grid-cols-[0.86fr_1.14fr] bg-white rounded-[22px] overflow-hidden shadow-[0_18px_55px_rgba(16,53,36,0.12)] border border-[#e2ece4]"
          aria-label="Nairuthya Whispering Wood site visit enquiry"
        >
          {/* Left Hero Sidebar */}
          <aside
            className="relative text-white p-6 sm:p-8 md:p-[48px_36px] flex flex-col justify-between gap-6 md:gap-10 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(155deg, rgba(14, 58, 40, 0.92), rgba(28, 91, 60, 0.94)), url('https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg')"
            }}
          >
            <div>
              <div className="text-2xl font-extrabold tracking-[2px] leading-tight text-white uppercase">
                EARTH HERITAGE
                <small className="block text-[10px] font-medium tracking-[3px] mt-1.5 opacity-80 uppercase text-white">
                  PEOPLE · NATURE · LIFE
                </small>
              </div>
              <h1 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] leading-[1.12] my-3 md:my-5 font-normal text-white">
                Nairuthya
                <br />
                Whispering Wood
              </h1>
              <p className="text-[15px] sm:text-base leading-[1.7] opacity-90 m-0 text-white">
                Explore managed farmland near Bengaluru. Share your details and our team will help you
                plan a visit to the project.
              </p>
              <span className="inline-flex items-center px-3.5 py-2 sm:py-2.5 border border-white/40 rounded-full text-[13px] mt-5 sm:mt-6 bg-white/[0.08] backdrop-blur-[4px] text-white">
                Near Nelamangala, Bengaluru
              </span>
            </div>
            <footer className="text-[13px] opacity-85 leading-[1.6] text-white">
              Questions? Call{' '}
              <a href="tel:+919902096969" className="text-white hover:underline font-medium">
                +91 99020 96969
              </a>
              <br />
              earthheritage.in
            </footer>
          </aside>

          {/* Right Form Area */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-[42px_42px_36px] bg-white flex flex-col justify-center">
            <div className="text-[#24714e] uppercase tracking-[2px] font-bold text-[11px]">
              Discover your green escape
            </div>
            <h2 className="text-[23px] sm:text-[27px] my-2 sm:my-2.5 font-bold leading-[1.2] text-[#20352b]">
              Schedule a Site Visit
            </h2>
            <p className="text-[#64766c] text-[13.5px] sm:text-sm mb-5 sm:mb-6 leading-normal">
              Fill out this quick form. Our team will assist you with the next steps.
            </p>

            <form id="enquiryForm" onSubmit={handleSubmit} noValidate className="grid gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-[13px] font-semibold mb-1.5 text-[#20352b]">
                  Full Name <span className="text-[#b64242]">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  maxLength={100}
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: undefined });
                  }}
                  disabled={isSubmitting}
                  required
                  className="w-full px-3.5 py-3 border border-[#d9e2d9] rounded-[10px] bg-white text-[#20352b] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#a7d1b3] focus:border-[#24714e] disabled:bg-[#f7faf7] disabled:cursor-not-allowed disabled:opacity-80"
                />
                {fieldErrors.fullName && (
                  <p className="text-[#a12f2f] text-xs mt-1 leading-snug">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* Phone & Email Pair */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="phone" className="block text-[13px] font-semibold mb-1.5 text-[#20352b]">
                    Mobile / WhatsApp Number <span className="text-[#b64242]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({ ...formData, phone: digits });
                      if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: undefined });
                    }}
                    disabled={isSubmitting}
                    required
                    className="w-full px-3.5 py-3 border border-[#d9e2d9] rounded-[10px] bg-white text-[#20352b] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#a7d1b3] focus:border-[#24714e] disabled:bg-[#f7faf7] disabled:cursor-not-allowed disabled:opacity-80"
                  />
                  {fieldErrors.phone && (
                    <p className="text-[#a12f2f] text-xs mt-1 leading-snug">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold mb-1.5 text-[#20352b]">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={150}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-3 border border-[#d9e2d9] rounded-[10px] bg-white text-[#20352b] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#a7d1b3] focus:border-[#24714e] disabled:bg-[#f7faf7] disabled:cursor-not-allowed disabled:opacity-80"
                  />
                  {fieldErrors.email && (
                    <p className="text-[#a12f2f] text-xs mt-1 leading-snug">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Area / City Location */}
              <div>
                <label htmlFor="location" className="block text-[13px] font-semibold mb-1.5 text-[#20352b]">
                  Your Area / City (Optional)
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g., Nagarbhavi, Bengaluru"
                  maxLength={120}
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                    if (fieldErrors.location) setFieldErrors({ ...fieldErrors, location: undefined });
                  }}
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-3 border border-[#d9e2d9] rounded-[10px] bg-white text-[#20352b] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#a7d1b3] focus:border-[#24714e] disabled:bg-[#f7faf7] disabled:cursor-not-allowed disabled:opacity-80"
                />
                {fieldErrors.location && (
                  <p className="text-[#a12f2f] text-xs mt-1 leading-snug">{fieldErrors.location}</p>
                )}
              </div>

              {/* Interest & Visit Date Pair */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="interest" className="block text-[13px] font-semibold mb-1.5 text-[#20352b]">
                    I&apos;m Interested In
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={(e) => {
                      setFormData({ ...formData, interest: e.target.value });
                      if (fieldErrors.interest) setFieldErrors({ ...fieldErrors, interest: undefined });
                    }}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-3 border border-[#d9e2d9] rounded-[10px] bg-white text-[#20352b] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#a7d1b3] focus:border-[#24714e] disabled:bg-[#f7faf7] disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    {dropdownOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.interest && (
                    <p className="text-[#a12f2f] text-xs mt-1 leading-snug">{fieldErrors.interest}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="visitDate" className="block text-[13px] font-semibold mb-1.5 text-[#20352b]">
                    Preferred Visit Date (Optional)
                  </label>
                  <input
                    id="visitDate"
                    name="visitDate"
                    type="date"
                    min={minDate}
                    value={formData.visitDate}
                    onChange={(e) => {
                      setFormData({ ...formData, visitDate: e.target.value });
                      if (fieldErrors.visitDate) setFieldErrors({ ...fieldErrors, visitDate: undefined });
                    }}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-3 border border-[#d9e2d9] rounded-[10px] bg-white text-[#20352b] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#a7d1b3] focus:border-[#24714e] disabled:bg-[#f7faf7] disabled:cursor-not-allowed disabled:opacity-80"
                  />
                  {fieldErrors.visitDate && (
                    <p className="text-[#a12f2f] text-xs mt-1 leading-snug">{fieldErrors.visitDate}</p>
                  )}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2.5 text-xs text-[#64766c] leading-normal mt-0.5">
                <input
                  id="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => {
                    setFormData({ ...formData, consent: e.target.checked });
                    if (fieldErrors.consent) setFieldErrors({ ...fieldErrors, consent: undefined });
                  }}
                  disabled={isSubmitting}
                  required
                  className="w-4 h-4 mt-0.5 accent-[#164b37] shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="consent"
                  className="font-normal text-xs text-[#64766c] cursor-pointer select-none leading-normal m-0"
                >
                  I agree to be contacted by Earth Heritage regarding this enquiry and a possible site
                  visit. <span className="text-[#b64242]">*</span>
                </label>
              </div>
              {fieldErrors.consent && (
                <p className="text-[#a12f2f] text-xs -mt-1 leading-snug">{fieldErrors.consent}</p>
              )}

              {/* Submission Error Banner */}
              {submitError && (
                <div
                  id="error"
                  className="flex items-center gap-2 px-3.5 py-2.5 bg-[#fdf2f2] border border-[#f8b4b4] rounded-lg text-[#a12f2f] text-[13px] leading-snug"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#a12f2f]" aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-[11px] text-white bg-[#164b37] hover:bg-[#0f3d2b] font-bold text-[15px] cursor-pointer transition-colors shadow-sm disabled:opacity-65 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Submitting Enquiry...</span>
                  </span>
                ) : (
                  <span>Schedule Site Visit →</span>
                )}
              </button>

              <p className="text-[#64766c] text-xs leading-normal m-0 text-center">
                Your enquiry is securely recorded with Earth Heritage. Our estate advisory team will
                contact you shortly to coordinate your private walkthrough.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
