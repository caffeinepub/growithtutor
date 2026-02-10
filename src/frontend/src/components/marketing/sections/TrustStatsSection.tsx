import { Card, CardContent } from '@/components/ui/card';
import { trustStats } from '../../../content/siteContent';
import { Award, Users, GraduationCap } from 'lucide-react';

export default function TrustStatsSection() {
  const stats = [
    {
      icon: Award,
      value: trustStats.experience,
      label: 'Years of Experience',
      description: 'Proven track record in education',
    },
    {
      icon: Users,
      value: trustStats.students,
      label: 'Students Taught',
      description: 'Success stories and counting',
    },
    {
      icon: GraduationCap,
      value: trustStats.teachers,
      label: 'Expert Teachers',
      description: 'Qualified and experienced educators',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of successful students and dedicated educators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold mb-1">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
