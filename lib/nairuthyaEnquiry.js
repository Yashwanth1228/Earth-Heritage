/**
 * Nairuthya Lead Capture Submission Service Adapter
 * 
 * Dedicated submission integration point for the Nairuthya Whispering Wood lead-capture form.
 * Submissions are forwarded exclusively to: /api/nairuthya-enquiries.
 * 
 * Strict Isolation:
 * Does NOT interact with or modify the existing general enquiry service (/lib/enquiry.js).
 */

export const NAIRUTHYA_INTEREST_OPTIONS = [
  'Schedule a Site Visit',
  'Pricing & Plot Details',
  'Request a Call Back',
  'Farm Walkthrough & Site Visit',
  'Plot Pricing & Availability',
  'Managed Farmland Ownership',
  'General Enquiry',
  'Nairuthya Whispering Wood'
];

/**
 * Submit dedicated Nairuthya lead capture payload to /api/nairuthya-enquiries
 * 
 * @param {Object} payload
 * @param {string} payload.fullName
 * @param {string} payload.phone
 * @param {string} [payload.email]
 * @param {string} [payload.location]
 * @param {string} payload.interest
 * @param {string} [payload.preferredVisitDate]
 * @param {boolean} payload.consent
 * @returns {Promise<{ success: boolean, message: string, data?: any }>}
 */
export async function submitNairuthyaEnquiry(payload) {
  const sanitizedPayload = {
    fullName: payload?.fullName || '',
    phone: payload?.phone || '',
    email: payload?.email || '',
    location: payload?.location || '',
    interest: payload?.interest || 'Nairuthya Whispering Wood',
    preferredVisitDate: payload?.preferredVisitDate || '',
    consent: Boolean(payload?.consent)
  };

  try {
    const response = await fetch('/api/nairuthya-enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(sanitizedPayload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const validationErrorMessage =
        data?.errors && typeof data.errors === 'object'
          ? Object.values(data.errors)[0]
          : null;

      const errorMessage =
        validationErrorMessage ||
        data?.message ||
        'Unable to submit your enquiry at this time. Please try again.';

      const error = new Error(errorMessage);
      error.status = response.status;
      error.errors = data?.errors || null;
      error.data = data;
      throw error;
    }

    return {
      success: true,
      message: data?.message || 'Your enquiry has been received successfully.',
      data: data?.data || null
    };
  } catch (err) {
    if (err.status) {
      throw err;
    }

    console.error('[Nairuthya Enquiry Service] Network error transmitting to /api/nairuthya-enquiries.');
    const networkError = new Error(
      'Unable to submit enquiry at this time. Please check your network connection and try again.'
    );
    networkError.status = 0;
    throw networkError;
  }
}
