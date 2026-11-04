"use client";

import { Check, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CATALOG, CATEGORIES, CUT_FILTERS, kg, netYield, rupees, type CatchItem } from "@/lib/catalog";
import { getSlot, useDockNow } from "@/lib/dock";
import { useStore } from "@/lib/store";
import { CatchImage } from "./CatchImage";
import { Stepper } from "./Stepper";

function CatchCard({ item, highlighted }: { item: CatchItem; highlighted: boolean }) {
  const cutFilter = useStore((s) => s.cutFilter);
  const addLine = useStore((s) => s.addLine);
  const setBasketOpen = useStore((s) => s.setBasketOpen);
  const [picked, setPicked] = useState<number | null>(null);
  const [weight, setWeight] = useState(1);
  const [added, setAdded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const addedTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // A cut filter preselects the matching cut until the visitor picks their own.
  const matching = item.cuts.findIndex((c) => c.kind === cutFilter);
  const cutIndex = picked ?? (matching >= 0 ? matching : 0);
  const cut = item.cuts[cutIndex];

  useEffect(() => {
    if (highlighted) ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlighted]);

  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current);
  }, []);

  const add = () => {
    addLine({ itemId: item.id, cutIndex, weight });
    setBasketOpen(true);
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      ref={ref}
      id={`catch-${item.id}`}
      className={`flex flex-col overflow-hidden rounded-lg border bg-white transition-shadow duration-300 hover:shadow-[0_10px_24px_rgb(13_37_63/0.14)] ${highlighted ? "border-dawn ring-2 ring-dawn" : "border-line"}`}
    >
      <div className="relative aspect-[4/3] bg-navy">
        <CatchImage item={item} alt={item.name} sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" drawingClassName="block size-full p-2 pt-7" />
        <p className="tag absolute top-2 left-2 bg-deep text-white">{item.boat}</p>
        <p className="tag absolute top-2 right-2 bg-dawn text-deep">{item.tag}</p>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight font-semibold uppercase">{item.name}</h3>
          <p className="shrink-0 text-right font-display text-xl leading-tight font-semibold tabular-nums">
            {rupees(item.price)}<span className="font-sans text-xs font-medium text-muted">/kg</span>
          </p>
        </div>
        <p className="mt-0.5 mb-3 text-sm text-dawn-ink">
          <span lang="ta" className="font-semibold">{item.tamilName}</span> • {item.subtitle}
        </p>

        <label className="field-label mt-auto">
          Cut Style
          <select value={cutIndex} onChange={(e) => setPicked(Number(e.target.value))} className="field text-[13px]">
            {item.cuts.map((c, index) => <option key={c.name} value={index}>{c.name}</option>)}
          </select>
        </label>

        <div className="mt-3 flex items-center justify-between gap-2">
          <Stepper weight={weight} onChange={setWeight} label={item.name} />
          <p className="text-right text-xs leading-snug text-muted">
            Net yield
            <span className="block font-semibold text-green-ink tabular-nums">{netYield(cut, weight)}</span>
          </p>
        </div>

        <button type="button" onClick={add} className={`btn mt-3 w-full ${added ? "btn-green" : "btn-dawn"}`}>
          {added ? (
            <>
              <Check size={18} aria-hidden="true" /> Added!
            </>
          ) : (
            <>Add Catch • {rupees(item.price * weight)}</>
          )}
        </button>
        <span className="sr-only" aria-live="polite">{added ? `${kg(weight)} of ${item.name} added to basket` : ""}</span>
      </div>
    </article>
  );
}

function VanRun() {
  const dock = useDockNow();
  const shown = useStore((s) => s.runShown);
  const zone = useStore((s) => s.zone);
  const slot = useStore((s) => s.slot);
  const setRunShown = useStore((s) => s.setRunShown);
  const run = getSlot(slot);
  if (!shown) return null;
  return (
    <div role="status" className="run-banner mt-6">
      <p>
        <strong>Van run for {zone}:</strong> {run.label.split(":")[0]}, leaves Kasimedu Wharf at {run.departs}
        {dock && !dock.isOpen ? " tomorrow" : ""}.
      </p>
      <button type="button" onClick={() => setRunShown(false)} className="font-semibold underline underline-offset-2">Dismiss</button>
    </div>
  );
}

export function Catalog() {
  const category = useStore((s) => s.category);
  const cutFilter = useStore((s) => s.cutFilter);
  const highlightId = useStore((s) => s.highlightId);
  const setCategory = useStore((s) => s.setCategory);
  const setCutFilter = useStore((s) => s.setCutFilter);
  const openAuction = useStore((s) => s.openAuction);

  const items = CATALOG.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      (cutFilter === "all" || item.cuts.some((c) => c.kind === cutFilter)),
  );

  return (
    <section id="catalog" className="mx-auto w-full max-w-7xl px-4 py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-tight font-bold text-balance uppercase">
            Today&apos;s Fresh Sea Catch <span lang="ta" className="block text-dawn-ink normal-case">இன்றைய மீன் வரத்து</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Every fish is weighed whole, then cleaned, descaled and cut to your order. You pay on gross weight and see your net yield before you add it.
          </p>
        </div>
        <button type="button" onClick={() => openAuction()} className="btn btn-navy shrink-0">
          <Zap size={16} aria-hidden="true" /> Order 4 AM Catch
        </button>
      </div>

      <VanRun />

      <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1">
        {CATEGORIES.map((c) => {
          const count = CATALOG.filter((item) => c.id === "all" || item.category === c.id).length;
          const active = category === c.id;
          return (
            <button key={c.id} type="button" aria-pressed={active} onClick={() => setCategory(c.id)} className={`tab ${active ? "tab-active" : ""}`}>
              {c.label} <span className="tabular-nums opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      <div role="group" aria-label="Filter by cut" className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
        {CUT_FILTERS.map((c) => (
          <button key={c.id} type="button" aria-pressed={cutFilter === c.id} onClick={() => setCutFilter(c.id)} className={`chip ${cutFilter === c.id ? "chip-active" : ""}`}>
            {c.label}
          </button>
        ))}
      </div>

      {items.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => <CatchCard key={item.id} item={item} highlighted={highlightId === item.id} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-[#B6C2D0] p-10 text-center">
          <p className="font-display text-2xl font-semibold uppercase">Not cut this way</p>
          <p className="mt-1 text-sm text-muted">Nothing in this category comes in that cut. See all cuts instead.</p>
          <button type="button" onClick={() => setCutFilter("all")} className="btn btn-navy mt-4">Show All Cuts</button>
        </div>
      )}
    </section>
  );
}
