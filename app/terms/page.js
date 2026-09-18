import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Terms of Service | Earth Heritage Private Limited',
  description: 'Terms of Service for Earth Heritage Private Limited.'
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FAF7F2] text-[#111613]">
      <Container size="default" className="max-w-4xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7D5] text-xs font-mono uppercase tracking-widest text-[#15341C]">
            Legal Terms
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111613]">
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-[#8C7A5A]">
            Last updated: August 2026 &bull; Earth Heritage Private Limited
          </p>
          <div className="pt-6 border-t border-[#E5DAC4] space-y-6 font-sans text-sm sm:text-base text-[#3E4C41] leading-relaxed">
            <p>
              Welcome to Earth Heritage Private Limited (&ldquo;Earth Heritage&rdquo;). By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h2 className="font-serif text-xl font-normal text-[#111613] pt-4">
              1. Nature of Information
            </h2>
            <p>
              The content provided on this website is for general informational and educational purposes concerning managed farmland and agricultural stewardship. It does not constitute financial, investment, or legal advice.
            </p>
            <h2 className="font-serif text-xl font-normal text-[#111613] pt-4">
              2. Operational Scope
            </h2>
            <p>
              All farm management services and farmland arrangements are subject to formal, customized bilateral contracts between the landowner and Earth Heritage Private Limited. Earth Heritage does not provide guaranteed agricultural yields, fixed financial returns, or speculative appreciation promises.
            </p>
            <h2 className="font-serif text-xl font-normal text-[#111613] pt-4">
              3. Intellectual Property
            </h2>
            <p>
              All branding, text, photographs, graphic elements, and trademarks displayed on this site are the exclusive property of Earth Heritage Private Limited and may not be reproduced without prior written permission.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
