import { DisabilityPageLayout } from "@/components/disability/DisabilityPageLayout";
import { useTranslatedDisabilityContent } from "@/hooks/useTranslatedDisabilityContent";

const Deafness = () => {
  const content = useTranslatedDisabilityContent("deafness");
  return <DisabilityPageLayout content={content} />;
};

export default Deafness;
