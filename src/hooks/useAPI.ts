import { useState, useEffect } from "react";
import type {
  APIFunctions,
  PayloadTypes,
  ResponseTypes,
} from "~/pages/_shared/apiTypes";
import { getEndpoint } from "~/utils/utils";

function useAPI<FunctionName extends APIFunctions>(
  functionName: FunctionName,
  options: { autoFetch: boolean } = { autoFetch: false },
  body?: PayloadTypes[FunctionName] extends null
    ? never
    : PayloadTypes[FunctionName]
) {
  const [data, setData] = useState<ResponseTypes[FunctionName] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options?.autoFetch) {
      callFunction();
    }
  }, []);

  const callFunction = async () => {
    setLoading(true);
    try {
      let response;
      if (body === undefined || body === null) {
        response = await fetch(`${getEndpoint()}/${functionName}`);
      } else {
        response = await fetch(`${getEndpoint()}/${functionName}`, {
          method: "POST",
          body: JSON.stringify(body),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch ${functionName}`);
      }

      const responseData: ResponseTypes[FunctionName] = await response.json();

      setData(responseData);
      setLoading(false);
      return responseData;
    } catch (error) {
      const e = error as Error;
      setError(e.message);
      setLoading(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, data, callFunction };
}

export default useAPI;
