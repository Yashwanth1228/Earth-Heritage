import Container from '@/components/ui/Container';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, ShieldCheck, FileText, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Terms of Service | Earth Heritage Pvt. Ltd.',
  description: 'Official Privacy Policy and Terms & Conditions for Earth Heritage Pvt. Ltd.',
  alternates: {
    canonical: '/privacy-policy'
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FAF7F2] text-[#111613]">
      <Container size="default" className="max-w-4xl">
        
        {/* ============================================================ */}
        {/* QUICK JUMP / PAGE NAVIGATION HEADER                          */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#E5DAC4]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE7D5] text-xs font-mono uppercase tracking-widest text-[#15341C] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
              <span>Legal Agreements</span>
            </span>
          </div>

          <nav aria-label="Legal document jump links" className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#705C3B]">
            <a
              href="#privacy-policy"
              className="hover:text-[#15341C] hover:underline underline-offset-4 transition-colors"
            >
              1. Privacy Policy
            </a>
            <span className="text-[#C4B79B]">&bull;</span>
            <a
              href="#terms"
              className="hover:text-[#15341C] hover:underline underline-offset-4 transition-colors"
            >
              2. Terms &amp; Conditions
            </a>
          </nav>
        </div>

        {/* ============================================================ */}
        {/* DOCUMENT 1: PRIVACY POLICY                                   */}
        {/* ============================================================ */}
        <article id="privacy-policy" aria-labelledby="privacy-policy-heading" className="scroll-mt-28 sm:scroll-mt-36 pt-10">
          {/* Header */}
          <div className="space-y-4">
            <h1
              id="privacy-policy-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111613] tracking-tight"
            >
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#8C7A5A]">
              Earth Heritage Pvt. Ltd. &bull; Last Updated: September 2026
            </p>
          </div>

          {/* Introductory Notice */}
          <div className="mt-8 p-6 rounded-2xl bg-white/80 border border-[#E5DAC4] text-sm sm:text-base text-[#2E3C32] leading-relaxed space-y-3">
            <p>
              At <strong>Earth Heritage Pvt. Ltd</strong>, we respect your privacy and are committed to protecting the personal information you share with us.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, protect, and handle personal information when you visit our website, submit an enquiry, request a site visit, contact us, or use our services.
            </p>
          </div>

          {/* Privacy Policy Sections 1 - 12 */}
          <div className="mt-10 space-y-10 font-sans text-sm sm:text-base text-[#3E4C41] leading-relaxed">
            
            {/* 1. Information We Collect */}
            <section aria-labelledby="pp-sec-1" className="space-y-3">
              <h2 id="pp-sec-1" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                1. Information We Collect
              </h2>
              <p>Depending on how you interact with us, we may collect information such as:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#2E3C32]">
                <li>Name</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>City or location</li>
                <li>Enquiry and communication details</li>
                <li>Information provided when requesting a site visit</li>
                <li>Information voluntarily submitted through website forms</li>
                <li>Website usage, device, and technical information where applicable</li>
              </ul>
              <p className="text-xs sm:text-sm text-[#627065] italic">
                We aim to collect only information that is reasonably necessary for the relevant purpose.
              </p>
            </section>

            {/* 2. How We Use Your Information */}
            <section aria-labelledby="pp-sec-2" className="space-y-3">
              <h2 id="pp-sec-2" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                2. How We Use Your Information
              </h2>
              <p>We may use your information to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#2E3C32]">
                <li>Respond to your enquiries and requests</li>
                <li>Arrange site visits and provide project information</li>
                <li>Communicate with you regarding our projects and services</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Maintain business and transaction records</li>
                <li>Meet applicable legal and regulatory requirements</li>
                <li>Send promotional or marketing communications where permitted and appropriately consented to</li>
              </ul>
              <p>
                We will use personal information for specified and lawful purposes. India&apos;s data-protection framework emphasises clear notice, purpose-specific processing, and collection of information necessary for the stated purpose.
              </p>
            </section>

            {/* 3. Consent */}
            <section aria-labelledby="pp-sec-3" className="space-y-3">
              <h2 id="pp-sec-3" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                3. Consent
              </h2>
              <p>
                Where consent is required, we will seek it through a clear and understandable notice.
              </p>
              <p>
                You may withdraw consent where consent is the basis for processing your personal information. The withdrawal process should be reasonably easy to use, although withdrawal may affect our ability to provide certain services or respond to certain requests.
              </p>
            </section>

            {/* 4. Sharing of Information */}
            <section aria-labelledby="pp-sec-4" className="space-y-3">
              <h2 id="pp-sec-4" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                4. Sharing of Information
              </h2>
              <p>
                We do not sell your personal information.
              </p>
              <p>
                We may share information with trusted service providers, professional advisers, technology providers, or other parties where reasonably necessary to operate our business, provide requested services, comply with legal obligations, or protect our rights.
              </p>
              <p>
                Where third parties process personal information on our behalf, we expect appropriate safeguards and contractual controls to be maintained.
              </p>
            </section>

            {/* 5. Cookies and Website Technologies */}
            <section aria-labelledby="pp-sec-5" className="space-y-3">
              <h2 id="pp-sec-5" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                5. Cookies and Website Technologies
              </h2>
              <p>
                Our website may use cookies or similar technologies to improve website functionality, understand website usage, and enhance your experience.
              </p>
              <p>
                Where applicable, you may be able to manage cookie preferences through your browser or the controls provided on our website.
              </p>
            </section>

            {/* 6. Data Security */}
            <section aria-labelledby="pp-sec-6" className="space-y-3">
              <h2 id="pp-sec-6" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                6. Data Security
              </h2>
              <p>
                We take reasonable security measures to protect personal information against unauthorised access, misuse, alteration, disclosure, or loss.
              </p>
              <p>
                However, no method of transmission or electronic storage can be guaranteed to be completely secure.
              </p>
            </section>

            {/* 7. Data Retention */}
            <section aria-labelledby="pp-sec-7" className="space-y-3">
              <h2 id="pp-sec-7" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                7. Data Retention
              </h2>
              <p>
                We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, to provide our services, maintain appropriate business records, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p>
                When information is no longer required, we may delete or securely dispose of it, subject to applicable legal requirements.
              </p>
            </section>

            {/* 8. Your Rights */}
            <section aria-labelledby="pp-sec-8" className="space-y-3">
              <h2 id="pp-sec-8" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                8. Your Rights
              </h2>
              <p>Subject to applicable law, you may have rights regarding your personal information, including the ability to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#2E3C32]">
                <li>Request information about the processing of your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request erasure where applicable</li>
                <li>Withdraw consent where consent is the basis of processing</li>
                <li>Raise a grievance regarding the processing of your personal information</li>
              </ul>
              <p>
                The DPDP Act provides rights including access to information about processing, correction and erasure, grievance redressal, and withdrawal of consent in applicable circumstances.
              </p>
            </section>

            {/* 9. Third-Party Websites */}
            <section aria-labelledby="pp-sec-9" className="space-y-3">
              <h2 id="pp-sec-9" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                9. Third-Party Websites
              </h2>
              <p>
                Our website may contain links to third-party websites, platforms, or services.
              </p>
              <p>
                Earth Heritage is not responsible for the privacy practices or content of third-party websites. We encourage you to review their respective privacy policies before providing personal information.
              </p>
            </section>

            {/* 10. Children's Privacy */}
            <section aria-labelledby="pp-sec-10" className="space-y-3">
              <h2 id="pp-sec-10" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                10. Children&apos;s Privacy
              </h2>
              <p>
                Our website and services are not intentionally directed toward children.
              </p>
              <p>
                We do not knowingly seek to collect personal information from children in circumstances where applicable law requires parental or guardian consent.
              </p>
            </section>

            {/* 11. Changes to This Privacy Policy */}
            <section aria-labelledby="pp-sec-11" className="space-y-3">
              <h2 id="pp-sec-11" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                11. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our business, services, technology, or applicable legal requirements.
              </p>
              <p>
                Any updated version will be published on this page with a revised &ldquo;Last Updated&rdquo; date.
              </p>
            </section>

            {/* 12. Contact Us */}
            <section aria-labelledby="pp-sec-12" className="space-y-4 pt-4 border-t border-[#E5DAC4]">
              <h2 id="pp-sec-12" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                12. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise an applicable privacy right, please contact us:
              </p>

              <div className="p-6 rounded-2xl bg-white border border-[#E5DAC4] shadow-xs space-y-4">
                <div className="font-serif text-lg text-[#15341C] font-medium">
                  Earth Heritage Pvt. Ltd.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#3E4C41]">
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
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#8C7A5A]">Registered Address</span>
                      <address className="not-italic leading-relaxed">
                        Earth Heritage Pvt. Ltd., 4,5,6, BBMP Khata, SAMRUDDI &ldquo; No3, No 565/769, GIDADAKONENAHALLI MAIN ROAD, Nagarbhavi, Bengaluru, Karnataka 560091
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <Globe className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#8C7A5A]">Website</span>
                      <a
                        href="https://earthheritage.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#15341C] hover:underline inline-flex items-center gap-1"
                      >
                        <span>https://earthheritage.in</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#627065] pt-2 border-t border-[#E5DAC4]/60">
                  We will review and respond to privacy-related requests in accordance with applicable law.
                </p>
              </div>
            </section>

          </div>
        </article>

        {/* ============================================================ */}
        {/* CLEAR VISUAL DIVIDER BETWEEN PRIVACY POLICY & TERMS          */}
        {/* ============================================================ */}
        <div className="my-16 sm:my-24 relative" aria-hidden="true">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-[#D8C7A9]" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D8C7A9] font-mono text-xs uppercase tracking-widest text-[#15341C] font-semibold shadow-xs flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#B88E3E]" />
              <span>Section Divider &bull; Terms &amp; Conditions</span>
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DOCUMENT 2: TERMS & CONDITIONS                               */}
        {/* ============================================================ */}
        <article id="terms" aria-labelledby="terms-heading" className="scroll-mt-28 sm:scroll-mt-36 pt-2">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7D5] text-xs font-mono uppercase tracking-widest text-[#15341C]">
              Terms of Agreement
            </div>
            <h2
              id="terms-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111613] tracking-tight"
            >
              Terms &amp; Conditions
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8C7A5A]">
              Earth Heritage Pvt. Ltd. &bull; Effective: September 2026
            </p>
          </div>

          {/* Terms & Conditions Sections 1 - 15 */}
          <div className="mt-10 space-y-10 font-sans text-sm sm:text-base text-[#3E4C41] leading-relaxed">
            
            {/* 1. Introduction */}
            <section aria-labelledby="tc-sec-1" className="space-y-3">
              <h3 id="tc-sec-1" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                1. Introduction
              </h3>
              <p>
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern the use of the services, website, properties, and facilities provided by <strong>Earth Heritage Pvt. Ltd.</strong> (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              </p>
              <p>
                By accessing our website, purchasing or booking a farmland property, or using our services, you agree to these Terms.
              </p>
            </section>

            {/* 2. Property Information */}
            <section aria-labelledby="tc-sec-2" className="space-y-3">
              <h3 id="tc-sec-2" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                2. Property Information
              </h3>
              <p>
                We make reasonable efforts to ensure that information relating to farmland properties, including location, area, photographs, amenities, boundaries, agricultural facilities, and pricing, is accurate and up to date.
              </p>
              <p>
                However, photographs, illustrations, maps, layouts, and other promotional materials may be for representation purposes only and may differ from the actual property or completed facilities.
              </p>
            </section>

            {/* 3. Property Purchase or Booking */}
            <section aria-labelledby="tc-sec-3" className="space-y-3">
              <h3 id="tc-sec-3" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                3. Property Purchase or Booking
              </h3>
              <p>
                Any booking, expression of interest, advance payment, or reservation is subject to the availability of the property and execution of the applicable sale, purchase, lease, or other agreement.
              </p>
              <p>
                A booking does not by itself constitute transfer of ownership unless expressly stated in a legally executed agreement.
              </p>
            </section>

            {/* 4. Payments */}
            <section aria-labelledby="tc-sec-4" className="space-y-3">
              <h3 id="tc-sec-4" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                4. Payments
              </h3>
              <p>
                Customers must make payments according to the payment schedule communicated by the Company.
              </p>
              <p>
                All applicable taxes, registration charges, stamp duty, legal expenses, government fees, and other statutory charges shall be borne by the party responsible for such charges under the applicable agreement or law.
              </p>
            </section>

            {/* 5. Cancellation and Refunds */}
            <section aria-labelledby="tc-sec-5" className="space-y-3">
              <h3 id="tc-sec-5" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                5. Cancellation and Refunds
              </h3>
              <p>
                Cancellation and refund conditions will be governed by the applicable booking form, allotment letter, sale agreement, or other written agreement.
              </p>
              <p>
                Any refundable amount will be processed subject to applicable deductions, contractual terms, and applicable law.
              </p>
            </section>

            {/* 6. Land Use and Agricultural Activities */}
            <section aria-labelledby="tc-sec-6" className="space-y-3">
              <h3 id="tc-sec-6" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                6. Land Use and Agricultural Activities
              </h3>
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
              <h3 id="tc-sec-7" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                7. Development and Amenities
              </h3>
              <p>
                Where the Company provides or proposes roads, fencing, water facilities, electricity, landscaping, farm infrastructure, security, common areas, or other amenities, such facilities shall be subject to the specifications and conditions stated in the relevant agreement.
              </p>
              <p>
                Maintenance arrangements and associated charges may apply.
              </p>
            </section>

            {/* 8. Possession and Documentation */}
            <section aria-labelledby="tc-sec-8" className="space-y-3">
              <h3 id="tc-sec-8" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                8. Possession and Documentation
              </h3>
              <p>
                Possession and/or transfer of the property shall take place in accordance with the applicable agreement and subject to completion of required legal and regulatory formalities.
              </p>
              <p>
                The customer is responsible for providing accurate information and documents required for the transaction.
              </p>
            </section>

            {/* 9. Due Diligence */}
            <section aria-labelledby="tc-sec-9" className="space-y-3">
              <h3 id="tc-sec-9" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                9. Due Diligence
              </h3>
              <p>
                Customers are encouraged to independently verify property boundaries, title documents, access, measurements, land-use restrictions, government records, approvals, and other relevant matters before entering into a transaction.
              </p>
              <p>
                Where applicable, the Company will provide documents available to it for reasonable customer due diligence.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section aria-labelledby="tc-sec-10" className="space-y-3">
              <h3 id="tc-sec-10" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                10. Limitation of Liability
              </h3>
              <p>
                To the extent permitted by applicable law, the Company shall not be responsible for delays, changes, restrictions, or losses arising from circumstances beyond its reasonable control, including government actions, changes in law, natural disasters, extreme weather, infrastructure disruptions, or other force-majeure events.
              </p>
              <p>
                Nothing in these Terms limits any liability that cannot legally be excluded or limited.
              </p>
            </section>

            {/* 11. Website and Content */}
            <section aria-labelledby="tc-sec-11" className="space-y-3">
              <h3 id="tc-sec-11" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                11. Website and Content
              </h3>
              <p>
                The Company&apos;s website, photographs, designs, text, videos, maps, logos, and other content are protected by applicable intellectual-property laws.
              </p>
              <p>
                Users may not reproduce, distribute, modify, or commercially exploit such content without prior written permission.
              </p>
            </section>

            {/* 12. Privacy */}
            <section aria-labelledby="tc-sec-12" className="space-y-3">
              <h3 id="tc-sec-12" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                12. Privacy
              </h3>
              <p>
                Personal information collected from customers will be handled in accordance with the Company&apos;s Privacy Policy and applicable data-protection laws.
              </p>
            </section>

            {/* 13. Changes to Terms */}
            <section aria-labelledby="tc-sec-13" className="space-y-3">
              <h3 id="tc-sec-13" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                13. Changes to Terms
              </h3>
              <p>
                The Company may update these Terms from time to time. Updated Terms will become effective when published on the Company&apos;s website or otherwise communicated to customers, subject to applicable law and existing contractual obligations.
              </p>
            </section>

            {/* 14. Governing Law and Jurisdiction */}
            <section aria-labelledby="tc-sec-14" className="space-y-3">
              <h3 id="tc-sec-14" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                14. Governing Law and Jurisdiction
              </h3>
              <p>
                These Terms shall be governed by the laws of India and the applicable laws of Karnataka.
              </p>
              <p>
                Subject to applicable law and the dispute-resolution provisions of the relevant agreement, courts located in Bengaluru, Karnataka shall have jurisdiction.
              </p>
            </section>

            {/* 15. Contact */}
            <section aria-labelledby="tc-sec-15" className="space-y-4 pt-4 border-t border-[#E5DAC4]">
              <h3 id="tc-sec-15" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                15. Contact
              </h3>
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
