import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, AlertCircle, ArrowRight, Home, RotateCcw, Users, MapPin, Phone, Globe, Building2, Heart, Sparkles, BookOpen } from "lucide-react";
import { DisabilityType, getLikelihood } from "@/data/surveyQuestions";
import { cn } from "@/lib/utils";
import { useResources } from "@/hooks/useResources";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslatedSurvey, useTranslatedRecommendations } from "@/hooks/useTranslatedSurvey";

interface SurveyResultsProps {
  type: DisabilityType;
  score: number;
  maxScore: number;
  onRetake: () => void;
}

export function SurveyResults({ type, score, maxScore, onRetake }: SurveyResultsProps) {
  const { t } = useTranslation();
  const { level, percentage } = getLikelihood(score, maxScore);
  const surveyInfo = useTranslatedSurvey(type);
  const recommendations = useTranslatedRecommendations(type, level);
  
  // Fetch resources for this disability type
  const { data: resources, isLoading: resourcesLoading } = useResources({
    disabilityType: type,
  });

  const levelConfig = {
    low: {
      icon: CheckCircle2,
      title: t("surveyResults.lowTitle"),
      subtitle: t("surveyResults.lowDescription"),
      description: t("surveyResults.meaningLow"),
      emoji: "🌟",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      progressColor: "bg-emerald-500",
    },
    medium: {
      icon: AlertTriangle,
      title: t("surveyResults.mediumTitle"),
      subtitle: t("surveyResults.mediumDescription"),
      description: t("surveyResults.meaningMedium"),
      emoji: "💛",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      progressColor: "bg-amber-500",
    },
    high: {
      icon: AlertCircle,
      title: t("surveyResults.highTitle"),
      subtitle: t("surveyResults.highDescription"),
      description: t("surveyResults.meaningHigh"),
      emoji: "💙",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      progressColor: "bg-blue-500",
    },
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  // Get disability-friendly name
  const getDisabilityName = (type: DisabilityType): string => {
    const names: Record<DisabilityType, string> = {
      blindness: t("disabilities.blindness.title"),
      deafness: t("disabilities.deafness.title"),
      dyslexia: t("disabilities.dyslexia.title"),
      speech_disability: t("disabilities.speechDisability.title"),
    };
    return names[type];
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header with warm messaging */}
      <div className="text-center space-y-3">
        <div className="text-5xl mb-2">{config.emoji}</div>
        <h1 className="text-3xl md:text-4xl font-display font-bold">
          {t("surveyResults.title")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {surveyInfo.title} • {getDisabilityName(type)}
        </p>
      </div>

      {/* Main Result Card - More visual and friendly */}
      <Card className={cn("border-2 overflow-hidden", config.borderColor)}>
        <div className={cn("px-6 py-4", config.bgColor)}>
          <div className="flex items-center gap-3">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center bg-white/80")}>
              <Icon className={cn("w-6 h-6", config.color)} />
            </div>
            <div>
              <h2 className={cn("text-xl font-bold", config.color)}>
                {config.title}
              </h2>
              <p className="text-sm text-muted-foreground">{config.subtitle}</p>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-6 space-y-6">
          {/* Visual Score Indicator */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{t("surveyResults.signsObserved")}</span>
              <span className="font-semibold">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          {/* What this means - in plain language */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              {t("surveyResults.whatThisMeans")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Simple score breakdown */}
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-sm text-muted-foreground">{t("surveyResults.score")}</span>
            <Badge variant="outline" className="text-base font-bold px-3 py-1">
              {score} {t("surveyResults.outOf")} {maxScore}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations - More actionable and warm */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {t("surveyResults.nextSteps")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-foreground pt-1">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Encouragement message */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/10 border border-primary/20">
        <div className="flex gap-4 items-start">
          <Heart className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">{t("surveyResults.encouragementTitle")} 💪</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("surveyResults.encouragementText")}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Centers/Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            {t("surveyResults.recommendedCenters")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resourcesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : resources && resources.length > 0 ? (
            <div className="space-y-4">
              {resources.slice(0, 4).map((resource) => (
                <div 
                  key={resource.id} 
                  className="p-4 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground">{resource.name}</h4>
                        {resource.is_verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {t("common.verified")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-primary/80 capitalize mt-0.5">
                        {resource.resource_type.replace('_', ' ')}
                      </p>
                      {resource.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {resource.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{resource.city}, {resource.state}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      {resource.phone && (
                        <Button variant="outline" size="sm" asChild className="gap-1.5 rounded-full">
                          <a href={`tel:${resource.phone}`}>
                            <Phone className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{t("common.call")}</span>
                          </a>
                        </Button>
                      )}
                      {resource.website && (
                        <Button variant="outline" size="sm" asChild className="gap-1.5 rounded-full">
                          <a href={resource.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{t("common.visit")}</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" asChild className="w-full mt-2 rounded-full">
                <Link to={`/resources?disability=${type}`}>
                  {t("surveyResults.viewAllResources")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                {t("surveyResults.noResourcesYet")}
              </p>
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/resources">{t("common.resources")}</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions - more prominent and friendly */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button asChild size="lg" className="gap-2 rounded-full">
            <Link to="/community">
              <Users className="w-5 h-5" />
              {t("common.community")}
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={onRetake} className="gap-2 rounded-full">
            <RotateCcw className="w-5 h-5" />
            {t("surveyResults.startNewSurvey")}
          </Button>
        </div>
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/">
            <Home className="w-4 h-4" />
            {t("common.home")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
