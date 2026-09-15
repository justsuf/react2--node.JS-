"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SpotSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.replace(`/spots${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, router, searchParams]);

  return (
    <label className="block max-w-xl">
      <span className="sr-only">Zoek op naam of locatie</span>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Zoek op naam of locatie..."
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
      />
    </label>
  );
}
