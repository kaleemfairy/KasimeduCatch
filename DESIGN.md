# Design

The palette and type below are pinned by the project blueprint.

## Tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| navy | #0D253F | Header, hero, specimen plates, pre-order section |
| deep | #071524 | Utility bar, footer, text on orange and green |
| dawn | #F97316 | Primary buttons, active chips, accents on dark |
| dawn-ink | #C2410C | Orange text on light grounds (passes 4.5:1) |
| sand | #FBF9F3 | Page ground |
| sea-green | #10B981 | "Added" state, WhatsApp button |
| green-ink | #047857 | Net yield and FREE labels on light grounds |
| muted | #52627A | Secondary text on light grounds |

Oswald is the display face (uppercase headings, prices, buttons). Plus Jakarta Sans is the body face. Anek Tamil supplies Tamil glyphs in both stacks.

## Rules

- Orange and green buttons carry dark text. White on these colours fails contrast at button size.
- Numbers use tabular figures.
- Corners stay small: 0.2rem on tags, 0.375rem on controls, 0.5rem on panels.
- Icons come from Lucide. No emoji.
- Motion is limited to the drawer and modal entrance, the confirmation tick and the dock beacon. All of it respects reduced motion.

## Signature elements

- **Dock clock** (`Hero.tsx`): a timeline from 3 AM to 1 PM with a marker at the real Chennai time. Header and hero copy follow it. Preview any time with `?dockTime=07:30`.
- **Specimen plates** (`Specimen.tsx`): drawn fish on navy, shown for any item without an `image` in `catalog.ts`.
