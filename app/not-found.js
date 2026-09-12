import SectionWrapper from '@/components/sections/SectionWrapper';
import { Heading, Body, Subtitle } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Page Not Found | Earth Heritage',
  description: 'The requested page could not be located.'
};

export default function NotFound() {
  return (
    <SectionWrapper padding="lg" className="min-h-[60vh] flex items-center justify-center text-center">
      <div className="max-w-md mx-auto space-y-6">
        <Subtitle>404 — Not Found</Subtitle>
        <Heading level={1} className="text-3xl sm:text-4xl">
          Page Not Found
        </Heading>
        <Body>
          The page you are looking for does not exist or has been moved.
        </Body>
        <div className="pt-2">
          <Button href="/" variant="primary" size="md">
            Return to Homepage
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
