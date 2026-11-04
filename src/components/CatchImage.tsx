import Image from "next/image";
import type { CatchItem } from "@/lib/catalog";
import { asset } from "@/lib/site";
import { Specimen } from "./Specimen";

/** The item's photo, or its drawing if it has none. Fills a positioned parent. */
export function CatchImage({ item, alt, sizes, drawingClassName }: {
  item: CatchItem;
  alt: string;
  sizes: string;
  drawingClassName: string;
}) {
  if (item.image) return <Image src={asset(item.image)} alt={alt} fill sizes={sizes} className="object-cover" />;
  return <Specimen art={item.art} label={alt} className={drawingClassName} />;
}
