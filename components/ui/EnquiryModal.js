'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { ENQUIRY_INTEREST_OPTIONS, submitEnquiry } from '@/lib/enquiry';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import { isReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Reusable Earth Heritage Enquiry Modal Component
 * 
 * Refined Behaviors:
 * - Proper Background Scroll Locking: Pauses Lenis and locks body/html scrolling.
 *   Background page cannot scroll underneath the form; scroll position preserved.
 * - Independent Modal Scrolling: The modal content scrolls smoothly if taller than viewport.
 * - Safe Viewport Sizing: Uses calc(100dvh - 32px) to account for mobile browsers and address bars.
 * - Subtle Backdrop: Dark translucent backdrop (#0B150E/60) with light blur, preserving Earth Heritage identity.
 * - Smooth Opening/Closing Animation:
 *   Opening: opacity 0 -> 1, translateY 12px -> 0, scale 0.96 -> 1 in 300ms.
 *   Closing: reverses smoothly before unmounting.
 * - Accessible Dialog: role="dialog", aria-modal="true", keyboard focus trap, Escape-to-close.
 * - Backdrop click closes; clicking inside form does NOT close.
 * - Focus returns to trigger button upon close.
 */
export default function EnquiryModal() {
  const { isOpen, selectedInterest, closeEnquiryModal } = useEnquiry();
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const firstInputRef = useRef(null);

  // Animation & Rendering lifecycle states
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    interestedIn: selectedInterest || 'General Enquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const reducedMotion = typeof window !== 'undefined' && isReducedMotion();

  // Manage Mount / Unmount & Opening / Closing Animations
  useEffect(() => {
    let unmountTimer;

    if (isOpen) {
      setIsRendered(true);
      // Lock landing page scroll immediately (pauses Lenis & locks body)
      lockScroll();

      // Reset form state to current selected interest
      setFormData((prev) => ({
        ...prev,
        interestedIn: selectedInterest || 'General Enquiry'
      }));
      setErrors({});
      setSubmitResult(null);

      // Trigger entrance animation next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else {
      // Reverse exit animation
      setIsAnimatingIn(false);
      // Unlock landing page scroll
      unlockScroll();

      // Wait for exit transition to finish before unmounting DOM
      unmountTimer = setTimeout(() => {
        setIsRendered(false);
      }, reducedMotion ? 50 : 280);
    }

    return () => {
      clearTimeout(unmountTimer);
    };
  }, [isOpen, selectedInterest, reducedMotion]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  // Keyboard navigation & Focus Trapping
  useEffect(() => {
    if (!isRendered || !isAnimatingIn) return;

    // Focus first input
    const focusTimer = setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 80);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeEnquiryModal();
        return;
      }

      // Tab trap within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isRendered, isAnimatingIn, closeEnquiryModal]);

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name should be at least 2 characters.';
    }

    const cleanPhone = formData.phoneNumber.trim().replace(/[\s\-\(\)\.]/g, '');
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your phone number.';
    } else if (!/^[\+]?[0-9]{7,16}$/.test(cleanPhone)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (7 to 15 digits).';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.interestedIn) {
      newErrors.interestedIn = 'Please select an area of interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await submitEnquiry(formData);
      setSubmitResult(result);
      // Scroll to top of modal container to see confirmation
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } catch (err) {
      setErrors({ form: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeEnquiryModal();
    }
  };

  if (!isRendered) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      aria-describedby="enquiry-modal-desc"
      onClick={handleBackdropClick}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      {/* 1. Subtle Dark Translucent Backdrop Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-[#0B150E]/60 backdrop-blur-sm pointer-events-none transition-opacity duration-300 ease-out',
          reducedMotion
            ? isAnimatingIn
              ? 'opacity-100'
              : 'opacity-0'
            : isAnimatingIn
            ? 'opacity-100'
            : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* 2. Modal Dialog Container (Safe Max Height & Independent Scrolling) */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative w-full max-w-lg rounded-2xl overflow-hidden',
          'bg-[#FAF6F0] text-[#111613]',
          'border border-[#DECFC0]',
          'shadow-[0_24px_64px_rgba(11,21,14,0.28)]',
          'my-auto z-10',
          // Account for dynamic viewport height on mobile (100dvh)
          'max-h-[calc(100dvh-32px)] sm:max-h-[calc(100dvh-48px)]',
          'flex flex-col',
          reducedMotion
            ? isAnimatingIn
              ? 'opacity-100 scale-100'
              : 'opacity-0'
            : isAnimatingIn
            ? 'opacity-100 translate-y-0 scale-100 transition-all duration-300 ease-corporate-smooth'
            : 'opacity-0 translate-y-3 scale-[0.96] transition-all duration-250 ease-in'
        )}
      >
        {/* Close Button (Always accessible at top-right, never accidentally submits) */}
        <button
          type="button"
          onClick={closeEnquiryModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-[#4A4742] hover:text-[#111613] hover:bg-[#EDE5D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors z-20 cursor-pointer"
          aria-label="Close enquiry modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* 3. Independent Scrollable Form Content */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto overscroll-contain p-6 sm:p-8 flex-1 focus:outline-none"
          data-lenis-prevent="true"
        >
          {submitResult ? (
            /* ============================================================== */
            /* SUCCESS STATE                                                  */
            /* ============================================================== */
            <div className="py-4 sm:py-6 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#E5F5DD] border border-[#B6E5A4] flex items-center justify-center mx-auto text-[#2E7D1A]">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <h3
                  id="enquiry-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#111613] tracking-tight"
                >
                  {submitResult.mode === 'live'
                    ? 'Thank you. Your enquiry has been received.'
                    : 'Enquiry Details Captured'}
                </h3>

                <p id="enquiry-modal-desc" className="font-sans text-xs sm:text-sm text-[#4A4742] max-w-sm mx-auto leading-relaxed">
                  {submitResult.mode === 'live'
                    ? 'Our team will get in touch with you soon.'
                    : 'Your enquiry form has passed all client validations. In this preview version, backend submission is ready for API configuration and no data has been transmitted to a mock endpoint.'}
                </p>
              </div>

              {/* Submission Summary Pill */}
              <div className="p-3.5 rounded-xl bg-[#F0EAE1] border border-[#DECFC0] text-left text-xs font-mono text-[#383531] space-y-1">
                <div><strong className="font-semibold text-[#111613]">Name:</strong> {formData.fullName}</div>
                <div><strong className="font-semibold text-[#111613]">Phone:</strong> {formData.phoneNumber}</div>
                {formData.email && <div><strong className="font-semibold text-[#111613]">Email:</strong> {formData.email}</div>}
                <div><strong className="font-semibold text-[#111613]">Interest:</strong> {formData.interestedIn}</div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  className={cn(
                    'w-full inline-flex items-center justify-center font-sans font-semibold rounded-full',
                    'py-3 px-6 text-xs sm:text-[13px] tracking-wide text-[#FAF6F0]',
                    'bg-[linear-gradient(135deg,#163A20_0%,#24552A_50%,#1E460B_100%)]',
                    'hover:bg-[linear-gradient(135deg,#1C4627_0%,#2B6132_50%,#24540E_100%)]',
                    'border border-[#2E6838]/50 shadow-[0_2px_8px_rgba(22,58,32,0.18)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-all cursor-pointer'
                  )}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* FORM STATE                                                     */
            /* ============================================================== */
            <div className="space-y-6">
              {/* Header / Intro */}
              <div className="space-y-2 pr-8">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#1e460b] font-semibold block">
                  Earth Heritage &bull; Direct Enquiry
                </span>
                <h3
                  id="enquiry-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#111613] tracking-tight"
                >
                  Let’s Start a Conversation
                </h3>
                <p
                  id="enquiry-modal-desc"
                  className="font-sans text-xs sm:text-sm text-[#54504A] leading-relaxed"
                >
                  Tell us a little about what you’re looking for, and our team can help you explore the right next step.
                </p>
              </div>

              {/* General Form Error Banner */}
              {errors.form && (
                <div
                  className="p-3 rounded-lg bg-[#FDF2F2] border border-[#F8B4B4] text-[#9B1C1C] text-xs flex items-center gap-2"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Field 1: Full Name * */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="enquiry-full-name"
                    className="block font-sans text-xs font-semibold text-[#111613] tracking-wide"
                  >
                    Full Name <span className="text-[#C0392B]" aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="enquiry-full-name"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Sathish Agastya"
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    aria-describedby={errors.fullName ? 'enquiry-fullname-error' : undefined}
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl border bg-[#FFFFFF] text-[#111613] text-sm placeholder-[#9C9488]',
                      'transition-colors duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent',
                      errors.fullName ? 'border-[#E05252] bg-[#FFFBFB]' : 'border-[#D8C7AD]'
                    )}
                  />
                  {errors.fullName && (
                    <p id="enquiry-fullname-error" className="text-xs text-[#C0392B] font-sans">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Field 2: Phone Number * */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="enquiry-phone"
                    className="block font-sans text-xs font-semibold text-[#111613] tracking-wide"
                  >
                    Phone Number <span className="text-[#C0392B]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phoneNumber"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    aria-invalid={errors.phoneNumber ? 'true' : 'false'}
                    aria-describedby={errors.phoneNumber ? 'enquiry-phone-error' : undefined}
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl border bg-[#FFFFFF] text-[#111613] text-sm placeholder-[#9C9488]',
                      'transition-colors duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent',
                      errors.phoneNumber ? 'border-[#E05252] bg-[#FFFBFB]' : 'border-[#D8C7AD]'
                    )}
                  />
                  {errors.phoneNumber && (
                    <p id="enquiry-phone-error" className="text-xs text-[#C0392B] font-sans">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Field 3: Email Address (Optional) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="enquiry-email"
                      className="block font-sans text-xs font-semibold text-[#111613] tracking-wide"
                    >
                      Email Address
                    </label>
                    <span className="text-[11px] font-sans text-[#7D766C]">Optional</span>
                  </div>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl border bg-[#FFFFFF] text-[#111613] text-sm placeholder-[#9C9488]',
                      'transition-colors duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent',
                      errors.email ? 'border-[#E05252] bg-[#FFFBFB]' : 'border-[#D8C7AD]'
                    )}
                  />
                  {errors.email && (
                    <p id="enquiry-email-error" className="text-xs text-[#C0392B] font-sans">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Field 4: Interested In * */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="enquiry-interest"
                    className="block font-sans text-xs font-semibold text-[#111613] tracking-wide"
                  >
                    Interested In <span className="text-[#C0392B]" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="enquiry-interest"
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className={cn(
                        'w-full appearance-none px-3.5 py-2.5 pr-10 rounded-xl border bg-[#FFFFFF] text-[#111613] text-sm',
                        'transition-colors duration-150 cursor-pointer',
                        'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent',
                        errors.interestedIn ? 'border-[#E05252] bg-[#FFFBFB]' : 'border-[#D8C7AD]'
                      )}
                    >
                      {ENQUIRY_INTEREST_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-[#7D766C] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.interestedIn && (
                    <p className="text-xs text-[#C0392B] font-sans">
                      {errors.interestedIn}
                    </p>
                  )}
                </div>

                {/* Field 5: Message (Optional) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="enquiry-message"
                      className="block font-sans text-xs font-semibold text-[#111613] tracking-wide"
                    >
                      Message
                    </label>
                    <span className="text-[11px] font-sans text-[#7D766C]">Optional</span>
                  </div>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your land or farm management goals..."
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl border bg-[#FFFFFF] text-[#111613] text-sm placeholder-[#9C9488] resize-none',
                      'transition-colors duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent border-[#D8C7AD]'
                    )}
                  />
                </div>

                {/* Submission Notice & Button */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full inline-flex items-center justify-center gap-2 font-sans font-semibold select-none rounded-full',
                      'py-3.5 px-6 text-xs sm:text-[13px] tracking-[0.14em] uppercase',
                      'bg-brand-primary text-brand-secondary hover:bg-brand-primary-hover',
                      'shadow-[0_4px_16px_rgba(85,196,13,0.30)] hover:shadow-[0_6px_22px_rgba(85,196,13,0.40)]',
                      'transition-all duration-200 ease-out',
                      'hover:scale-[1.01] active:scale-[0.99]',
                      'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 cursor-pointer'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-brand-secondary" aria-hidden="true" />
                        <span>Processing Enquiry...</span>
                      </>
                    ) : (
                      <span>Submit Enquiry</span>
                    )}
                  </button>

                  <p className="text-center text-[11px] font-sans text-[#7D766C]">
                    Your privacy is respected. No unsolicited communication.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
