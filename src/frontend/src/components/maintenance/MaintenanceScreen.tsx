import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface MaintenanceScreenProps {
  onRetry?: () => void;
}

export default function MaintenanceScreen({ onRetry }: MaintenanceScreenProps) {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="border-warning">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-warning/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
            <CardTitle className="text-3xl">Site Under Maintenance</CardTitle>
            <CardDescription className="text-base">
              We're currently performing maintenance on the site. Please check back soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Our team is working to improve your experience. We apologize for any inconvenience.
            </p>
            {onRetry && (
              <Button onClick={onRetry} variant="outline" size="lg">
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Again
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
