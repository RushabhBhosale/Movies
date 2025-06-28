export async function fetchTmdbData(
  endpoint: string,
  retries: number = 3
): Promise<any> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL;

  if (!endpoint || !apiKey || !baseUrl) {
    throw new Error("Missing endpoint, API key, or base URL");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${baseUrl}${endpoint}${separator}api_key=${apiKey}`;

  let lastError: any = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (attempt > 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 2), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        console.log(
          `Retrying TMDB request (attempt ${attempt}/${retries}) after ${delay}ms delay`
        );
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "MovieApp/1.0",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        console.error("TMDB response text:", errText);

        if (response.status === 429) {
          throw new Error(`Rate limit exceeded. Status: ${response.status}`);
        }
        if (response.status >= 500) {
          throw new Error(`Server error. Status: ${response.status}`);
        }
        if (response.status === 401) {
          throw new Error(`Authentication failed. Check your API key.`);
        }
        throw new Error(
          `HTTP error ${response.status} - ${response.statusText}`
        );
      }

      const text = await response.text();
      if (!text) throw new Error("Empty response body");

      let data;
      try {
        data = JSON.parse(text);
      } catch (err: any) {
        console.error("Invalid JSON:", err, "\nRaw response:", text);
        throw new Error("Failed to parse JSON");
      }

      if (data.success === false) {
        throw new Error(data.status_message || "API request failed");
      }

      if (attempt > 1) {
        console.log(`TMDB request succeeded on attempt ${attempt}`);
      }

      return data.results || data;
    } catch (error: any) {
      lastError = error;

      console.error("TMDB API Error Details:", {
        endpoint,
        attempt: `${attempt}/${retries}`,
        error: error.message,
        code: error.code,
        cause: error.cause?.message || error.cause,
        timestamp: new Date().toISOString(),
      });

      const isRetryableError =
        error.message?.includes("fetch failed") ||
        error.code === "ECONNRESET" ||
        error.code === "ENOTFOUND" ||
        error.code === "ETIMEDOUT" ||
        error.name === "AbortError" ||
        (error.message?.includes("HTTP error") && error.message?.includes("5"));

      if (
        error.message?.includes("Authentication failed") ||
        error.message?.includes("HTTP error 4")
      ) {
        throw error;
      }

      if (attempt === retries || !isRetryableError) {
        break;
      }

      console.log(`Retryable error encountered, will retry...`);
    }
  }

  console.error(`All ${retries} attempts failed for endpoint: ${endpoint}`);

  if (lastError?.name === "AbortError") {
    throw new Error(
      "Request timed out after multiple attempts. Please try again later."
    );
  }

  if (
    lastError?.code === "ECONNRESET" ||
    lastError?.message?.includes("fetch failed")
  ) {
    throw new Error(
      "Connection to movie database failed. Please check your internet connection and try again."
    );
  }

  if (lastError?.code === "ENOTFOUND") {
    throw new Error(
      "Unable to reach movie database servers. Please try again later."
    );
  }

  throw new Error(
    "Movie database is temporarily unavailable. Please try again later."
  );
}
