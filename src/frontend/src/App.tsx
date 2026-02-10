import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import MarketingHeader from './components/marketing/MarketingHeader';
import MarketingFooter from './components/marketing/MarketingFooter';
import HomePage from './pages/HomePage';
import StudentFormPage from './pages/StudentFormPage';
import TeacherFormPage from './pages/TeacherFormPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminBlogsPage from './pages/AdminBlogsPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import SetupChecklistPage from './pages/SetupChecklistPage';
import AdminRouteGuard from './components/auth/AdminRouteGuard';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

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
    <div className="flex min-h-screen flex-col">
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
  path: '/blogs/$id',
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

const setupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/setup',
  component: SetupChecklistPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  studentFormRoute,
  teacherFormRoute,
  blogsRoute,
  blogPostRoute,
  adminBlogsRoute,
  termsRoute,
  contactRoute,
  setupRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
