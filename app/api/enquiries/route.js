import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

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
 * POST /api/enquiries
 * 
 * Secure server-side ingestion endpoint for Earth Heritage enquiries.
 * Validates submission payload and inserts directly into public.enquiries
 * using the server-only Supabase service-role client.
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

  // 2. Anti-spam Honeypot Inspection
  // If an automated bot fills any hidden decoy field, safely intercept without database persistence
  if (body?.website || body?.honeypot || body?.company_fax) {
    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully.'
      },
      { status: 201 }
    );
  }

  const {
    fullName,
    phoneNumber,
    email,
    interestedIn,
    message,
    source,
    pageUrl
  } = body || {};

  const errors = {};

  // 3. Server-Side Field Validation & Normalization

  // A. Full Name: Required, min 2 characters
  const cleanFullName = typeof fullName === 'string' ? fullName.trim() : '';
  if (!cleanFullName) {
    errors.fullName = 'Full name is required.';
  } else if (cleanFullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  // B. Phone Number: Required, valid telephone pattern
  const cleanPhone = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
  const normalizedPhone = cleanPhone.replace(/[\s\-\(\)\.]/g, '');
  if (!cleanPhone) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!/^[\+]?[0-9]{7,16}$/.test(normalizedPhone)) {
    errors.phoneNumber = 'Please provide a valid phone number (7 to 15 digits).';
  }

  // C. Email: Optional; format check only if provided
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  if (cleanEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  // D. Interested In: Required
  const cleanInterestedIn = typeof interestedIn === 'string' ? interestedIn.trim() : '';
  if (!cleanInterestedIn) {
    errors.interestedIn = 'Area of interest is required.';
  }

  // E. Source: Required
  const cleanSource = typeof source === 'string' ? source.trim() : '';
  if (!cleanSource) {
    errors.source = 'Enquiry source is required.';
  }

  // F. Message & Page URL: Optional
  const cleanMessage = typeof message === 'string' ? message.trim() : '';
  const cleanPageUrl = typeof pageUrl === 'string' ? pageUrl.trim() : '';

  // 4. Return Validation Errors (HTTP 400)
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

  // 5. Verify Server Supabase Service Role Configuration
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    console.error('[Enquiries API] Database service-role credentials are not configured on the server.');
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process enquiry at this time. Please try again later.'
      },
      { status: 500 }
    );
  }

  // 6. Map to Canonical Database Schema
  // Note: id, status, and created_at are generated automatically by PostgreSQL defaults.
  const record = {
    full_name: cleanFullName,
    phone_number: normalizedPhone,
    email: cleanEmail || null,
    interested_in: cleanInterestedIn,
    message: cleanMessage || null,
    source: cleanSource,
    page_url: cleanPageUrl || null
  };

  // 7. Secure Insertion via Supabase Admin Client
  try {
    const { error: dbError } = await supabaseAdmin
      .from('enquiries')
      .insert([record]);

    if (dbError) {
      // Log technical error code/message without exposing visitor PII to server logs
      console.error('[Enquiries API] Database insert failed:', dbError.message || dbError.code);
      return NextResponse.json(
        {
          success: false,
          message: 'Unable to process enquiry at this time. Please try again later.'
        },
        { status: 500 }
      );
    }

    // 8. Successful Response (HTTP 201)
    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully.'
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Enquiries API] Unexpected server error during submission processing.');
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process enquiry at this time. Please try again later.'
      },
      { status: 500 }
    );
  }
}
