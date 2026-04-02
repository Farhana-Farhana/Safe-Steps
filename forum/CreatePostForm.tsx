import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories, useCreatePost } from "@/hooks/useForum";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface CreatePostFormProps {
  defaultCategoryId?: string;
  onSuccess?: () => void;
}

export function CreatePostForm({ defaultCategoryId, onSuccess }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(defaultCategoryId || "");
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: categories } = useCategories();
  const createPost = useCreatePost();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) return;

    createPost.mutate(
      { title: title.trim(), content: content.trim(), categoryId },
      {
        onSuccess: (data) => {
          setTitle("");
          setContent("");
          onSuccess?.();
          navigate(`/community/post/${data.id}`);
        },
      }
    );
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground mb-4">
            {t("community.joinToPost")}
          </p>
          <Button asChild>
            <Link to="/auth?mode=signup">{t("community.signUpToPost")}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t("community.createNewPost")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">{t("community.category")}</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder={t("community.selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">{t("community.postTitle")}</Label>
            <Input
              id="title"
              placeholder={t("community.titlePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">{t("community.content")}</Label>
            <Textarea
              id="content"
              placeholder={t("community.contentPlaceholder")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              maxLength={5000}
            />
          </div>

          <Button
            type="submit"
            disabled={!title.trim() || !content.trim() || !categoryId || createPost.isPending}
            className="w-full"
          >
            {createPost.isPending ? t("community.posting") : t("community.post")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
