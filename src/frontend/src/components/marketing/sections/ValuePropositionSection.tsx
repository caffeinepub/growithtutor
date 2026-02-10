import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Clock, TrendingUp } from 'lucide-react';

export default function ValuePropositionSection() {
  const values = [
    {
      icon: BookOpen,
      title: 'Expert Tutors',
      description: 'Learn from 20+ years experienced educators with proven track records in their subjects.',
    },
    {
      icon: Users,
      title: 'Personalized Learning',
      description: 'Customized lesson plans tailored to your unique learning style and academic goals.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose online or offline classes at times that fit your busy schedule.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Join 1500+ students who have improved their grades and confidence with us.',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GrowWithTutor?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive tutoring solutions designed to help every student succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
