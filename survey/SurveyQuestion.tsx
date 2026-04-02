import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SurveyQuestion as SurveyQuestionType } from "@/data/surveyQuestions";
import { cn } from "@/lib/utils";

interface SurveyQuestionProps {
  question: SurveyQuestionType;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function SurveyQuestion({
  question,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions,
}: SurveyQuestionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2 className="text-xl md:text-2xl font-display font-bold leading-relaxed">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-muted-foreground">{question.description}</p>
        )}
      </div>

      <RadioGroup
        value={selectedValue?.toString() ?? ""}
        onValueChange={(value) => onSelect(parseInt(value))}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <div key={index}>
            <Label
              htmlFor={`option-${index}`}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                selectedValue === option.value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <RadioGroupItem
                value={option.value.toString()}
                id={`option-${index}`}
                className="shrink-0"
              />
              <span className="text-base font-medium">{option.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
