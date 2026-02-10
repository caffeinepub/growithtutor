import { useEffect } from 'react';
import MarketingHeader from '../components/marketing/MarketingHeader';
import MarketingFooter from '../components/marketing/MarketingFooter';
import HeroSection from '../components/marketing/sections/HeroSection';
import ValuePropositionSection from '../components/marketing/sections/ValuePropositionSection';
import ServicesSection from '../components/marketing/sections/ServicesSection';
import HowItWorksSection from '../components/marketing/sections/HowItWorksSection';
import TestimonialsSection from '../components/marketing/sections/TestimonialsSection';
import FaqSection from '../components/marketing/sections/FaqSection';
import ContactSection from '../components/marketing/sections/ContactSection';
import { SITE_NAME } from '../config/siteConfig';

export default function MarketingLandingPage() {
  useEffect(() => {
    document.title = `${SITE_NAME} - Expert Tutoring for Academic Success`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Connect with expert tutors for personalized learning. Improve grades, ace tests, and unlock your academic potential with ${SITE_NAME}.`);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = `Connect with expert tutors for personalized learning. Improve grades, ace tests, and unlock your academic potential with ${SITE_NAME}.`;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <HeroSection />
        <ValuePropositionSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
