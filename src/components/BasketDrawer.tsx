"use client";

import { MessageCircle, Snowflake, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { getItem, netYield, rupees } from "@/lib/catalog";
import { getSlot } from "@/lib/dock";
import { basketTotals, FREE_DISPATCH_ABOVE, scrollToSection, useStore } from "@/lib/store";
import { basketMessage, whatsappLink } from "@/lib/whatsapp";
import { CatchImage } from "./CatchImage";
import { Stepper } from "./Stepper";

export function BasketDrawer() {
  const open = useStore((s) => s.basketOpen);
  const lines = useStore((s) => s.lines);
  const zone = useStore((s) => s.zone);
  const slot = useStore((s) => s.slot);
  const setOpen = useStore((s) => s.setBasketOpen);
  const setWeight = useStore((s) => s.setWeight);
  const removeLine = useStore((s) => s.removeLine);
  const ref = useRef<HTMLDialogElement>(null);
  const { subtotal, dispatch, total } = basketTotals(lines);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const proceed = () => {
    setOpen(false);
    scrollToSection("dispatch");
  };

  return (
    <dialog
      ref={ref}
      aria-label="Your harbour basket"
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === ref.current) setOpen(false);
      }}
      className="drawer"
    >
      <div className="flex h-full flex-col bg-white text-ink">
        <header className="flex items-center justify-between bg-navy px-4 py-3 text-white">
          <div>
            <h2 className="font-display text-xl font-semibold uppercase">Your Harbour Basket</h2>
            <p lang="ta" className="text-sm text-dawn">உங்கள் கூடை</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close basket" className="grid size-10 place-items-center rounded-md hover:bg-white/10">
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <p className="flex items-center gap-2 bg-[#E8F1F8] px-4 py-2 text-xs font-medium text-navy">
          <Snowflake size={14} aria-hidden="true" className="shrink-0" />
          Cold-Chain Van Dispatch • Kasimedu Gate #4 • RO Chilled
        </p>

        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl font-semibold uppercase">Your basket is empty</p>
              <p className="mt-1 text-sm text-muted">Pick a fish and a cut from today&apos;s slate.</p>
              <button type="button" onClick={() => { setOpen(false); scrollToSection("catalog"); }} className="btn btn-navy mt-4">See Today&apos;s Catch</button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => {
                const item = getItem(line.itemId);
                const cut = item?.cuts[line.cutIndex];
                if (!item || !cut) return null;
                return (
                  <li key={`${line.itemId}-${line.cutIndex}`} className="flex gap-3 border-b border-line pb-3">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-navy">
                      <CatchImage item={item} alt="" sizes="80px" drawingClassName="size-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold">
                          {item.name} <span lang="ta" className="font-normal text-muted">{item.tamilName}</span>
                        </h3>
                        <button type="button" onClick={() => removeLine(line.itemId, line.cutIndex)} aria-label={`Remove ${item.name} from basket`} className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded text-muted hover:bg-[#FEE9E2] hover:text-dawn-ink">
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-xs text-muted">{cut.name}</p>
                      <p className="text-xs font-medium text-green-ink tabular-nums">Net {netYield(cut, line.weight)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Stepper weight={line.weight} onChange={(w) => setWeight(line.itemId, line.cutIndex, w)} label={item.name} />
                        <span className="font-semibold tabular-nums">{rupees(item.price * line.weight)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-line bg-sand p-4">
            <dl className="space-y-1 text-sm tabular-nums">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">{rupees(subtotal)}</dd></div>
              <div className="flex justify-between text-green-ink"><dt>Dock Cleaning &amp; Master Butchery</dt><dd className="font-semibold">FREE (₹0)</dd></div>
              <div className="flex justify-between text-green-ink"><dt>Food-Grade RO Ice Insulation</dt><dd className="font-semibold">FREE (₹0)</dd></div>
              <div className={`flex justify-between ${dispatch ? "" : "text-green-ink"}`}>
                <dt>Chennai Cold-Chain Dispatch</dt>
                <dd className="font-semibold">{dispatch ? rupees(dispatch) : "FREE"}</dd>
              </div>
              {dispatch > 0 && (
                <p className="text-xs text-muted">Free dispatch above {rupees(FREE_DISPATCH_ABOVE)}.</p>
              )}
              <div className="flex items-baseline justify-between border-t border-line pt-2">
                <dt className="font-semibold">Total Amount</dt>
                <dd className="font-display text-2xl font-semibold">{rupees(total)}</dd>
              </div>
            </dl>
            <a
              href={whatsappLink(basketMessage(lines, zone, getSlot(slot).short))}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dawn mt-3 h-12 w-full text-base"
            >
              <MessageCircle size={18} aria-hidden="true" /> Instant WhatsApp Order
            </a>
            <button type="button" onClick={proceed} className="btn btn-outline mt-2 w-full">Proceed to Dock Dispatch</button>
          </footer>
        )}
      </div>
    </dialog>
  );
}
