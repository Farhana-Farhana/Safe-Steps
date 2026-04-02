import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, Bookmark, Calendar } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { usePost, useToggleLike, useToggleBookmark } from "@/hooks/useForum";
import { CommentSection } from "@/components/forum/CommentSection";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: post, isLoading } = usePost(postId || "");
  const toggleLike = useToggleLike();
  const toggleBookmark = useToggleBookmark();

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12 text-center text-muted-foreground">
          {t("community.loading")}
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <p className="text-muted-foreground mb-4">{t("community.postNotFound")}</p>
          <Button asChild variant="outline">
            <Link to="/community">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("community.backToCommunity")}
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const displayName = post.author?.display_name || t("community.anonymous");
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLike = () => {
    if (!user) return;
    toggleLike.mutate({ postId: post.id, isLiked: post.user_has_liked ?? false });
  };

  const handleBookmark = () => {
    if (!user) return;
    toggleBookmark.mutate({ postId: post.id, isBookmarked: post.user_has_bookmarked ?? false });
  };

  return (
    <Layout>
      <section className="py-8">
        <div className="container max-w-3xl">
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
            <Link to={post.category ? `/community/${post.category.slug}` : "/community"}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("community.backTo", { name: post.category?.name || t("community.title") })}
            </Link>
          </Button>

          <Card className="shadow-soft mb-8">
            <CardHeader className="pb-4">
              {post.category && (
                <Link
                  to={`/community/${post.category.slug}`}
                  className="inline-flex mb-4"
                >
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                    {post.category.name}
                  </span>
                </Link>
              )}

              <h1 className="text-2xl md:text-3xl font-display font-bold leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author?.avatar_url || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{displayName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(post.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2",
                    post.user_has_liked && "text-destructive"
                  )}
                  onClick={handleLike}
                  disabled={!user}
                >
                  <Heart
                    className={cn("w-5 h-5", post.user_has_liked && "fill-current")}
                  />
                  {post.likes_count} {post.likes_count === 1 ? t("community.like") : t("community.likes")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2",
                    post.user_has_bookmarked && "text-primary"
                  )}
                  onClick={handleBookmark}
                  disabled={!user}
                >
                  <Bookmark
                    className={cn("w-5 h-5", post.user_has_bookmarked && "fill-current")}
                  />
                  {post.user_has_bookmarked ? t("community.saved") : t("community.save")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <CommentSection postId={post.id} />
        </div>
      </section>
    </Layout>
  );
};

export default PostDetail;
