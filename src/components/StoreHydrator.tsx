"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

/** Restores the saved basket after hydration so server and client markup match. */
export function StoreHydrator() {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);
  return null;
}
