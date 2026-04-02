import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PostWithAuthor, useToggleLike, useToggleBookmark } from "@/hooks/useForum";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const toggleLike = useToggleLike();
  const toggleBookmark = useToggleBookmark();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleLike.mutate({ postId: post.id, isLiked: post.user_has_liked ?? false });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleBookmark.mutate({ postId: post.id, isBookmarked: post.user_has_bookmarked ?? false });
  };

  const displayName = post.author?.display_name || t("community.anonymous");
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <Link to={`/community/post/${post.id}`}>
      <Card className="hover:shadow-soft transition-all duration-200 hover:border-primary/30">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author?.avatar_url || ""} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                {post.category && (
                  <span className="ml-2">
                    {t("community.in")} <span className="text-primary">{post.category.name}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <h3 className="font-display font-bold text-lg mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.content}
          </p>
        </CardContent>
        <CardFooter className="pt-2 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-2 px-2",
              post.user_has_liked && "text-destructive"
            )}
            onClick={handleLike}
            disabled={!user}
          >
            <Heart
              className={cn("w-4 h-4", post.user_has_liked && "fill-current")}
            />
            <span className="text-xs">{post.likes_count}</span>
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{post.comments_count}</span>
          </div>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "px-2",
              post.user_has_bookmarked && "text-primary"
            )}
            onClick={handleBookmark}
            disabled={!user}
          >
            <Bookmark
              className={cn("w-4 h-4", post.user_has_bookmarked && "fill-current")}
            />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
