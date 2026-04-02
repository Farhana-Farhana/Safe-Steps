import { DisabilityPageLayout } from "@/components/disability/DisabilityPageLayout";
import { useTranslatedDisabilityContent } from "@/hooks/useTranslatedDisabilityContent";

const Dyslexia = () => {
  const content = useTranslatedDisabilityContent("dyslexia");
  return <DisabilityPageLayout content={content} />;
};

export default Dyslexia;
