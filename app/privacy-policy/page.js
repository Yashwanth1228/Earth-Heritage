import Container from '@/components/ui/Container';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Earth Heritage Pvt. Ltd.',
  description: 'Official Privacy Policy for Earth Heritage Pvt. Ltd. detailing how we collect, use, store, protect, and handle personal information.',
  alternates: {
    canonical: '/privacy-policy'
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FAF7F2] text-[#111613]">
      <Container size="default" className="max-w-4xl">
        
        {/* ============================================================ */}
        {/* HEADER / NAVIGATION                                          */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#E5DAC4]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE7D5] text-xs font-mono uppercase tracking-widest text-[#15341C] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
              <span>Privacy Policy</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#705C3B]">
            <Link
              href="/terms"
              className="hover:text-[#15341C] hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1"
            >
              <span>View Terms &amp; Conditions</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRIVACY POLICY DOCUMENT                                      */}
        {/* ============================================================ */}
        <article id="privacy-policy" aria-labelledby="privacy-policy-heading" className="pt-10">
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
              <p>We may use the information collected to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#2E3C32]">
                <li>Respond to enquiries, requests, and questions</li>
                <li>Schedule and coordinate property visits</li>
                <li>Provide information about farmland projects, amenities, and related services</li>
                <li>Communicate via call, SMS, email, WhatsApp, or messaging platforms where permitted</li>
                <li>Maintain internal records and improve our services, customer experience, and website</li>
                <li>Comply with applicable legal, statutory, and regulatory obligations</li>
              </ul>
            </section>

            {/* 3. Consent and Communications */}
            <section aria-labelledby="pp-sec-3" className="space-y-3">
              <h2 id="pp-sec-3" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                3. Consent and Communications
              </h2>
              <p>
                By submitting your contact information through our website, enquiry forms, campaigns, messaging channels, or during conversations with our representatives, you consent to being contacted by Earth Heritage Pvt. Ltd. regarding your enquiry, project updates, site visits, and related offerings.
              </p>
              <p>
                You may request to opt out of promotional communications at any time by contacting us through the details below.
              </p>
            </section>

            {/* 4. Information Sharing and Disclosure */}
            <section aria-labelledby="pp-sec-4" className="space-y-3">
              <h2 id="pp-sec-4" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                4. Information Sharing and Disclosure
              </h2>
              <div className="p-4 rounded-xl bg-[#EFE7D5]/40 border border-[#E5DAC4] font-medium text-[#15341C]">
                We do not sell, rent, or trade your personal information to third parties for independent marketing purposes.
              </div>
              <p>We may share information only in limited circumstances:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#2E3C32]">
                <li>
                  <strong>Authorized Service Providers:</strong> With trusted service providers, consultants, website hosts, communication tools, and operational partners assisting in our business, under confidentiality obligations.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> Where required by applicable law, court order, regulatory request, or governmental authority.
                </li>
                <li>
                  <strong>Rights &amp; Safety:</strong> To protect the rights, property, safety, or legal interests of Earth Heritage, our customers, employees, or others.
                </li>
              </ul>
            </section>

            {/* 5. Data Security */}
            <section aria-labelledby="pp-sec-5" className="space-y-3">
              <h2 id="pp-sec-5" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                5. Data Security
              </h2>
              <p>
                We implement reasonable administrative, technical, and physical safeguards appropriate to the nature of the information to help protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.
              </p>
              <p className="text-xs sm:text-sm text-[#627065] italic">
                However, no transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 6. Data Retention */}
            <section aria-labelledby="pp-sec-6" className="space-y-3">
              <h2 id="pp-sec-6" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                6. Data Retention
              </h2>
              <p>
                We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, satisfy operational and customer service needs, resolve disputes, maintain business records, and comply with applicable laws.
              </p>
            </section>

            {/* 7. Cookies and Analytics */}
            <section aria-labelledby="pp-sec-7" className="space-y-3">
              <h2 id="pp-sec-7" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                7. Cookies and Analytics
              </h2>
              <p>
                Our website may use cookies, tracking pixels, or standard analytics tools to analyze website performance, track user engagement, improve usability, and optimize marketing campaigns.
              </p>
              <p>
                You may adjust your browser settings to decline or manage cookies, though some website features may function differently as a result.
              </p>
            </section>

            {/* 8. Third-Party Links */}
            <section aria-labelledby="pp-sec-8" className="space-y-3">
              <h2 id="pp-sec-8" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                8. Third-Party Links
              </h2>
              <p>
                Our website may contain links to external sites, map locations, or platforms not operated by us. We are not responsible for the privacy practices, content, or policies of third-party websites.
              </p>
              <p>
                We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </section>

            {/* 9. Children’s Privacy */}
            <section aria-labelledby="pp-sec-9" className="space-y-3">
              <h2 id="pp-sec-9" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our services and website are not directed to individuals under the age of 18. We do not knowingly collect personal information from children without appropriate parental or legal consent.
              </p>
            </section>

            {/* 10. Your Rights and Choices */}
            <section aria-labelledby="pp-sec-10" className="space-y-3">
              <h2 id="pp-sec-10" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                10. Your Rights and Choices
              </h2>
              <p>Subject to applicable law, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#2E3C32]">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction or updating of inaccurate information</li>
                <li>Request deletion of your information, subject to legal and regulatory retention obligations</li>
                <li>Withdraw consent to receiving promotional communications</li>
              </ul>
              <p className="text-xs sm:text-sm text-[#627065]">
                To exercise any of these rights, please contact us using the information in Section 11.
              </p>
            </section>

            {/* 11. Updates to this Policy */}
            <section aria-labelledby="pp-sec-11" className="space-y-3">
              <h2 id="pp-sec-11" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                11. Updates to this Policy
              </h2>
              <p>
                We may modify or update this Privacy Policy periodically to reflect changes in our practices, services, operational requirements, or legal requirements.
              </p>
              <p>
                The updated policy will be posted on this page with an updated &ldquo;Last Updated&rdquo; date.
              </p>
            </section>

            {/* 12. Contact Us & Grievance Officer */}
            <section aria-labelledby="pp-sec-12" className="space-y-4 pt-4 border-t border-[#E5DAC4]">
              <h2 id="pp-sec-12" className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                12. Contact Us &amp; Grievance Officer
              </h2>
              <p>
                For questions, concerns, or requests relating to this Privacy Policy or your personal information, please contact:
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

      </Container>
    </div>
  );
}
