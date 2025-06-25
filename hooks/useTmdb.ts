import { useEffect, useState } from "react";

interface UseTmdbReturn {
  data: any;
  isLoading: boolean;
  error: any;
}

export const useTmdb = (endpoint: string | null): UseTmdbReturn => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    if (!endpoint || !apiKey) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const separator = endpoint.includes("?") ? "&" : "?";
        const url = `${baseUrl}${endpoint}${separator}api_key=${apiKey}`;

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`
          );
        }

        const contentLength = response.headers.get("content-length");
        if (contentLength === "0") {
          throw new Error("Empty response received");
        }

        const responseText = await response.text();

        if (!responseText) {
          throw new Error("Empty response body");
        }

        let jsonData;
        try {
          jsonData = JSON.parse(responseText);
        } catch (parseError: any) {
          console.error("JSON Parse Error:", parseError);
          console.error("Response text:", responseText);
          throw new Error(`Invalid JSON response: ${parseError.message}`);
        }

        if (jsonData.success === false) {
          throw new Error(jsonData.status_message || "API request failed");
        }

        if (endpoint.includes("/genre/")) {
          setData(jsonData);
        } else if (jsonData.results) {
          setData(jsonData.results);
        } else {
          setData(jsonData);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint, apiKey]);

  return { data, isLoading, error };
};
