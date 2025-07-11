import clientPromise from "@/utils/mongoDb";
import { fetchTmdbData } from "@/hooks/useTmdb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const {
    titles,
    userId,
    status = "Watch Later",
    typeOverride,
  } = await req.json();

  if (!titles || !userId) {
    return new Response("Missing titles or userId", { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (msg: string) =>
        controller.enqueue(encoder.encode(msg + "\n"));

      const results: any[] = [];

      const client = await clientPromise;
      const db = client.db();
      const watchlist = db.collection("watchlistitems");
      const users = db.collection("users");

      const user = await users.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        send("❌ User not found");
        controller.close();
        return;
      }

      const cleanTitles = titles.map((t: string) =>
        t.replace(/^\d+\.\s*/, "").trim()
      );

      for (let i = 0; i < cleanTitles.length; i++) {
        const title = cleanTitles[i];
        send(`🔍 Searching: ${title}`);

        try {
          const searchRes = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
              title
            )}&api_key=${process.env.TMDB_API_KEY}`
          );

          if (!searchRes.ok) throw new Error("TMDB search failed");

          const searchData = await searchRes.json();
          const bestMatch = searchData.results?.[0];

          if (!bestMatch) {
            send(`⚠️ Not found: ${title}`);
            results.push({ title, status: "not_found" });
            continue;
          }

          const mediaType = typeOverride || bestMatch.media_type;
          const mediaId = bestMatch.id;

          const exists = await watchlist.findOne({
            userId,
            mediaId,
            type: mediaType,
          });

          if (exists) {
            send(`🟡 Already exists: ${title}`);
            results.push({ title, status: "already_exists" });
            continue;
          }

          let details;
          try {
            details = await fetchTmdbData(`/${mediaType}/${mediaId}`);
          } catch {
            send(`❌ TMDB fetch failed: ${title}`);
            results.push({ title, status: "tmdb_fetch_failed" });
            continue;
          }

          await watchlist.insertOne({
            userId,
            mediaId,
            type: mediaType,
            status,
            details,
            createdAt: new Date(),
          });

          send(`✅ Added: ${title}`);
          results.push({ title, status: "success", mediaId });
        } catch (err: any) {
          send(`❌ Error: ${title} - ${err.message}`);
          results.push({ title, status: "error", error: err.message });
        }

        await new Promise((r) => setTimeout(r, 800));
      }

      send(`🎉 Done! ${results.length} items processed.`);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
