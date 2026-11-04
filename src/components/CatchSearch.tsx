"use client";

import { Search } from "lucide-react";
import { useId, useState } from "react";
import { rupees, searchCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function CatchSearch() {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const showItem = useStore((s) => s.showItem);
  const results = searchCatalog(query);
  const expanded = open && query.trim().length > 0;

  const choose = (id: string) => {
    showItem(id);
    setQuery("");
    setOpen(false);
    setActive(0);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter" && expanded) {
      event.preventDefault();
      choose(results[active].id);
    }
  };

  return (
    <div className="relative">
      <Search size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#52627A]" />
      <input
        type="search"
        role="combobox"
        aria-label="Search fish in Tamil or English"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-activedescendant={expanded && results.length ? `${listId}-${active}` : undefined}
        autoComplete="off"
        placeholder="Search vanjaram, வஞ்சிரம், prawns…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
        className="h-10 w-full rounded-md bg-white pr-3 pl-9 text-sm text-ink placeholder:text-[#52627A]"
      />
      {expanded && (
        <ul id={listId} role="listbox" aria-label="Matching catch" className="absolute inset-x-0 top-full z-40 mt-1 overflow-hidden rounded-md border border-line bg-white text-ink shadow-[0_12px_32px_rgb(7_21_36/0.3)]">
          {results.map((item, index) => (
            <li
              key={item.id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === active}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(item.id);
              }}
              onMouseEnter={() => setActive(index)}
              className={`flex cursor-pointer items-baseline justify-between gap-3 px-3 py-2 text-sm ${index === active ? "bg-[#FFF1E6]" : ""}`}
            >
              <span>
                <span className="font-semibold">{item.name}</span> <span className="text-[#52627A]">{item.tamilName}</span>
              </span>
              <span className="font-semibold tabular-nums">{rupees(item.price)}/kg</span>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-2.5 text-sm text-[#52627A]">No catch by that name today. Try a Tamil or English fish name.</li>
          )}
        </ul>
      )}
    </div>
  );
}
