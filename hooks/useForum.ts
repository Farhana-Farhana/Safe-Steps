import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type ForumCategory = Tables<"forum_categories">;
type ForumPost = Tables<"forum_posts">;
type ForumComment = Tables<"forum_comments">;
type Profile = Tables<"profiles">;

export interface PostWithAuthor extends ForumPost {
  author?: { display_name: string | null; avatar_url: string | null };
  category?: { name: string; slug: string };
  user_has_liked?: boolean;
  user_has_bookmarked?: boolean;
}

export interface CommentWithAuthor extends ForumComment {
  author?: { display_name: string | null; avatar_url: string | null };
  replies?: CommentWithAuthor[];
}

export function useCategories() {
  return useQuery({
    queryKey: ["forum-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as ForumCategory[];
    },
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ["forum-category", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as ForumCategory | null;
    },
    enabled: !!slug,
  });
}

async function enrichPostsWithProfiles(posts: ForumPost[]): Promise<PostWithAuthor[]> {
  if (!posts.length) return [];

  // Get unique user IDs
  const userIds = [...new Set(posts.map((p) => p.user_id))];

  // Fetch profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select("user_id, display_name, avatar_url")
    .in("user_id", userIds);

  const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) ?? []);

  // Get category IDs
  const categoryIds = [...new Set(posts.map((p) => p.category_id))];
  
  const { data: categories } = await supabase
    .from("forum_categories")
    .select("id, name, slug")
    .in("id", categoryIds);

  const categoryMap = new Map(categories?.map((c) => [c.id, c]) ?? []);

  return posts.map((post) => ({
    ...post,
    author: profileMap.get(post.user_id) ?? undefined,
    category: categoryMap.get(post.category_id) ?? undefined,
  }));
}

export function usePosts(categoryId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["forum-posts", categoryId, user?.id],
    queryFn: async () => {
      let query = supabase
        .from("forum_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }

      const { data: posts, error } = await query;
      if (error) throw error;
      if (!posts) return [];

      // Enrich with profiles and categories
      const enrichedPosts = await enrichPostsWithProfiles(posts);

      // Check if user has liked/bookmarked posts
      if (user && posts.length > 0) {
        const postIds = posts.map((p) => p.id);

        const [likesResult, bookmarksResult] = await Promise.all([
          supabase
            .from("post_likes")
            .select("post_id")
            .eq("user_id", user.id)
            .in("post_id", postIds),
          supabase
            .from("post_bookmarks")
            .select("post_id")
            .eq("user_id", user.id)
            .in("post_id", postIds),
        ]);

        const likedPostIds = new Set(likesResult.data?.map((l) => l.post_id) ?? []);
        const bookmarkedPostIds = new Set(bookmarksResult.data?.map((b) => b.post_id) ?? []);

        return enrichedPosts.map((post) => ({
          ...post,
          user_has_liked: likedPostIds.has(post.id),
          user_has_bookmarked: bookmarkedPostIds.has(post.id),
        }));
      }

      return enrichedPosts;
    },
  });
}

export function usePost(postId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["forum-post", postId, user?.id],
    queryFn: async () => {
      const { data: post, error } = await supabase
        .from("forum_posts")
        .select("*")
        .eq("id", postId)
        .maybeSingle();

      if (error) throw error;
      if (!post) return null;

      // Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .eq("user_id", post.user_id)
        .maybeSingle();

      // Get category
      const { data: category } = await supabase
        .from("forum_categories")
        .select("id, name, slug")
        .eq("id", post.category_id)
        .maybeSingle();

      const enrichedPost: PostWithAuthor = {
        ...post,
        author: profile ?? undefined,
        category: category ?? undefined,
      };

      // Check if user has liked/bookmarked
      if (user) {
        const [likeResult, bookmarkResult] = await Promise.all([
          supabase
            .from("post_likes")
            .select("id")
            .eq("user_id", user.id)
            .eq("post_id", postId)
            .maybeSingle(),
          supabase
            .from("post_bookmarks")
            .select("id")
            .eq("user_id", user.id)
            .eq("post_id", postId)
            .maybeSingle(),
        ]);

        return {
          ...enrichedPost,
          user_has_liked: !!likeResult.data,
          user_has_bookmarked: !!bookmarkResult.data,
        };
      }

      return enrichedPost;
    },
    enabled: !!postId,
  });
}

export function useComments(postId: string) {
  return useQuery({
    queryKey: ["forum-comments", postId],
    queryFn: async () => {
      const { data: comments, error } = await supabase
        .from("forum_comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (!comments) return [];

      // Get unique user IDs
      const userIds = [...new Set(comments.map((c) => c.user_id))];

      // Fetch profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) ?? []);

      // Organize into threaded comments
      const commentMap = new Map<string, CommentWithAuthor>();
      const rootComments: CommentWithAuthor[] = [];

      comments.forEach((comment) => {
        commentMap.set(comment.id, {
          ...comment,
          author: profileMap.get(comment.user_id) ?? undefined,
          replies: [],
        });
      });

      comments.forEach((comment) => {
        const commentWithReplies = commentMap.get(comment.id)!;
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(commentWithReplies);
          }
        } else {
          rootComments.push(commentWithReplies);
        }
      });

      return rootComments;
    },
    enabled: !!postId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      title,
      content,
      categoryId,
    }: {
      title: string;
      content: string;
      categoryId: string;
    }) => {
      if (!user) throw new Error("Must be logged in");

      const { data, error } = await supabase
        .from("forum_posts")
        .insert({
          title,
          content,
          category_id: categoryId,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-posts"] });
      toast({ title: "Post created!", description: "Your post has been published." });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      postId,
      content,
      parentId,
    }: {
      postId: string;
      content: string;
      parentId?: string;
    }) => {
      if (!user) throw new Error("Must be logged in");

      const { data, error } = await supabase
        .from("forum_comments")
        .insert({
          post_id: postId,
          content,
          parent_id: parentId || null,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Update comment count manually
      const { data: post } = await supabase
        .from("forum_posts")
        .select("comments_count")
        .eq("id", postId)
        .single();

      if (post) {
        await supabase
          .from("forum_posts")
          .update({ comments_count: (post.comments_count || 0) + 1 })
          .eq("id", postId);
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["forum-comments", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["forum-posts"] });
      queryClient.invalidateQueries({ queryKey: ["forum-post"] });
      toast({ title: "Comment added!" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      if (!user) throw new Error("Must be logged in");

      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase
          .from("post_likes")
          .insert({ post_id: postId, user_id: user.id });

        if (error) throw error;
      }

      // Update likes count on post
      const { count } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);

      await supabase
        .from("forum_posts")
        .update({ likes_count: count ?? 0 })
        .eq("id", postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-posts"] });
      queryClient.invalidateQueries({ queryKey: ["forum-post"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ postId, isBookmarked }: { postId: string; isBookmarked: boolean }) => {
      if (!user) throw new Error("Must be logged in");

      if (isBookmarked) {
        const { error } = await supabase
          .from("post_bookmarks")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("post_bookmarks")
          .insert({ post_id: postId, user_id: user.id });

        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["forum-posts"] });
      queryClient.invalidateQueries({ queryKey: ["forum-post"] });
      toast({
        title: variables.isBookmarked ? "Bookmark removed" : "Post bookmarked!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
