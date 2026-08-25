# Tranquility Spa Concierge

A working prototype showing how spas can turn service confusion into confident bookings and coordinate intake, aftercare, and feedback. It is a fictional portfolio project, not a client site or a claim of a real engagement.

[View the live prototype](https://spa-concierge-prototype.pages.dev/)

![Tranquility Spa Concierge desktop preview](design/rendered-desktop.png)

## The problem

A spa menu can leave people choosing by title instead of by what they actually need. Tranquility makes the first decision simpler: describe how you want to feel, receive one considered recommendation, then book or continue the conversation.

## Product journey

1. **Choose with confidence** — the Voiceflow concierge guides an uncertain visitor.
2. **Prepare with intention** — the operational journey can collect preferences through Tally and Make.
3. **Arrive already known** — Airtable and Gmail can carry a concise summary into the appointment.
4. **Continue the care** — follow-up and aftercare remain part of the operational workflow.

This site is only the presentation layer. Live operations remain Voiceflow, Make, Airtable, Tally, Cal.com, and Gmail.

## Architecture

- SvelteKit 5 with TypeScript and Svelte runes.
- `@sveltejs/adapter-static` with an `index.html` fallback for Cloudflare Pages.
- One page with semantic sections, local photography, Cal.com booking fallbacks, and the official Voiceflow web-chat loader.
- No UI framework or component library.

## Guardrails

- The site does not diagnose, triage medical conditions, or make health claims.
- The concierge recommends from the fictional treatment menu. Its advanced path requests live Cal.com availability through Make before offering a time; it should never invent a slot.
- Personal preferences should only be collected by the connected operational tools and handled according to their policies.
- Direct booking links remain explicit external fallbacks and open in a new tab.

## Design references

The visual direction is recorded in `design/hero-concept.png`, `design/services-concept.png`, and `design/experience-concept.png`. Production UI uses only the standalone images in `static/images/`.

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
npm run lint    # Prettier formatting check
```

The consent, safety, timing, and catalogue scenarios used to test the concierge are documented in [DOGFOOD.md](DOGFOOD.md).

The Voiceflow project ID is public widget configuration, not a secret. No API keys or credentials belong in this repository. Cal.com URLs are public booking destinations.

## Cloudflare Pages

Build command: `npm run build`  
Output directory: `build`  
Node version: use the current LTS version supported by the project.

No environment variables are required for the static presentation site. Configure Voiceflow, Make, Airtable, Tally, Cal.com, and Gmail credentials only in their respective hosted tools.

## License

MIT. See `LICENSE`.
