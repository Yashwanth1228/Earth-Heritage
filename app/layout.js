import '@/app/globals.css';
import { constructMetadata } from '@/lib/seo';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';
import SkipLink from '@/components/ui/SkipLink';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/animations/SmoothScroll';
import GsapProvider from '@/components/animations/GsapProvider';
import { EnquiryProvider } from '@/context/EnquiryContext';
import EnquiryModal from '@/components/ui/EnquiryModal';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FloatingEnquiryButton from '@/components/ui/FloatingEnquiryButton';

import { Fraunces, Inter, Montserrat } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={`h-full ${fraunces.variable} ${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <SkipLink targetId="main-content" />
        <EnquiryProvider>
          <GsapProvider>
            <SmoothScroll>
              <Header />
              <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </GsapProvider>
          {/* Fixed overlay conversion components mounted at top viewport level */}
          <FloatingEnquiryButton />
          <WhatsAppButton />
          <EnquiryModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
