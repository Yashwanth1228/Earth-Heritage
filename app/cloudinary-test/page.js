import Image from 'next/image';

export const metadata = {
  title: 'Cloudinary Image Delivery Test | Earth Heritage',
  robots: {
    index: false,
    follow: false
  }
};

const CLOUDINARY_TEST_IMAGE_URL =
  'https://res.cloudinary.com/yffbj6hj/image/upload/v1791198065/earth-heritage/test/jnj0djtxbozo2khgnb8i.jpg';

export default function CloudinaryTestPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-stone-200 pb-6">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Integration Test
          </span>
          <h1 className="text-3xl font-serif text-stone-900 tracking-tight">
            Cloudinary + Next.js Image Delivery Verification
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Testing secure image delivery via next/image and Next.js Image Optimization layer.
          </p>
        </header>

        <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">
            Rendered Image (next/image)
          </h2>

          <div className="relative overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
            <Image
              src={CLOUDINARY_TEST_IMAGE_URL}
              alt="Cloudinary Delivery Test — Coconut Garden Entrance Gate"
              width={1024}
              height={576}
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="w-full h-auto object-cover"
              id="cloudinary-test-image"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-stone-50 p-4 rounded-lg border border-stone-200 text-stone-700">
            <div>
              <span className="font-semibold text-stone-900 block">Cloudinary Source URL:</span>
              <span className="break-all">{CLOUDINARY_TEST_IMAGE_URL}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Native Dimensions:</span>
              <span>1024 × 576 px (16:9 Aspect Ratio)</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Target Folder:</span>
              <span>earth-heritage/test</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900 block">Rendering Engine:</span>
              <span>next/image with automatic format negotiation (AVIF/WebP)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
