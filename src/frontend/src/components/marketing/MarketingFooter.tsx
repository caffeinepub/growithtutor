import { useState } from 'react';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';
import { contactNumbers, socialLinks, optionalContactInfo } from '../../content/siteContent';
import { useNavigate } from '@tanstack/react-router';
import { getGenericWhatsAppLink, openEmailCompose } from '../../lib/whatsapp';
import { SITE_NAME } from '../../config/siteConfig';

export default function MarketingFooter() {
  const [imageError, setImageError] = useState(false);
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'growithtutor'
  );
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openEmailCompose(
      optionalContactInfo.email,
      'Enquiry about Tuition Services',
      'Hello, I am interested in tuition services. Please share course details, fees, and demo class information.'
    );
  };

  const logoUrl = 'https://growithtutor.com/wp-content/uploads/2025/08/cropped-cropped-growithtutor-3d-new-logo-150x150.png';

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">{SITE_NAME}</span>
              {!imageError && (
                <img
                  src={logoUrl}
                  alt={`${SITE_NAME} logo`}
                  className="h-12 w-auto object-contain"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students to achieve their academic goals through personalized tutoring.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Student Form', path: '/student-form' },
                { label: 'Teacher Form', path: '/teacher-form' },
                { label: 'Blogs', path: '/blogs' },
                { label: 'Terms & Conditions', path: '/terms' },
                { label: 'Setup Guide', path: '/setup' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={getGenericWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors focus-ring rounded-sm"
                >
                  WhatsApp: {contactNumbers.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={getGenericWhatsAppLink(contactNumbers.whatsappSecondary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors focus-ring rounded-sm"
                >
                  WhatsApp (Alt): {contactNumbers.whatsappSecondary}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactNumbers.phone1.replace(/\D/g, '')}`}
                  className="hover:text-foreground transition-colors focus-ring rounded-sm"
                >
                  Phone: {contactNumbers.phone1}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactNumbers.phone2.replace(/\D/g, '')}`}
                  className="hover:text-foreground transition-colors focus-ring rounded-sm"
                >
                  Phone: {contactNumbers.phone2}
                </a>
              </li>
              {optionalContactInfo.email && (
                <li>
                  <a
                    href="#"
                    onClick={handleEmailClick}
                    className="hover:text-foreground transition-colors focus-ring rounded-sm"
                  >
                    {optionalContactInfo.email}
                  </a>
                </li>
              )}
              {optionalContactInfo.address && (
                <li className="pt-2">{optionalContactInfo.address}</li>
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm p-1"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm p-1"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="mt-2">
            Built with <Heart className="inline h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors focus-ring rounded-sm"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
