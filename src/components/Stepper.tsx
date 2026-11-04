"use client";

import { Minus, Plus } from "lucide-react";
import { kg } from "@/lib/catalog";
import { MAX_WEIGHT, WEIGHT_STEP } from "@/lib/store";

export function Stepper({
  weight,
  onChange,
  label,
}: {
  weight: number;
  onChange: (weight: number) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={`Gross weight of ${label}`} className="stepper">
      <button
        type="button"
        aria-label={`Reduce ${label} by ${WEIGHT_STEP} kg`}
        disabled={weight <= WEIGHT_STEP}
        onClick={() => onChange(weight - WEIGHT_STEP)}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{kg(weight)}</output>
      <button
        type="button"
        aria-label={`Add ${WEIGHT_STEP} kg of ${label}`}
        disabled={weight >= MAX_WEIGHT}
        onClick={() => onChange(weight + WEIGHT_STEP)}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
