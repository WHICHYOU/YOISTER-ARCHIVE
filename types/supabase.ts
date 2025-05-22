/*
 * -----------------------------------------------------------------------------
 *  This file is **generated** from your Supabase SQL schema (see data/supabase_schema.sql)
 *  to give full‑stack, end‑to‑end type‑safety.
 *
 *  ➜  Regenerate at any time with the CLI:
 *      npx supabase gen types typescript --project-id <YOUR_ID> > types/supabase.ts
 *
 *  Until you wire that into CI, this hand‑rolled version keeps TS happy and
 *  matches the columns that exist in the SQL you shared. Adjust if you extend
 *  the schema. All rows use camelCased field‑names exactly as Supabase returns
 *  them.
 * -----------------------------------------------------------------------------
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

/**
 * The root `Database` interface – import from anywhere:
 *
 *     import type { Database } from "@/types/supabase";
 */
export interface Database {
  public: {
    Tables: {
      /** USERS ---------------------------------------------------------------- */
      users: {
        Row: {
          id: string;
          email: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          email?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string | null;
          created_at?: string | null;
        };
      };

      /** PRESETS -------------------------------------------------------------- */
      presets: {
        Row: {
          id: string;
          title: string | null;
          description: string | null;
          option_a: string;
          option_b: string;
          category: string | null;
          tags: string[] | null;
          preset_type: 'personality' | 'brand' | 'lifestyle' | 'fun';
          created_at: string | null;
        };
        Insert: {
          id: string;
          title?: string | null;
          description?: string | null;
          option_a: string;
          option_b: string;
          category?: string | null;
          tags?: string[] | null;
          preset_type: 'personality' | 'brand' | 'lifestyle' | 'fun';
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string | null;
          description?: string | null;
          option_a?: string;
          option_b?: string;
          category?: string | null;
          tags?: string[] | null;
          preset_type?: 'personality' | 'brand' | 'lifestyle' | 'fun';
          created_at?: string | null;
        };
      };

      /** VOTES ---------------------------------------------------------------- */
      votes: {
        Row: {
          id: string;
          user_id: string | null;
          preset_id: string;
          chosen_option: 'A' | 'B';
          was_fun: boolean | null;
          was_meaningful: boolean | null;
          tag_axis: string | null;
          reflection_label: string | null;
          choose_again: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          preset_id: string;
          chosen_option: 'A' | 'B';
          was_fun?: boolean | null;
          was_meaningful?: boolean | null;
          tag_axis?: string | null;
          reflection_label?: string | null;
          choose_again?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          preset_id?: string;
          chosen_option?: 'A' | 'B';
          was_fun?: boolean | null;
          was_meaningful?: boolean | null;
          tag_axis?: string | null;
          reflection_label?: string | null;
          choose_again?: boolean | null;
          created_at?: string | null;
        };
      };

      /** TRIBE SNAPSHOTS ------------------------------------------------------- */
      tribe_snapshots: {
        Row: {
          id: string;
          user_id: string;
          snapshot: Json;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          snapshot: Json;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          snapshot?: Json;
          created_at?: string | null;
        };
      };

      /** CUSTOM SHOWDOWNS ------------------------------------------------------ */
      custom_showdowns: {
        Row: {
          id: string;
          user_id: string;
          option_a: string;
          option_b: string;
          description: string | null;
          tags: string[] | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          option_a: string;
          option_b: string;
          description?: string | null;
          tags?: string[] | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          option_a?: string;
          option_b?: string;
          description?: string | null;
          tags?: string[] | null;
          created_at?: string | null;
        };
      };

      /** SESSIONS -------------------------------------------------------------- */
      sessions: {
        Row: {
          id: string;
          user_id: string;
          current_step: number | null;
          current_preset_id: string | null;
          completed: boolean | null;
          started_at: string | null;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_step?: number | null;
          current_preset_id?: string | null;
          completed?: boolean | null;
          started_at?: string | null;
          ended_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_step?: number | null;
          current_preset_id?: string | null;
          completed?: boolean | null;
          started_at?: string | null;
          ended_at?: string | null;
        };
      };

      /** SHOWDOWNS (minimal, extended May 20) ---------------------------------- */
      showdowns: {
        Row: {
          id: string;
          user_id: string | null;
          option_a: string;
          option_b: string;
          option_a_image_url: string | null;
          option_b_image_url: string | null;
          media_type: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          option_a: string;
          option_b: string;
          option_a_image_url?: string | null;
          option_b_image_url?: string | null;
          media_type?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          option_a?: string;
          option_b?: string;
          option_a_image_url?: string | null;
          option_b_image_url?: string | null;
          media_type?: string | null;
        };
      };
    };

    Views: {
      /** no views in current schema */
    };

    Functions: {
      /** add custom Postgres functions here when you create them */
    };

    Enums: {
      /** empty – we use string literal unions above */
    };

    CompositeTypes: {
      /** none */
    };
  };
}
