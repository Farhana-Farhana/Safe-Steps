import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type DisabilityType = Database["public"]["Enums"]["disability_type"];

// Malayalam to English mapping for search support
const malayalamToEnglishMap: Record<string, string> = {
  "തിരുവനന്തപുരം": "Thiruvananthapuram",
  "കൊല്ലം": "Kollam",
  "പത്തനംതിട്ട": "Pathanamthitta",
  "ആലപ്പുഴ": "Alappuzha",
  "കോട്ടയം": "Kottayam",
  "ഇടുക്കി": "Idukki",
  "എറണാകുളം": "Ernakulam",
  "തൃശ്ശൂർ": "Thrissur",
  "പാലക്കാട്": "Palakkad",
  "മലപ്പുറം": "Malappuram",
  "കോഴിക്കോട്": "Kozhikode",
  "വയനാട്": "Wayanad",
  "കണ്ണൂർ": "Kannur",
  "കാസർഗോഡ്": "Kasaragod",
};

function mapMalayalamToEnglish(query: string): string {
  // Check for exact match first
  if (malayalamToEnglishMap[query]) {
    return malayalamToEnglishMap[query];
  }
  // Check for partial matches
  for (const [ml, en] of Object.entries(malayalamToEnglishMap)) {
    if (query.includes(ml)) {
      return query.replace(ml, en);
    }
  }
  return query;
}

export interface LocalResource {
  id: string;
  name: string;
  description: string | null;
  resource_type: string;
  disability_types: DisabilityType[];
  address: string | null;
  city: string;
  state: string;
  zip_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  is_verified: boolean;
  created_at: string;
}

interface ResourceFilters {
  disabilityType?: DisabilityType | "all";
  resourceType?: string | "all";
  searchQuery?: string;
  state?: string | "all";
}

export function useResources(filters: ResourceFilters = {}) {
  return useQuery({
    queryKey: ["resources", filters],
    queryFn: async () => {
      let query = supabase
        .from("local_resources")
        .select("*")
        .order("is_verified", { ascending: false })
        .order("name");

      // Filter by disability type
      if (filters.disabilityType && filters.disabilityType !== "all") {
        query = query.contains("disability_types", [filters.disabilityType]);
      }

      // Filter by resource type
      if (filters.resourceType && filters.resourceType !== "all") {
        query = query.eq("resource_type", filters.resourceType);
      }

      // Filter by state
      if (filters.state && filters.state !== "all") {
        query = query.eq("state", filters.state);
      }

      // Search by name or description
      if (filters.searchQuery) {
        const mappedQuery = mapMalayalamToEnglish(filters.searchQuery);
        query = query.or(
          `name.ilike.%${mappedQuery}%,description.ilike.%${mappedQuery}%,city.ilike.%${mappedQuery}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as LocalResource[];
    },
  });
}

export function useResourceStates() {
  return useQuery({
    queryKey: ["resource-states"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("local_resources")
        .select("state")
        .order("state");

      if (error) throw error;
      
      // Get unique states
      const states = [...new Set(data.map((r) => r.state))];
      return states;
    },
  });
}
