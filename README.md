# Tranquility Spa Concierge

A working prototype showing how spas can turn service confusion into a concise recommendation, confident booking, and a useful operator summary. It is a fictional portfolio project, not a client site or a claim of a real engagement.

[View the live prototype](https://spa-concierge-prototype.pages.dev/)

![Tranquility Spa Concierge desktop preview](design/rendered-desktop.png)

## The problem

A spa menu can leave people choosing by title instead of by what they actually need. Tranquility makes the first decision simpler: describe how you want to feel, receive one considered recommendation, then book or continue the conversation.

## Product journey

1. **Start in free text** — the visitor shares a goal and preferred duration.
2. **Receive one concise recommendation** — Typebot keeps the decision focused.
3. **Book in Cal.com** — Cal.com is the booking authority and collects booking contact details.
4. **Support the visit** — Tally handles post-booking intake and feedback, while the operator receives a useful summary.

Typebot is only for the deterministic recommendation flow and staff-help requests. When a visitor chooses **Ask the spa**, it collects their name and email so staff can follow up; it does not capture contact for booking. DeepSeek turns the visitor's supplied answers into a concise staff summary only after that choice—it does not select the treatment.

This site is only the presentation layer. Live operations remain Typebot, Make, Airtable, Tally, Cal.com, and Gmail.

## Architecture

- SvelteKit 5 with TypeScript and Svelte runes.
- `@sveltejs/adapter-static` with an `index.html` fallback for Cloudflare Pages.
- One page with semantic sections, local photography, direct Cal.com booking links, and Typebot's official bubble embed.
- No UI framework or component library.

## Guardrails

- The concierge recommends from the fictional treatment menu. Cal.com owns availability and booking; Typebot does not request live availability through Make.
- Tally is reserved for post-booking intake and feedback. Typebot collects name and email only for an explicit Ask the spa request.
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

The recommendation, duration, booking, staff-help, and catalogue scenarios used to test the concierge are documented in [DOGFOOD.md](DOGFOOD.md).

The Typebot public ID is widget configuration, not a secret. No API keys or credentials belong in this repository. Cal.com URLs are public booking destinations.

## Cloudflare Pages

Build command: `npm run build`  
Output directory: `build`  
Node version: use the current LTS version supported by the project.

No environment variables are required for the static presentation site. Configure Typebot, DeepSeek, Make, Airtable, Tally, Cal.com, and Gmail credentials only in their respective hosted tools.

## License

MIT. See `LICENSE`.
