// src/pages/_app.tsx
import {
  SessionContextProvider,
  SupabaseClient,
} from "@supabase/auth-helpers-react";
import "../styles/globals.css";
import type { AppProps, AppType } from "next/app";

import Layout from "~/components/layout/layout";
import supabase from "~/utils/supabaseClient";
import { useState } from "react";
import {
  Session,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}
