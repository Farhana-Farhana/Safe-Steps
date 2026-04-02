-- Create table for local resources (specialists, therapists, support services)
CREATE TABLE public.local_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL, -- 'specialist', 'therapist', 'support_service', 'organization'
  disability_types disability_type[] NOT NULL DEFAULT '{}', -- which disabilities they support
  address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.local_resources ENABLE ROW LEVEL SECURITY;

-- Resources are viewable by everyone
CREATE POLICY "Local resources are viewable by everyone" 
ON public.local_resources 
FOR SELECT 
USING (true);

-- Create indexes for common queries
CREATE INDEX idx_local_resources_city ON public.local_resources(city);
CREATE INDEX idx_local_resources_state ON public.local_resources(state);
CREATE INDEX idx_local_resources_type ON public.local_resources(resource_type);
CREATE INDEX idx_local_resources_disabilities ON public.local_resources USING GIN(disability_types);

-- Add trigger for updated_at
CREATE TRIGGER update_local_resources_updated_at
BEFORE UPDATE ON public.local_resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();