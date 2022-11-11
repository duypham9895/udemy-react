import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ url, headers = {}, method = "GET", body }, handleData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          headers,
          method,
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        handleData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return { sendRequest, isLoading, error };
};

export default useHttp;
