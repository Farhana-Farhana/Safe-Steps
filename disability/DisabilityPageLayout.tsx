import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight, Baby, GraduationCap, School, Stethoscope, Heart, BookOpen, ExternalLink, HelpCircle, LucideIcon } from "lucide-react";

export interface DisabilityPageContent {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
  heroImage: string;
  overview: {
    definition: string;
    prevalence: string;
    keyPoints: string[];
  };
  earlySigns: {
    infants: string[];
    toddlers: string[];
    schoolAge: string[];
  };
  diagnosis: {
    process: string;
    professionals: string[];
    tests: string[];
    timeline: string;
  };
  treatment: {
    options: { title: string; description: string }[];
    earlyIntervention: string;
  };
  resources: { title: string; description: string; type: string }[];
  faqs: { question: string; answer: string }[];
}

interface DisabilityPageLayoutProps {
  content: DisabilityPageContent;
}

export function DisabilityPageLayout({ content }: DisabilityPageLayoutProps) {
  const { t } = useTranslation();
  const Icon = content.icon;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{content.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative py-12 md:py-20 bg-${content.color}-light`}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${content.color}/20 text-${content.color} mb-4`}>
                <Icon className="w-5 h-5" />
                <span className="font-medium">{t("disabilityContent.sections.overview")}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                {content.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                {content.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/survey">
                    {t("common.takeSurvey")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/community">{t("home.joinCommunity")}</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-80 lg:w-96 aspect-video rounded-2xl overflow-hidden shadow-soft">
              <img 
                src={content.heroImage} 
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-primary" />
              {t("disabilityContent.sections.overview")}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {content.overview.definition}
            </p>
            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-2">{t("disabilityContent.sections.prevalence")}</h3>
              <p className="text-muted-foreground">{content.overview.prevalence}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.overview.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Early Signs Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center gap-3">
            <Heart className="h-7 w-7 text-coral" />
            {t("disabilityContent.sections.earlySigns")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-coral/50 transition-colors">
              <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-coral-light flex items-center justify-center">
                      <Baby className="h-5 w-5 text-coral" />
                    </div>
                    <CardTitle className="text-lg">{t("disabilityContent.sections.infants")}</CardTitle>
                  </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.earlySigns.infants.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-coral mt-1">•</span>
                      <span className="text-muted-foreground">{sign}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-teal/50 transition-colors">
              <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center">
                      <School className="h-5 w-5 text-teal" />
                    </div>
                    <CardTitle className="text-lg">{t("disabilityContent.sections.toddlers")}</CardTitle>
                  </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.earlySigns.toddlers.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-teal mt-1">•</span>
                      <span className="text-muted-foreground">{sign}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-sunny/50 transition-colors">
              <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-sunny-light flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-sunny" />
                    </div>
                    <CardTitle className="text-lg">{t("disabilityContent.sections.schoolAge")}</CardTitle>
                  </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {content.earlySigns.schoolAge.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-sunny mt-1">•</span>
                      <span className="text-muted-foreground">{sign}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center gap-3">
            <Stethoscope className="h-7 w-7 text-teal" />
            {t("disabilityContent.sections.diagnosis")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("disabilityContent.sections.diagnosisProcess")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{content.diagnosis.process}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("disabilityContent.sections.tests")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {content.diagnosis.tests.map((test, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-teal" />
                        <span className="text-sm">{test}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base">{t("disabilityContent.sections.professionals")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.diagnosis.professionals.map((professional, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">
                          {professional}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("disabilityContent.sections.timeline")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{content.diagnosis.timeline}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            {t("disabilityContent.sections.treatment")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            {content.treatment.earlyIntervention}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.treatment.options.map((option, index) => (
              <Card key={index} className="hover:shadow-soft transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
            {t("disabilityContent.sections.resources")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{resource.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center gap-3">
            <HelpCircle className="h-7 w-7 text-primary" />
            {t("disabilityContent.sections.faqs")}
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {content.faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-card rounded-lg border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("home.ctaDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/survey">
                  {t("common.takeSurvey")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/community">{t("common.community")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
