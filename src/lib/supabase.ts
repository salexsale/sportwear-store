import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Request = {
  id: string;
  name: string;
  email: string;
  service: string;
  description: string;
  status: "pending" | "in_progress" | "done";
  created_at: string;
};
