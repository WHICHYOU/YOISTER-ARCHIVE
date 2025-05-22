// lib/db.ts
import { supabase } from './supabase-client';
export const db = {
  presets: () => supabase.from('presets'),
  votes: () => supabase.from('votes'),
  // …
};
