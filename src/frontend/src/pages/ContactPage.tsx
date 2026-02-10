import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MessageSquare, Mail } from 'lucide-react';
import { contactNumbers, optionalContactInfo } from '../content/siteContent';
import { getGenericWhatsAppLink, getPhoneLink, getGenericSMSLink, getGenericEmailLink } from '../lib/whatsapp';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Us',
    description: 'Get in touch with GrowWithTutor via WhatsApp, SMS, email, or phone. We are here to help you with your tutoring needs.',
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help! Reach out to us via WhatsApp, SMS, email, or phone.
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
              <div>
                <p className="text-sm text-muted-foreground mb-1">Primary</p>
                <p className="text-2xl font-semibold">{contactNumbers.whatsapp}</p>
              </div>
              <Button
                className="w-full"
                onClick={() => window.open(getGenericWhatsAppLink(), '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </Button>
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-2">Alternate WhatsApp</p>
                <p className="text-lg font-semibold mb-2">{contactNumbers.whatsappSecondary}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(getGenericWhatsAppLink(contactNumbers.whatsappSecondary), '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on Alternate WhatsApp
                </Button>
              </div>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                SMS
              </CardTitle>
              <CardDescription>
                Send us a text message
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg font-semibold mb-2">{contactNumbers.phone1}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(getGenericSMSLink(contactNumbers.phone1), '_self')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">{contactNumbers.phone2}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(getGenericSMSLink(contactNumbers.phone2), '_self')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
              </div>
            </CardContent>
          </Card>

          {optionalContactInfo.email && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
                <CardDescription>
                  Send us an email enquiry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-lg font-semibold mb-2 break-all">{optionalContactInfo.email}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(getGenericEmailLink(), '_self')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
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
