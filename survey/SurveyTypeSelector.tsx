import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Ear, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { DisabilityType } from "@/data/surveyQuestions";

interface SurveyTypeSelectorProps {
  onSelect: (type: DisabilityType) => void;
}

export function SurveyTypeSelector({ onSelect }: SurveyTypeSelectorProps) {
  const { t } = useTranslation();

  const surveyTypes = [
    {
      type: "blindness" as DisabilityType,
      title: t("survey.visionScreening"),
      description: t("survey.visionDesc"),
      icon: Eye,
      color: "blindness",
      ageRange: t("survey.allAges"),
    },
    {
      type: "deafness" as DisabilityType,
      title: t("survey.hearingScreening"),
      description: t("survey.hearingDesc"),
      icon: Ear,
      color: "deafness",
      ageRange: t("survey.allAges"),
    },
    {
      type: "dyslexia" as DisabilityType,
      title: t("survey.dyslexiaScreening"),
      description: t("survey.dyslexiaDesc"),
      icon: BookOpen,
      color: "dyslexia",
      ageRange: t("survey.fiveYearsPlus"),
    },
    {
      type: "speech_disability" as DisabilityType,
      title: t("survey.speechScreening"),
      description: t("survey.speechDesc"),
      icon: MessageCircle,
      color: "speech",
      ageRange: t("survey.allAges"),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          {t("survey.pageTitle")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("survey.pageDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {surveyTypes.map((survey) => (
          <Card
            key={survey.type}
            className="cursor-pointer hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 group"
            onClick={() => onSelect(survey.type)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${survey.color}-light`}
                >
                  <survey.icon className={`w-7 h-7 text-${survey.color}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="text-xl mt-4">{survey.title}</CardTitle>
              <CardDescription>{survey.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-2 py-1 rounded-full bg-muted text-xs font-medium">
                  {survey.ageRange}
                </span>
                <span>• {t("survey.questionsTime")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground max-w-xl mx-auto">
        <p>
          <strong>{t("survey.disclaimer").split('.')[0]}.</strong> {t("survey.disclaimer").split('.').slice(1).join('.')}
        </p>
      </div>
    </div>
  );
}
