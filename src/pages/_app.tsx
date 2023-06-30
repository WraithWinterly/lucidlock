import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, type Session } from '@supabase/auth-helpers-react'
import { type AppProps } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp;