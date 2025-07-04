const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_BASE_URL;

export async function fetchTmdbData(endpoint: any, retries = 2) {
  if (!endpoint || !apiKey || !baseUrl) {
    throw new Error("Missing endpoint, API key, or base URL");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${baseUrl}${endpoint}${separator}api_key=${apiKey}`;
  let lastError = null;

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

        if (response.status === 429) throw new Error("Rate limit exceeded");
        if (response.status >= 500) throw new Error("Server error");
        if (response.status === 401) throw new Error("Invalid API key");

        throw new Error(
          `HTTP error ${response.status} - ${response.statusText}`
        );
      }

      const text = await response.text();
      if (!text) throw new Error("Empty response body");

      const data = JSON.parse(text);
      if (data.success === false)
        throw new Error(data.status_message || "API request failed");

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

      const isRetryable =
        error.message?.includes("fetch failed") ||
        error.code === "ECONNRESET" ||
        error.code === "ENOTFOUND" ||
        error.name === "AbortError" ||
        (error.message?.includes("HTTP error") && error.message?.includes("5"));

      if (
        error.message?.includes("Authentication failed") ||
        error.message?.includes("HTTP error 4") ||
        attempt === retries ||
        !isRetryable
      )
        break;
    }
  }

  throw new Error(lastError?.message || "TMDB request failed");
}

export async function getMediaDetails(mediaId: any, type: any) {
  try {
    const data = await fetchTmdbData(`/${type}/${mediaId}?language=en-US`);

    let runtime = 0;
    if (type === "movie") {
      runtime = data.runtime || 0;
    } else {
      const epTimes = data.episode_run_time || [];
      const episodes = data.number_of_episodes || 0;
      let avgTime = epTimes.length
        ? epTimes.reduce((a: any, b: any) => a + b, 0) / epTimes.length
        : 45;
      runtime = avgTime * episodes;
    }

    return {
      runtime,
      genres: data.genres || [],
      vote_average: data.vote_average || 0,
    };
  } catch (err) {
    console.error("getMediaDetails error:", err);
    return { runtime: 0, genres: [], vote_average: 0 };
  }
}

export async function getDetailedTVRuntime(mediaId: any) {
  try {
    const mainData = await fetchTmdbData(`/tv/${mediaId}?language=en-US`);
    let totalRuntime = 0;
    const seasons = mainData.number_of_seasons || 0;

    const seasonData = await Promise.all(
      Array.from({ length: seasons }, (_, i) =>
        fetchTmdbData(`/tv/${mediaId}/season/${i + 1}?language=en-US`).catch(
          (err) => {
            console.warn(`Season ${i + 1} failed`, err);
            return null;
          }
        )
      )
    );

    for (const season of seasonData) {
      if (season?.episodes?.length) {
        for (const ep of season.episodes) {
          totalRuntime += ep.runtime || 0;
        }
      }
    }

    if (totalRuntime === 0) {
      const epTimes = mainData.episode_run_time || [];
      const avg = epTimes.length
        ? epTimes.reduce((a: any, b: any) => a + b, 0) / epTimes.length
        : 45;
      totalRuntime = avg * (mainData.number_of_episodes || 0);
    }

    return {
      runtime: totalRuntime,
      genres: mainData.genres || [],
      vote_average: mainData.vote_average || 0,
    };
  } catch (err) {
    console.error("getDetailedTVRuntime error:", err);
    return getMediaDetails(mediaId, "tv");
  }
}
