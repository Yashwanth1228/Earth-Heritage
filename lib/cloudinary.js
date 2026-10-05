import { v2 as cloudinary } from 'cloudinary';

// Server-only guard: prevent accidental execution in browser environments
if (typeof window !== 'undefined') {
  throw new Error('Cloudinary server SDK must not be imported in browser/client code.');
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

/**
 * Boolean flag indicating whether Cloudinary credentials have been provided.
 */
export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

// Initialize Cloudinary if credentials are present
if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
}

/**
 * Server-side helper to upload a Buffer stream to Cloudinary.
 *
 * @param {Buffer} buffer - File buffer to upload
 * @param {Object} options - Upload options (folder, tags, transformations, etc.)
 * @returns {Promise<Object>} Cloudinary upload response
 */
export function uploadImageStream(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      return reject(new Error('Cloudinary credentials are not configured on the server.'));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        ...options
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

export { cloudinary };
export default cloudinary;
