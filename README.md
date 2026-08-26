# Tranquility Spa Concierge

A working prototype showing how spas can turn service confusion into a concise recommendation, confident booking, and a useful operator summary. It is a fictional portfolio project, not a client site or a claim of a real engagement.

[View the live prototype](https://spa-concierge-prototype.pages.dev/)

[See how the complete system works](https://spa-concierge-prototype.pages.dev/system)

![Tranquility Spa Concierge desktop preview](design/rendered-desktop.png)

## The problem

A spa menu can leave people choosing by title instead of by what they actually need. Tranquility makes the first decision simpler: describe how you want to feel, receive one considered recommendation, then book or continue the conversation.

## Product journey

1. **Start in free text** — the visitor describes what they want, then chooses a goal, duration, and experience style.
2. **Receive one concise recommendation** — Make loads the eligible Airtable services and DeepSeek chooses only from that shortlist.
3. **Book in Cal.com** — the visitor can either open the reliable full Cal calendar, or choose a real Cal slot inline through the optional Make scenarios. Cal.com remains the booking authority.
4. **Support the visit** — Tally handles post-booking intake and feedback, while the operator receives a useful summary.

Typebot collects contact details only after the visitor either selects an inline time or chooses **Ask the spa**. The full Cal calendar collects its own booking contact. The live recommendation is constrained by Airtable's active services and the selected duration. DeepSeek can rank those eligible services, but it cannot invent a treatment or alter its booking URL.

This site is only the presentation layer. Live operations remain Typebot, Make, Airtable, Tally, Cal.com, and Gmail.

The approved production-like handoff is: a real Cal.com booking triggers Make scenario **Spa Concierge — Booking Created**, which records the appointment in Airtable and emails the guest the existing Tally intake link. After the visit, the Airtable operator action **Complete visit** triggers **Spa Concierge — Visit Completed**, which sends the visit note, aftercare guidance, and existing Tally feedback link to the guest.

## Architecture

- SvelteKit 5 with TypeScript and Svelte runes.
- `@sveltejs/adapter-static` with an `index.html` fallback for Cloudflare Pages.
- A realistic spa site plus a plain-language system tour, both with semantic sections, local photography, and Typebot's official bubble embed.
- A typed 20-service demo catalog in `src/lib/catalog.ts` renders the public menu with category filtering. Six booking pools map services to shared Cal.com events; links are generated with duration and Cal’s built-in notes prefill. Airtable is the editable source used by the live concierge.
- No UI framework or component library.

## Guardrails

- Make filters Airtable by active status and exact duration before DeepSeek sees any candidates. A specifically named treatment is never replaced when its duration does not fit.
- Cal.com owns availability and booking; the concierge never invents an open time. The inline path displays only slots returned by Make/Cal and sends the selected service, duration, slot, timezone, and contact to the Create Booking scenario.
- The full Cal calendar is an explicit fallback and remains unchanged. Inline Create Booking must only create the Cal booking; the existing **Booking Created** webhook remains the sole path for the Airtable appointment and intake email.
- Tally is reserved for post-booking intake and feedback. Typebot collects name and email only after an inline time selection or an explicit Ask the spa request.
- Direct booking links remain explicit external fallbacks and open in a new tab.

## Design references

The visual direction is recorded in `design/hero-concept.png`, `design/services-concept.png`, `design/experience-concept.png`, and `design/how-system-works-concept.png`. Production UI uses only the standalone images in `static/images/`.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Commands

```bash
npm run check   # Svelte and TypeScript checks
npm run build   # static production build
npm run lint          # Prettier formatting check
npm run check:catalog # Catalog pools, mappings, URLs, active state, and durations
```

The recommendation, duration, booking, staff-help, catalogue, and post-visit automation checks are documented in [DOGFOOD.md](DOGFOOD.md). Representative catalog coverage includes one booking-pool case for each of Massage & Bodywork, Facials, Body Treatments, Salt Cave, Restorative Rituals, and Consultation. Services in the same pool share one Cal event while retaining their own duration and built-in notes prefills.

`scripts/build-typebot-production.mjs` reproduces the production-shaped Typebot canvas from an exported bot payload. Set `SPA_FIND_AVAILABILITY_WEBHOOK` and `SPA_CREATE_BOOKING_WEBHOOK` to the exact existing Make webhook URLs when building; the script contains no API keys. The availability scenario returns Cal.com's date-keyed slot data. The booking scenario returns Cal.com's booking record, including its `uid`.

The Typebot public ID is widget configuration, not a secret. No API keys belong in this repository. Cal.com URLs are public booking destinations.

## Cloudflare Pages

Build command: `npm run build`  
Output directory: `build`  
Node version: use the current LTS version supported by the project.

No environment variables are required for the static presentation site. Configure Typebot, DeepSeek, Make, Airtable, Tally, Cal.com, and Gmail credentials only in their respective hosted tools.

## License

MIT. See `LICENSE`.
