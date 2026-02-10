import { useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  useGetAllBlogs,
  useCreateBlog,
  useEditBlog,
  useSetPublishedStatus,
  useDeleteBlog,
  useIsSiteLive,
  useSetSiteLive,
  useIsCallerAdmin,
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Calendar, Globe, AlertCircle, Power } from 'lucide-react';
import LoginButton from '../components/auth/LoginButton';
import type { Blog } from '../backend';

export default function AdminBlogsPage() {
  usePageMeta({
    title: 'Admin - Manage Blogs',
    description: 'Manage blog posts - create, edit, publish, and delete.',
  });

  const { data: blogs, isLoading } = useGetAllBlogs();
  const { data: isSiteLive, isLoading: isSiteLiveLoading } = useIsSiteLive();
  const { data: isAdmin } = useIsCallerAdmin();
  const createBlog = useCreateBlog();
  const editBlog = useEditBlog();
  const setPublished = useSetPublishedStatus();
  const deleteBlog = useDeleteBlog();
  const setSiteLive = useSetSiteLive();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createBlog.mutateAsync(formData);
      toast.success('Blog post created successfully');
      setFormData({ title: '', content: '' });
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error('Failed to create blog post');
      console.error(error);
    }
  };

  const handleEdit = async () => {
    if (!editingBlog || !formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await editBlog.mutateAsync({
        blogId: editingBlog.id,
        title: formData.title,
        content: formData.content,
      });
      toast.success('Blog post updated successfully');
      setFormData({ title: '', content: '' });
      setEditingBlog(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update blog post');
      console.error(error);
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    try {
      await setPublished.mutateAsync({
        blogId: blog.id,
        published: !blog.published,
      });
      toast.success(blog.published ? 'Blog post unpublished' : 'Blog post published');
    } catch (error) {
      toast.error('Failed to update publish status');
      console.error(error);
    }
  };

  const handleDelete = async (blogId: bigint) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await deleteBlog.mutateAsync(blogId);
      toast.success('Blog post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete blog post');
      console.error(error);
    }
  };

  const handleTakeSiteOffline = async () => {
    try {
      await setSiteLive.mutateAsync(false);
      toast.success('Site taken offline - public visitors will see a maintenance screen');
    } catch (error) {
      toast.error('Failed to take site offline');
      console.error(error);
    }
  };

  const handleBringSiteOnline = async () => {
    try {
      await setSiteLive.mutateAsync(true);
      toast.success('Site is now live and accessible to the public');
    } catch (error) {
      toast.error('Failed to bring site online');
      console.error(error);
    }
  };

  const openEditDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Manage Blogs</h1>
            <p className="text-muted-foreground">Create, edit, and publish blog posts</p>
          </div>
          <LoginButton />
        </div>

        {isAdmin && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-lg">Site Status Control</CardTitle>
                  <CardDescription>
                    {isSiteLiveLoading ? 'Loading...' : isSiteLive ? 'Site is live and accessible to the public' : 'Site is offline - public visitors see a maintenance screen'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Application-level maintenance mode:</strong> This control hides the public site from visitors while keeping admin routes accessible. It does not roll back the deployed canister version on the Internet Computer network.
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                <div className="flex items-center gap-3">
                  <Power className={`h-5 w-5 ${isSiteLive ? 'text-green-600' : 'text-orange-600'}`} />
                  <div>
                    <p className="font-medium">
                      {isSiteLive ? 'Site is Live' : 'Site is Offline (Maintenance Mode)'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isSiteLive ? 'Public visitors can access all pages' : 'Public visitors see maintenance screen'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {isSiteLive ? 'Live' : 'Offline'}
                  </span>
                  <Switch
                    checked={isSiteLive ?? true}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleBringSiteOnline();
                      } else {
                        handleTakeSiteOffline();
                      }
                    }}
                    disabled={isSiteLiveLoading || setSiteLive.isPending}
                  />
                </div>
              </div>

              {isSiteLive ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full" disabled={setSiteLive.isPending}>
                      <Power className="h-4 w-4 mr-2" />
                      Take Site Offline / Unpublish
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Take Site Offline?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will enable maintenance mode. Public visitors will see a maintenance screen instead of the site content. Admin routes will remain accessible.
                        <br /><br />
                        <strong>Note:</strong> This does not roll back your deployed canister version. It only controls public access to the site.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleTakeSiteOffline}>
                        Take Offline
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={handleBringSiteOnline}
                  disabled={setSiteLive.isPending}
                >
                  <Power className="h-4 w-4 mr-2" />
                  {setSiteLive.isPending ? 'Bringing Online...' : 'Bring Site Online / Publish'}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        <div className="mb-6">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Create New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>
                  Write a new blog post. You can publish it later.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="create-title">Title</Label>
                  <Input
                    id="create-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter blog title"
                  />
                </div>
                <div>
                  <Label htmlFor="create-content">Content</Label>
                  <Textarea
                    id="create-content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog content here..."
                    rows={12}
                  />
                </div>
                <Button
                  onClick={handleCreate}
                  disabled={createBlog.isPending}
                  className="w-full"
                >
                  {createBlog.isPending ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-4">
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
        ) : blogs && blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No blog posts yet. Create your first one!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {blogs?.map((blog) => (
              <Card key={blog.id.toString()}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{blog.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(Number(blog.timestamp) / 1000000).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Published</span>
                      <Switch
                        checked={blog.published}
                        onCheckedChange={() => handleTogglePublish(blog)}
                        disabled={setPublished.isPending}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {blog.content.substring(0, 200)}...
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(blog)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                      disabled={deleteBlog.isPending}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
              <DialogDescription>
                Update your blog post content.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog content here..."
                  rows={12}
                />
              </div>
              <Button
                onClick={handleEdit}
                disabled={editBlog.isPending}
                className="w-full"
              >
                {editBlog.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
