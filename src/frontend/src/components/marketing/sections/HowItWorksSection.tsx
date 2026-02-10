import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Search, Calendar, Rocket } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      step: 1,
      title: 'Fill the Form',
      description: 'Share your requirements, subjects, class, and preferred learning mode.',
    },
    {
      icon: Search,
      step: 2,
      title: 'Get Matched',
      description: 'We connect you with the perfect tutor based on your needs and goals.',
    },
    {
      icon: Calendar,
      step: 3,
      title: 'Schedule Classes',
      description: 'Choose convenient timings for online or offline tutoring sessions.',
    },
    {
      icon: Rocket,
      step: 4,
      title: 'Start Learning',
      description: 'Begin your personalized learning journey and achieve academic excellence.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with GrowWithTutor in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.step} className="relative hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
