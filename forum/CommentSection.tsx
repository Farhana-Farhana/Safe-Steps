import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { CommentWithAuthor, useComments, useCreateComment } from "@/hooks/useForum";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface CommentItemProps {
  comment: CommentWithAuthor;
  postId: string;
  depth?: number;
}

function CommentItem({ comment, postId, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { t } = useTranslation();
  const { user } = useAuth();
  const createComment = useCreateComment();

  const displayName = comment.author?.display_name || t("community.anonymous");
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleReply = () => {
    if (!replyContent.trim()) return;

    createComment.mutate(
      { postId, content: replyContent.trim(), parentId: comment.id },
      {
        onSuccess: () => {
          setReplyContent("");
          setIsReplying(false);
        },
      }
    );
  };

  return (
    <div className={depth > 0 ? "ml-8 border-l-2 border-muted pl-4" : ""}>
      <div className="py-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author?.avatar_url || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{displayName}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {comment.content}
            </p>
            {user && depth < 2 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-7 text-xs gap-1 text-muted-foreground"
                onClick={() => setIsReplying(!isReplying)}
              >
                <Reply className="w-3 h-3" />
                {t("community.reply")}
              </Button>
            )}
          </div>
        </div>

        {isReplying && (
          <div className="mt-3 ml-11 space-y-2">
            <Textarea
              placeholder={t("community.replyPlaceholder")}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={2}
              className="text-sm"
              maxLength={2000}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleReply}
                disabled={!replyContent.trim() || createComment.isPending}
              >
                {createComment.isPending ? t("community.posting") : t("community.reply")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsReplying(false);
                  setReplyContent("");
                }}
              >
                {t("community.cancel")}
              </Button>
            </div>
          </div>
        )}
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} postId={postId} depth={depth + 1} />
      ))}
    </div>
  );
}

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: comments, isLoading } = useComments(postId);
  const createComment = useCreateComment();

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    createComment.mutate(
      { postId, content: newComment.trim() },
      {
        onSuccess: () => setNewComment(""),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-display font-bold text-lg">
          {t("community.comments")} ({comments?.length || 0})
        </h3>
      </div>

      {user ? (
        <Card>
          <CardContent className="pt-4 space-y-3">
            <Textarea
              placeholder={t("community.commentPlaceholder")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              maxLength={2000}
            />
            <Button
              onClick={handleSubmit}
              disabled={!newComment.trim() || createComment.isPending}
            >
              {createComment.isPending ? t("community.posting") : t("community.postComment")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-muted-foreground mb-3">
              {t("community.signInToComment")}
            </p>
            <Button asChild size="sm">
              <Link to="/auth">{t("community.signIn")}</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          {t("community.loadingComments")}
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="divide-y divide-border">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {t("community.noComments")}
        </div>
      )}
    </div>
  );
}
