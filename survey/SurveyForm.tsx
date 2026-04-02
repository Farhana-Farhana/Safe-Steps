import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DisabilityType } from "@/data/surveyQuestions";
import { SurveyQuestion } from "./SurveyQuestion";
import { SurveyProgress } from "./SurveyProgress";
import { SurveyResults } from "./SurveyResults";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslatedSurvey } from "@/hooks/useTranslatedSurvey";

interface SurveyFormProps {
  type: DisabilityType;
  onBack: () => void;
}

export function SurveyForm({ type, onBack }: SurveyFormProps) {
  const { t } = useTranslation();
  const survey = useTranslatedSurvey(type);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const questions = survey.questions;
  const currentQ = questions[currentQuestion];
  const selectedValue = answers[currentQ.id] ?? null;

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Survey complete
      await saveSurveyResults();
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = (): number => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const calculateMaxScore = (): number => {
    return questions.reduce((sum, q) => {
      const maxOption = Math.max(...q.options.map((o) => o.value));
      return sum + maxOption;
    }, 0);
  };

  const saveSurveyResults = async () => {
    if (!user) return;

    setIsSaving(true);
    const score = calculateScore();
    const maxScore = calculateMaxScore();
    const percentage = Math.round((score / maxScore) * 100);
    
    let likelihood: string;
    if (percentage < 30) {
      likelihood = "low";
    } else if (percentage < 60) {
      likelihood = "medium";
    } else {
      likelihood = "high";
    }

    try {
      const { error } = await supabase.from("survey_responses").insert({
        user_id: user.id,
        disability_type: type,
        answers: answers,
        score: score,
        likelihood: likelihood,
      });

      if (error) throw error;

      toast({
        title: "Results Saved",
        description: "Your survey results have been saved to your profile.",
      });
    } catch (error) {
      console.error("Error saving survey:", error);
      toast({
        title: "Note",
        description: "Results displayed but could not be saved. Log in to save future results.",
        variant: "default",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsComplete(false);
    onBack();
  };

  if (isComplete) {
    return (
      <SurveyResults
        type={type}
        score={calculateScore()}
        maxScore={calculateMaxScore()}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold">{survey.title}</h1>
          <p className="text-sm text-muted-foreground">
            {survey.ageRange}
          </p>
        </div>
      </div>

      {/* Progress */}
      <SurveyProgress
        current={currentQuestion + 1}
        total={questions.length}
      />

      {/* Question Card */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <SurveyQuestion
            question={currentQ}
            selectedValue={selectedValue}
            onSelect={handleSelect}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("survey.previous")}
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedValue === null || isSaving}
          className="gap-2"
        >
          {currentQuestion === questions.length - 1 ? (
            isSaving ? "..." : t("survey.seeResults")
          ) : (
            <>
              {t("survey.next")}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {/* Survey Info */}
      <p className="text-sm text-muted-foreground text-center">
        {survey.description}
      </p>
    </div>
  );
}
