"use client";

import { Phone, ShoppingBasket, Truck } from "lucide-react";
import Image from "next/image";
import { CATALOG, CATEGORIES, type CategoryId } from "@/lib/catalog";
import { useDockNow } from "@/lib/dock";
import { asset, SITE } from "@/lib/site";
import { scrollToSection, useStore } from "@/lib/store";
import { whatsappLink } from "@/lib/whatsapp";
import { CatchSearch } from "./CatchSearch";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteHeader() {
  const dock = useDockNow();
  const closed = dock && !dock.isOpen;
  const waiting = dock && !dock.hasCatch;
  const lineCount = useStore((s) => s.lines.length);
  const setBasketOpen = useStore((s) => s.setBasketOpen);
  const setCategory = useStore((s) => s.setCategory);
  const openAuction = useStore((s) => s.openAuction);

  const goToCategory = (id: CategoryId | "all") => {
    setCategory(id);
    scrollToSection("catalog");
  };

  const ticker = [
    waiting
      ? `Next Landing ${dock.nextLanding}`
      : "Morning Harbour Catch Arrived (4:00 AM Today)",
    "100% Formalin & Preservative Free",
    "FREE Home Delivery across Chennai",
  ];

  return (
    <>
      <div className="bg-deep text-[#C4D1DE] text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <div className="ticker min-w-0 flex-1 overflow-hidden">
            <p className="ticker-track flex w-max gap-6 whitespace-nowrap xl:w-auto">
              {ticker.map((text) => (
                <span key={text} className="first:font-semibold first:text-white">{text}</span>
              ))}
              <span aria-hidden="true" className="xl:hidden">{ticker[0]}</span>
              <span aria-hidden="true" className="xl:hidden">{ticker[1]}</span>
              <span aria-hidden="true" className="xl:hidden">{ticker[2]}</span>
            </p>
          </div>
          <a href={`tel:+${SITE.phoneE164}`} className="hidden items-center gap-1.5 whitespace-nowrap hover:text-white xl:flex">
            <Phone size={13} aria-hidden="true" />
            Dock hotline {SITE.phoneDisplay}
          </a>
          <span className="shrink-0 whitespace-nowrap font-semibold text-dawn tabular-nums">
            {closed
              ? "Dock closed"
              : dock?.closesIn
                ? `Closes 11:30 AM • ${dock.closesIn} left`
                : "Closes 11:30 AM"}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-30 bg-navy text-white shadow-[0_6px_20px_rgb(7_21_36/0.35)]">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-1.5">
          <a href="#top" className="mr-auto flex items-center gap-2.5 lg:mr-0">
            <Image src={asset("/images/sss-seafood-logo.png")} alt="" width={533} height={527} priority className="size-14 shrink-0 lg:size-16" />
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold tracking-wide">SSS SEAFOOD</span>
              <span className="block text-[11px] font-semibold tracking-[0.08em] text-dawn">KASIMEDU CATCH</span>
            </span>
          </a>

          <div className="hidden flex-1 lg:block">
            <CatchSearch />
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="Order on WhatsApp"
              className="btn btn-whatsapp px-3"
            >
              <WhatsAppIcon size={20} className="text-white" />
              <span className="hidden sm:inline">WhatsApp Order</span>
            </a>
            <button type="button" onClick={() => setBasketOpen(true)} className="btn btn-dawn px-3" aria-label={`Open basket, ${lineCount} items`}>
              <ShoppingBasket size={18} aria-hidden="true" />
              <span className="hidden sm:inline">Basket</span>
              <span className="grid min-w-5 place-items-center rounded-full bg-deep px-1 text-xs font-bold text-white tabular-nums">{lineCount}</span>
            </button>
          </div>
        </div>
        <p className="free-strip">
          <Truck size={16} aria-hidden="true" className="neon-truck shrink-0" />
          <span className="neon-text">Free delivery &amp; cleaning<span className="hidden sm:inline"> across Chennai</span></span>
          <span className="hidden text-[#D1FAE5] sm:inline">• On every order</span>
        </p>
      </header>

      <div className="relative z-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 pb-1">
          <div className="pb-2 lg:hidden">
            <CatchSearch />
          </div>
          <nav aria-label="Catch categories" className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto border-t border-white/10 px-4 pt-1.5 text-sm font-medium whitespace-nowrap">
            {CATEGORIES.filter((c) => c.navLabel).map((c) => (
              <button key={c.id} type="button" onClick={() => goToCategory(c.id)} className="py-1 hover:text-dawn">
                {c.navLabel}
              </button>
            ))}
            <button type="button" onClick={() => openAuction()} className="py-1 hover:text-dawn">Daily Harbour Auction</button>
            <a href="#about" className="py-1 hover:text-dawn">About Kasimedu Dock</a>
          </nav>
        </div>
      </div>

      <div className="bg-[#102C4A] text-[#DCE6F0] text-xs">
        <p className="mx-auto flex max-w-7xl items-center gap-2.5 px-4 py-2 font-medium">
          <span className={`beacon shrink-0 ${waiting ? "beacon-off" : ""}`} aria-hidden="true" />
          <span>
            {waiting
              ? `${closed ? "Dock closed for today • " : ""}Next boats unload ${dock.nextLanding} • Formalin Test: 0.00% PASS`
              : `Kasimedu Dock #2 Deep-Sea Trawlers Unloaded at 04:30 AM • ${CATALOG.length} Varieties Cleaned & Packed on RO Ice • Formalin Test: 0.00% PASS`}
          </span>
        </p>
      </div>
    </>
  );
}
