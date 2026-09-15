import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSpot } from "@/lib/db";
import { extractVideoId } from "@/lib/tiktok";

export const dynamic = "force-dynamic";

export default async function SpotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spot = getSpot(Number(id));

  if (!spot) notFound();

  const videoId = spot.tiktok_url ? extractVideoId(spot.tiktok_url) : null;

  return (
    <main className="flex-1 bg-stone-100 px-5 py-10">
      <article className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          <Image src={spot.afbeelding_url} alt={spot.naam} width={1200} height={1000} unoptimized className="h-80 w-full object-cover lg:h-full" />
          <div className="p-7 sm:p-10">
            <Link
              href="/spots"
              className="inline-flex items-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-orange-600 focus:outline-2 focus:outline-offset-2 focus:outline-orange-500"
            >
              &larr; Terug naar alle spots
            </Link>
            <p className="mt-7 text-sm font-bold tracking-[0.18em] text-orange-600">{spot.soort_eten}</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">{spot.naam}</h1>
            <p className="mt-3 font-bold text-stone-600">{spot.locatie}</p>
            <p className="mt-6 leading-7 text-stone-700">{spot.omschrijving}</p>
            <div className="mt-8 overflow-hidden rounded-2xl bg-stone-100">
              {videoId ? (
                <iframe
                  src={`https://www.tiktok.com/embed/${videoId}`}
                  title={`TikTok van ${spot.naam}`}
                  className="aspect-[9/16] w-full"
                  allow="autoplay; encrypted-media"
                />
              ) : spot.google_maps_url ? (
                <a href={spot.google_maps_url} target="_blank" rel="noreferrer" className="block rounded-2xl bg-blue-600 px-5 py-4 text-center font-bold text-white transition hover:bg-blue-700">
                  Open locatie in Google Maps
                </a>
              ) : (
                <p className="p-5 text-stone-500">Geen media beschikbaar</p>
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
