import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Microscope, Languages, FileText, Calculator, Laptop } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Calculator,
      title: 'Mathematics',
      description: 'From basic arithmetic to advanced calculus, algebra, geometry, and trigonometry.',
    },
    {
      icon: Microscope,
      title: 'Science',
      description: 'Physics, Chemistry, Biology with practical concepts and exam-focused learning.',
    },
    {
      icon: Languages,
      title: 'Languages',
      description: 'English, Hindi, and other languages with grammar, literature, and communication skills.',
    },
    {
      icon: BookOpen,
      title: 'Social Studies',
      description: 'History, Geography, Political Science, Economics, and Civics for all boards.',
    },
    {
      icon: Laptop,
      title: 'Computer Science',
      description: 'Programming, IT concepts, and digital literacy for modern education.',
    },
    {
      icon: FileText,
      title: 'Exam Preparation',
      description: 'Board exams, competitive exams, and entrance test preparation with proven strategies.',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tutoring Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive subject coverage for all classes and boards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
