import { usePageMeta } from '../hooks/usePageMeta';
import HeroSection from '../components/marketing/sections/HeroSection';
import TrustStatsSection from '../components/marketing/sections/TrustStatsSection';
import ValuePropositionSection from '../components/marketing/sections/ValuePropositionSection';
import ServicesSection from '../components/marketing/sections/ServicesSection';
import HowItWorksSection from '../components/marketing/sections/HowItWorksSection';
import TestimonialsSection from '../components/marketing/sections/TestimonialsSection';
import FaqSection from '../components/marketing/sections/FaqSection';
import ContactSection from '../components/marketing/sections/ContactSection';

export default function HomePage() {
  usePageMeta({
    title: 'Home',
    description: 'GrowWithTutor - Expert online and offline tutoring for all subjects and classes. 20+ years experience, 1500+ students, 500+ qualified teachers.',
  });

  return (
    <>
      <HeroSection />
      <TrustStatsSection />
      <ValuePropositionSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
