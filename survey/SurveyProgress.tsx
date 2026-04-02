import { Progress } from "@/components/ui/progress";

interface SurveyProgressProps {
  current: number;
  total: number;
}

export function SurveyProgress({ current, total }: SurveyProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium text-primary">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
