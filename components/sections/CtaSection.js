import SectionWrapper from '@/components/sections/SectionWrapper';
import { Heading, Body, Subtitle } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { companyData } from '@/data/company';

/**
 * Reusable Corporate CTA Section adhering to Earth Heritage Design System
 */
export default function CtaSection({
  title = companyData.philosophy.primary,
  subtitle = 'Land Ownership & Professional Farm Management',
  description = companyData.proposition.core,
  primaryAction = { label: 'Inquire with Earth Heritage', href: '/contact' },
  secondaryAction = { label: 'Explore Managed Farmland', href: '/managed-farmland' },
  className
}) {
  return (
    <SectionWrapper
      id="cta-section"
      padding="lg"
      className={className}
    >
      <div className="rounded-lg border border-border bg-surface p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto space-y-6 shadow-card">
        <Subtitle>{subtitle}</Subtitle>
        <Heading level={2} className="text-3xl sm:text-4xl md:text-5xl">
          {title}
        </Heading>
        <Body size="lead" className="max-w-2xl mx-auto">
          {description} Professional farm management and land stewardship built for generational legacy.
        </Body>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryAction && (
            <Button href={primaryAction.href} variant="primary" size="lg">
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button href={secondaryAction.href} variant="outline" size="lg">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
