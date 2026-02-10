import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone } from 'lucide-react';
import { contactNumbers } from '../../../content/siteContent';
import { getWhatsAppLink, getPhoneLink } from '../../../lib/whatsapp';
import { useNavigate } from '@tanstack/react-router';

export default function ContactSection() {
  const navigate = useNavigate();

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
              <p className="text-2xl font-semibold">{contactNumbers.whatsapp}</p>
              <Button
                className="w-full"
                onClick={() =>
                  window.open(
                    getWhatsAppLink('Hello! I would like to know more about GrowWithTutor services.'),
                    '_blank'
                  )
                }
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </Button>
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
