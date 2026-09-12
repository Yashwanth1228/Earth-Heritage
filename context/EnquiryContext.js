'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('General Enquiry');
  const triggerRef = useRef(null);

  const openEnquiryModal = useCallback((interest = 'General Enquiry', triggerElement = null) => {
    setSelectedInterest(interest);
    // Remember trigger element to return focus after modal closes
    triggerRef.current = triggerElement || (typeof document !== 'undefined' ? document.activeElement : null);
    setIsOpen(true);
  }, []);

  const closeEnquiryModal = useCallback(() => {
    setIsOpen(false);
    // Restore focus to the element that triggered the modal
    if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      setTimeout(() => {
        try {
          triggerRef.current?.focus();
        } catch {
          // ignore if element is unmounted
        }
      }, 50);
    }
  }, []);

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        selectedInterest,
        openEnquiryModal,
        closeEnquiryModal
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}
