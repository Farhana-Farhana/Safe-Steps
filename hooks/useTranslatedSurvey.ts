import { useTranslation } from "react-i18next";
import { DisabilityType } from "@/data/surveyQuestions";

interface TranslatedQuestion {
  id: string;
  question: string;
  description?: string;
  options: { label: string; value: number }[];
}

interface TranslatedSurvey {
  type: DisabilityType;
  title: string;
  description: string;
  ageRange: string;
  questions: TranslatedQuestion[];
}

const getFrequencyOptions = (t: (key: string) => string) => [
  { label: t("surveyQuestions.frequency.never"), value: 0 },
  { label: t("surveyQuestions.frequency.rarely"), value: 1 },
  { label: t("surveyQuestions.frequency.sometimes"), value: 2 },
  { label: t("surveyQuestions.frequency.often"), value: 3 },
  { label: t("surveyQuestions.frequency.always"), value: 4 },
];

const getYesNoOptions = (t: (key: string) => string) => [
  { label: t("surveyQuestions.yesNo.no"), value: 0 },
  { label: t("surveyQuestions.yesNo.unsure"), value: 1 },
  { label: t("surveyQuestions.yesNo.sometimes"), value: 2 },
  { label: t("surveyQuestions.yesNo.yes"), value: 3 },
];

export function useTranslatedSurvey(type: DisabilityType): TranslatedSurvey {
  const { t } = useTranslation();

  const surveyConfig: Record<DisabilityType, { questionIds: string[]; optionTypes: string[] }> = {
    blindness: {
      questionIds: ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"],
      optionTypes: ["freq", "freq", "freq", "freq", "freq", "freq", "yesNo", "freq", "yesNo", "freq"],
    },
    deafness: {
      questionIds: ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10"],
      optionTypes: ["response", "turns", "freq", "freq", "freq", "freq", "yesNo", "freq", "yesNo", "yesNo"],
    },
    dyslexia: {
      questionIds: ["dy1", "dy2", "dy3", "dy4", "dy5", "dy6", "dy7", "dy8", "dy9", "dy10"],
      optionTypes: ["freq", "freq", "freq", "yesNo", "freq", "freq", "freq", "freq", "freq", "yesNo"],
    },
    speech_disability: {
      questionIds: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"],
      optionTypes: ["clarity", "freq", "freq", "freq", "yesNo", "freq", "freq", "freq", "yesNo", "freq"],
    },
  };

  const getOptionsForType = (type: DisabilityType, optionType: string): { label: string; value: number }[] => {
    if (optionType === "freq") {
      return getFrequencyOptions(t);
    }
    if (optionType === "yesNo") {
      return getYesNoOptions(t);
    }
    if (optionType === "response") {
      return [
        { label: t("surveyQuestions.deafness.response.alwaysResponds"), value: 0 },
        { label: t("surveyQuestions.deafness.response.usuallyResponds"), value: 1 },
        { label: t("surveyQuestions.deafness.response.sometimesResponds"), value: 2 },
        { label: t("surveyQuestions.deafness.response.rarelyResponds"), value: 3 },
        { label: t("surveyQuestions.deafness.response.neverResponds"), value: 4 },
      ];
    }
    if (optionType === "turns") {
      return [
        { label: t("surveyQuestions.deafness.turns.always"), value: 0 },
        { label: t("surveyQuestions.deafness.turns.usually"), value: 1 },
        { label: t("surveyQuestions.deafness.turns.sometimes"), value: 2 },
        { label: t("surveyQuestions.deafness.turns.rarely"), value: 3 },
        { label: t("surveyQuestions.deafness.turns.never"), value: 4 },
      ];
    }
    if (optionType === "clarity") {
      return [
        { label: t("surveyQuestions.speech_disability.clarity.everyoneUnderstands"), value: 0 },
        { label: t("surveyQuestions.speech_disability.clarity.mostUnderstand"), value: 1 },
        { label: t("surveyQuestions.speech_disability.clarity.someDifficulty"), value: 2 },
        { label: t("surveyQuestions.speech_disability.clarity.mostDifficulty"), value: 3 },
        { label: t("surveyQuestions.speech_disability.clarity.veryHard"), value: 4 },
      ];
    }
    return getFrequencyOptions(t);
  };

  const config = surveyConfig[type];
  const questions: TranslatedQuestion[] = config.questionIds.map((id, index) => {
    const questionKey = `surveyQuestions.${type}.${id}.question`;
    const descriptionKey = `surveyQuestions.${type}.${id}.description`;
    const description = t(descriptionKey);
    
    return {
      id,
      question: t(questionKey),
      description: description !== descriptionKey ? description : undefined,
      options: getOptionsForType(type, config.optionTypes[index]),
    };
  });

  return {
    type,
    title: t(`surveyQuestions.${type}.title`),
    description: t(`surveyQuestions.${type}.description`),
    ageRange: t(`surveyQuestions.${type}.ageRange`),
    questions,
  };
}

export function useTranslatedRecommendations(type: DisabilityType, level: "low" | "medium" | "high"): string[] {
  const { t } = useTranslation();
  const recommendations = t(`surveyQuestions.recommendations.${type}.${level}`, { returnObjects: true });
  return Array.isArray(recommendations) ? (recommendations as string[]) : [];
}
