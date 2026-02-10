import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert } from 'lucide-react';
import LoginButton from './LoginButton';
import { adminAllowlist } from '../../content/siteContent';

interface AdminRouteGuardProps {
  children: ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString();
  const isInAllowlist = principalId && adminAllowlist.includes(principalId);

  if (isInitializing || isAdminLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <ShieldAlert className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please log in with Internet Identity to access the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <LoginButton />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAdmin && !isInAllowlist) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-destructive">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Your Principal ID:</strong>
                </p>
                <code className="text-xs break-all bg-background p-2 rounded block">
                  {principalId}
                </code>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                To gain admin access, add your Principal ID to the admin allowlist in the configuration.
              </p>
              <div className="flex justify-center">
                <LoginButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
