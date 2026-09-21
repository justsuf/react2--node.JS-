import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export type Spot = {
  id: number;
  naam: string;
  soort_eten: string;
  locatie: string;
  omschrijving: string;
  afbeelding_url: string;
  tiktok_url: string | null;
  google_maps_url: string | null;
};

const dataDirectory = path.join(process.cwd(), "data");
fs.mkdirSync(dataDirectory, { recursive: true });

const db = new Database(path.join(dataDirectory, "streetfoodspotter.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naam TEXT NOT NULL,
    soort_eten TEXT NOT NULL,
    locatie TEXT NOT NULL,
    omschrijving TEXT NOT NULL,
    afbeelding_url TEXT NOT NULL,
    tiktok_url TEXT,
    google_maps_url TEXT
  )
`);

const spotCount = db.prepare("SELECT COUNT(*) AS count FROM spots").get() as { count: number };

// Populate starter data only when this is a new database.
if (spotCount.count === 0) {
  const seedSpot = db.prepare(`
    INSERT INTO spots (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
    VALUES (@naam, @soort_eten, @locatie, @omschrijving, @afbeelding_url, @tiktok_url, @google_maps_url)
  `);
  const seedSpots: Omit<Spot, "id">[] = [
    { naam: "The Burger Bus", soort_eten: "Burgers", locatie: "Jansplein 1, 6811 GD Arnhem", omschrijving: "Smashed burgers met huisgemaakte sauzen en krokante friet.", afbeelding_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80", tiktok_url: null, google_maps_url: "https://www.google.com/maps/search/?api=1&query=Jansplein+1%2C+6811+GD+Arnhem" },
    { naam: "Sushi on Wheels", soort_eten: "Sushi", locatie: "Daalseweg 262, 6523 AR Nijmegen", omschrijving: "Verse handrolls en pokebowls, direct aan de kraam bereid.", afbeelding_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80", tiktok_url: null, google_maps_url: "https://www.google.com/maps/search/?api=1&query=Daalseweg+262%2C+6523+AR+Nijmegen" },
    { naam: "Vegan Vibes", soort_eten: "Vegan", locatie: "Kanaalstraat 199, 3531 CD Utrecht", omschrijving: "Kleurrijke vegan bowls met geroosterde groenten en tahin.", afbeelding_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80", tiktok_url: null, google_maps_url: "https://www.google.com/maps/search/?api=1&query=Kanaalstraat+199%2C+3531+CD+Utrecht" },
    { naam: "Bubble Bliss", soort_eten: "Bubble tea", locatie: "Langestraat 85, 3811 AC Amersfoort", omschrijving: "Romige milk tea, fruitige iced tea en chewy tapioca parels.", afbeelding_url: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=1000&q=80", tiktok_url: null, google_maps_url: "https://www.google.com/maps/search/?api=1&query=Langestraat+85%2C+3811+AC+Amersfoort" },
    { naam: "Taco Loco", soort_eten: "Mexicaans", locatie: "Diezerstraat 51, 8011 RD Zwolle", omschrijving: "Zachte maistaco's met langzaam gegaard vlees en frisse salsa.", afbeelding_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80", tiktok_url: null, google_maps_url: "https://www.google.com/maps/search/?api=1&query=Diezerstraat+51%2C+8011+RD+Zwolle" },
    { naam: "Frites Atelier", soort_eten: "Friet", locatie: "Brink 16, 7411 BR Deventer", omschrijving: "Dikke, goudbruine frieten met verrassende toppings.", afbeelding_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80", tiktok_url: null, google_maps_url: "https://www.google.com/maps/search/?api=1&query=Brink+16%2C+7411+BR+Deventer" },
  ];
  const insertSeeds = db.transaction(() => seedSpots.forEach((spot) => seedSpot.run(spot)));
  insertSeeds();
}

// Keep the locations in databases created with earlier seed data up to date.
const specificSeedLocations = [
  ["The Burger Bus", "Jansplein 1, 6811 GD Arnhem", "https://www.google.com/maps/search/?api=1&query=Jansplein+1%2C+6811+GD+Arnhem"],
  ["Sushi on Wheels", "Daalseweg 262, 6523 AR Nijmegen", "https://www.google.com/maps/search/?api=1&query=Daalseweg+262%2C+6523+AR+Nijmegen"],
  ["Vegan Vibes", "Kanaalstraat 199, 3531 CD Utrecht", "https://www.google.com/maps/search/?api=1&query=Kanaalstraat+199%2C+3531+CD+Utrecht"],
  ["Bubble Bliss", "Langestraat 85, 3811 AC Amersfoort", "https://www.google.com/maps/search/?api=1&query=Langestraat+85%2C+3811+AC+Amersfoort"],
  ["Taco Loco", "Diezerstraat 51, 8011 RD Zwolle", "https://www.google.com/maps/search/?api=1&query=Diezerstraat+51%2C+8011+RD+Zwolle"],
  ["Frites Atelier", "Brink 16, 7411 BR Deventer", "https://www.google.com/maps/search/?api=1&query=Brink+16%2C+7411+BR+Deventer"],
];

const updateSeedLocation = db.prepare(
  "UPDATE spots SET locatie = ?, google_maps_url = ? WHERE naam = ?"
);
specificSeedLocations.forEach(([naam, locatie, googleMapsUrl]) => {
  updateSeedLocation.run(locatie, googleMapsUrl, naam);
});

export function getSpots(query = ""): Spot[] {
  const searchTerm = `%${query.trim()}%`;
  return db.prepare(`
    SELECT * FROM spots
    WHERE naam LIKE ? OR locatie LIKE ?
    ORDER BY id DESC
  `).all(searchTerm, searchTerm) as Spot[];
}

export function getSpot(id: number): Spot | undefined {
  return db.prepare("SELECT * FROM spots WHERE id = ?").get(id) as Spot | undefined;
}

export function createSpot(spot: Omit<Spot, "id">): number {
  const result = db.prepare(`
    INSERT INTO spots (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
    VALUES (@naam, @soort_eten, @locatie, @omschrijving, @afbeelding_url, @tiktok_url, @google_maps_url)
  `).run(spot);
  return Number(result.lastInsertRowid);
}
