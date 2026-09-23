import Container from '@/components/ui/Container';
import Link from 'next/link';
import { Mail, Phone, MapPin, FileText, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Earth Heritage Pvt. Ltd.',
  description: 'Official Terms & Conditions governing services, website use, farmland properties, bookings, and agreements for Earth Heritage Pvt. Ltd.',
  alternates: {
    canonical: '/terms'
  }
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FAF7F2] text-[#111613]">
      <Container size="default" className="max-w-4xl">
        
        {/* ============================================================ */}
        {/* HEADER / NAVIGATION                                          */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#E5DAC4]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE7D5] text-xs font-mono uppercase tracking-widest text-[#15341C] font-medium">
              <FileText className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
              <span>Terms of Agreement</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#705C3B]">
            <Link
              href="/privacy-policy"
              className="hover:text-[#15341C] hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1"
            >
              <span>View Privacy Policy</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TERMS & CONDITIONS DOCUMENT                                   */}
        {/* ============================================================ */}
        <article id="terms" aria-labelledby="terms-heading" className="pt-10">
          {/* Header */}
          <div className="space-y-4">
            <h1
              id="terms-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111613] tracking-tight"
            >
              Terms &amp; Conditions
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#8C7A5A]">
              Earth Heritage Pvt. Ltd. &bull; Effective: September 2026
            </p>
          </div>

          {/* Introductory Notice */}
          <div className="mt-8 p-6 rounded-2xl bg-white/80 border border-[#E5DAC4] text-sm sm:text-base text-[#2E3C32] leading-relaxed space-y-3">
            <p>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern the use of the services, website, properties, and facilities provided by <strong>Earth Heritage Pvt. Ltd.</strong> (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            </p>
            <p>
              By accessing our website, purchasing or booking a farmland property, or using our services, you agree to these Terms. Please read them carefully.
            </p>
          </div>

          {/* Terms & Conditions Sections 1 - 15 */}
          <div className="mt-10 space-y-10 font-sans text-sm sm:text-base text-[#3E4C41] leading-relaxed">
            
            {/* 1. Introduction */}
            <section aria-labelledby="tc-sec-1" className="space-y-3">
              <h2 id="tc-sec-1" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                1. Introduction
              </h2>
              <p>
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern the use of the services, website, properties, and facilities provided by <strong>Earth Heritage Pvt. Ltd.</strong> (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              </p>
              <p>
                By accessing our website, purchasing or booking a farmland property, or using our services, you agree to these Terms.
              </p>
            </section>

            {/* 2. Property Information */}
            <section aria-labelledby="tc-sec-2" className="space-y-3">
              <h2 id="tc-sec-2" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                2. Property Information
              </h2>
              <p>
                We make reasonable efforts to ensure that information relating to farmland properties, including location, area, photographs, amenities, boundaries, agricultural facilities, and pricing, is accurate and up to date.
              </p>
              <p>
                However, photographs, illustrations, maps, layouts, and other promotional materials may be for representation purposes only and may differ from the actual property or completed facilities.
              </p>
            </section>

            {/* 3. Property Purchase or Booking */}
            <section aria-labelledby="tc-sec-3" className="space-y-3">
              <h2 id="tc-sec-3" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                3. Property Purchase or Booking
              </h2>
              <p>
                Any booking, expression of interest, advance payment, or reservation is subject to the availability of the property and execution of the applicable sale, purchase, lease, or other agreement.
              </p>
              <p>
                A booking does not by itself constitute transfer of ownership unless expressly stated in a legally executed agreement.
              </p>
            </section>

            {/* 4. Payments */}
            <section aria-labelledby="tc-sec-4" className="space-y-3">
              <h2 id="tc-sec-4" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                4. Payments
              </h2>
              <p>
                Customers must make payments according to the payment schedule communicated by the Company.
              </p>
              <p>
                All applicable taxes, registration charges, stamp duty, legal expenses, government fees, and other statutory charges shall be borne by the party responsible for such charges under the applicable agreement or law.
              </p>
            </section>

            {/* 5. Cancellation and Refunds */}
            <section aria-labelledby="tc-sec-5" className="space-y-3">
              <h2 id="tc-sec-5" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                5. Cancellation and Refunds
              </h2>
              <p>
                Cancellation and refund conditions will be governed by the applicable booking form, allotment letter, sale agreement, or other written agreement.
              </p>
              <p>
                Any refundable amount will be processed subject to applicable deductions, contractual terms, and applicable law.
              </p>
            </section>

            {/* 6. Land Use and Agricultural Activities */}
            <section aria-labelledby="tc-sec-6" className="space-y-3">
              <h2 id="tc-sec-6" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                6. Land Use and Agricultural Activities
              </h2>
              <p>
                The use of the property shall comply with applicable land-use regulations, zoning requirements, environmental laws, agricultural regulations, and other government requirements.
              </p>
              <p>
                Owners or users must obtain any approvals, permissions, or licenses required for their proposed activities.
              </p>
              <p>
                The Company does not guarantee that every proposed activity will be permitted by government authorities.
              </p>
            </section>

            {/* 7. Development and Amenities */}
            <section aria-labelledby="tc-sec-7" className="space-y-3">
              <h2 id="tc-sec-7" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                7. Development and Amenities
              </h2>
              <p>
                Where the Company provides or proposes roads, fencing, water facilities, electricity, landscaping, farm infrastructure, security, common areas, or other amenities, such facilities shall be subject to the specifications and conditions stated in the relevant agreement.
              </p>
              <p>
                Maintenance arrangements and associated charges may apply.
              </p>
            </section>

            {/* 8. Possession and Documentation */}
            <section aria-labelledby="tc-sec-8" className="space-y-3">
              <h2 id="tc-sec-8" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                8. Possession and Documentation
              </h2>
              <p>
                Possession and/or transfer of the property shall take place in accordance with the applicable agreement and subject to completion of required legal and regulatory formalities.
              </p>
              <p>
                The customer is responsible for providing accurate information and documents required for the transaction.
              </p>
            </section>

            {/* 9. Due Diligence */}
            <section aria-labelledby="tc-sec-9" className="space-y-3">
              <h2 id="tc-sec-9" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                9. Due Diligence
              </h2>
              <p>
                Customers are encouraged to independently verify property boundaries, title documents, access, measurements, land-use restrictions, government records, approvals, and other relevant matters before entering into a transaction.
              </p>
              <p>
                Where applicable, the Company will provide documents available to it for reasonable customer due diligence.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section aria-labelledby="tc-sec-10" className="space-y-3">
              <h2 id="tc-sec-10" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                10. Limitation of Liability
              </h2>
              <p>
                To the extent permitted by applicable law, the Company shall not be responsible for delays, changes, restrictions, or losses arising from circumstances beyond its reasonable control, including government actions, changes in law, natural disasters, extreme weather, infrastructure disruptions, or other force-majeure events.
              </p>
              <p>
                Nothing in these Terms limits any liability that cannot legally be excluded or limited.
              </p>
            </section>

            {/* 11. Website and Content */}
            <section aria-labelledby="tc-sec-11" className="space-y-3">
              <h2 id="tc-sec-11" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                11. Website and Content
              </h2>
              <p>
                The Company&apos;s website, photographs, designs, text, videos, maps, logos, and other content are protected by applicable intellectual-property laws.
              </p>
              <p>
                Users may not reproduce, distribute, modify, or commercially exploit such content without prior written permission.
              </p>
            </section>

            {/* 12. Privacy */}
            <section aria-labelledby="tc-sec-12" className="space-y-3">
              <h2 id="tc-sec-12" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                12. Privacy
              </h2>
              <p>
                Personal information collected from customers will be handled in accordance with the Company&apos;s Privacy Policy and applicable data-protection laws.
              </p>
            </section>

            {/* 13. Changes to Terms */}
            <section aria-labelledby="tc-sec-13" className="space-y-3">
              <h2 id="tc-sec-13" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                13. Changes to Terms
              </h2>
              <p>
                The Company may update these Terms from time to time. Updated Terms will become effective when published on the Company&apos;s website or otherwise communicated to customers, subject to applicable law and existing contractual obligations.
              </p>
            </section>

            {/* 14. Governing Law and Jurisdiction */}
            <section aria-labelledby="tc-sec-14" className="space-y-3">
              <h2 id="tc-sec-14" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                14. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by the laws of India and the applicable laws of Karnataka.
              </p>
              <p>
                Subject to applicable law and the dispute-resolution provisions of the relevant agreement, courts located in Bengaluru, Karnataka shall have jurisdiction.
              </p>
            </section>

            {/* 15. Contact */}
            <section aria-labelledby="tc-sec-15" className="space-y-4 pt-4 border-t border-[#E5DAC4]">
              <h2 id="tc-sec-15" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                15. Contact
              </h2>
              <p>
                For questions regarding these Terms, please contact:
              </p>

              <div className="p-6 rounded-2xl bg-white border border-[#E5DAC4] shadow-xs space-y-4">
                <div className="font-serif text-lg text-[#15341C] font-medium">
                  Earth Heritage Pvt. Ltd.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#3E4C41]">
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#8C7A5A]">Address</span>
                      <address className="not-italic leading-relaxed">
                        No. 4, 5, 6, BBMP Khata, Samruddi, No. 565/769, Gidadakonahalli Main Road, Nagarbhavi / Viswaneedam, Bangalore North, Bengaluru, Karnataka 560091
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#8C7A5A]">Email</span>
                      <a href="mailto:earthheritageit@gmail.com" className="text-[#15341C] hover:underline">
                        earthheritageit@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#8C7A5A]">Phone</span>
                      <a href="tel:+919902096969" className="text-[#15341C] hover:underline">
                        9902096969
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </article>

      </Container>
    </div>
  );
}
