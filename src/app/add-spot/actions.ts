"use server";

import { redirect } from "next/navigation";
import { createSpot } from "@/lib/db";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function addSpot(formData: FormData) {
  const naam = text(formData, "naam");
  const soort_eten = text(formData, "soort_eten");
  const locatie = text(formData, "locatie");
  const omschrijving = text(formData, "omschrijving");
  const afbeelding_url = text(formData, "afbeelding_url");
  const tiktok_url = text(formData, "tiktok_url");
  const google_maps_url = text(formData, "google_maps_url");

  const requiredValues = [naam, soort_eten, locatie, omschrijving, afbeelding_url];
  if (requiredValues.some((value) => !value) || (!tiktok_url && !google_maps_url)) {
    redirect("/add-spot?error=Vul+alle+verplichte+velden+in+en+voeg+minstens+een+media-link+toe.");
  }
  if (![afbeelding_url, tiktok_url, google_maps_url].filter(Boolean).every(isHttpUrl)) {
    redirect("/add-spot?error=Gebruik+geldige+http(s)-links+voor+afbeelding+en+media.");
  }

  const id = createSpot({
    naam,
    soort_eten,
    locatie,
    omschrijving,
    afbeelding_url,
    tiktok_url: tiktok_url || null,
    google_maps_url: google_maps_url || null,
  });
  redirect(`/spots/${id}`);
}
