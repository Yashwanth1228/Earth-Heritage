import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Legal Disclaimer | Earth Heritage Private Limited',
  description: 'Legal and Operational Disclaimer for Earth Heritage Private Limited.'
};

export default function DisclaimerPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FAF7F2] text-[#111613]">
      <Container size="default" className="max-w-4xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7D5] text-xs font-mono uppercase tracking-widest text-[#15341C]">
            Legal Notice
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111613]">
            Legal &amp; Operational Disclaimer
          </h1>
          <p className="text-sm font-mono text-[#8C7A5A]">
            Earth Heritage Private Limited
          </p>
          <div className="pt-6 border-t border-[#E5DAC4] space-y-6 font-sans text-sm sm:text-base text-[#3E4C41] leading-relaxed">
            <p>
              Earth Heritage operates as a professional farm management company. Farmland ownership remains legally registered to the individual landowner. Earth Heritage coordinates agreed agricultural activities, cultivation, and ongoing property care without offering guaranteed yields or financial returns.
            </p>
            <p>
              Nothing on this website should be construed as an offer of securities, collective investment scheme, financial product, or guaranteed investment return. Agricultural outcomes depend on climate, weather conditions, soil biology, and seasonal factors.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
