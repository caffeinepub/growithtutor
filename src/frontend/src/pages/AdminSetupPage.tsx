import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetCallerEmail, useSetEmail } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Copy, ShieldCheck, AlertCircle, Loader2, Mail } from 'lucide-react';
import { storeSessionParameter, clearSessionParameter } from '../utils/urlParams';
import LoginButton from '../components/auth/LoginButton';

export default function AdminSetupPage() {
  usePageMeta({
    title: 'Admin Setup',
    description: 'Bootstrap admin access for your account.',
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading, refetch: refetchAdminStatus } = useIsCallerAdmin();
  const { data: callerEmail, isLoading: emailLoading } = useGetCallerEmail();
  const setEmailMutation = useSetEmail();

  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const [token, setToken] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString();

  // Sync email field with fetched email
  useEffect(() => {
    if (callerEmail && !email) {
      setEmail(callerEmail);
    }
  }, [callerEmail, email]);

  const handleCopyPrincipal = async () => {
    if (principalId) {
      await navigator.clipboard.writeText(principalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleSaveEmail = async () => {
    setError(null);
    setEmailSaved(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your Gmail address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await setEmailMutation.mutateAsync(trimmedEmail);
      setEmailSaved(true);
      setTimeout(() => setEmailSaved(false), 3000);
    } catch (err: any) {
      console.error('Email save error:', err);
      setError(err.message || 'Failed to save email. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!token.trim()) {
      setError('Please enter the bootstrap secret token.');
      return;
    }

    setIsProcessing(true);

    try {
      // Store the token in session storage
      storeSessionParameter('caffeineAdminToken', token.trim());

      // Invalidate the actor query to force re-initialization with the new token
      await queryClient.invalidateQueries({ queryKey: ['actor'] });
      
      // Wait a moment for the actor to reinitialize
      await new Promise(resolve => setTimeout(resolve, 500));

      // Refetch admin status
      const result = await refetchAdminStatus();

      if (result.data === true) {
        setSuccess(true);
        setToken('');
        // Clear the token from session storage after successful promotion
        clearSessionParameter('caffeineAdminToken');
      } else {
        setError('Invalid token or you are not authorized to become an admin. Please ensure you have saved your Gmail address above and that it matches the authorized email.');
        clearSessionParameter('caffeineAdminToken');
      }
    } catch (err: any) {
      console.error('Admin setup error:', err);
      const errorMessage = err.message || String(err);
      
      // Parse backend error messages for better user feedback
      if (errorMessage.includes('No email registered') || errorMessage.includes('email')) {
        setError('Please save your Gmail address above before submitting the token.');
      } else if (errorMessage.includes('Email not in allowed admin list') || errorMessage.includes('not in allowed')) {
        setError('Your Gmail address is not authorized for admin access. Please contact the system administrator.');
      } else if (errorMessage.includes('Unauthorized')) {
        setError('Authorization failed. Please check that your Gmail address is saved and matches the authorized email, then try again.');
      } else {
        setError('Failed to initialize admin access. Please try again.');
      }
      
      clearSessionParameter('caffeineAdminToken');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNavigateToAdmin = () => {
    navigate({ to: '/admin/blogs' });
  };

  if (isInitializing || isAdminLoading || emailLoading) {
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
                <ShieldCheck className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>Login Required</CardTitle>
              <CardDescription>
                Please log in with Internet Identity to set up admin access.
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

  if (isAdmin && !success) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-600">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>You're Already an Admin</CardTitle>
              <CardDescription>
                Your account already has admin privileges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Your Principal ID:</strong>
                </p>
                <div className="flex items-center gap-2">
                  <code className="text-xs break-all bg-background p-2 rounded flex-1">
                    {principalId}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyPrincipal}
                    title="Copy Principal ID"
                  >
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleNavigateToAdmin}>
                  Go to Admin Panel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Admin Setup</CardTitle>
            <CardDescription>
              Configure your Gmail address and enter the bootstrap secret token to gain admin access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Helper Text */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Important:</strong> Admin access is tied to your Internet Identity Principal, not your Gmail address. 
                Your Gmail is used only as a configured match check for authorization. You log in with Internet Identity, 
                not with Gmail.
              </AlertDescription>
            </Alert>

            {/* Principal ID Display */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Your Principal ID:</strong>
              </p>
              <div className="flex items-center gap-2">
                <code className="text-xs break-all bg-background p-2 rounded flex-1">
                  {principalId}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyPrincipal}
                  title="Copy Principal ID"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Gmail Address Section */}
            <div className="space-y-4 border rounded-lg p-4 bg-background">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Gmail Address</h3>
              </div>
              
              {callerEmail && !emailSaved && (
                <Alert className="border-blue-600 bg-blue-50 dark:bg-blue-900/20">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    Your saved Gmail: <strong>{callerEmail}</strong>
                  </AlertDescription>
                </Alert>
              )}

              {emailSaved && (
                <Alert className="border-green-600 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Gmail address saved successfully!
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Gmail Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={setEmailMutation.isPending}
                  />
                  <Button
                    onClick={handleSaveEmail}
                    disabled={setEmailMutation.isPending || !email.trim()}
                    variant="outline"
                  >
                    {setEmailMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the Gmail address that has been authorized for admin access.
                </p>
              </div>
            </div>

            {/* Admin Status */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Current Admin Status:</strong>
              </p>
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Admin</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Not Admin</span>
                  </>
                )}
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <Alert className="border-green-600 bg-green-50 dark:bg-green-900/20">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Success! You are now an admin. You can access the admin panel.
                </AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Token Input Form */}
            {!success && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Bootstrap Secret Token</Label>
                  <Input
                    id="token"
                    type="password"
                    placeholder="Enter your bootstrap secret token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-muted-foreground">
                    This token is provided during deployment and is used to initialize the first admin. 
                    Make sure you have saved your Gmail address above before submitting.
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Initialize Admin Access'
                  )}
                </Button>
              </form>
            )}

            {/* Navigate to Admin Button (shown after success) */}
            {success && (
              <Button onClick={handleNavigateToAdmin} className="w-full">
                Go to Admin Panel
              </Button>
            )}

            {/* Help Text */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Need help? Check the{' '}
                <button
                  type="button"
                  onClick={() => navigate({ to: '/setup-checklist' })}
                  className="text-primary hover:underline"
                >
                  Setup Checklist
                </button>{' '}
                for more information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
