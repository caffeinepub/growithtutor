import { usePageMeta } from '../hooks/usePageMeta';
import { legalContent } from '../content/legalContent';
import { SITE_NAME } from '../config/siteConfig';

export default function TermsPage() {
  usePageMeta({
    title: 'Terms & Conditions',
    description: `Terms and conditions for using ${SITE_NAME} tutoring services.`,
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{legalContent.title}</h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: {legalContent.lastUpdated}
        </p>

        <div className="space-y-8">
          {legalContent.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
