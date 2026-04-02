import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Ear, BookOpen, MessageCircle, Heart, Lightbulb, ArrowRight, LucideIcon } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type ForumCategory = Tables<"forum_categories">;

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Ear,
  BookOpen,
  MessageCircle,
  Heart,
  Lightbulb,
};

const colorMap: Record<string, string> = {
  blindness: "blindness",
  deafness: "deafness",
  dyslexia: "dyslexia",
  speech_disability: "speech",
};

interface CategoryCardProps {
  category: ForumCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon || "MessageCircle"] || MessageCircle;
  const colorClass = category.disability_type 
    ? colorMap[category.disability_type] || "primary"
    : "primary";

  return (
    <Link to={`/community/${category.slug}`}>
      <Card className="h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 group">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${colorClass}-light`}
            >
              <Icon className={`w-6 h-6 text-${colorClass}`} />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <CardTitle className="text-lg mt-3">{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {category.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
