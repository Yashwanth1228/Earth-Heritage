/**
 * Enquiry Submission Service Adapter
 * 
 * Centralized submission integration point for Earth Heritage enquiry forms.
 * All frontend forms (EnquiryModal and HomeContactLocation) route through this service.
 * Submissions are forwarded to the internal secure API endpoint: /api/enquiries.
 */

export const ENQUIRY_INTEREST_OPTIONS = [
  'Managed Farmland',
  'Farm Management',
  'Land Ownership',
  'General Enquiry'
];

/**
 * Check whether backend endpoint is active
 */
export function isBackendConfigured() {
  return true;
}

/**
 * Submit enquiry payload to the internal Next.js API (/api/enquiries)
 * 
 * @param {Object} payload
 * @param {string} payload.fullName
 * @param {string} payload.phoneNumber
 * @param {string} [payload.email]
 * @param {string} payload.interestedIn
 * @param {string} [payload.message]
 * @param {string} [payload.source]
 * @param {string} [payload.pageUrl]
 * @returns {Promise<{ success: boolean, mode: 'live', message: string, data?: any }>}
 */
export async function submitEnquiry(payload) {
  // 1. Safely determine current page path if running in the browser
  const currentPath =
    typeof window !== 'undefined' && window.location
      ? window.location.pathname
      : null;

  // 2. Enrich payload with sensible defaults for missing attribution fields
  const enrichedPayload = {
    fullName: payload?.fullName || '',
    phoneNumber: payload?.phoneNumber || '',
    email: payload?.email || '',
    interestedIn: payload?.interestedIn || 'General Enquiry',
    message: payload?.message || '',
    source: payload?.source || 'Enquiry Modal',
    pageUrl: payload?.pageUrl || currentPath
  };

  // 3. Send HTTP POST request to internal /api/enquiries endpoint
  try {
    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(enrichedPayload)
    });

    const data = await response.json().catch(() => null);

    // 4. Handle non-2xx HTTP responses
    if (!response.ok) {
      // Extract specific field validation message if provided by the API
      const validationErrorMessage =
        data?.errors && typeof data.errors === 'object'
          ? Object.values(data.errors)[0]
          : null;

      const errorMessage =
        validationErrorMessage ||
        data?.message ||
        'Unable to submit enquiry at this time. Please try again.';

      const error = new Error(errorMessage);
      error.status = response.status;
      error.errors = data?.errors || null;
      error.data = data;
      throw error;
    }

    // 5. Successful submission response
    return {
      success: true,
      mode: 'live',
      message: data?.message || 'Your enquiry has been received.',
      data
    };
  } catch (err) {
    // If it's already a structured error from non-2xx status, rethrow it directly
    if (err.status) {
      throw err;
    }

    // Network / connection failure
    console.error('[Enquiry Service] Network error transmitting enquiry to /api/enquiries.');
    const networkError = new Error(
      'Unable to submit enquiry at this time. Please check your network connection and try again.'
    );
    networkError.status = 0;
    throw networkError;
  }
}
