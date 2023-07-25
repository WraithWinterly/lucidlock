import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { env } from "~/env.mjs";
import { Database } from "~/lib/database.types";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createPagesBrowserClient<Database>({
  supabaseUrl,
  supabaseKey,
});

export default supabase;
