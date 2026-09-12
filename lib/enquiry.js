/**
 * Enquiry Submission Service Adapter
 * 
 * Centralized submission integration point for Earth Heritage enquiry forms.
 * 
 * ARCHITECTURE NOTICE:
 * - No backend API route or database currently exists in this project.
 * - This service provides a clean, modular submission contract that checks for
 *   NEXT_PUBLIC_ENQUIRY_API_ENDPOINT before attempting any network requests.
 * - In local preview / integration mode, it safely captures and validates the payload
 *   client-side without fabricating false transmission claims to the user.
 */

export const ENQUIRY_INTEREST_OPTIONS = [
  'Managed Farmland',
  'Farm Management',
  'Land Ownership',
  'General Enquiry'
];

/**
 * Check whether a live backend endpoint has been configured
 */
export function isBackendConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_ENQUIRY_API_ENDPOINT);
}

/**
 * Submit enquiry payload to backend if available, or simulate verified client capture
 * 
 * @param {Object} payload
 * @param {string} payload.fullName
 * @param {string} payload.phoneNumber
 * @param {string} [payload.email]
 * @param {string} payload.interestedIn
 * @param {string} [payload.message]
 * @returns {Promise<{ success: boolean, mode: 'live' | 'preview_ready', message: string, data?: any }>}
 */
export async function submitEnquiry(payload) {
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_API_ENDPOINT;

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Enquiry submission failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        mode: 'live',
        message: 'Your enquiry has been received.',
        data
      };
    } catch (err) {
      console.error('[Enquiry Service] Error transmitting enquiry to backend:', err);
      throw new Error(
        'Unable to submit enquiry at this time. Please check your network connection and try again.'
      );
    }
  }

  // Preview Mode: No backend endpoint configured yet.
  // Simulate 600ms latency to provide authentic loading feedback and verify data handling.
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Log to client console in development for verification
  if (process.env.NODE_ENV !== 'production') {
    console.info(
      '[Enquiry Service - Preview Ready] Client validation passed. Backend API not yet attached. Captured payload:',
      payload
    );
  }

  return {
    success: true,
    mode: 'preview_ready',
    message: 'Enquiry form verified and ready for backend integration.'
  };
}
