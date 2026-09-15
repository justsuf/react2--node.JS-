import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-black tracking-tight text-stone-950">
          Streetfood<span className="text-orange-600">Spotter</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-bold sm:gap-6">
          <Link href="/spots" className="transition hover:text-orange-600">
            Spots
          </Link>
          <Link
            href="/add-spot"
            className="rounded-full bg-stone-950 px-4 py-2 text-white transition hover:scale-105 hover:bg-orange-600"
          >
            Spot toevoegen
          </Link>
        </div>
      </nav>
    </header>
  );
}
