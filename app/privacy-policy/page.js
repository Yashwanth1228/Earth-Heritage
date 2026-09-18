import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Privacy Policy | Earth Heritage Private Limited',
  description: 'Privacy Policy for Earth Heritage Private Limited.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FAF7F2] text-[#111613]">
      <Container size="default" className="max-w-4xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7D5] text-xs font-mono uppercase tracking-widest text-[#15341C]">
            Legal Document
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111613]">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-[#8C7A5A]">
            Last updated: August 2026 &bull; Earth Heritage Private Limited
          </p>
          <div className="pt-6 border-t border-[#E5DAC4] space-y-6 font-sans text-sm sm:text-base text-[#3E4C41] leading-relaxed">
            <p>
              Earth Heritage Private Limited (&ldquo;Earth Heritage&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to respecting your privacy and protecting any personal information you share with us.
            </p>
            <h2 className="font-serif text-xl font-normal text-[#111613] pt-4">
              1. Information We Collect
            </h2>
            <p>
              When you submit an enquiry, request a farm consultation, or communicate with us, we may collect your name, phone number, email address, and any property or agricultural details you provide.
            </p>
            <h2 className="font-serif text-xl font-normal text-[#111613] pt-4">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used solely to respond to your enquiries, coordinate discussions regarding managed farmland and farm management services, and provide updates relevant to your expressed interests. We do not sell or rent your personal information to third parties.
            </p>
            <h2 className="font-serif text-xl font-normal text-[#111613] pt-4">
              3. Data Security
            </h2>
            <p>
              We maintain appropriate technical and organizational measures to safeguard your personal data against unauthorized access, loss, or misuse.
            </p>
            <h2 className="font-serif text-xl font-normal text-[#111613] pt-4">
              4. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or wish to update your details, please reach out via our official enquiry channels.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
