import { useNavigate } from '@tanstack/react-router';
import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { contactNumbers, socialLinks, adminAllowlist } from '../content/siteContent';

export default function SetupChecklistPage() {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Setup Checklist',
    description: 'Complete setup guide for GrowWithTutor website configuration.',
  });

  const logoUrl = 'https://growithtutor.com/wp-content/uploads/2025/08/cropped-cropped-growithtutor-3d-new-logo-150x150.png';

  const checklistItems = [
    {
      title: 'Logo',
      description: 'Logo is configured and displayed in the header and footer.',
      status: 'complete',
      details: `Logo configured via external URL: ${logoUrl}`,
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
                  <p className="text-sm font-mono break-all">{item.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-primary">
          <CardHeader>
            <CardTitle>How to Get Admin Access</CardTitle>
            <CardDescription>
              Follow these steps to gain admin privileges and manage blog posts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>
                <strong>Log in with Internet Identity</strong> - Click the Login button and authenticate.
              </li>
              <li>
                <strong>Navigate to Admin Setup</strong> - Go to the{' '}
                <button
                  type="button"
                  onClick={() => navigate({ to: '/admin/setup' })}
                  className="text-primary hover:underline font-medium"
                >
                  Admin Setup page
                </button>
                .
              </li>
              <li>
                <strong>Enter Bootstrap Secret</strong> - Input the bootstrap secret token provided during deployment.
              </li>
              <li>
                <strong>Confirm Admin Status</strong> - The system will verify your token and grant admin access.
              </li>
              <li>
                <strong>Access Admin Panel</strong> - Navigate to{' '}
                <button
                  type="button"
                  onClick={() => navigate({ to: '/admin/blogs' })}
                  className="text-primary hover:underline font-medium"
                >
                  /admin/blogs
                </button>{' '}
                to manage blog posts.
              </li>
            </ol>
            <div className="pt-4 border-t">
              <Button onClick={() => navigate({ to: '/admin/setup' })} className="w-full">
                Go to Admin Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
