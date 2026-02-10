import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

// Pages
import MarketingLandingPage from './pages/MarketingLandingPage';
import HomePage from './pages/HomePage';
import StudentFormPage from './pages/StudentFormPage';
import TeacherFormPage from './pages/TeacherFormPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminBlogsPage from './pages/AdminBlogsPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import SetupChecklistPage from './pages/SetupChecklistPage';
import AdminSetupPage from './pages/AdminSetupPage';

// Components
import MarketingHeader from './components/marketing/MarketingHeader';
import MarketingFooter from './components/marketing/MarketingFooter';
import AdminRouteGuard from './components/auth/AdminRouteGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const marketingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketing',
  component: MarketingLandingPage,
});

const studentFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-form',
  component: StudentFormPage,
});

const teacherFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher-form',
  component: TeacherFormPage,
});

const blogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blogs',
  component: BlogsPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blogs/$blogId',
  component: BlogPostPage,
});

const adminBlogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/blogs',
  component: () => (
    <AdminRouteGuard>
      <AdminBlogsPage />
    </AdminRouteGuard>
  ),
});

const adminSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/setup',
  component: AdminSetupPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const setupChecklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/setup-checklist',
  component: SetupChecklistPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  marketingRoute,
  studentFormRoute,
  teacherFormRoute,
  blogsRoute,
  blogPostRoute,
  adminBlogsRoute,
  adminSetupRoute,
  termsRoute,
  contactRoute,
  setupChecklistRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
