import type { ArtId } from "@/components/Specimen";

export type CategoryId = "fish" | "prawns" | "crabs" | "squid" | "boneless";
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
  { id: "fish", label: "Sea Fish / கடல் மீன்", navLabel: "Sea Fish" },
  { id: "prawns", label: "Prawns & Shrimps / இறால்", navLabel: "Prawns & Shrimps" },
  { id: "crabs", label: "Crab / நண்டு", navLabel: "Crab" },
  { id: "squid", label: "Squid / கணவா", navLabel: "Squid" },
  { id: "boneless", label: "Boneless Fillet / முள்ளில்லா மீன்", navLabel: "Boneless Fillet" },
];

export const CUT_FILTERS: { id: CutKind | "all"; label: string }[] = [
  { id: "all", label: "All Cuts" },
  { id: "whole", label: "Whole Fish (Cleaned)" },
  { id: "steak", label: "Steaks / Fry Cut" },
  { id: "curry", label: "Curry Cut" },
  { id: "boneless", label: "Boneless Fillet" },
];

/** Net meat from 1 kg gross after cleaning and cutting, the same for every cut. Boneless items are sold as ready meat. */
const NET = {
  fish: [700, 750],
  prawn: [450, 500],
  squid: [600, 650],
  crab: [550, 650],
  meat: [1000, 1000],
} satisfies Record<string, [number, number]>;

const cut = (name: string, kind: CutKind, net: [number, number]): Cut => ({ name, kind, net });

export const CATALOG: CatchItem[] = [
  {
    id: "sankara",
    name: "Red Snapper (Sankara)",
    tamilName: "சங்கரா",
    subtitle: "Sankara / Meen Kuzhambu Special",
    tag: "KUZHAMBU PICK",
    boat: "Kasimedu Market",
    price: 450,
    category: "fish",
    art: "snapper",
    image: "/images/menu/sankara.png",
    cuts: [
      cut("Curry Cut (Traditional)", "curry", NET.fish),
      cut("Steaks / Slices (Fry Cut)", "steak", NET.fish),
      cut("Cleaned Whole with Diagonal Slits", "whole", NET.fish),
    ],
  },
  {
    id: "mathi",
    name: "Mathi Fish",
    tamilName: "மத்தி",
    subtitle: "Sardine / Everyday Fry & Curry",
    tag: "DAILY PICK",
    boat: "Kasimedu Market",
    price: 300,
    category: "fish",
    art: "anchovy",
    image: "/images/menu/mathi.jpg",
    cuts: [
      cut("Cleaned Whole with Diagonal Slits", "whole", NET.fish),
      cut("Curry Cut (Traditional)", "curry", NET.fish),
    ],
  },
  {
    id: "kanakathi",
    name: "Kanakathi Fish",
    tamilName: "கானாங்கெளுத்தி",
    subtitle: "Indian Mackerel / Fry & Curry",
    tag: "DAILY PICK",
    boat: "Kasimedu Market",
    price: 350,
    category: "fish",
    art: "mackerel",
    image: "/images/menu/kanakathi.png",
    cuts: [
      cut("Cleaned Whole with Diagonal Slits", "whole", NET.fish),
      cut("Curry Cut (Traditional)", "curry", NET.fish),
    ],
  },
  {
    id: "nethili",
    name: "Nethili Fish",
    tamilName: "நெத்திலி",
    subtitle: "White Anchovies / Crispy Fry Pick",
    tag: "CRISPY FRY",
    boat: "Kasimedu Market",
    price: 350,
    category: "fish",
    art: "anchovy",
    image: "/images/menu/nethili.jpg",
    cuts: [
      cut("Head & Intestines Removed", "whole", NET.fish),
    ],
  },
  {
    id: "parai",
    name: "Thenga Parai Fish",
    tamilName: "தேங்காய் பாறை",
    subtitle: "Parai / Trevally Kuzhambu Favourite",
    tag: "HOME CURRY",
    boat: "Kasimedu Market",
    price: 650,
    category: "fish",
    art: "trevally",
    image: "/images/menu/parai.png",
    cuts: [
      cut("Curry Cut (Traditional)", "curry", NET.fish),
      cut("Steaks / Slices (Fry Cut)", "steak", NET.fish),
      cut("Cleaned Whole with Diagonal Slits", "whole", NET.fish),
    ],
  },
  {
    id: "vanjaram",
    name: "Vanjaram Fish Slice",
    tamilName: "வஞ்சிரம்",
    subtitle: "Seer Fish / King Fish",
    tag: "KING CATCH",
    boat: "Kasimedu Market",
    price: 1800,
    category: "fish",
    art: "seer",
    image: "/images/menu/vanjaram.png",
    cuts: [
      cut("Steaks / Slices (Fry Cut)", "steak", NET.fish),
      cut("Curry Cut (Head & Tail Separate)", "curry", NET.fish),
    ],
  },
  {
    id: "koduva",
    name: "Koduva Fish",
    tamilName: "கொடுவா",
    subtitle: "Barramundi / Asian Sea Bass",
    tag: "GRILL PICK",
    boat: "Kasimedu Market",
    price: 750,
    category: "fish",
    art: "bass",
    image: "/images/menu/koduva.jpg",
    cuts: [
      cut("Steaks / Slices (Fry Cut)", "steak", NET.fish),
      cut("Curry Cut (Traditional)", "curry", NET.fish),
      cut("Cleaned Whole with Diagonal Slits", "whole", NET.fish),
    ],
  },
  {
    id: "black-vavval",
    name: "Black Vavval Fish",
    tamilName: "கருப்பு வவ்வால்",
    subtitle: "Black Pomfret / Curry & Fry",
    tag: "TAWA FRY",
    boat: "Kasimedu Market",
    price: 1000,
    category: "fish",
    art: "black-pomfret",
    image: "/images/menu/black-vavval.png",
    cuts: [
      cut("Cleaned Whole with Diagonal Slits", "whole", NET.fish),
      cut("Curry Cut Slices", "curry", NET.fish),
    ],
  },
  {
    id: "white-vavval",
    name: "White Vavval Fish",
    tamilName: "வெள்ளை வவ்வால்",
    subtitle: "White Pomfret / Tawa Fry Special",
    tag: "TAWA FRY",
    boat: "Kasimedu Market",
    price: 1200,
    category: "fish",
    art: "chinese-pomfret",
    image: "/images/menu/white-vavval.png",
    cuts: [
      cut("Cleaned Whole with Diagonal Slits", "whole", NET.fish),
      cut("Curry Cut Slices", "curry", NET.fish),
    ],
  },
  {
    id: "sheela",
    name: "Sheela Fish",
    tamilName: "சீலா",
    subtitle: "Barracuda / Firm Steak Fish",
    tag: "STEAK PICK",
    boat: "Kasimedu Market",
    price: 650,
    category: "fish",
    art: "barracuda",
    image: "/images/menu/sheela.jpg",
    cuts: [
      cut("Steaks / Slices (Fry Cut)", "steak", NET.fish),
      cut("Curry Cut (Traditional)", "curry", NET.fish),
    ],
  },
  {
    id: "parala",
    name: "Parala Fish",
    tamilName: "பரலா",
    subtitle: "Whole Fish / Steaks & Curry",
    tag: "WHOLE FISH",
    boat: "Kasimedu Market",
    price: 450,
    category: "fish",
    art: "tuna",
    image: "/images/menu/parala.jpg",
    cuts: [
      cut("Steaks / Slices (Fry Cut)", "steak", NET.fish),
      cut("Curry Cut (Traditional)", "curry", NET.fish),
    ],
  },
  {
    id: "thuna",
    name: "Thuna Fish",
    tamilName: "சூரை",
    subtitle: "Tuna / Whole Fish",
    tag: "WHOLE FISH",
    boat: "Kasimedu Market",
    price: 500,
    category: "fish",
    art: "tuna",
    image: "/images/menu/thuna.jpg",
    cuts: [
      cut("Steaks / Slices (Fry Cut)", "steak", NET.fish),
      cut("Curry Cut (Traditional)", "curry", NET.fish),
    ],
  },
  {
    id: "prawn-50-55",
    name: "Prawn (50–55 count)",
    tamilName: "இறால்",
    subtitle: "Large / about 50–55 prawns per kg",
    tag: "LARGE",
    boat: "Kasimedu Market",
    price: 500,
    category: "prawns",
    art: "prawn",
    image: "/images/menu/prawn.png",
    cuts: [
      cut("Peeled & Deveined", "boneless", NET.prawn),
      cut("Cleaned with Shell On", "whole", NET.prawn),
    ],
  },
  {
    id: "prawn-60-70",
    name: "Prawn (60–70 count)",
    tamilName: "இறால்",
    subtitle: "Medium / about 60–70 prawns per kg",
    tag: "MEDIUM",
    boat: "Kasimedu Market",
    price: 450,
    category: "prawns",
    art: "prawn",
    image: "/images/menu/prawn.png",
    cuts: [
      cut("Peeled & Deveined", "boneless", NET.prawn),
      cut("Cleaned with Shell On", "whole", NET.prawn),
    ],
  },
  {
    id: "prawn-80-90",
    name: "Prawn (80–90 count)",
    tamilName: "இறால்",
    subtitle: "Small / about 80–90 prawns per kg",
    tag: "SMALL",
    boat: "Kasimedu Market",
    price: 400,
    category: "prawns",
    art: "prawn",
    image: "/images/menu/prawn.png",
    cuts: [
      cut("Peeled & Deveined", "boneless", NET.prawn),
      cut("Cleaned with Shell On", "whole", NET.prawn),
    ],
  },
  {
    id: "prawn-100-110",
    name: "Prawn (100–110 count)",
    tamilName: "இறால்",
    subtitle: "Baby / about 100–110 prawns per kg",
    tag: "BABY",
    boat: "Kasimedu Market",
    price: 350,
    category: "prawns",
    art: "prawn",
    image: "/images/menu/prawn.png",
    cuts: [
      cut("Peeled & Deveined", "boneless", NET.prawn),
      cut("Cleaned with Shell On", "whole", NET.prawn),
    ],
  },
  {
    id: "squid",
    name: "Squid (Kadamba)",
    tamilName: "கணவா",
    subtitle: "Kanava / Squid Tubes & Rings",
    tag: "PREMIUM",
    boat: "Kasimedu Market",
    price: 450,
    category: "squid",
    art: "squid",
    image: "/images/menu/squid.png",
    cuts: [
      cut("Cleaned Rings (Fry Ready)", "steak", NET.squid),
      cut("Whole Tubes Cleaned", "whole", NET.squid),
    ],
  },
  {
    id: "sea-blue-crab",
    name: "Sea Blue Crab",
    tamilName: "நீல நண்டு",
    subtitle: "Blue Swimmer Crab / Rasam & Masala",
    tag: "PREMIUM",
    boat: "Kasimedu Market",
    price: 550,
    category: "crabs",
    art: "crab",
    image: "/images/menu/crab.png",
    cuts: [
      cut("Cleaned & Halved (Shell Intact)", "curry", NET.crab),
      cut("Whole Cleaned", "whole", NET.crab),
    ],
  },
  {
    id: "sea-crab",
    name: "Sea Crab",
    tamilName: "கடல் நண்டு",
    subtitle: "Kadal Nandu / Masala & Soup",
    tag: "PREMIUM",
    boat: "Kasimedu Market",
    price: 450,
    category: "crabs",
    art: "sea-crab",
    image: "/images/menu/sea-crab.jpg",
    cuts: [
      cut("Cleaned & Halved (Shell Intact)", "curry", NET.crab),
      cut("Whole Cleaned", "whole", NET.crab),
    ],
  },
  {
    id: "live-mud-crab",
    name: "Live Mud Crab",
    tamilName: "சேற்று நண்டு",
    subtitle: "Sethu Nandu / Cleaned on Order",
    tag: "LIVE",
    boat: "Kasimedu Market",
    price: 900,
    category: "crabs",
    art: "mud-crab",
    image: "/images/menu/live-mud-crab.jpg",
    cuts: [
      cut("Cleaned & Halved (Shell Intact)", "curry", NET.crab),
      cut("Whole Cleaned", "whole", NET.crab),
    ],
  },
  {
    id: "mud-crab",
    name: "Mud Crab",
    tamilName: "சேற்று நண்டு",
    subtitle: "Sethu Nandu / Pepper Fry & Masala",
    tag: "PREMIUM",
    boat: "Kasimedu Market",
    price: 750,
    category: "crabs",
    art: "mud-crab",
    image: "/images/menu/mud-crab.jpg",
    cuts: [
      cut("Cleaned & Halved (Shell Intact)", "curry", NET.crab),
      cut("Whole Cleaned", "whole", NET.crab),
    ],
  },
  {
    id: "parala-boneless",
    name: "Parala Boneless Meat",
    tamilName: "பரலா",
    subtitle: "Full Meat / Cubes, Fish Finger or BBQ",
    tag: "BONELESS",
    boat: "Kasimedu Market",
    price: 750,
    category: "boneless",
    art: "tuna",
    image: "/images/menu/parala.jpg",
    cuts: [
      cut("Boneless Cubes", "boneless", NET.meat),
      cut("Fish Finger", "boneless", NET.meat),
      cut("Full Barbeque Meat", "boneless", NET.meat),
    ],
  },
  {
    id: "yellowfin-tuna",
    name: "Yellowfin Tuna Boneless",
    tamilName: "சூரை",
    subtitle: "Full Meat / Cubes & Slices",
    tag: "BONELESS",
    boat: "Kasimedu Market",
    price: 750,
    category: "boneless",
    art: "tuna",
    image: "/images/menu/yellowfin-tuna.jpg",
    cuts: [
      cut("Boneless Cubes", "boneless", NET.meat),
      cut("Boneless Slices", "boneless", NET.meat),
    ],
  },
  {
    id: "vanjaram-boneless",
    name: "Vanjaram Boneless Fillet",
    tamilName: "வஞ்சிரம்",
    subtitle: "Seer Fish / Full Meat Fillet",
    tag: "BONELESS",
    boat: "Kasimedu Market",
    price: 2000,
    category: "boneless",
    art: "seer",
    image: "/images/menu/vanjaram.png",
    cuts: [
      cut("Boneless Fillet Slices", "boneless", NET.meat),
      cut("Boneless Cubes", "boneless", NET.meat),
    ],
  },
  {
    id: "thuna-cubes",
    name: "Thuna Cubes & Slices",
    tamilName: "சூரை",
    subtitle: "Tuna / Ready Boneless Meat",
    tag: "BONELESS",
    boat: "Kasimedu Market",
    price: 650,
    category: "boneless",
    art: "tuna",
    image: "/images/menu/yellowfin-tuna.jpg",
    cuts: [
      cut("Boneless Cubes", "boneless", NET.meat),
      cut("Boneless Slices", "boneless", NET.meat),
    ],
  },
  {
    id: "thuna-finger",
    name: "Thuna Fish Finger",
    tamilName: "சூரை",
    subtitle: "Tuna / Ready Fish Finger",
    tag: "BONELESS",
    boat: "Kasimedu Market",
    price: 650,
    category: "boneless",
    art: "tuna",
    image: "/images/menu/thuna-finger.jpg",
    cuts: [
      cut("Fish Finger", "boneless", NET.meat),
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
