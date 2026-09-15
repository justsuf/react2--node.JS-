import Link from "next/link";
import { SpotCard } from "@/components/spot-card";
import { SpotSearch } from "@/components/spot-search";
import { getSpots } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SpotsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const spots = getSpots(q);

  return (
    <main className="flex-1 bg-stone-100 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold tracking-[0.2em] text-orange-600">ONTDEK</p>
        <div className="mt-2 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Alle streetfoodspots</h1>
            <p className="mt-2 text-stone-600">Zoek een nieuwe smaak in jouw buurt.</p>
          </div>
          <Link href="/add-spot" className="rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-stone-950 transition hover:scale-105 hover:bg-orange-400">
            Voeg jouw spot toe
          </Link>
        </div>
        <div className="mt-8">
          <SpotSearch />
        </div>
        <p className="mt-4 text-sm text-stone-600">
          {spots.length} {spots.length === 1 ? "spot gevonden" : "spots gevonden"}
          {q ? ` voor "${q}"` : ""}.
        </p>
        {spots.length > 0 ? (
          <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
          </section>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <h2 className="text-xl font-black">Geen spots gevonden</h2>
            <p className="mt-2 text-stone-600">Probeer een andere naam of locatie.</p>
          </div>
        )}
      </div>
    </main>
  );
}
