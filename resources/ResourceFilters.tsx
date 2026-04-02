import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type DisabilityType = Database["public"]["Enums"]["disability_type"];

interface ResourceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  disabilityType: DisabilityType | "all";
  onDisabilityTypeChange: (value: DisabilityType | "all") => void;
  resourceType: string;
  onResourceTypeChange: (value: string) => void;
  state: string;
  onStateChange: (value: string) => void;
  availableStates: string[];
}

const keralaDistricts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

export function ResourceFilters({
  searchQuery,
  onSearchChange,
  disabilityType,
  onDisabilityTypeChange,
  resourceType,
  onResourceTypeChange,
  state,
  onStateChange,
  availableStates,
}: ResourceFiltersProps) {
  const { t } = useTranslation();

  const disabilityOptions = [
    { value: "all", label: t("resources.allDisabilities") },
    { value: "blindness", label: t("resources.disabilities.blindness") },
    { value: "deafness", label: t("resources.disabilities.deafness") },
    { value: "dyslexia", label: t("resources.disabilities.dyslexia") },
    { value: "speech_disability", label: t("resources.disabilities.speech_disability") },
  ] as const;

  const resourceTypeOptions = [
    { value: "all", label: t("resources.allTypes") },
    { value: "specialist", label: t("resources.types.specialist") },
    { value: "therapist", label: t("resources.types.therapist") },
    { value: "support_service", label: t("resources.types.support_service") },
    { value: "organization", label: t("resources.types.organization") },
  ];

  return (
    <div className="bg-card border rounded-lg p-4 md:p-6 space-y-4">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">{t("resources.search")}</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder={t("resources.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Disability Type */}
        <div className="space-y-2">
          <Label>{t("resources.disabilityType")}</Label>
          <Select value={disabilityType} onValueChange={onDisabilityTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("resources.allDisabilities")} />
            </SelectTrigger>
            <SelectContent>
              {disabilityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resource Type */}
        <div className="space-y-2">
          <Label>{t("resources.resourceType")}</Label>
          <Select value={resourceType} onValueChange={onResourceTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("resources.allTypes")} />
            </SelectTrigger>
            <SelectContent>
              {resourceTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div className="space-y-2">
          <Label>{t("resources.district")}</Label>
          <Select value={state} onValueChange={onStateChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("resources.allDistricts")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("resources.allDistricts")}</SelectItem>
              {keralaDistricts.map((district) => (
                <SelectItem key={district} value={district}>
                  {t(`resources.districts.${district}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
