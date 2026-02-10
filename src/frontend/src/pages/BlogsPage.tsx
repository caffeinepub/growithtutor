import { usePageMeta } from '../hooks/usePageMeta';
import { useGetAllBlogs } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from '@tanstack/react-router';
import { Calendar } from 'lucide-react';

export default function BlogsPage() {
  usePageMeta({
    title: 'Blogs',
    description: 'Read our latest articles on education, study tips, exam preparation, and more.',
  });

  const { data: blogs, isLoading } = useGetAllBlogs();
  const navigate = useNavigate();

  const publishedBlogs = blogs?.filter((blog) => blog.published) || [];

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blogs</h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest educational insights, study tips, and success stories.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : publishedBlogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {publishedBlogs.map((blog) => (
              <Card key={blog.id.toString()} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{blog.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(Number(blog.timestamp) / 1000000).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {blog.content.substring(0, 200)}...
                  </p>
                  <Button
                    onClick={() => navigate({ to: '/blogs/$id', params: { id: blog.id.toString() } })}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
