# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Zustand, Lucide icons. Chosen by the user from the blueprint's options.

## Hosting

GitHub Pages at https://kaleemfairy.github.io/KasimeduCatch/, deployed by `.github/workflows/deploy.yml` on each push to `main`. Static export only, so no server code or API routes.

## Users

Chennai households buying fish for the day's cooking, often on a phone in the early morning. They know their fish by Tamil name and care about freshness, how it will be cut and how much they get after cleaning.

## Product Purpose

SSS Seafoods – Kasimedu Catch sells same-day fish bought at Kasimedu Fishing Harbour at dawn, cleaned, packed on RO ice and delivered across Chennai. Success is a customer going from "what came in today?" to a filled WhatsApp order in about a minute.

## Positioning

Fish bought off the boat at Kasimedu at 4 AM, cut to order and sold by gross weight with the net yield stated up front.

## Operating Context

- Orders are handed off to WhatsApp. There is no backend, no payment and no stored order.
- Payment happens by UPI or cash on dispatch, after a live scale photo on WhatsApp.
- Dock hours and dispatch slots are in India Standard Time, whatever the visitor's device says.

## Capabilities and Constraints

- Basket, cut selection, net yield, weight stepper. Home delivery across Chennai is free on every order, at the client's request.
- Dawn Auction and pre-order forms validate, confirm, and open WhatsApp.
- No live stock feed exists. Stock, boat numbers and landing times are static seed data.

## Brand Commitments

- Name: SSS Seafoods – Kasimedu Catch.
- Logo: `public/images/sss-seafood-logo.png`, the supplied badge with its black background removed. Source is 640px, so a larger master is needed for print or large display.
- Tamil labels sit beside English names throughout.
- Palette and type are pinned by the blueprint: navy #0D253F, footer #071524, dawn orange #EA580C / #F97316 / #F57C00, sand #FBF9F3, green #059669 / #10B981, Oswald display, Plus Jakarta Sans body.

## Evidence on Hand

All placeholders, per the user, until replaced before launch. They live in `src/lib/site.ts` and `src/lib/catalog.ts`:

- FSSAI licence number and wharf address. The phone and WhatsApp number (+91 90809 14945) is real, from the client's menu poster.
- "12,000+ households", the formalin test figure.
- Item names and prices are real, from the client's menus. Latest price list: 2026-11-10 (37 items). Items not on that list (Kanakathi, Parala, Thuna, and the Boneless Fillet tab) were kept at the user's request, at their earlier prices.
- Testimonials, which are labelled as samples on the page.
- Net yields are the client's: fish 700-750g, prawn 450-500g, squid 600-650g, crab 550-650g per kg, the same for every cut; boneless items are ready meat. Tags, cut options and landing times are still placeholders.
- Menu images: from the client, sources in `Images/` and `Images/New Menu Images/`, served from `public/images/menu/`. Four new images looked wrong and were not used: Vanjaram (looks like mackerel or tuna), Blue Crab (cooked), and Black Vavval (looks silver). Those items use earlier photos.

## Product Principles

1. Tamil name first-class: a customer can search and recognise fish in either language.
2. State what you get: net yield and final price are visible before adding to the basket.
3. One tap to a human: every order path ends in a filled WhatsApp message.
4. Never pretend to be live: anything shown as current must come from the real clock.

## Accessibility & Inclusion

Phone-first, works in bright daylight, full keyboard use for drawer and modal, reduced-motion respected.
