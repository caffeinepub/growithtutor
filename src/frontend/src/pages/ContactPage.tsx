import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import { contactNumbers } from '../content/siteContent';
import { getWhatsAppLink, getPhoneLink } from '../lib/whatsapp';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Us',
    description: 'Get in touch with GrowWithTutor via WhatsApp or phone. We are here to help you with your tutoring needs.',
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help! Reach out to us via WhatsApp or phone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                WhatsApp
              </CardTitle>
              <CardDescription>
                Chat with us instantly on WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-semibold">{contactNumbers.whatsapp}</p>
              <Button
                className="w-full"
                onClick={() => window.open(getWhatsAppLink('Hello! I would like to know more about GrowWithTutor services.'), '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Phone
              </CardTitle>
              <CardDescription>
                Call us directly for immediate assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg font-semibold mb-2">{contactNumbers.phone1}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(getPhoneLink(contactNumbers.phone1), '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">{contactNumbers.phone2}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(getPhoneLink(contactNumbers.phone2), '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Office Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Monday - Friday:</strong> 9:00 AM - 8:00 PM</p>
              <p><strong>Saturday:</strong> 10:00 AM - 6:00 PM</p>
              <p><strong>Sunday:</strong> 10:00 AM - 4:00 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
