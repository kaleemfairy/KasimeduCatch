"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getItem, rupees } from "@/lib/catalog";
import { CLOCK_END, CLOCK_START, CLOCK_STOPS, SLOTS, type DockNow, type SlotId, useDockNow } from "@/lib/dock";
import { ZONES } from "@/lib/site";
import { scrollToSection, useStore } from "@/lib/store";

const prawn = getItem("prawn");
const crab = getItem("crab");

const position = (minutes: number) =>
  Math.min(100, Math.max(0, ((minutes - CLOCK_START) / (CLOCK_END - CLOCK_START)) * 100));

function DockClock({ dock }: { dock: DockNow | null }) {
  const now = dock ? position(dock.minutes) : 0;
  return (
    <section aria-label="Today at Kasimedu dock" className="mt-7 border-t border-white/20 pt-3">
      <p className="mb-16 min-h-5 text-sm sm:mb-12 text-[#DCE6F0] tabular-nums">
        {dock && (
          <>
            <strong className="font-semibold text-white">{dock.time} in Chennai.</strong>{" "}
            {dock.hasCatch
              ? `Dock open, ${dock.closesIn} left to order for today.`
              : `${dock.isOpen ? "" : "Dock closed. "}Order now for the boats unloading ${dock.nextLanding}.`}
          </>
        )}
      </p>
      <div className="relative mb-16 h-1 rounded-full bg-white/25 sm:mb-14">
        <div className="absolute inset-y-0 left-0 rounded-full bg-dawn" style={{ width: `${now}%` }} />
        {dock && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-dawn shadow-[0_2px_8px_rgb(7_21_36/0.6)]"
            style={{ left: `${now}%` }}
          />
        )}
        {CLOCK_STOPS.map((stop, index) => {
          const left = position(stop.at);
          const above = index % 2 === 0;
          const passed = dock ? dock.minutes >= stop.at : false;
          const align = left > 70 ? "-translate-x-full text-right" : left < 10 ? "" : "-translate-x-1/2 text-center";
          return (
            <div key={stop.time} className="absolute" style={{ left: `${left}%` }}>
              <span className={`absolute -top-1 -left-0.5 h-3 w-0.5 ${passed ? "bg-dawn" : "bg-white/60"}`} aria-hidden="true" />
              <p className={`absolute w-[4.5rem] text-xs leading-tight sm:w-32 ${align} ${above ? "bottom-3" : "top-5"}`}>
                <span className="block font-semibold text-white tabular-nums">{stop.time}</span>
                <span className="block text-[#C4D1DE]">{stop.label}</span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Hero() {
  const dock = useDockNow();
  const zone = useStore((s) => s.zone);
  const slot = useStore((s) => s.slot);
  const setZone = useStore((s) => s.setZone);
  const setSlot = useStore((s) => s.setSlot);
  const openAuction = useStore((s) => s.openAuction);
  const setRunShown = useStore((s) => s.setRunShown);
  const [checking, setChecking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const closed = dock ? !dock.isOpen : false;
  const slotOpen = (id: SlotId) => dock?.isSlotOpen(id) ?? true;

  // A slot that has passed for today moves the visitor on to the next open run.
  useEffect(() => {
    if (dock && !dock.isSlotOpen(slot)) setSlot("prelunch");
  }, [dock, slot, setSlot]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const findCatch = () => {
    setChecking(true);
    setRunShown(false);
    scrollToSection("catalog");
    timer.current = setTimeout(() => {
      setChecking(false);
      setRunShown(true);
    }, 900);
  };

  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src="/photos/kasimedu-boats.jpg"
        alt="Fishing boats moored at Kasimedu harbour"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(7_21_36/0.92)_0%,rgb(13_37_63/0.8)_48%,rgb(13_37_63/0.28)_100%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-8 pb-2 lg:pt-10">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.75rem,5.2vw,4.75rem)] leading-[1.02] font-bold tracking-tight text-balance uppercase">
              Fresh from Kasimedu <span className="text-dawn">sea waves</span> to your kitchen
            </h1>
            <p className="mt-4 max-w-xl text-base text-[#DCE6F0]">
              Bought off the deep-sea trawlers at dawn, washed in RO water, cut to your order by our butchers, and delivered across Chennai within hours.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                findCatch();
              }}
              className="mt-6 grid max-w-2xl gap-3 rounded-lg bg-white p-4 text-ink shadow-[0_18px_40px_rgb(7_21_36/0.4)] sm:grid-cols-2"
            >
              <label className="field-label">
                Select Delivery Zone
                <select value={zone} onChange={(e) => setZone(e.target.value)} className="field">
                  {ZONES.map((z) => <option key={z}>{z}</option>)}
                </select>
              </label>
              <label className="field-label">
                {closed ? "Tomorrow's Dispatch Slot" : "Today's Dispatch Slot"}
                <select value={slot} onChange={(e) => setSlot(e.target.value as SlotId)} className="field">
                  {SLOTS.map((s) => (
                    <option key={s.id} value={s.id} disabled={!slotOpen(s.id)}>
                      {s.label}{slotOpen(s.id) ? "" : " (closed)"}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" disabled={checking} className="btn btn-dawn h-12 text-base sm:col-span-2">
                <Search size={18} aria-hidden="true" />
                {checking ? <span className="animate-pulse">Verifying Dock Stock…</span> : "Find Catch"}
              </button>
            </form>
          </div>

          <article className="overflow-hidden rounded-lg bg-deep shadow-[0_18px_40px_rgb(7_21_36/0.5)] lg:col-span-5">
            <div className="relative grid grid-cols-2 bg-white">
              <div className="relative aspect-[4/3]">
                <Image src="/images/menu/prawn.png" alt="Raw prawns" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3]">
                <Image src="/images/menu/crab.png" alt="Blue crab" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
              <p className="tag absolute top-3 left-3 bg-deep text-white">{dock && !dock.hasCatch ? "Lands around 4:15 AM" : "Landed 4:15 AM Today"}</p>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-2xl leading-tight font-semibold uppercase">Prawns &amp; Crabs (Medium Size)</h2>
                <p className="shrink-0 text-right font-display text-3xl font-semibold text-dawn tabular-nums">
                  {rupees(prawn?.price ?? 0)}<span className="block font-sans text-xs font-medium text-[#C4D1DE]">prawn, per kg gross</span>
                </p>
              </div>
              <p className="mt-2 text-sm text-[#6EE7B7]">Crab {rupees(crab?.price ?? 0)}/kg • Peeled &amp; deveined prawn option, ~600g net per kg</p>
              <button type="button" onClick={() => openAuction("prawn")} className="btn btn-dawn mt-4 w-full">
                Reserve 4 AM
              </button>
            </div>
          </article>
        </div>

        <DockClock dock={dock} />
      </div>
    </section>
  );
}
