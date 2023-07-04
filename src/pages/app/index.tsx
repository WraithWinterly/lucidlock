import { useClerk, useUser } from "@clerk/nextjs";
import { useState } from "react";
import useAPI from "~/hooks/useAPI";
import { APIFunctions, GetDream } from "../_shared/apiTypes";

export default function App() {
  const user = useUser();

  const { error, loading, data } = useAPI<APIFunctions.GET_DREAM>(
    APIFunctions.GET_DREAM,
    {
      autoFetch: true,
    }
  );

  return (
    <div className="max-w-2xl">
      {user.isLoaded && (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-300">
          <h1 className="text-3xl font-extrabold">
            Welcome, {user.user?.fullName}
          </h1>
          <p className="break-words">
            Dream Text: {JSON.stringify(data?.dream)}
          </p>
          <p className="break-words">Loading: {loading}</p>
          <p className="break-words">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
