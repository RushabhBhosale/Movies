import { fetchTmdbData } from "@/hooks/useTmdb";
import CreditsClient from "./CreditsClient";

export default async function CreditsPage({
  params,
}: {
  params: { id: string };
}) {
  const actorId = params.id;

  const person = await fetchTmdbData(`/person/${actorId}`);
  const movieCredits = await fetchTmdbData(`/person/${actorId}/movie_credits`);
  const tvCredits = await fetchTmdbData(`/person/${actorId}/tv_credits`);

  return (
    <CreditsClient
      person={person}
      movieCredits={movieCredits.cast}
      tvCredits={tvCredits.cast}
    />
  );
}
