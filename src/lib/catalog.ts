import type { ArtId } from "@/components/Specimen";

export type CategoryId = "fish" | "prawns" | "crabs" | "dry";
export type CutKind = "whole" | "steak" | "curry" | "boneless";

export type Cut = {
  name: string;
  kind: CutKind;
  /** Net grams per 1 kg gross, as [low, high]. */
  net: [number, number];
};

export type CatchItem = {
  id: string;
  name: string;
  tamilName: string;
  subtitle: string;
  tag: string;
  boat: string;
  price: number;
  category: CategoryId;
  cuts: Cut[];
  art: ArtId;
  /** Photo path. Items without one show their drawing. */
  image?: string;
};

const ALL_CATEGORIES: { id: CategoryId | "all"; label: string; navLabel?: string }[] = [
  { id: "all", label: "All Catch" },
  { id: "fish", label: "Sea Fish / Kadal Meen", navLabel: "Sea Fish" },
  { id: "prawns", label: "Prawns & Shrimps / Eraa", navLabel: "Prawns & Shrimps" },
  { id: "crabs", label: "Crabs / Nandu", navLabel: "Crabs & Shellfish" },
  { id: "dry", label: "Dry Fish / Karuvadu", navLabel: "Karuvadu / Dry Fish" },
];

export const CUT_FILTERS: { id: CutKind | "all"; label: string }[] = [
  { id: "all", label: "All Cuts" },
  { id: "whole", label: "Whole Fish (Cleaned)" },
  { id: "steak", label: "Steaks / Fry Cut" },
  { id: "curry", label: "Curry Cut" },
  { id: "boneless", label: "Boneless Fillet" },
];

const cut = (name: string, kind: CutKind, low: number, high = low): Cut => ({
  name,
  kind,
  net: [low, high],
});

export const CATALOG: CatchItem[] = [
  {
    id: "vanjaram",
    name: "Vanjaram Fish",
    tamilName: "வஞ்சிரம்",
    subtitle: "Seer Fish / King Fish",
    tag: "KING CATCH",
    boat: "Boat #12 • 4:30 AM",
    price: 1600,
    category: "fish",
    art: "seer",
    image: "/images/menu/vanjaram.png",
    cuts: [
      cut("Steaks / Slices (Fry Cut)", "steak", 750, 800),
      cut("Curry Cut (Head & Tail Separate)", "curry", 720, 750),
      cut("Whole Fish (Cleaned & Gutted)", "whole", 820),
      cut("Boneless Cubes / Fillet", "boneless", 600),
    ],
  },
  {
    id: "sankara",
    name: "Sankara Fish (Big Size)",
    tamilName: "சங்கரா",
    subtitle: "Red Snapper / Meen Kuzhambu Special",
    tag: "BIG SIZE",
    boat: "Kasimedu Dock 3",
    price: 500,
    category: "fish",
    art: "snapper",
    image: "/images/menu/sankara.png",
    cuts: [
      cut("Curry Cut (Traditional)", "curry", 700),
      cut("Cleaned Whole with Diagonal Slits", "whole", 850),
    ],
  },
  {
    id: "aila",
    name: "Aila Fish (Kanakatha)",
    tamilName: "அயிலை",
    subtitle: "Indian Mackerel / Fry & Curry",
    tag: "DAILY PICK",
    boat: "Boat #15 • 4:35 AM",
    price: 450,
    category: "fish",
    art: "mackerel",
    image: "/images/menu/aila.png",
    cuts: [
      cut("Cleaned Whole with Diagonal Slits", "whole", 800),
      cut("Curry Cut (Traditional)", "curry", 720),
    ],
  },
  {
    id: "nethili",
    name: "Nethili Fish",
    tamilName: "நெத்திலி",
    subtitle: "White Anchovies / Crispy Fry Pick",
    tag: "MARINA SHORE",
    boat: "Landing 4:45 AM",
    price: 350,
    category: "fish",
    art: "anchovy",
    image: "/images/menu/nethili.png",
    cuts: [
      cut("Head & Intestines Removed", "whole", 750),
      cut("Whole Uncleaned", "whole", 1000),
    ],
  },
  {
    id: "nakku",
    name: "Nakku Fish",
    tamilName: "நாக்கு மீன்",
    subtitle: "Sole Fish / Tawa Fry",
    tag: "TAWA FRY",
    boat: "Trawler #9",
    price: 750,
    category: "fish",
    art: "sole",
    image: "/images/menu/nakku.png",
    cuts: [
      cut("Cleaned Whole, Skin Removed", "whole", 750),
      cut("Boneless Fillet", "boneless", 550),
    ],
  },
  {
    id: "kadaveral",
    name: "Kadaveral Fish",
    tamilName: "கடல் விரால்",
    subtitle: "Cobia / Firm Steak Fish",
    tag: "STEAK PICK",
    boat: "Boat #7 • 4:20 AM",
    price: 900,
    category: "fish",
    art: "cobia",
    image: "/images/menu/kadaveral.png",
    cuts: [
      cut("Steaks / Slices (Fry Cut)", "steak", 760, 800),
      cut("Curry Cut (Traditional)", "curry", 720),
      cut("Boneless Cubes / Fillet", "boneless", 600),
    ],
  },
  {
    id: "koduva",
    name: "Koduva Fish",
    tamilName: "கொடுவா",
    subtitle: "Barramundi / Asian Sea Bass",
    tag: "GRILL PICK",
    boat: "Boat #21 • 4:40 AM",
    price: 750,
    category: "fish",
    art: "bass",
    image: "/images/menu/koduva.png",
    cuts: [
      cut("Whole Cleaned with Diagonal Slits", "whole", 830),
      cut("Curry Cut (Traditional)", "curry", 720),
      cut("Boneless Cubes / Fillet", "boneless", 600),
    ],
  },
  {
    id: "thengaparai",
    name: "Thengaparai Fish",
    tamilName: "தேங்காய் பாறை",
    subtitle: "Trevally Variety / Kuzhambu Favourite",
    tag: "HOME CURRY",
    boat: "Trawler #11",
    price: 650,
    category: "fish",
    art: "trevally",
    image: "/images/menu/thengaparai.png",
    cuts: [
      cut("Curry Cut (Traditional)", "curry", 700),
      cut("Steaks / Slices (Fry Cut)", "steak", 740),
    ],
  },
  {
    id: "kannadiparai",
    name: "Kannadiparai Fish",
    tamilName: "கண்ணாடி பாறை",
    subtitle: "Trevally Variety / Fry & Curry",
    tag: "FRY PICK",
    boat: "Harbour Jetty #2",
    price: 700,
    category: "fish",
    art: "mirror",
    image: "/images/menu/kannadiparai.png",
    cuts: [
      cut("Curry Cut (Traditional)", "curry", 700),
      cut("Cleaned Whole with Diagonal Slits", "whole", 820),
    ],
  },
  {
    id: "black-vavval",
    name: "Black Vavval Fish",
    tamilName: "கருப்பு வவ்வால்",
    subtitle: "Black Pomfret / Curry & Fry",
    tag: "TAWA FRY SPECIAL",
    boat: "Trawler #18",
    price: 1000,
    category: "fish",
    art: "black-pomfret",
    image: "/images/menu/black-vavval.png",
    cuts: [
      cut("Whole Cleaned with Diagonal Slits", "whole", 820),
      cut("Curry Cut Slices", "curry", 750),
    ],
  },
  {
    id: "chinese-vavval",
    name: "Chinese Vavval Fish",
    tamilName: "சீன வவ்வால்",
    subtitle: "Chinese Pomfret / Silver Catch",
    tag: "SILVER CATCH",
    boat: "Trawler #18",
    price: 1300,
    category: "fish",
    art: "chinese-pomfret",
    image: "/images/menu/chinese-vavval.png",
    cuts: [
      cut("Whole Cleaned with Diagonal Slits", "whole", 820),
      cut("Curry Cut Slices", "curry", 750),
    ],
  },
  {
    id: "squid",
    name: "Squid (Medium Size)",
    tamilName: "கணவா",
    subtitle: "Kanava / Squid Tubes & Rings",
    tag: "MEDIUM SIZE",
    boat: "Wharf Dock #1",
    price: 450,
    category: "fish",
    art: "squid",
    image: "/images/menu/squid.png",
    cuts: [
      cut("Cleaned Rings (Fry Ready)", "steak", 580),
      cut("Whole Tubes Cleaned", "whole", 650),
    ],
  },
  {
    id: "prawn",
    name: "Prawn (Medium Size)",
    tamilName: "இறால்",
    subtitle: "Eraa / Curry & Thokku",
    tag: "MEDIUM SIZE",
    boat: "Deep Sea 4:00 AM",
    price: 400,
    category: "prawns",
    art: "prawn",
    image: "/images/menu/prawn.png",
    cuts: [
      cut("Peeled & Deveined (Tail-on)", "boneless", 600),
      cut("Whole Raw with Shell", "whole", 1000),
    ],
  },
  {
    id: "crab",
    name: "Crab (Medium Size)",
    tamilName: "நண்டு",
    subtitle: "Nandu / Rasam & Masala",
    tag: "MEDIUM SIZE",
    boat: "Live Catch Landing",
    price: 500,
    category: "crabs",
    art: "crab",
    image: "/images/menu/crab.png",
    cuts: [
      cut("Cleaned & Halved (Shell Intact)", "curry", 700),
      cut("Whole Live Cleaned", "whole", 850),
    ],
  },
];

/** Only categories with something on the menu appear in tabs and navigation. */
export const CATEGORIES = ALL_CATEGORIES.filter(
  (c) => c.id === "all" || CATALOG.some((item) => item.category === c.id),
);

export const getItem = (id: string) => CATALOG.find((item) => item.id === id);

export const rupees = (amount: number) => `₹${Math.round(amount).toLocaleString("en-IN")}`;

const grams = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(2).replace(/\.?0+$/, "")} kg` : `${Math.round(value)}g`;

/** Net weight label for a cut at a given gross weight. */
export function netYield(cutOption: Cut, grossKg: number) {
  const [low, high] = cutOption.net;
  if (low === high) return low === 1000 ? grams(low * grossKg) : `~${grams(low * grossKg)}`;
  return `~${grams(low * grossKg)} - ${grams(high * grossKg)}`;
}

export const kg = (weight: number) => `${weight.toFixed(1)} kg`;

/** Search across English, Tamil and subtitle text. */
export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CATALOG.filter((item) =>
    [item.name, item.tamilName, item.subtitle].some((text) => text.toLowerCase().includes(q)),
  ).slice(0, 6);
}
