import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useIsSiteLive } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import MaintenanceScreen from './MaintenanceScreen';

interface SiteLiveGateProps {
  children: ReactNode;
}

export default function SiteLiveGate({ children }: SiteLiveGateProps) {
  const location = useLocation();
  const { data: isSiteLive, isLoading, isError, refetch } = useIsSiteLive();

  // Admin routes bypass the gate - they remain accessible even in maintenance mode
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="py-8">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Unable to check site status. Please try again later.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Site not live - show maintenance screen to public visitors
  if (isSiteLive === false) {
    return <MaintenanceScreen onRetry={() => refetch()} />;
  }

  // Site is live - render children (normal public content)
  return <>{children}</>;
}
