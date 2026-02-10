import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';
import { contactNumbers, socialLinks, adminAllowlist } from '../content/siteContent';

export default function SetupChecklistPage() {
  usePageMeta({
    title: 'Setup Checklist',
    description: 'Complete setup guide for GrowWithTutor website configuration.',
  });

  const checklistItems = [
    {
      title: 'Logo',
      description: 'The GrowWithTutor logo is already configured and displayed in the header and footer.',
      status: 'complete',
      details: 'Using: /assets/generated/growwithtutor-logo.dim_512x192.png',
    },
    {
      title: 'Contact Numbers (WhatsApp & Phone)',
      description: 'Contact numbers are already wired throughout the application.',
      status: 'complete',
      details: `WhatsApp: ${contactNumbers.whatsapp}, Phone: ${contactNumbers.phone1}, ${contactNumbers.phone2}`,
    },
    {
      title: 'Facebook Link',
      description: 'Facebook page link is configured and appears in the footer.',
      status: 'complete',
      details: socialLinks.facebook,
    },
    {
      title: 'Instagram Link',
      description: 'Add your Instagram profile URL to complete social media integration.',
      status: socialLinks.instagram ? 'complete' : 'pending',
      details: socialLinks.instagram || 'Edit frontend/src/content/siteContent.ts and add Instagram URL',
    },
    {
      title: 'Admin Principal IDs',
      description: 'Add admin principal IDs to enable blog management access.',
      status: adminAllowlist.length > 0 ? 'complete' : 'pending',
      details: adminAllowlist.length > 0
        ? `${adminAllowlist.length} admin(s) configured`
        : 'Edit frontend/src/content/siteContent.ts and add admin principal IDs to the adminAllowlist array',
    },
    {
      title: 'Subjects, Classes, Boards',
      description: 'Review and customize the available options for student and teacher forms.',
      status: 'optional',
      details: 'Edit frontend/src/content/siteContent.ts to modify subjects, classes, boards, languages, and modes',
    },
    {
      title: 'Optional Contact Info',
      description: 'Add email address and physical address if needed.',
      status: 'optional',
      details: 'Edit frontend/src/content/siteContent.ts optionalContactInfo section',
    },
    {
      title: 'Testimonials',
      description: 'Customize testimonials with real student and parent feedback.',
      status: 'optional',
      details: 'Edit frontend/src/content/siteContent.ts testimonials array',
    },
    {
      title: 'FAQs',
      description: 'Review and update FAQ content to match your specific offerings.',
      status: 'optional',
      details: 'Edit frontend/src/content/siteContent.ts faqs array',
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Setup Checklist</h1>
          <p className="text-lg text-muted-foreground">
            Follow this checklist to complete your GrowWithTutor website configuration.
          </p>
        </div>

        <div className="space-y-4">
          {checklistItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {item.status === 'complete' ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.status === 'complete'
                        ? 'default'
                        : item.status === 'pending'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-mono">{item.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-primary">
          <CardHeader>
            <CardTitle>How to Get Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Navigate to <strong>/admin/blogs</strong> in your browser</li>
              <li>Click the "Login" button and authenticate with Internet Identity</li>
              <li>After login, copy your Principal ID from the browser console or UI</li>
              <li>Add your Principal ID to the <code className="bg-muted px-2 py-1 rounded">adminAllowlist</code> array in <code className="bg-muted px-2 py-1 rounded">frontend/src/content/siteContent.ts</code></li>
              <li>Rebuild and redeploy the application</li>
              <li>You will now have full admin access to manage blog posts</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
