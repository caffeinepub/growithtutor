import { useNavigate } from '@tanstack/react-router';
import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Circle, ExternalLink, Info } from 'lucide-react';
import { contactNumbers, socialLinks, adminAllowlist } from '../content/siteContent';
import { SITE_NAME } from '../config/siteConfig';
import { PUBLIC_DOMAIN, getPublicAssetUrl } from '../config/publicDomain';

export default function SetupChecklistPage() {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Setup Checklist',
    description: `Complete setup guide for ${SITE_NAME} website configuration.`,
  });

  const logoUrl = getPublicAssetUrl('/wp-content/uploads/2025/08/cropped-cropped-growithtutor-3d-new-logo-150x150.png');

  const checklistItems = [
    {
      title: 'Site Name',
      description: 'Configure your site/hosting name in one place to update it throughout the application.',
      status: 'complete',
      details: `Current site name: "${SITE_NAME}". Edit frontend/src/config/siteConfig.ts to change the SITE_NAME constant.`,
    },
    {
      title: 'Public Domain',
      description: 'Configure the public domain/hostname for external asset URLs and self-referential links.',
      status: 'complete',
      details: (
        <div className="space-y-2">
          <p><strong>Current domain:</strong> <code className="px-2 py-1 bg-muted rounded text-sm">{PUBLIC_DOMAIN}</code></p>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>To change the domain:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li><strong>Option A (Recommended):</strong> Set the <code className="px-1 bg-muted rounded">VITE_PUBLIC_DOMAIN</code> environment variable</li>
                <li><strong>Option B:</strong> Edit the fallback value in <code className="px-1 bg-muted rounded">frontend/src/config/publicDomain.ts</code></li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Note:</strong> The standalone landing page domain is configured separately in <code className="px-1 bg-muted rounded">frontend/static/growwithtutor-standalone/index.html</code>
              </p>
              <p className="mt-2">
                <a 
                  href="https://github.com/yourusername/yourrepo/blob/main/frontend/DEPLOYMENT.md#changing-the-domain" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium"
                >
                  See DEPLOYMENT.md for full step-by-step guide
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    {
      title: 'Logo',
      description: 'Logo is configured and displayed in the header and footer.',
      status: 'complete',
      details: `Logo configured via domain-relative URL: ${logoUrl}`,
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
      description: 'Customize testimonials to match your actual student/parent feedback.',
      status: 'optional',
      details: 'Edit frontend/src/content/siteContent.ts testimonials array',
    },
    {
      title: 'FAQs',
      description: 'Review and update frequently asked questions.',
      status: 'optional',
      details: 'Edit frontend/src/content/siteContent.ts faqs array',
    },
    {
      title: 'Terms & Conditions',
      description: 'Review and customize legal content.',
      status: 'optional',
      details: 'Edit frontend/src/content/legalContent.ts',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Circle className="h-5 w-5 text-orange-500" />;
      case 'optional':
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge variant="default" className="bg-green-600">Complete</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-500 text-white">Pending</Badge>;
      case 'optional':
        return <Badge variant="outline">Optional</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Setup Checklist</h1>
          <p className="text-lg text-muted-foreground">
            Complete guide to configure your {SITE_NAME} website. Follow these steps to customize your site.
          </p>
        </div>

        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription>
            This checklist helps you configure all aspects of your website. Items marked as "Complete" are already configured, "Pending" items need your attention, and "Optional" items can be customized as needed.
          </AlertDescription>
        </Alert>

        <div className="space-y-4 mb-8">
          {checklistItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(item.status)}
                    <div className="flex-1">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="mt-1">{item.description}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {typeof item.details === 'string' ? (
                    <p>{item.details}</p>
                  ) : (
                    item.details
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              To manage blog posts and site settings, you need admin access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Admin access is controlled by Principal IDs. To become an admin:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Log in with Internet Identity to get your Principal ID</li>
              <li>Add your Principal ID to the adminAllowlist in frontend/src/content/siteContent.ts</li>
              <li>Redeploy the application</li>
              <li>Navigate to the admin panel to manage content</li>
            </ol>
            <Button onClick={() => navigate({ to: '/admin/blogs' })}>
              Go to Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
