# Concierge dogfood matrix

Run these in Typebot development mode with synthetic contact information. The
approved flow is: **free text → goal → duration → experience preference → concise recommendation →
View available times / Change my answers / Ask the spa**.

The SvelteKit menu mirrors the 20-service demo catalog. The live concierge loads
active, duration-eligible services from Airtable through Make, then asks DeepSeek
to select only from that shortlist. Cal.com is the booking authority and
collects booking contact details. Typebot collects name
and email only after an explicit **Ask the spa** choice. Tally is for
post-booking intake and feedback. The operator should receive a useful summary.

| Case               | Visitor request                                         | Expected result                                                                                |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Massage fit        | Neck and back tension, firm pressure, quiet, 60 minutes | Tranquility Massage; show the three recommendation actions                                     |
| Salt cave fit      | Quiet, low-touch reset, 45 minutes                      | Salt Cave Reset; show the three recommendation actions                                         |
| Facial fit         | Hydration and glow, 60 minutes                          | Radiance Facial; show the three recommendation actions                                         |
| Catalog categories | Browse Massage, Facial, Body, and Ritual                | Filter the menu and verify the visible count updates accessibly                                |
| Profile fallback   | Ask to book Deep Release Massage, 75 minutes            | Use the general Cal profile URL; do not invent a dedicated event URL                           |
| Duration mismatch  | Ask for Deep Release Massage with only 30 minutes       | Say there is no confident match; do not silently substitute a shorter treatment                |
| Free-text context  | Asks how salt cave and massage differ                   | Continue to the fixed goal and duration questions; preserve the request for a staff summary    |
| Outside catalogue  | Requests a 30-minute deep-tissue massage                | Do not invent a service; use the selected goal and duration rules                              |
| Uncertain visitor  | Selects I’m still not sure                              | Use the remaining answers to make one approved recommendation or offer staff help              |
| Change answers     | Chooses Change my answers                               | Return to the goal and duration path                                                           |
| View times         | Chooses View available times                            | Send the visitor to the matching Cal.com booking destination; Cal.com collects booking contact |
| Ask the spa        | Chooses Ask the spa                                     | Ask for name and email, then send the staff-help request and useful summary                    |

## Pass criteria

- The flow stays free text → goal → duration → experience preference → one concise recommendation.
- Airtable returns only active services with the selected duration before AI ranking.
- The recommendation actions are exactly View available times, Change my answers, and Ask the spa.
- Cal.com is the only authority for available times and booking contact.
- Typebot asks for name and email only after Ask the spa.
- No safety questionnaire, safety case, medical answer, or safety-oriented copy appears.
- Free text cannot override the fixed service rules.
- No service, duration, price, availability, or operator detail is invented.
- The operator summary includes the visitor's free-text request, goal, duration,
  recommendation, and staff-help contact when provided.

## Preview API testing notes

- The site uses Typebot's native `previewMessage` with `autoShowDelay`; it never
  auto-opens the chat window.
- `onOpen` and `onPreviewMessageDismissed` set the
  `typebotPreviewDismissed` localStorage key. A fresh browser profile is needed
  to test the preview again.
- Verify the floating bubble opens the native Typebot window and that no custom
  chat UI is rendered by the site.

## Release matrix

| Surface            | Check                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| Local presentation | `npm run check`, `npm run build`, `npm run lint`, `npm run check:catalog` |
| Typebot preview    | Fresh profile: preview appears once; open or dismiss: it stays hidden     |
| Core flow          | Recommendation, duration mismatch, Cal.com handoff, Ask the spa           |
| Public smoke test  | Desktop and mobile: bubble opens; links and copy match this flow          |

Keep release checks manual and small. No new infrastructure is needed.
