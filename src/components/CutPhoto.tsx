import Image from "next/image";
import type { CutKind } from "@/lib/catalog";
import { asset } from "@/lib/site";

// Cropped from the client's product photos. Halved crab has no photo or filter.
const PHOTOS: Partial<Record<CutKind, string>> = {
  whole: "/images/cuts/whole.jpg",
  steak: "/images/cuts/steak.jpg",
  boneless: "/images/cuts/boneless.jpg",
};

/** A small photo of how a cut looks, shown beside its name. */
export function CutPhoto({ kind, className = "h-7 w-10" }: { kind: CutKind | "all"; className?: string }) {
  const src = kind === "all" ? undefined : PHOTOS[kind];
  if (!src) return null;
  return (
    <Image
      src={asset(src)}
      alt=""
      width={160}
      height={112}
      className={`shrink-0 rounded-sm bg-white object-cover ring-1 ring-black/10 ${className}`}
    />
  );
}
