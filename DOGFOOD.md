# Concierge dogfood matrix

Run these in Typebot development mode with synthetic contact information. The
approved flow is: **free text → goal → duration → experience preference → concise recommendation →
Open full Cal calendar / Choose a time here / Change my answers / Ask the spa**. The full Cal calendar path is unchanged and remains the reliable fallback.

The SvelteKit menu mirrors the 20-service demo catalog. The six booking pools
are the local link model: services in a pool share its Cal.com event slug while
the generated URL preserves each service and duration as query prefills. The live
concierge loads active, duration-eligible services from Airtable through Make, then asks DeepSeek
to select only from that shortlist. Cal.com is the booking authority and
collects booking contact details. Typebot collects name
and email only after an inline time selection or an explicit **Ask the spa** choice. Tally is for
post-booking intake and feedback. The operator should receive a useful summary.

| Case                | Visitor request                                         | Expected result                                                                                                             |
| ------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Massage fit         | Neck and back tension, firm pressure, quiet, 60 minutes | Tranquility Massage; use `massage-bodywork`; show all four next-step actions                                                |
| Facials fit         | Hydration and glow, 60 minutes                          | Radiance Facial; use `facials`; show all four next-step actions                                                             |
| Body fit            | Renewed skin, 60 minutes                                | Seasonal Body Polish; use `body-treatments`; show all four next-step actions                                                |
| Salt cave fit       | Quiet, low-touch reset, 45 minutes                      | Salt Cave Reset; use `salt-cave`; show all four next-step actions                                                           |
| Restorative fit     | Gentle sensory pause, 45 minutes                        | Aromatherapy Reset; use `restorative-rituals`; show all four next-step actions                                              |
| Consultation fit    | Unsure where to start, 30 minutes                       | Custom Care Consultation; use `consultation`; show all four next-step actions                                               |
| Shared pool links   | Compare Tranquility Massage and Deep Release Massage    | Same Cal event path; each keeps its own `duration` and built-in `notes=Recommended service: …` prefill                      |
| Catalog categories  | Browse Massage, Facial, Body, and Ritual                | Filter the menu and verify the visible count updates accessibly                                                             |
| Generated booking   | Ask to book Deep Release Massage, 75 minutes            | Use the massage-bodywork pool URL with `duration=75` and its service prefill                                                |
| Duration mismatch   | Ask for Deep Release Massage with only 30 minutes       | Say there is no confident match; do not silently substitute a shorter treatment                                             |
| Free-text context   | Asks how salt cave and massage differ                   | Continue to the fixed goal and duration questions; preserve the request for a staff summary                                 |
| Outside catalogue   | Requests a 30-minute deep-tissue massage                | Do not invent a service; use the selected goal and duration rules                                                           |
| Uncertain visitor   | Selects I’m still not sure                              | Use the remaining answers to make one approved recommendation or offer staff help                                           |
| Change answers      | Chooses Change my answers                               | Return to the goal and duration path                                                                                        |
| Full calendar       | Chooses Open full Cal calendar                          | Send the visitor to the matching Cal.com destination unchanged; Cal.com collects booking contact                            |
| Inline availability | Chooses Choose a time here                              | Make returns three real Cal slots for tomorrow in Eastern Time; never invent a slot; retain the full-calendar fallback      |
| Inline booking      | Selects a returned slot, then submits contact           | Ask name/email only here; Make creates one Cal booking with the pool slug, selected slot, contact, and recommendation notes |
| Ask the spa         | Chooses Ask the spa                                     | Ask for name and email, then send the staff-help request and useful summary                                                 |

## Pass criteria

- The flow stays free text → goal → duration → experience preference → one concise recommendation.
- Airtable returns only active services with the selected duration before AI ranking.
- The recommendation actions include the unchanged Open full Cal calendar fallback and the advanced Choose a time here path, plus Change my answers and Ask the spa.
- Cal.com is the only authority for available times and bookings. Inline availability must show the configured timezone and only Make-returned slots.
- Inline contact is collected only after a selected slot; submit one Create Booking request and verify one Cal booking. A stale slot or API error must show recovery guidance and the full calendar route.
- The existing Booking Created scenario remains the sole downstream writer of one Airtable appointment and one intake email.
- Typebot asks for name and email only after an inline time selection or Ask the spa.
- No safety questionnaire, safety case, medical answer, or safety-oriented copy appears.
- Free text cannot override the fixed service rules.
- No service, duration, price, availability, or operator detail is invented.
- The operator summary includes the visitor's free-text request, goal, duration,
  recommendation, and staff-help contact when provided.
- A real Cal.com booking triggers **Spa Concierge — Booking Created**, which creates the Airtable appointment and emails the existing Tally intake link to the guest.
- The Airtable **Complete visit** action triggers **Spa Concierge — Visit Completed**, which sends the visit note, aftercare guidance, and existing Tally feedback link.

## Preview API testing notes

- Use Typebot's authenticated preview endpoint when testing the draft. It runs
  DeepSeek and Make, but does not consume the published bot's Typebot usage.
- The production Typebot should contain no Script blocks and no code-based Set
  variable blocks. Make returns recommendation fields and display-ready slots.
- The site uses Typebot's native `previewMessage` with `autoShowDelay`; it never
  auto-opens the chat window.
- `onOpen` and `onPreviewMessageDismissed` set the
  `typebotPreviewDismissed` localStorage key. A fresh browser profile is needed
  to test the preview again.
- Verify the floating bubble opens the native Typebot window and that no custom
  chat UI is rendered by the site.

## Release matrix

| Surface            | Check                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------- |
| Local presentation | `npm run check`, `npm run build`, `npm run lint`, `npm run check:catalog`                     |
| Typebot preview    | Fresh profile: preview appears once; open or dismiss: it stays hidden                         |
| Core flow          | Recommendation, duration mismatch, full Cal handoff, inline availability/booking, Ask the spa |
| Booking automation | Complete a real Cal booking; verify one Airtable appointment and the Tally intake email       |
| Visit automation   | Use Airtable **Complete visit**; verify aftercare and the Tally feedback email                |
| Public smoke test  | Desktop and mobile: bubble opens; links and copy match this flow                              |

Keep release checks manual and small. No new infrastructure is needed.
