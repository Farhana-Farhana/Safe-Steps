import { DisabilityPageLayout } from "@/components/disability/DisabilityPageLayout";
import { useTranslatedDisabilityContent } from "@/hooks/useTranslatedDisabilityContent";

const Blindness = () => {
  const content = useTranslatedDisabilityContent("blindness");
  return <DisabilityPageLayout content={content} />;
};

export default Blindness;
