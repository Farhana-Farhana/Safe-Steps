import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe, CheckCircle, Building2, Users, Stethoscope, Heart } from "lucide-react";
import type { LocalResource } from "@/hooks/useResources";

interface ResourceCardProps {
  resource: LocalResource;
}

const resourceTypeIcons: Record<string, typeof Building2> = {
  specialist: Stethoscope,
  therapist: Heart,
  support_service: Users,
  organization: Building2,
};

const disabilityColors: Record<string, string> = {
  blindness: "bg-blindness-light text-blindness",
  deafness: "bg-deafness-light text-deafness",
  dyslexia: "bg-dyslexia-light text-dyslexia",
  speech_disability: "bg-speech-light text-speech",
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const { t } = useTranslation();
  const Icon = resourceTypeIcons[resource.resource_type] || Building2;

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg line-clamp-1">{resource.name}</CardTitle>
                {resource.is_verified && (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {t(`resources.types.${resource.resource_type}`, resource.resource_type)}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resource.description && (
          <CardDescription className="line-clamp-2">
            {resource.description}
          </CardDescription>
        )}

        {/* Disability badges */}
        <div className="flex flex-wrap gap-1.5">
          {resource.disability_types.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className={`text-xs ${disabilityColors[type] || ""}`}
            >
              {t(`resources.disabilities.${type}`, type)}
            </Badge>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            {resource.address && `${resource.address}, `}
            {resource.city}, {resource.state}, Kerala {resource.zip_code && `- ${resource.zip_code}`}
          </span>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap gap-2">
          {resource.phone && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${resource.phone}`}>
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {t("resources.call")}
              </a>
            </Button>
          )}
          {resource.email && (
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${resource.email}`}>
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                {t("resources.email")}
              </a>
            </Button>
          )}
          {resource.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={resource.website} target="_blank" rel="noopener noreferrer">
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                {t("resources.website")}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
