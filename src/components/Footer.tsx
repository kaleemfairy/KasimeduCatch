"use client";

import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { CATEGORIES } from "@/lib/catalog";
import { PHOTO_CREDITS, SITE } from "@/lib/site";
import { scrollToSection, useStore } from "@/lib/store";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const setCategory = useStore((s) => s.setCategory);
  const openAuction = useStore((s) => s.openAuction);

  return (
    <footer className="bg-deep text-[#C4D1DE]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/images/sss-seafood-logo.png" alt="SSS Seafood, Kasimedu Catch" width={533} height={527} className="size-40" />
          <p className="mt-3">Kasimedu Catch, Chennai</p>
          <p className="mt-2 tabular-nums">FSSAI License No. {SITE.fssai}</p>
        </div>
        <nav aria-label="Harbour links">
          <h2 className="font-display text-lg font-semibold text-white uppercase">Harbour Links</h2>
          <ul className="mt-2 space-y-1.5">
            {CATEGORIES.filter((c) => c.navLabel).map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCategory(c.id);
                    scrollToSection("catalog");
                  }}
                  className="hover:text-white"
                >
                  {c.navLabel}
                </button>
              </li>
            ))}
            <li><button type="button" onClick={() => openAuction()} className="hover:text-white">Daily Harbour Auction</button></li>
            <li><a href="#about" className="hover:text-white">About Kasimedu Dock</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-lg font-semibold text-white uppercase">Commercial Bulk Orders</h2>
          <p className="mt-2">Hotels, caterers and restaurants can buy direct from the morning landing.</p>
          <a href={whatsappLink("Hello SSS Seafood, I would like to discuss a commercial bulk order.")} target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold text-dawn underline underline-offset-2">
            Message the bulk order desk
          </a>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white uppercase">Wharf Dispatch</h2>
          <p className="mt-2 flex gap-2"><MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0" />{SITE.address}</p>
          <a href={`tel:+${SITE.phoneE164}`} className="mt-2 flex items-center gap-2 font-semibold text-white">
            <Phone size={16} aria-hidden="true" /> Emergency: {SITE.phoneDisplay}
          </a>
        </div>
      </div>
      <p className="mx-auto max-w-7xl border-t border-white/10 px-4 py-4 text-xs">
        Fish images are representative. Harbour photos by Sriram Jagannathan,{" "}
        {PHOTO_CREDITS.map((photo, index) => (
          <span key={photo.href}>
            {index > 0 && " and "}
            <a href={photo.href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">{photo.title}</a>
          </span>
        ))}
        ,{" "}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">CC BY-SA 4.0</a>.
      </p>
    </footer>
  );
}
