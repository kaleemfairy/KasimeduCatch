// Business facts. All of these are placeholders until the owner confirms them.
export const SITE = {
  phoneDisplay: "+91 98400 12345",
  phoneE164: "919840012345",
  fssai: "12423008000456",
  address: "Wharf Gate #4, Kasimedu Fishing Harbour, Royapuram, Chennai - 600013",
  households: "12,000+",
};

/** Public file path, including the folder the site is hosted under. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const ZONES = [
  "Anna Nagar & Kilpauk",
  "Adyar & Besant Nagar",
  "OMR & ECR",
  "T. Nagar & Mylapore",
  "Velachery & Tambaram",
];

export const TESTIMONIALS = [
  {
    area: "Anna Nagar",
    quote:
      "The vanjaram steaks came cut exactly as I asked, and the net weight matched what the site said.",
  },
  {
    area: "Adyar",
    quote:
      "I get the scale photo on WhatsApp before the van leaves. I know what I am paying for before it reaches my door.",
  },
  {
    area: "OMR",
    quote:
      "The prawns were still on ice when they arrived. It saves me the early drive to the harbour on a Sunday.",
  },
];

export const PHOTO_CREDITS = [
  {
    title: "Kasimedu Fishmarket, parking of boats",
    href: "https://commons.wikimedia.org/wiki/File:C1A5052.jpg",
  },
  {
    title: "Kasimedu Fishmarket, man cleaning his basket",
    href: "https://commons.wikimedia.org/wiki/File:C1A4996.jpg",
  },
];
