import type { Database } from "@/lib/supabase";
export type Vote = Database["public"]["Tables"]["votes"]["Row"];