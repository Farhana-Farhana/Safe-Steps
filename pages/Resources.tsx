import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { useResources, useResourceStates } from "@/hooks/useResources";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Search } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type DisabilityType = Database["public"]["Enums"]["disability_type"];

export default function Resources() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [disabilityType, setDisabilityType] = useState<DisabilityType | "all">("all");
  const [resourceType, setResourceType] = useState("all");
  const [state, setState] = useState("all");

  const { data: resources, isLoading } = useResources({
    searchQuery: searchQuery || undefined,
    disabilityType: disabilityType !== "all" ? disabilityType : undefined,
    resourceType: resourceType !== "all" ? resourceType : undefined,
    state: state !== "all" ? state : undefined,
  });

  const { data: availableStates = [] } = useResourceStates();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("resources.pageTitle")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("resources.pageDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-8 md:py-12">
        <div className="container">
          <ResourceFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            disabilityType={disabilityType}
            onDisabilityTypeChange={setDisabilityType}
            resourceType={resourceType}
            onResourceTypeChange={setResourceType}
            state={state}
            onStateChange={setState}
            availableStates={availableStates}
          />

          {/* Results */}
          <div className="mt-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-lg" />
                ))}
              </div>
            ) : resources && resources.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {resources.length === 1 
                    ? t("resources.resourcesFound", { count: resources.length })
                    : t("resources.resourcesFoundPlural", { count: resources.length })}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("resources.noResults")}</h3>
                <p className="text-muted-foreground">
                  {t("resources.noResultsHint")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
