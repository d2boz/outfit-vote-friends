
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nipseozlspzsimvhnbto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcHNlb3psc3B6c2ltdmhuYnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDM3NTUsImV4cCI6MjA1OTY3OTc1NX0.3KzT9GBp-RhY1G3frJtjU9JJ2Y1SuYRmskFAbuj4IJQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
