import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, MessageSquare, Mail } from 'lucide-react';
import { contactNumbers, optionalContactInfo } from '../../../content/siteContent';
import { getGenericWhatsAppLink, getPhoneLink, getGenericSMSLink, openEmailCompose } from '../../../lib/whatsapp';
import { useNavigate } from '@tanstack/react-router';

export default function ContactSection() {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    openEmailCompose(
      optionalContactInfo.email,
      'Enquiry about Tuition Services',
      'Hello, I am interested in tuition services. Please share course details, fees, and demo class information.'
    );
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contact us today and take the first step towards academic excellence
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                WhatsApp
              </CardTitle>
              <CardDescription>Get instant responses on WhatsApp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Primary</p>
                <p className="text-2xl font-semibold">{contactNumbers.whatsapp}</p>
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  window.open(
                    getGenericWhatsAppLink(),
                    '_blank'
                  )
                }
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </Button>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-1">Alternate WhatsApp</p>
                <p className="text-sm font-medium mb-2">{contactNumbers.whatsappSecondary}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.open(
                      getGenericWhatsAppLink(contactNumbers.whatsappSecondary),
                      '_blank'
                    )
                  }
                >
                  <MessageCircle className="h-3 w-3 mr-2" />
                  Chat on Alternate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Call Us
              </CardTitle>
              <CardDescription>Speak directly with our team</CardDescription>
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

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Send SMS
              </CardTitle>
              <CardDescription>Text us your enquiry</CardDescription>
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
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Us
                </CardTitle>
                <CardDescription>Send us an email enquiry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-lg font-semibold mb-2 break-all">{optionalContactInfo.email}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleEmailClick}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" onClick={() => navigate({ to: '/contact' })}>
            View All Contact Options
          </Button>
        </div>
      </div>
    </section>
  );
}
