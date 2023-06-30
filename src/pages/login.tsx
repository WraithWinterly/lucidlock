import { Auth } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const { redirectedFrom } = useRouter().query;

  if (!user)
    return (
      <Auth
        redirectTo={`http://localhost:3000${(redirectedFrom as string) || ""}`}
        supabaseClient={supabaseClient}
        providers={["google"]}
        socialLayout="horizontal"
        onlyThirdPartyProviders
      />
    );

  return (
    <>
      <button onClick={() => void supabaseClient.auth.signOut()}>
        Sign out
      </button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
