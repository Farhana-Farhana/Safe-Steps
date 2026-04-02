import { useTranslation } from "react-i18next";
import { Eye, Ear, BookOpen, MessageCircle, LucideIcon } from "lucide-react";

export interface TranslatedDisabilityContent {
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

const disabilityConfig: Record<string, { color: string; icon: LucideIcon; heroImage: string }> = {
  blindness: {
    color: "blindness",
    icon: Eye,
    heroImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
  },
  deafness: {
    color: "deafness",
    icon: Ear,
    heroImage: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
  },
  dyslexia: {
    color: "dyslexia",
    icon: BookOpen,
    heroImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  },
  "speech-disability": {
    color: "speech",
    icon: MessageCircle,
    heroImage: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=800&q=80",
  },
};

export function useTranslatedDisabilityContent(id: string): TranslatedDisabilityContent {
  const { t } = useTranslation();
  const config = disabilityConfig[id] || disabilityConfig.blindness;
  const key = id === "speech-disability" ? "speech-disability" : id;

  const getArray = (translationKey: string): string[] => {
    const result = t(translationKey, { returnObjects: true });
    return Array.isArray(result) ? (result as string[]) : [];
  };

  const getTreatmentOptions = (): { title: string; description: string }[] => {
    const result = t(`disabilityContent.${key}.treatment.options`, { returnObjects: true });
    return Array.isArray(result) ? (result as { title: string; description: string }[]) : [];
  };

  const getResources = (): { title: string; description: string; type: string }[] => {
    const result = t(`disabilityContent.${key}.resources`, { returnObjects: true });
    return Array.isArray(result) ? (result as { title: string; description: string; type: string }[]) : [];
  };

  const getFaqs = (): { question: string; answer: string }[] => {
    const result = t(`disabilityContent.${key}.faqs`, { returnObjects: true });
    return Array.isArray(result) ? (result as { question: string; answer: string }[]) : [];
  };

  return {
    id,
    title: t(`disabilityContent.${key}.title`),
    description: t(`disabilityContent.${key}.description`),
    color: config.color,
    icon: config.icon,
    heroImage: config.heroImage,
    overview: {
      definition: t(`disabilityContent.${key}.overview.definition`),
      prevalence: t(`disabilityContent.${key}.overview.prevalence`),
      keyPoints: getArray(`disabilityContent.${key}.overview.keyPoints`),
    },
    earlySigns: {
      infants: getArray(`disabilityContent.${key}.earlySigns.infants`),
      toddlers: getArray(`disabilityContent.${key}.earlySigns.toddlers`),
      schoolAge: getArray(`disabilityContent.${key}.earlySigns.schoolAge`),
    },
    diagnosis: {
      process: t(`disabilityContent.${key}.diagnosis.process`),
      professionals: getArray(`disabilityContent.${key}.diagnosis.professionals`),
      tests: getArray(`disabilityContent.${key}.diagnosis.tests`),
      timeline: t(`disabilityContent.${key}.diagnosis.timeline`),
    },
    treatment: {
      options: getTreatmentOptions(),
      earlyIntervention: t(`disabilityContent.${key}.treatment.earlyIntervention`),
    },
    resources: getResources(),
    faqs: getFaqs(),
  };
}
