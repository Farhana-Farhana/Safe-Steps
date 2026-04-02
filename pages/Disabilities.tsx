import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Ear, BookOpen, MessageCircle, ArrowRight } from "lucide-react";

const Disabilities = () => {
  const { t } = useTranslation();

  const disabilityCategories = [
    {
      id: "blindness",
      title: t("disabilities.blindness.title"),
      description: t("disabilities.blindness.description"),
      icon: Eye,
      color: "blindness",
      link: "/disabilities/blindness",
    },
    {
      id: "deafness",
      title: t("disabilities.deafness.title"),
      description: t("disabilities.deafness.description"),
      icon: Ear,
      color: "deafness",
      link: "/disabilities/deafness",
    },
    {
      id: "dyslexia",
      title: t("disabilities.dyslexia.title"),
      description: t("disabilities.dyslexia.description"),
      icon: BookOpen,
      color: "dyslexia",
      link: "/disabilities/dyslexia",
    },
    {
      id: "speech-disability",
      title: t("disabilities.speechDisability.title"),
      description: t("disabilities.speechDisability.description"),
      icon: MessageCircle,
      color: "speech",
      link: "/disabilities/speech-disability",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              {t("disabilities.pageTitle")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("disabilities.pageDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Disability Categories Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {disabilityCategories.map((category) => (
              <Link key={category.id} to={category.link}>
                <Card className="h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 group">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${category.color}-light`}
                      >
                        <category.icon className={`w-7 h-7 text-${category.color}`} />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-xl mt-4">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Helpful Note */}
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <div className="bg-muted/50 rounded-2xl p-6">
              <p className="text-muted-foreground">
                <strong className="text-foreground">💡 {t("disabilities.notSure")}</strong>
                <br />
                {t("disabilities.takeSurveyHint")}
              </p>
              <Link 
                to="/survey" 
                className="inline-flex items-center gap-2 mt-4 text-primary font-medium hover:underline"
              >
                {t("common.takeSurvey")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disabilities;
