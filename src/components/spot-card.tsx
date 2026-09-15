import Link from "next/link";
import Image from "next/image";
import type { Spot } from "@/lib/db";
import { extractVideoId } from "@/lib/tiktok";

export function SpotCard({ spot }: { spot: Spot }) {
  const videoId = spot.tiktok_url ? extractVideoId(spot.tiktok_url) : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transform transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl">
      <Image src={spot.afbeelding_url} alt={spot.naam} width={1000} height={650} unoptimized className="h-48 w-full object-cover" />
      <div className="p-5">
        <p className="text-sm font-bold text-orange-600">{spot.soort_eten}</p>
        <h2 className="mt-1 text-xl font-black">{spot.naam}</h2>
        <p className="mt-2 text-sm text-stone-600">{spot.locatie}</p>
        <div className="mt-4 overflow-hidden rounded-xl bg-stone-100">
          {videoId ? (
            <iframe
              src={`https://www.tiktok.com/embed/${videoId}`}
              title={`TikTok van ${spot.naam}`}
              className="aspect-[9/16] w-full"
              allow="autoplay; encrypted-media"
            />
          ) : spot.google_maps_url ? (
            <a href={spot.google_maps_url} target="_blank" rel="noreferrer" className="block p-4 text-sm font-bold text-blue-700 underline transition hover:bg-blue-50">
              Bekijk op Google Maps
            </a>
          ) : (
            <p className="p-4 text-sm text-stone-500">Geen media beschikbaar</p>
          )}
        </div>
        <Link href={`/spots/${spot.id}`} className="mt-5 inline-block rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600">
          Meer info
        </Link>
      </div>
    </article>
  );
}
