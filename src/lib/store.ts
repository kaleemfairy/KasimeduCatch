"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CATALOG, type CategoryId, type CutKind } from "./catalog";
import type { SlotId } from "./dock";
import { ZONES } from "./site";

export const WEIGHT_STEP = 0.5;
export const MAX_WEIGHT = 20;
export const FREE_DISPATCH_ABOVE = 999;
export const DISPATCH_FEE = 50;

export type BasketLine = { itemId: string; cutIndex: number; weight: number };

type Store = {
  lines: BasketLine[];
  zone: string;
  slot: SlotId;
  category: CategoryId | "all";
  cutFilter: CutKind | "all";
  highlightId: string | null;
  runShown: boolean;
  basketOpen: boolean;
  auctionOpen: boolean;
  auctionItemId: string | null;
  addLine: (line: BasketLine) => void;
  setWeight: (itemId: string, cutIndex: number, weight: number) => void;
  removeLine: (itemId: string, cutIndex: number) => void;
  clearBasket: () => void;
  setZone: (zone: string) => void;
  setSlot: (slot: SlotId) => void;
  setCategory: (category: CategoryId | "all") => void;
  setCutFilter: (cut: CutKind | "all") => void;
  showItem: (itemId: string) => void;
  setRunShown: (shown: boolean) => void;
  setBasketOpen: (open: boolean) => void;
  openAuction: (itemId?: string) => void;
  closeAuction: () => void;
};

const clampWeight = (weight: number) => Math.min(MAX_WEIGHT, Math.max(WEIGHT_STEP, weight));

const sameLine = (line: BasketLine, itemId: string, cutIndex: number) =>
  line.itemId === itemId && line.cutIndex === cutIndex;

export const useStore = create<Store>()(
  persist(
    (set) => ({
      lines: [],
      zone: ZONES[0],
      slot: "early",
      category: "all",
      cutFilter: "all",
      highlightId: null,
      runShown: false,
      basketOpen: false,
      auctionOpen: false,
      auctionItemId: null,
      addLine: (line) =>
        set((state) => {
          const existing = state.lines.find((l) => sameLine(l, line.itemId, line.cutIndex));
          return {
            lines: existing
              ? state.lines.map((l) =>
                  l === existing ? { ...l, weight: clampWeight(l.weight + line.weight) } : l,
                )
              : [...state.lines, line],
          };
        }),
      setWeight: (itemId, cutIndex, weight) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            sameLine(l, itemId, cutIndex) ? { ...l, weight: clampWeight(weight) } : l,
          ),
        })),
      removeLine: (itemId, cutIndex) =>
        set((state) => ({ lines: state.lines.filter((l) => !sameLine(l, itemId, cutIndex)) })),
      clearBasket: () => set({ lines: [] }),
      setZone: (zone) => set({ zone }),
      setSlot: (slot) => set({ slot }),
      setCategory: (category) => set({ category, cutFilter: "all" }),
      setCutFilter: (cutFilter) => set({ cutFilter }),
      showItem: (itemId) => {
        set({ category: "all", cutFilter: "all", highlightId: itemId });
        setTimeout(() => set({ highlightId: null }), 2500);
      },
      setRunShown: (runShown) => set({ runShown }),
      setBasketOpen: (basketOpen) => set({ basketOpen }),
      openAuction: (itemId) => set({ auctionOpen: true, auctionItemId: itemId ?? null }),
      closeAuction: () => set({ auctionOpen: false }),
    }),
    {
      name: "sss-seafood-basket",
      skipHydration: true,
      partialize: ({ lines, zone, slot }) => ({ lines, zone, slot }),
      // A saved basket can hold items since taken off the menu.
      merge: (saved, current) => {
        const restored = saved as Partial<Store> | undefined;
        return {
          ...current,
          ...restored,
          lines: (restored?.lines ?? []).filter((line) =>
            CATALOG.find((item) => item.id === line.itemId)?.cuts[line.cutIndex],
          ),
        };
      },
    },
  ),
);

export function basketTotals(lines: BasketLine[]) {
  const subtotal = lines.reduce((sum, line) => {
    const item = CATALOG.find((i) => i.id === line.itemId);
    return sum + (item ? item.price * line.weight : 0);
  }, 0);
  const dispatch = subtotal === 0 || subtotal > FREE_DISPATCH_ABOVE ? 0 : DISPATCH_FEE;
  return { subtotal, dispatch, total: subtotal + dispatch };
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
