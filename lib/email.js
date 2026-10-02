import { Resend } from 'resend';

/**
 * Escapes unsafe characters for HTML injection protection.
 * Ensures user-provided values are never interpreted as trusted markup.
 * 
 * @param {any} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formats ISO timestamp to human-readable Indian Standard Time (IST) string.
 * 
 * @param {string|Date} dateVal
 * @returns {string}
 */
export function formatSubmissionDate(dateVal) {
  try {
    const d = dateVal ? new Date(dateVal) : new Date();
    if (isNaN(d.getTime())) return String(dateVal || '');
    return (
      d.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium'
      }) + ' (IST)'
    );
  } catch {
    return String(dateVal || new Date().toISOString());
  }
}

/**
 * Get server-side Resend client instance.
 * Returns null if RESEND_API_KEY is missing or set to placeholder.
 * 
 * @returns {Resend|null}
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.trim() === 'your_resend_api_key') {
    return null;
  }
  return new Resend(apiKey.trim());
}

/**
 * Resolves the authorized notification recipient.
 * Enforces support@earthheritage.in and explicitly rejects earthheritageit@gmail.com.
 * 
 * @returns {string}
 */
export function getNotificationRecipient() {
  const configured = (process.env.ENQUIRY_NOTIFICATION_EMAIL || 'support@earthheritage.in').trim();
  // Strictly prevent earthheritageit@gmail.com from being used as enquiry recipient
  if (configured.toLowerCase() === 'earthheritageit@gmail.com') {
    return 'support@earthheritage.in';
  }
  return configured || 'support@earthheritage.in';
}

/**
 * Resolves the sender address.
 * Uses RESEND_FROM_EMAIL if configured, otherwise falls back to Resend's verified onboarding sender.
 * 
 * @returns {string}
 */
export function getNotificationSender() {
  return process.env.RESEND_FROM_EMAIL?.trim() || 'Earth Heritage <onboarding@resend.dev>';
}

/**
 * Generates plain-text fallback content for the enquiry email notification.
 */
export function generateEnquiryText({
  fullName,
  phoneNumber,
  email,
  interestedIn,
  message,
  createdAt,
  id
}) {
  const formattedDate = formatSubmissionDate(createdAt);

  return [
    'New Enquiry — Earth Heritage',
    '==================================================',
    '',
    'Name:',
    fullName || 'Not provided',
    '',
    'Phone:',
    phoneNumber || 'Not provided',
    '',
    'Email:',
    email || 'Not provided',
    '',
    'Enquiry Type:',
    interestedIn || 'General Enquiry',
    '',
    'Message:',
    message || 'None',
    '',
    'Submitted:',
    formattedDate,
    '',
    'Reference:',
    id || 'N/A',
    '',
    '==================================================',
    'This is an automated notification from Earth Heritage.'
  ].join('\n');
}

/**
 * Generates responsive, brand-styled HTML content for the enquiry notification email.
 * All dynamic parameters are escaped to prevent injection.
 */
export function generateEnquiryHtml({
  fullName,
  phoneNumber,
  email,
  interestedIn,
  message,
  createdAt,
  id,
  toEmail
}) {
  const safeFullName = escapeHtml(fullName || 'Not provided');
  const safePhone = escapeHtml(phoneNumber || 'Not provided');
  const safeEmail = email ? escapeHtml(email) : 'Not provided';
  const safeInterestedIn = escapeHtml(interestedIn || 'General Enquiry');
  const safeMessage = message ? escapeHtml(message) : 'None';
  const safeFormattedDate = escapeHtml(formatSubmissionDate(createdAt));
  const safeId = id ? escapeHtml(id) : 'N/A';
  const safeRecipient = escapeHtml(toEmail);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enquiry — Earth Heritage</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111613; line-height: 1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF7F2; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #D8C7B0; overflow: hidden; box-shadow: 0 4px 20px rgba(20, 38, 25, 0.06);">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #122A18; padding: 28px 32px; border-bottom: 3px solid #C59B27;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C59B27; font-weight: 600;">
                      EARTH HERITAGE
                    </span>
                    <h1 style="margin: 6px 0 0 0; font-size: 22px; font-weight: 600; color: #FAF7F2; letter-spacing: -0.5px;">
                      New Enquiry — Earth Heritage
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #38423A; line-height: 1.5;">
                A new enquiry has been submitted through the Earth Heritage website and successfully recorded in the database.
              </p>

              <!-- Data Matrix Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 14px; background-color: #FAF7F2; border: 1px solid #EAD5B5; width: 35%; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px; color: #1E460B; font-weight: 600;">
                    Full Name
                  </td>
                  <td style="padding: 12px 14px; background-color: #FFFFFF; border: 1px solid #EAD5B5; font-size: 15px; color: #111613; font-weight: 600;">
                    ${safeFullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; background-color: #FAF7F2; border: 1px solid #EAD5B5; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px; color: #1E460B; font-weight: 600;">
                    Phone Number
                  </td>
                  <td style="padding: 12px 14px; background-color: #FFFFFF; border: 1px solid #EAD5B5; font-size: 15px; color: #111613;">
                    <a href="tel:${safePhone}" style="color: #1E460B; text-decoration: none; font-weight: 600;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; background-color: #FAF7F2; border: 1px solid #EAD5B5; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px; color: #1E460B; font-weight: 600;">
                    Email
                  </td>
                  <td style="padding: 12px 14px; background-color: #FFFFFF; border: 1px solid #EAD5B5; font-size: 15px; color: #111613;">
                    ${
                      email
                        ? `<a href="mailto:${safeEmail}" style="color: #1E460B; text-decoration: none;">${safeEmail}</a>`
                        : '<span style="color: #8A988D; font-style: italic;">Not provided</span>'
                    }
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; background-color: #FAF7F2; border: 1px solid #EAD5B5; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px; color: #1E460B; font-weight: 600;">
                    Enquiry Type
                  </td>
                  <td style="padding: 12px 14px; background-color: #FFFFFF; border: 1px solid #EAD5B5; font-size: 15px; color: #111613; font-weight: 500;">
                    ${safeInterestedIn}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; background-color: #FAF7F2; border: 1px solid #EAD5B5; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px; color: #1E460B; font-weight: 600;">
                    Submission Date/Time
                  </td>
                  <td style="padding: 12px 14px; background-color: #FFFFFF; border: 1px solid #EAD5B5; font-size: 14px; color: #38423A;">
                    ${safeFormattedDate}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; background-color: #FAF7F2; border: 1px solid #EAD5B5; font-size: 13px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px; color: #1E460B; font-weight: 600;">
                    Reference ID
                  </td>
                  <td style="padding: 12px 14px; background-color: #FFFFFF; border: 1px solid #EAD5B5; font-size: 13px; font-family: monospace; color: #5A685D;">
                    ${safeId}
                  </td>
                </tr>
              </table>

              <!-- Message Block -->
              <div style="background-color: #FAF7F2; border: 1px solid #EAD5B5; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px;">
                <span style="display: block; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1E460B; font-weight: 600; margin-bottom: 8px;">
                  Message
                </span>
                <p style="margin: 0; font-size: 14px; color: #111613; white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
              </div>

              <!-- Quick Action Bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="tel:${safePhone}" style="display: inline-block; background-color: #1E460B; color: #FAF7F2; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 9999px;">
                      Call ${safeFullName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background-color: #F5EFE6; padding: 20px 32px; border-top: 1px solid #D8C7B0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #627164; line-height: 1.5;">
                Earth Heritage Pvt. Ltd. · Automated Internal Notification<br>
                Recipient: <a href="mailto:${safeRecipient}" style="color: #1E460B; text-decoration: none;">${safeRecipient}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send enquiry notification email via Resend.
 * 
 * Flow:
 * 1. Checks server-side Resend client.
 * 2. Resolves recipient (strictly support@earthheritage.in).
 * 3. Builds safe HTML and text payloads.
 * 4. Calls Resend API.
 * 5. Returns delivery status without exposing secrets or throwing unhandled errors.
 * 
 * @param {Object} params
 * @param {string} [params.id] - Reference UUID from database
 * @param {string} [params.createdAt] - Submission timestamp
 * @param {string} params.fullName
 * @param {string} params.phoneNumber
 * @param {string} [params.email]
 * @param {string} params.interestedIn
 * @param {string} [params.message]
 * @returns {Promise<{ attempted: boolean, success: boolean, messageId?: string, error?: string }>}
 */
export async function sendEnquiryNotification({
  id,
  createdAt,
  fullName,
  phoneNumber,
  email,
  interestedIn,
  message
}) {
  const resend = getResendClient();
  const toEmail = getNotificationRecipient();
  const fromEmail = getNotificationSender();

  if (!resend) {
    console.warn('[Email Service] RESEND_API_KEY is not configured on the server. Notification email skipped.');
    return {
      attempted: false,
      success: false,
      error: 'missing_api_key'
    };
  }

  const subject = `New Enquiry — Earth Heritage: ${fullName || 'General'}`;
  const text = generateEnquiryText({
    fullName,
    phoneNumber,
    email,
    interestedIn,
    message,
    createdAt,
    id
  });

  const html = generateEnquiryHtml({
    fullName,
    phoneNumber,
    email,
    interestedIn,
    message,
    createdAt,
    id,
    toEmail
  });

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
      text
    });

    if (error) {
      console.error('[Email Service] Resend email delivery error:', error.message || error.name);
      return {
        attempted: true,
        success: false,
        error: error.message || 'resend_delivery_error'
      };
    }

    return {
      attempted: true,
      success: true,
      messageId: data?.id
    };
  } catch (err) {
    console.error('[Email Service] Unexpected error calling Resend API:', err?.message || 'unknown');
    return {
      attempted: true,
      success: false,
      error: 'api_call_exception'
    };
  }
}
