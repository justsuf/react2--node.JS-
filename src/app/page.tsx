import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center bg-stone-950 px-6 py-16 text-white">
      <section className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-bold tracking-[0.24em] text-orange-400">
            STREETFOODSPOTTER
          </p>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-balance sm:text-7xl">
            Vind jouw volgende favoriete hap.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-stone-300">
            Ontdek bijzondere foodtrucks, kraampjes en kleine keukens bij jou in de buurt.
            Bewaar inspiratie en deel jouw beste streetfoodspot.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/spots"
              className="rounded-full bg-orange-500 px-7 py-3.5 text-center font-bold text-stone-950 transition duration-300 hover:scale-105 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-300"
            >
              Bekijk spots
            </Link>
            <Link
              href="/add-spot"
              className="rounded-full border border-stone-600 px-7 py-3.5 text-center font-bold transition hover:border-stone-300 hover:bg-stone-900 focus:outline-2 focus:outline-offset-2 focus:outline-orange-300"
            >
              Voeg een spot toe
            </Link>
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-3xl border border-stone-700 bg-[linear-gradient(135deg,#ea580c_0%,#fbbf24_45%,#292524_46%,#292524_100%)] shadow-2xl sm:min-h-[26.25rem]">
          <div className="absolute right-8 top-8 rounded-full bg-stone-950 px-4 py-2 text-sm font-bold">
            Vers uit de stad
          </div>
          <div className="absolute bottom-8 left-8 max-w-64 rounded-2xl bg-white p-5 text-stone-950 shadow-xl">
            <p className="text-sm font-bold text-orange-600">Van locals, voor locals</p>
            <p className="mt-1 text-2xl font-black">Eten dat je moet proeven.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
