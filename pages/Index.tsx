import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Ear, BookOpen, MessageCircle, Heart, Users, ClipboardCheck, ArrowRight } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();

  const disabilityCategories = [
    {
      id: "blindness",
      title: t("disabilities.blindness.title"),
      description: t("disabilities.blindness.shortDesc"),
      icon: Eye,
      color: "blindness",
      link: "/disabilities/blindness",
    },
    {
      id: "deafness",
      title: t("disabilities.deafness.title"),
      description: t("disabilities.deafness.shortDesc"),
      icon: Ear,
      color: "deafness",
      link: "/disabilities/deafness",
    },
    {
      id: "dyslexia",
      title: t("disabilities.dyslexia.title"),
      description: t("disabilities.dyslexia.shortDesc"),
      icon: BookOpen,
      color: "dyslexia",
      link: "/disabilities/dyslexia",
    },
    {
      id: "speech-disability",
      title: t("disabilities.speechDisability.title"),
      description: t("disabilities.speechDisability.shortDesc"),
      icon: MessageCircle,
      color: "speech",
      link: "/disabilities/speech-disability",
    },
  ];

  const features = [
    {
      icon: ClipboardCheck,
      title: t("features.surveys.title"),
      description: t("features.surveys.description"),
      link: "/survey",
    },
    {
      icon: Users,
      title: t("features.community.title"),
      description: t("features.community.description"),
      link: "/community",
    },
    {
      icon: Heart,
      title: t("features.resources.title"),
      description: t("features.resources.description"),
      link: "/resources",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              {t("home.heroTitle")}{" "}
              <span className="text-gradient">{t("home.heroHighlight")}</span>{" "}
              {t("home.heroTitleEnd")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("home.heroDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/survey">
                  {t("home.takeSurvey")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/community">{t("home.joinCommunity")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disability Categories */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("home.learnTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("home.learnDescription")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disabilityCategories.map((category) => (
              <Link key={category.id} to={category.link}>
                <Card className="h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                  <CardHeader className="text-center pb-2">
                    <div 
                      className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-${category.color}-light`}
                    >
                      <category.icon className={`w-8 h-8 text-${category.color}`} />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("home.featuresTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("home.featuresDescription")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="text-center border-0 shadow-soft bg-card h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("home.ctaDescription")}
            </p>
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/survey">
                {t("home.startSurvey")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
