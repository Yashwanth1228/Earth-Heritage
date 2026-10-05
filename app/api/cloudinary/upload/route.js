import { NextResponse } from 'next/server';
import { uploadImageStream, isCloudinaryConfigured } from '@/lib/cloudinary';

/**
 * ==============================================================================
 * DEVELOPMENT / TESTING ENDPOINT ONLY
 * ==============================================================================
 * NOTICE:
 * This is an unauthenticated test upload endpoint created strictly for verifying
 * the server-side Cloudinary integration pipeline during initial setup.
 *
 * SECURITY REQUIREMENT FOR CMS / PRODUCTION DEPLOYMENT:
 * - This endpoint must NOT be exposed publicly in production without administrative
 *   authentication (e.g. Supabase session validation / role-based admin check).
 * - It will be protected or replaced by the authenticated CMS media management API.
 * ==============================================================================
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Maximum allowed image file size for test uploads: 10 MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed image MIME types
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml'
]);

export async function POST(request) {
  try {
    // 1. Verify server-side configuration
    if (!isCloudinaryConfigured) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cloudinary server credentials are not configured. Please supply NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in the server environment.'
        },
        { status: 503 }
      );
    }

    // 2. Parse multipart form data
    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data. Expected multipart/form-data upload.'
        },
        { status: 400 }
      );
    }

    // 3. Extract and validate file
    const file = formData.get('file') || formData.get('image');
    if (!file || typeof file === 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'No image file provided. Please attach an image under field name "file" or "image".'
        },
        { status: 400 }
      );
    }

    // 4. Validate file type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type "${file.type || 'unknown'}". Allowed formats: JPEG, PNG, WebP, AVIF, GIF, SVG.`
        },
        { status: 400 }
      );
    }

    // 5. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 10MB limit. Received ${Math.round(file.size / (1024 * 1024))}MB.`
        },
        { status: 400 }
      );
    }

    // 6. Convert file ArrayBuffer to Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 7. Upload to Cloudinary under folder "earth-heritage/test"
    const uploadResult = await uploadImageStream(buffer, {
      folder: 'earth-heritage/test',
      resource_type: 'image'
    });

    // 8. Return ONLY safe, non-sensitive response data
    return NextResponse.json({
      success: true,
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format
    });
  } catch (error) {
    console.error('[Cloudinary Test Upload Error]:', error?.message || error);

    // Return sanitized error message without leaking credentials or internal stack
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Server error occurred while uploading to Cloudinary.'
      },
      { status: 500 }
    );
  }
}
