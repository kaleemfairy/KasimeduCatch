"use client";

import { useEffect, useState } from "react";

// All dock times are minutes since midnight, India Standard Time.
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const hm = (hours: number, minutes = 0) => hours * 60 + minutes;

export const AUCTION_OPEN = hm(3, 30);
export const DOCK_CLOSE = hm(11, 30);
const NEXT_LANDING = hm(4, 30);

export const CLOCK_START = hm(3);
export const CLOCK_END = hm(13);

export const CLOCK_STOPS = [
  { at: AUCTION_OPEN, time: "3:30 AM", label: "Dawn auction" },
  { at: hm(4, 30), time: "4:30 AM", label: "Boats unloaded" },
  { at: hm(6, 30), time: "6:30 AM", label: "First van leaves" },
  { at: hm(10), time: "10:00 AM", label: "Second van leaves" },
  { at: DOCK_CLOSE, time: "11:30 AM", label: "Dock closes" },
];

export type SlotId = "early" | "prelunch";

export const SLOTS: {
  id: SlotId;
  label: string;
  short: string;
  cutoff: number;
  departs: string;
}[] = [
  {
    id: "early",
    label: "Early Catch: 7:00 AM - 10:00 AM",
    short: "Early Morning (7 AM - 10 AM)",
    cutoff: hm(9),
    departs: "6:30 AM",
  },
  {
    id: "prelunch",
    label: "Pre-Lunch Run: 10:30 AM - 1:00 PM",
    short: "Pre-Lunch (10:30 AM - 1 PM)",
    cutoff: DOCK_CLOSE,
    departs: "10:00 AM",
  },
];

export const getSlot = (id: SlotId) => SLOTS.find((slot) => slot.id === id) ?? SLOTS[0];

function toMinutes(date: Date) {
  const ist = new Date(date.getTime() + IST_OFFSET_MS);
  return ist.getUTCHours() * 60 + ist.getUTCMinutes();
}

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes % 60).padStart(2, "0")} ${suffix}`;
}

function formatLeft(minutes: number) {
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

export type DockNow = {
  minutes: number;
  time: string;
  isOpen: boolean;
  /** Today's boats have unloaded and the dock is still selling. */
  hasCatch: boolean;
  closesIn: string | null;
  /** Date label for the next boat landing, e.g. "Thu 5 Nov, 4:30 AM". */
  nextLanding: string;
  isSlotOpen: (slotId: SlotId) => boolean;
};

export function readDock(date: Date, overrideMinutes?: number): DockNow {
  const minutes = overrideMinutes ?? toMinutes(date);
  const isOpen = minutes < DOCK_CLOSE;
  const landing = new Date(date.getTime() + (minutes >= NEXT_LANDING ? 86400000 : 0));
  const day = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(landing);
  return {
    minutes,
    time: formatMinutes(minutes),
    isOpen,
    hasCatch: isOpen && minutes >= NEXT_LANDING,
    closesIn: isOpen ? formatLeft(DOCK_CLOSE - minutes) : null,
    nextLanding: `${day.replace(",", "")}, 4:30 AM`,
    isSlotOpen: (slotId) => !isOpen || minutes < getSlot(slotId).cutoff,
  };
}

/** `?dockTime=07:30` previews the page at that time of day. */
function readOverride() {
  const match = new URLSearchParams(window.location.search)
    .get("dockTime")
    ?.match(/^(\d{1,2}):(\d{2})$/);
  return match ? hm(Number(match[1]), Number(match[2])) : undefined;
}

/** The live dock state, or null during server render and first paint. */
export function useDockNow() {
  const [dock, setDock] = useState<DockNow | null>(null);
  useEffect(() => {
    const override = readOverride();
    const tick = () => setDock(readDock(new Date(), override));
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, []);
  return dock;
}
