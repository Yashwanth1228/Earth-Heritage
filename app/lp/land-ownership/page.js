export const metadata = {
  title: 'Land Ownership Campaign | Earth Heritage',
  description: 'Earth Heritage Land Ownership campaign landing page.',
  robots: {
    index: false,
    follow: false
  }
};

/**
 * Land Ownership Campaign — Development Placeholder
 * Route: /lp/land-ownership
 */
export default function LandOwnershipCampaignPage() {
  return (
    <div className="py-16 sm:py-24 text-center max-w-2xl mx-auto space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102B17]/10 text-brand-primary text-xs font-mono uppercase tracking-wider">
        Campaign Development Slot
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-tight">
        Land Ownership Campaign
      </h1>
      <p className="font-sans text-base sm:text-lg text-text-muted leading-relaxed">
        Development placeholder confirming route isolation and campaign layout.
      </p>
    </div>
  );
}
