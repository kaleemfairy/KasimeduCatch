"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getItem, kg } from "@/lib/catalog";
import { getSlot, SLOTS, type SlotId } from "@/lib/dock";
import { asset, SITE, TESTIMONIALS, ZONES } from "@/lib/site";
import { useStore } from "@/lib/store";
import { dispatchMessage, isIndianMobile, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Errors = Partial<Record<"name" | "phone" | "address", string>>;

export function PreOrder() {
  const lines = useStore((s) => s.lines);
  const zone = useStore((s) => s.zone);
  const slot = useStore((s) => s.slot);
  const setZone = useStore((s) => s.setZone);
  const setSlot = useStore((s) => s.setSlot);
  const [errors, setErrors] = useState<Errors>({});
  const [link, setLink] = useState<string | null>(null);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const next: Errors = {};
    if (!value("name")) next.name = "Enter your name for the dispatch slip.";
    if (!isIndianMobile(value("phone"))) next.phone = "Enter a 10-digit WhatsApp number.";
    if (!value("address")) next.address = "Enter your full delivery address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLink(
      whatsappLink(
        dispatchMessage(lines, {
          name: value("name"),
          phone: value("phone"),
          address: value("address"),
          zone,
          slot: getSlot(slot).short,
          notes: value("notes"),
        }),
      ),
    );
  };

  return (
    <>
      <section id="dispatch" className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-tight font-bold uppercase">Direct Boat Sourcing Desk</h2>
            <p className="mt-2 max-w-lg text-[#DCE6F0]">
              Reserve tomorrow morning&apos;s fish today. Tell us where to deliver, and we buy against your order when the boats come in.
            </p>
            <ul className="mt-8 space-y-6">
              {TESTIMONIALS.map((t) => (
                <li key={t.area}>
                  <blockquote className="max-w-lg text-lg leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="mt-1 text-sm text-[#C4D1DE]">Sample review • {t.area}</p>
                </li>
              ))}
            </ul>
          </div>

          {link ? (
            <div className="self-start rounded-lg bg-white p-6 text-center text-ink">
              <CircleCheck size={56} aria-hidden="true" className="dawn-pop mx-auto text-sea-green" />
              <h3 className="mt-3 font-display text-3xl font-semibold uppercase">Your dispatch slip is ready</h3>
              <a href={link} target="_blank" rel="noreferrer" className="btn btn-dawn mt-4 h-12 w-full text-base">
                <WhatsAppIcon size={20} /> Send to Dock on WhatsApp
              </a>
              <p className="mt-2 text-xs text-muted">Your order reaches the dock when you press send in WhatsApp.</p>
              <button type="button" onClick={() => setLink(null)} className="mt-3 text-sm font-semibold underline underline-offset-2">Edit details</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-3 self-start rounded-lg bg-white p-5 text-ink sm:grid-cols-2">
              <h3 className="font-display text-2xl font-semibold uppercase sm:col-span-2">Harbour Pre-Order</h3>
              {lines.length > 0 && (
                <div className="rounded-md bg-sand p-3 text-sm sm:col-span-2">
                  <p className="font-semibold">From your basket</p>
                  <ul className="mt-1 text-muted">
                    {lines.map((line) => {
                      const item = getItem(line.itemId);
                      return item ? (
                        <li key={`${line.itemId}-${line.cutIndex}`} className="tabular-nums">
                          {item.name} • {kg(line.weight)} • {item.cuts[line.cutIndex]?.name}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
              <label className="field-label">
                Full Name *
                <input name="name" autoComplete="name" aria-invalid={!!errors.name} className="field" />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>
              <label className="field-label">
                WhatsApp Number *
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} className="field" />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>
              <label className="field-label">
                Delivery Zone
                <select value={zone} onChange={(e) => setZone(e.target.value)} className="field">
                  {ZONES.map((z) => <option key={z}>{z}</option>)}
                </select>
              </label>
              <label className="field-label">
                Morning Slot
                <select value={slot} onChange={(e) => setSlot(e.target.value as SlotId)} className="field">
                  {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </label>
              <label className="field-label sm:col-span-2">
                Delivery Address *
                <textarea name="address" rows={2} autoComplete="street-address" aria-invalid={!!errors.address} className="field h-auto py-2" />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </label>
              <label className="field-label sm:col-span-2">
                What should we look out for?
                <input name="notes" placeholder={lines.length ? "Optional: cooking plans, gate code" : "e.g. 2 kg vanjaram steaks"} className="field" />
              </label>
              <button type="submit" className="btn btn-dawn h-12 text-base sm:col-span-2">Reserve Next-Morning Catch</button>
            </form>
          )}
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
        <Image
          src={asset("/photos/kasimedu-banner.jpg")}
          alt="Kasimedu Catch: fresh seafood direct from Kasimedu Harbour. Fishing boats moored at the harbour."
          width={1600}
          height={800}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-lg"
        />
        <div>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-tight font-bold uppercase">Kasimedu, before the city wakes</h2>
          <p className="mt-3 max-w-prose">
            Kasimedu in Royapuram is where Chennai&apos;s boats come home. Trawlers tie up in the dark, baskets come over the side, and the auction calls start well before sunrise. Our buyers stand on that wharf every morning, choosing fish by eye and by hand.
          </p>
          <p className="mt-3 max-w-prose">
            From Gate #4 the catch is washed in RO water, cut by our butchers, packed on food-grade RO ice and put on a chilled van. {SITE.households} Chennai households have had their fish this way, with our 100% formalin-free guarantee on every order.
          </p>
        </div>
      </section>
    </>
  );
}
