import { usePageMeta } from '../hooks/usePageMeta';
import { termsAndConditions } from '../content/legalContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  usePageMeta({
    title: 'Terms & Conditions',
    description: 'Read our terms and conditions for using GrowWithTutor services.',
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{termsAndConditions.title}</h1>
          <p className="text-muted-foreground">
            Last Updated: {termsAndConditions.lastUpdated}
          </p>
        </div>

        <Card>
          <CardContent className="prose prose-lg max-w-none pt-6">
            {termsAndConditions.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </section>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
