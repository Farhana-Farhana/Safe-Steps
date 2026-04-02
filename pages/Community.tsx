import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, PlusCircle, TrendingUp } from "lucide-react";
import { CategoryCard } from "@/components/forum/CategoryCard";
import { PostCard } from "@/components/forum/PostCard";
import { CreatePostForm } from "@/components/forum/CreatePostForm";
import { useCategories, usePosts } from "@/hooks/useForum";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Community = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: posts, isLoading: postsLoading } = usePosts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {t("community.title")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t("community.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <Tabs defaultValue="feed" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList>
                <TabsTrigger value="feed" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t("community.recentPosts")}
                </TabsTrigger>
                <TabsTrigger value="categories" className="gap-2">
                  <Users className="w-4 h-4" />
                  {t("community.categories")}
                </TabsTrigger>
              </TabsList>

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
              <CreatePostForm onSuccess={() => setShowCreatePost(false)} />
            )}

            <TabsContent value="feed" className="space-y-4">
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
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {t("community.noPosts")}
                  </p>
                  {!user && (
                    <Button asChild>
                      <Link to="/auth?mode=signup">{t("community.joinCommunity")}</Link>
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoriesLoading ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    {t("community.loadingCategories")}
                  </div>
                ) : (
                  categories?.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
