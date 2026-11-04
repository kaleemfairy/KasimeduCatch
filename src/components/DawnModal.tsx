"use client";

import { Banknote, Camera, CircleCheck, FlaskConical, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CATALOG, getItem } from "@/lib/catalog";
import { readDock } from "@/lib/dock";
import { useStore } from "@/lib/store";
import { dawnMessage, isIndianMobile, whatsappLink } from "@/lib/whatsapp";

const VARIETIES = CATALOG.filter((item) => item.category !== "dry");
const TRUST = [
  { icon: Banknote, text: "No upfront advance payment required" },
  { icon: Camera, text: "Live scale photo sent via WhatsApp prior to delivery" },
  { icon: FlaskConical, text: "Formalin 0.00% Lab Tested Guarantee" },
];

type Errors = Partial<Record<"name" | "phone" | "quantity" | "address", string>>;

export function DawnModal() {
  const open = useStore((s) => s.auctionOpen);
  const presetId = useStore((s) => s.auctionItemId);
  const close = useStore((s) => s.closeAuction);
  const ref = useRef<HTMLDialogElement>(null);
  const [itemId, setItemId] = useState(VARIETIES[0].id);
  const [cutIndex, setCutIndex] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmation, setConfirmation] = useState<{ landing: string; link: string; name: string; summary: string } | null>(null);

  const item = getItem(itemId) ?? VARIETIES[0];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      if (presetId) {
        setItemId(presetId);
        setCutIndex(0);
      }
      setErrors({});
      setConfirmation(null);
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, presetId]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const next: Errors = {};
    if (!value("name")) next.name = "Enter your name so the dock knows whose catch this is.";
    if (!isIndianMobile(value("phone"))) next.phone = "Enter a 10-digit WhatsApp number. The scale photo goes here.";
    const quantity = Number(value("quantity"));
    if (!(quantity >= 0.5 && quantity <= 20)) next.quantity = "Enter 0.5 to 20 kg.";
    if (!value("address")) next.address = "Enter your address or neighbourhood in Chennai.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const landing = readDock(new Date()).nextLanding;
    const cut = item.cuts[cutIndex]?.name ?? item.cuts[0].name;
    setConfirmation({
      landing,
      name: value("name"),
      summary: `${value("quantity")} kg ${item.name}, ${cut}`,
      link: whatsappLink(
        dawnMessage({
          name: value("name"),
          phone: value("phone"),
          variety: item.name,
          cut,
          quantity: value("quantity"),
          address: value("address"),
          landing,
        }),
      ),
    });
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="dawn-title"
      onClose={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="modal"
    >
      <div className="bg-white text-ink">
        <header className="relative bg-navy p-5 pr-14 text-white">
          <button type="button" onClick={close} aria-label="Close" className="absolute top-3 right-3 grid size-10 place-items-center rounded-md hover:bg-white/10">
            <X size={22} aria-hidden="true" />
          </button>
          <h2 id="dawn-title" className="font-display text-2xl leading-tight font-semibold uppercase">
            4:00 AM Dawn Auction Guarantee
          </h2>
          <p lang="ta" className="mt-1 text-sm text-dawn">அதிகாலை ஏல நேரடி முன்பதிவு</p>
          <p className="mt-2 text-sm text-[#DCE6F0]">
            Direct boat purchases made between 3:30 AM and 5:00 AM at Kasimedu Wharf Gate #4, before general wholesale bidding starts.
          </p>
        </header>

        {confirmation ? (
          <div className="p-6 text-center">
            <CircleCheck size={56} aria-hidden="true" className="dawn-pop mx-auto text-sea-green" />
            <h3 className="mt-3 font-display text-3xl font-semibold uppercase">You&apos;re on the dawn list, {confirmation.name.split(" ")[0]}</h3>
            <p className="mt-2 text-sm text-muted">{confirmation.summary}</p>
            <p className="mt-4 rounded-md bg-sand p-3 text-sm">
              Estimated dock arrival
              <strong className="block font-display text-2xl font-semibold tabular-nums">{confirmation.landing}</strong>
            </p>
            <a href={confirmation.link} target="_blank" rel="noreferrer" className="btn btn-dawn mt-4 h-12 w-full text-base">
              <MessageCircle size={18} aria-hidden="true" /> Send to Dock on WhatsApp
            </a>
            <p className="mt-2 text-xs text-muted">Your order reaches the dock when you press send in WhatsApp.</p>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="grid gap-3 p-5 sm:grid-cols-2">
            <label className="field-label sm:col-span-2">
              Full Name *
              <input name="name" autoComplete="name" aria-invalid={!!errors.name} className="field" />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
            <label className="field-label sm:col-span-2">
              WhatsApp Mobile Number *
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98400 XXXXX" aria-invalid={!!errors.phone} className="field" />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>
            <label className="field-label">
              Select Variety
              <select
                value={item.id}
                onChange={(e) => {
                  setItemId(e.target.value);
                  setCutIndex(0);
                }}
                className="field"
              >
                {VARIETIES.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </label>
            <label className="field-label">
              Preferred Cut Style
              <select value={cutIndex} onChange={(e) => setCutIndex(Number(e.target.value))} className="field">
                {item.cuts.map((c, index) => <option key={c.name} value={index}>{c.name}</option>)}
              </select>
            </label>
            <label className="field-label sm:col-span-2">
              Quantity in kg *
              <input name="quantity" type="number" min="0.5" max="20" step="0.5" defaultValue="1" inputMode="decimal" aria-invalid={!!errors.quantity} className="field tabular-nums" />
              {errors.quantity && <span className="field-error">{errors.quantity}</span>}
            </label>
            <label className="field-label sm:col-span-2">
              Chennai Delivery Address / Neighbourhood *
              <textarea name="address" rows={2} autoComplete="street-address" aria-invalid={!!errors.address} className="field h-auto py-2" />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </label>
            <ul className="space-y-1.5 text-xs text-muted sm:col-span-2">
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon size={15} aria-hidden="true" className="shrink-0 text-green-ink" /> {text}
                </li>
              ))}
            </ul>
            <button type="submit" className="btn btn-dawn h-12 text-base sm:col-span-2">Confirm Dawn Auction Order</button>
          </form>
        )}
      </div>
    </dialog>
  );
}
