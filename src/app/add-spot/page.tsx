import { addSpot } from "./actions";
import Link from "next/link";

export default async function AddSpotPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex-1 bg-stone-100 px-5 py-12">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        <Link
          href="/spots"
          className="inline-flex items-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-orange-600 focus:outline-2 focus:outline-offset-2 focus:outline-orange-500"
        >
          &larr; Terug naar spots
        </Link>
        <p className="text-sm font-bold tracking-[0.2em] text-orange-600">DEEL JE FAVORIET</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Voeg een spot toe</h1>
        <p className="mt-3 text-stone-600">Help andere foodliefhebbers met jouw beste ontdekking.</p>
        {error && <p className="mt-6 rounded-xl bg-red-50 p-4 font-medium text-red-700">{error}</p>}
        <form action={addSpot} className="mt-8 grid gap-5">
          <Field label="Naam" name="naam" placeholder="Bijvoorbeeld: The Burger Bus" />
          <Field label="Soort eten" name="soort_eten" placeholder="Bijvoorbeeld: burgers, sushi of vegan" />
          <Field label="Locatie" name="locatie" placeholder="Bijvoorbeeld: Arnhem Centrum" />
          <label className="grid gap-2 font-bold">
            Omschrijving
            <textarea name="omschrijving" required rows={4} placeholder="Wat maakt deze spot bijzonder?" className="rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
          </label>
          <Field label="Afbeelding-URL" name="afbeelding_url" type="url" placeholder="https://..." />
          <Field label="TikTok-URL (optioneel)" name="tiktok_url" type="url" placeholder="https://www.tiktok.com/@.../video/..." required={false} />
          <Field label="Google Maps-URL (optioneel)" name="google_maps_url" type="url" placeholder="https://maps.google.com/..." required={false} />
          <p className="text-sm text-stone-500">Vul minimaal een TikTok-URL of Google Maps-URL in.</p>
          <button type="submit" className="mt-2 rounded-full bg-orange-500 px-6 py-3.5 font-bold text-stone-950 transition hover:scale-[1.02] hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-500">
            Spot opslaan
          </button>
        </form>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 font-bold">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="rounded-xl border border-stone-300 px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
    </label>
  );
}
