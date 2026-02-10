import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Blog, UserProfile } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export function useGetAllBlogs() {
  const { actor, isFetching } = useActor();

  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlog(blogId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Blog | null>({
    queryKey: ['blog', blogId?.toString()],
    queryFn: async () => {
      if (!actor || !blogId) return null;
      return actor.getBlog(blogId);
    },
    enabled: !!actor && !isFetching && blogId !== null,
  });
}

export function useCreateBlog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBlog(title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useEditBlog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, title, content }: { blogId: bigint; title: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.editBlog(blogId, title, content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog', variables.blogId.toString()] });
    },
  });
}

export function useSetPublishedStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, published }: { blogId: bigint; published: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setPublishedStatus(blogId, published);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog', variables.blogId.toString()] });
    },
  });
}

export function useDeleteBlog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blogId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteBlog(blogId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
