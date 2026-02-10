import { usePageMeta } from '../hooks/usePageMeta';
import { useGetBlog } from '../hooks/useQueries';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function BlogPostPage() {
  const { blogId } = useParams({ from: '/blogs/$blogId' });
  const navigate = useNavigate();
  const blogIdBigInt = blogId ? BigInt(blogId) : null;
  const { data: blog, isLoading } = useGetBlog(blogIdBigInt);

  usePageMeta({
    title: blog?.title || 'Blog Post',
    description: blog?.content.substring(0, 160) || 'Read our blog post',
  });

  if (isLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!blog || !blog.published) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Blog post not found or not published.</p>
              <Button onClick={() => navigate({ to: '/blogs' })}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/blogs' })}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time>
                {new Date(Number(blog.timestamp) / 1000000).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          <Card>
            <CardContent className="prose prose-lg max-w-none pt-6">
              <div className="whitespace-pre-wrap">{blog.content}</div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
