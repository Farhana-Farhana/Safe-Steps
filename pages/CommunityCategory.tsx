import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { PostCard } from "@/components/forum/PostCard";
import { CreatePostForm } from "@/components/forum/CreatePostForm";
import { useCategoryBySlug, usePosts } from "@/hooks/useForum";
import { useAuth } from "@/contexts/AuthContext";

const CommunityCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: category, isLoading: categoryLoading } = useCategoryBySlug(slug || "");
  const { data: posts, isLoading: postsLoading } = usePosts(category?.id);

  if (categoryLoading) {
    return (
      <Layout>
        <div className="container py-12 text-center text-muted-foreground">
          {t("community.loading")}
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <p className="text-muted-foreground mb-4">{t("community.categoryNotFound")}</p>
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

  return (
    <Layout>
      <section className="gradient-hero py-8">
        <div className="container">
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
            <Link to="/community">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("community.backToCommunity")}
            </Link>
          </Button>
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              {category.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display font-bold">
              {t("community.discussions")}
            </h2>
            {user && (
              <Button
                onClick={() => setShowCreatePost(!showCreatePost)}
                className="gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                {t("community.newPost")}
              </Button>
            )}
          </div>

          {showCreatePost && (
            <CreatePostForm
              defaultCategoryId={category.id}
              onSuccess={() => setShowCreatePost(false)}
            />
          )}

          {postsLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              {t("community.loadingPosts")}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground mb-4">
                {t("community.noDiscussions")}
              </p>
              {user ? (
                <Button onClick={() => setShowCreatePost(true)}>
                  {t("community.startFirstDiscussion")}
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/auth?mode=signup">{t("community.joinToStartDiscussion")}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CommunityCategory;
