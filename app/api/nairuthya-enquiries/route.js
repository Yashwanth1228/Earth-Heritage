import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';
import { normalizeAndValidatePhone } from '@/lib/enquiryNormalization';
import { NAIRUTHYA_INTEREST_OPTIONS } from '@/lib/nairuthyaEnquiry';
import { sendNairuthyaLeadNotification } from '@/lib/nairuthyaEmail';

/**
 * Handle unsupported HTTP methods
 */
const methodNotAllowed = () =>
  NextResponse.json(
    { success: false, message: 'Method Not Allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

/**
 * POST /api/nairuthya-enquiries
 * 
 * Dedicated server-side ingestion endpoint for the Nairuthya Whispering Wood lead-capture form.
 * 1. Validates submission payload against strict server-side rules.
 * 2. Normalizes Indian mobile phone numbers.
 * 3. Enforces server-controlled attribution constants (source and page_url).
 * 4. Inserts exclusively into public.nairuthya_enquiries using service_role credentials.
 * 5. Dispatches an isolated transactional notification email via Resend.
 * 6. Preserves database insertion as single source of truth without failing on email error.
 * 7. Never touches or alters the existing public.enquiries table.
 */
export async function POST(request) {
  // 1. Parse JSON Request Body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid JSON payload in request body.'
      },
      { status: 400 }
    );
  }

  // 2. Anti-Spam Honeypot Inspection
  // If an automated bot fills any hidden decoy field, safely intercept without database write or email
  if (body?.website || body?.honeypot || body?.company_fax) {
    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received successfully.'
      },
      { status: 201 }
    );
  }

  // Extract input fields supporting both camelCase and snake_case
  const fullName = body?.fullName ?? body?.full_name;
  const phone = body?.phone ?? body?.phoneNumber ?? body?.phone_number;
  const email = body?.email;
  const location = body?.location;
  const interest = body?.interest ?? body?.interestedIn ?? body?.interested_in;
  const preferredVisitDate = body?.preferredVisitDate ?? body?.preferred_visit_date;
  const consent = body?.consent;

  const errors = {};

  // 3. Server-Side Field Validations

  // A. Full Name: Required, min 2 chars, max 100 chars
  const cleanFullName = typeof fullName === 'string' ? fullName.trim() : '';
  if (!cleanFullName) {
    errors.fullName = 'Full name is required.';
  } else if (cleanFullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  } else if (cleanFullName.length > 100) {
    errors.fullName = 'Full name cannot exceed 100 characters.';
  }

  // B. Phone Number: Required, valid Indian mobile number
  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  let normalizedPhone = '';
  if (!cleanPhone) {
    errors.phone = 'Phone number is required.';
  } else {
    const phoneValidation = normalizeAndValidatePhone(cleanPhone);
    if (!phoneValidation.valid || phoneValidation.country !== 'IN') {
      errors.phone = 'Please provide a valid 10-digit Indian mobile number.';
    } else {
      normalizedPhone = phoneValidation.normalized;
    }
  }

  // C. Email: Optional, format validated if provided, max 255 chars
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  if (cleanEmail) {
    if (cleanEmail.length > 255) {
      errors.email = 'Email address cannot exceed 255 characters.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  // D. Location: Optional, max 120 chars
  const cleanLocation = typeof location === 'string' ? location.trim() : '';
  if (cleanLocation && cleanLocation.length > 120) {
    errors.location = 'Location cannot exceed 120 characters.';
  }

  // E. Interest: Required, validated against approved Nairuthya options
  const cleanInterest = typeof interest === 'string' ? interest.trim() : '';
  if (!cleanInterest) {
    errors.interest = 'Area of interest is required.';
  } else if (!NAIRUTHYA_INTEREST_OPTIONS.includes(cleanInterest)) {
    errors.interest = 'Please select a valid area of interest.';
  }

  // F. Preferred Visit Date: Optional, format YYYY-MM-DD, valid calendar date, not in the past
  const cleanVisitDate = typeof preferredVisitDate === 'string' ? preferredVisitDate.trim() : '';
  if (cleanVisitDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanVisitDate)) {
      errors.preferredVisitDate = 'Please provide a valid date in YYYY-MM-DD format.';
    } else {
      const [year, month, day] = cleanVisitDate.split('-').map(Number);
      const parsedDate = new Date(year, month - 1, day);
      if (
        parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() !== month - 1 ||
        parsedDate.getDate() !== day
      ) {
        errors.preferredVisitDate = 'Please provide a valid calendar date.';
      } else {
        // Enforce date is not in the past (Indian Standard Time Asia/Kolkata)
        const todayIST = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
        if (cleanVisitDate < todayIST) {
          errors.preferredVisitDate = 'Preferred visit date cannot be in the past.';
        }
      }
    }
  }

  // G. Consent: Required and must strictly evaluate to boolean true
  if (consent !== true) {
    errors.consent = 'You must give consent to be contacted regarding your enquiry.';
  }

  // 4. Return Structured Validation Errors (HTTP 400)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please check the submitted details.',
        errors
      },
      { status: 400 }
    );
  }

  // 5. Verify Server-Side Supabase Service Role Configuration
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    console.error('[Nairuthya API] Database service-role credentials are not configured on the server.');
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process enquiry at this time. Please try again later.'
      },
      { status: 500 }
    );
  }

  // 6. Secure Database Insertion into public.nairuthya_enquiries
  // Attribution values (source and page_url) are strictly server-controlled
  try {
    const { data: insertedData, error: dbError } = await supabaseAdmin
      .from('nairuthya_enquiries')
      .insert([
        {
          full_name: cleanFullName,
          phone: normalizedPhone,
          raw_phone: cleanPhone,
          email: cleanEmail || null,
          location: cleanLocation || null,
          interest: cleanInterest,
          preferred_visit_date: cleanVisitDate || null,
          consent: true,
          source: 'Dedicated Form - Nairuthya Whispering Wood',
          page_url: '/form/nairuthya-whispering-wood',
          status: 'new'
        }
      ])
      .select('id, created_at')
      .single();

    if (dbError) {
      // Log technical error code without exposing visitor PII to server logs
      console.error('[Nairuthya API] Database insertion failed:', dbError.message || dbError.code);
      return NextResponse.json(
        {
          success: false,
          message: 'Unable to process enquiry at this time. Please try again later.'
        },
        { status: 500 }
      );
    }

    if (!insertedData || !insertedData.id) {
      console.error('[Nairuthya API] Database returned unexpected response format.');
      return NextResponse.json(
        {
          success: false,
          message: 'Unable to process enquiry at this time. Please try again later.'
        },
        { status: 500 }
      );
    }

    // 7. Transactional Lead Notification Email via Resend
    // Invoked strictly AFTER the database insertion succeeds.
    // Database record remains preserved even if notification delivery encounters an issue.
    let emailResult = { attempted: false, success: false };
    try {
      emailResult = await sendNairuthyaLeadNotification({
        id: insertedData.id,
        createdAt: insertedData.created_at || new Date().toISOString(),
        fullName: cleanFullName,
        phone: cleanPhone,
        email: cleanEmail || null,
        location: cleanLocation || null,
        interest: cleanInterest,
        preferredVisitDate: cleanVisitDate || null,
        consent: true
      });
    } catch (emailErr) {
      console.error('[Nairuthya API] Unexpected error during notification dispatch:', emailErr?.message || 'unknown');
      emailResult = { attempted: true, success: false, error: 'dispatch_exception' };
    }

    // 8. Successful Response (HTTP 201 Created)
    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received successfully.',
        data: {
          id: insertedData.id,
          notificationSent: Boolean(emailResult?.success)
        }
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Nairuthya API] Unexpected server error during submission processing.');
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process enquiry at this time. Please try again later.'
      },
      { status: 500 }
    );
  }
}
