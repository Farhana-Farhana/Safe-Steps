import { DisabilityPageLayout } from "@/components/disability/DisabilityPageLayout";
import { disabilityContent } from "@/data/disabilityContent";

const SpeechDisability = () => {
  return <DisabilityPageLayout content={disabilityContent["speech-disability"]} />;
};

export default SpeechDisability;
