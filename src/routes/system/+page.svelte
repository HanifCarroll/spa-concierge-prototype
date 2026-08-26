<script lang="ts">
  type TypebotClient = { open?: () => void };
  type ConciergeWindow = typeof globalThis & {
    Typebot?: TypebotClient;
    typebotReady?: Promise<unknown>;
  };

  const journey = [
    [
      'Describe the need',
      'The guest explains what they want, how much time they have, and what matters today.'
    ],
    [
      'Receive one recommendation',
      'The concierge matches the request to an active service approved by the spa.'
    ],
    [
      'Choose a time',
      'The guest moves to the booking calendar and selects real availability.'
    ],
    [
      'Complete intake',
      'A short form gathers the information the team needs before the appointment.'
    ],
    [
      'Arrive prepared',
      'Staff review the booking, intake, and recommendation context together.'
    ],
    [
      'Receive follow-up',
      'Aftercare and a feedback request are sent after the visit.'
    ]
  ];

  const staffViews = [
    [
      'Visit Queue',
      'Today’s appointments, service, status, and intake completion.',
      'Daily'
    ],
    [
      'Service Catalog',
      'Service details, durations, active status, recommendation rules, and booking groups.',
      'When the menu changes'
    ],
    [
      'Needs Attention',
      'Missing intake, staff-help requests, low feedback, and unresolved exceptions.',
      'As issues appear'
    ],
    [
      'Operations Dashboard',
      'Booking volume, completion, feedback, and service demand.',
      'Weekly or monthly'
    ]
  ];

  const automaticActions = [
    [
      'Recommendation',
      'Matches the guest’s answers to the approved catalog.',
      'Typebot + service rules'
    ],
    [
      'Booking confirmation',
      'Confirms the time and captures booking contact details.',
      'Cal.com'
    ],
    [
      'Visit record',
      'Creates the operational record for staff.',
      'Make + Airtable'
    ],
    ['Intake request', 'Sends the post-booking intake form.', 'Make + Tally'],
    [
      'Aftercare',
      'Sends the guidance recorded by staff after the visit.',
      'Make + email'
    ],
    [
      'Feedback',
      'Requests feedback and flags responses that need attention.',
      'Tally + Make'
    ]
  ];

  async function openConcierge() {
    const conciergeWindow = globalThis as ConciergeWindow;
    await conciergeWindow.typebotReady;
    conciergeWindow.Typebot?.open?.();
  }
</script>

<svelte:head>
  <title>System overview — Tranquility Spa Concierge</title>
  <meta
    name="description"
    content="A plain-language overview of the Tranquility spa concierge system."
  />
  <link
    rel="canonical"
    href="https://spa-concierge-prototype.pages.dev/system"
  />
</svelte:head>

<header class="document-bar">
  <a class="wordmark" href="/">Tranquility<span aria-hidden="true">.</span></a>
  <p>System overview</p>
  <a class="return-link" href="/"
    >Return to spa website <span aria-hidden="true">↗</span></a
  >
</header>

<main class="report" id="top">
  <section class="cover" aria-labelledby="report-title">
    <div class="cover-copy">
      <p class="kicker">Portfolio case study · Working prototype</p>
      <h1 id="report-title">A connected spa concierge system</h1>
      <p class="summary">
        This prototype helps a guest choose an appropriate service, book it,
        complete intake, arrive with staff prepared, and receive follow-up
        afterward.
      </p>
      <dl class="document-meta">
        <div>
          <dt>Audience</dt>
          <dd>Spa owners and operations teams</dd>
        </div>
        <div>
          <dt>Purpose</dt>
          <dd>Reduce service confusion and manual follow-up</dd>
        </div>
        <div>
          <dt>Prototype scope</dt>
          <dd>20 services across 6 booking groups</dd>
        </div>
        <div>
          <dt>Operating model</dt>
          <dd>Business-managed, no-code tools</dd>
        </div>
      </dl>
    </div>
    <figure class="cover-figure">
      <img src="/images/treatment-room.png" alt="A calm spa treatment room" />
      <figcaption>
        The customer-facing experience demonstrated by the system.
      </figcaption>
    </figure>
  </section>

  <section class="report-section" aria-labelledby="summary-title">
    <div class="section-label">
      <span>Executive summary</span><span>Page 01</span>
    </div>
    <h2 id="summary-title">What the system changes</h2>
    <div class="summary-table">
      <div>
        <strong>Before</strong>
        <p>
          Guests browse a long menu, guess which service fits, or contact staff
          for help.
        </p>
      </div>
      <div>
        <strong>After</strong>
        <p>
          Guests describe their need and receive one approved recommendation
          that fits their time.
        </p>
      </div>
      <div>
        <strong>For staff</strong>
        <p>
          Booking, intake, visit context, aftercare, and feedback are organized
          around one visit record.
        </p>
      </div>
      <div>
        <strong>For the owner</strong>
        <p>
          The service catalog and operating views can be maintained without
          editing automation logic.
        </p>
      </div>
    </div>
    <aside class="key-point">
      <strong>Core idea</strong>
      <p>
        The system does not replace the spa’s expertise. It turns that expertise
        into a consistent journey guests and staff can follow.
      </p>
    </aside>
  </section>

  <nav class="contents report-section" aria-label="Report contents">
    <div class="section-label">
      <span>Contents</span><span>Sections 01–07</span>
    </div>
    <ol>
      <li><a href="#journey"><span>01</span>Guest journey</a></li>
      <li><a href="#map"><span>02</span>System map</a></li>
      <li><a href="#screens"><span>03</span>Guest and staff experience</a></li>
      <li><a href="#staff"><span>04</span>Staff operating views</a></li>
      <li>
        <a href="#automatic"><span>05</span>What happens automatically</a>
      </li>
      <li>
        <a href="#maintenance"><span>06</span>How the business maintains it</a>
      </li>
      <li><a href="#production"><span>07</span>Prototype and production</a></li>
    </ol>
  </nav>

  <section class="report-section" id="journey" aria-labelledby="journey-title">
    <div class="section-label">
      <span>Section 01</span><span>Guest journey</span>
    </div>
    <div class="section-intro">
      <h2 id="journey-title">One path from uncertainty to follow-up</h2>
      <p>
        The guest sees a simple sequence. Each step produces the information
        needed for the next one.
      </p>
    </div>
    <ol class="journey-list">
      {#each journey as step, index (step[0])}
        <li>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>{step[0]}</h3>
            <p>{step[1]}</p>
          </div>
        </li>
      {/each}
    </ol>
  </section>

  <section class="report-section" id="map" aria-labelledby="map-title">
    <div class="section-label">
      <span>Section 02</span><span>System map</span>
    </div>
    <div class="section-intro">
      <h2 id="map-title">How the parts connect</h2>
      <p>
        Guests use familiar customer-facing screens. Staff work in Airtable.
        Make moves information between the services.
      </p>
    </div>
    <figure class="system-map">
      <div class="map-column">
        <p class="map-heading">Guest-facing</p>
        <div class="map-node">
          <strong>Spa website</strong><span
            >Explains the offer and opens the concierge</span
          >
        </div>
        <span class="arrow">↓</span>
        <div class="map-node">
          <strong>Typebot concierge</strong><span
            >Collects the need and recommends an approved service</span
          >
        </div>
        <span class="arrow">↓</span>
        <div class="map-pair">
          <div class="map-node">
            <strong>Cal.com</strong><span>Booking</span>
          </div>
          <div class="map-node">
            <strong>Tally</strong><span>Intake and feedback</span>
          </div>
        </div>
      </div>
      <div class="map-bridge">
        <span>→</span><strong>Make</strong><small
          >Moves and formats information</small
        ><span>→</span>
      </div>
      <div class="map-column">
        <p class="map-heading">Staff-facing</p>
        <div class="map-node">
          <strong>Airtable</strong><span
            >Service catalog, visit records, queues, and dashboard</span
          >
        </div>
        <span class="arrow">↓</span>
        <div class="map-node">
          <strong>Email</strong><span
            >Confirmations, intake, aftercare, feedback, and alerts</span
          >
        </div>
      </div>
      <figcaption>
        Each tool has one clear job. The business does not need to manage a
        custom application server.
      </figcaption>
    </figure>
  </section>

  <section class="report-section" id="screens" aria-labelledby="screens-title">
    <div class="section-label">
      <span>Section 03</span><span>Interface examples</span>
    </div>
    <div class="section-intro">
      <h2 id="screens-title">What guests and staff actually see</h2>
      <p>
        The automation stays out of sight. Both sides use focused interfaces
        built around their immediate task.
      </p>
    </div>
    <div class="screen-grid">
      <figure>
        <div class="figure-heading">
          <span>Figure A</span><strong>Concierge conversation</strong>
        </div>
        <div class="phone" aria-label="Example concierge conversation">
          <div class="phone-top"><span>9:41</span><span>● ● ●</span></div>
          <div class="chat-title">Tranquility Concierge</div>
          <div class="chat-body">
            <p class="bubble">What would you like help with today?</p>
            <p class="bubble guest">
              My shoulders feel tight and I have about an hour.
            </p>
            <p class="bubble">
              I recommend the 60-minute Tranquility Massage. It matches your
              time and focus on muscle tension.
            </p>
            <button type="button" onclick={openConcierge}
              >Continue to booking →</button
            >
          </div>
        </div>
        <figcaption>
          The concierge asks only what it needs, returns one clear option, and
          hands booking to the calendar.
        </figcaption>
      </figure>

      <figure>
        <div class="figure-heading">
          <span>Figure B</span><strong>Daily operations view</strong>
        </div>
        <div class="staff-ui" aria-label="Example staff operations dashboard">
          <aside>
            <strong>Tranquility</strong><span class="active">Visit Queue</span
            ><span>Service Catalog</span><span>Needs Attention</span><span
              >Dashboard</span
            >
          </aside>
          <div class="staff-main">
            <div class="staff-heading">
              <div>
                <small>Tuesday · August 26</small>
                <h4>Good morning, team.</h4>
              </div>
              <span>4 visits today</span>
            </div>
            <div class="staff-panels">
              <section class="queue">
                <div class="panel-title">
                  <strong>Visit Queue</strong><small>View all →</small>
                </div>
                <div>
                  <time>9:00</time><span
                    ><b>Olivia M.</b><small>Tranquility Massage</small></span
                  ><em>Arriving</em>
                </div>
                <div>
                  <time>10:30</time><span
                    ><b>Daniel K.</b><small>Salt Cave Reset</small></span
                  ><em class="ready">Ready</em>
                </div>
                <div>
                  <time>12:00</time><span
                    ><b>Maya L.</b><small>Radiance Facial</small></span
                  ><em>In room</em>
                </div>
              </section>
              <section class="attention">
                <div class="panel-title">
                  <strong>Needs Attention</strong><small>3 items</small>
                </div>
                <p><b>Intake incomplete</b><small>2 guests</small></p>
                <p><b>Aftercare due</b><small>1 visit</small></p>
                <p><b>Low feedback</b><small>1 response</small></p>
              </section>
            </div>
          </div>
        </div>
        <figcaption>
          The daily view emphasizes upcoming visits and exceptions rather than
          the underlying workflows.
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="report-section" id="staff" aria-labelledby="staff-title">
    <div class="section-label">
      <span>Section 04</span><span>Staff operating views</span>
    </div>
    <div class="section-intro">
      <h2 id="staff-title">Four views cover routine operations</h2>
      <p>
        Staff do not work inside the automation. They use business screens that
        answer practical questions.
      </p>
    </div>
    <div class="data-table" role="table" aria-label="Staff operating views">
      <div class="table-row table-head" role="row">
        <span>View</span><span>What it answers</span><span>Used</span>
      </div>
      {#each staffViews as view (view[0])}<div class="table-row" role="row">
          <strong>{view[0]}</strong><span>{view[1]}</span><span>{view[2]}</span>
        </div>{/each}
    </div>
  </section>

  <section
    class="report-section"
    id="automatic"
    aria-labelledby="automatic-title"
  >
    <div class="section-label">
      <span>Section 05</span><span>Automation</span>
    </div>
    <div class="section-intro">
      <h2 id="automatic-title">What happens without staff chasing it</h2>
      <p>
        Automation handles predictable handoffs. People remain responsible for
        spa expertise, the visit itself, and unusual situations.
      </p>
    </div>
    <div class="data-table" role="table" aria-label="Automated actions">
      <div class="table-row table-head" role="row">
        <span>Action</span><span>What happens</span><span>System</span>
      </div>
      {#each automaticActions as action (action[0])}<div
          class="table-row"
          role="row"
        >
          <strong>{action[0]}</strong><span>{action[1]}</span><span
            >{action[2]}</span
          >
        </div>{/each}
    </div>
  </section>

  <section
    class="report-section"
    id="maintenance"
    aria-labelledby="maintenance-title"
  >
    <div class="section-label">
      <span>Section 06</span><span>Ownership and maintenance</span>
    </div>
    <div class="section-intro">
      <h2 id="maintenance-title">
        The business maintains the knowledge, not the plumbing
      </h2>
      <p>
        The service catalog is the source of truth. Routine updates happen there
        once and feed the rest of the journey.
      </p>
    </div>
    <div class="responsibility-grid">
      <article>
        <p class="responsibility-label">Spa team</p>
        <h3>Owns business information</h3>
        <ul>
          <li>Service details and availability</li>
          <li>Recommendation guidance</li>
          <li>Visit outcomes and aftercare notes</li>
        </ul>
      </article>
      <article>
        <p class="responsibility-label">System</p>
        <h3>Handles repeatable handoffs</h3>
        <ul>
          <li>Move records between tools</li>
          <li>Send scheduled messages</li>
          <li>Surface missing information</li>
        </ul>
      </article>
      <article>
        <p class="responsibility-label">Implementation partner</p>
        <h3>Supports structural changes</h3>
        <ul>
          <li>New integrations or rules</li>
          <li>Permissions and monitoring</li>
          <li>Major journey changes</li>
        </ul>
      </article>
    </div>
  </section>

  <section
    class="report-section"
    id="production"
    aria-labelledby="production-title"
  >
    <div class="section-label">
      <span>Section 07</span><span>Prototype and production</span>
    </div>
    <div class="section-intro">
      <h2 id="production-title">
        What is demonstrated and what changes for a real spa
      </h2>
      <p>
        The prototype proves the journey. Production uses the client’s data,
        accounts, policies, and operating procedures.
      </p>
    </div>
    <div
      class="comparison"
      role="table"
      aria-label="Prototype and production comparison"
    >
      <div class="comparison-row comparison-head">
        <span>Area</span><span>This demonstration</span><span
          >Production implementation</span
        >
      </div>
      <div class="comparison-row">
        <strong>Service catalog</strong><span>20 representative services</span
        ><span>The spa’s complete approved menu and rules</span>
      </div>
      <div class="comparison-row">
        <strong>Accounts</strong><span>Prototype accounts and sample data</span
        ><span>Client-owned accounts, roles, and retention policies</span>
      </div>
      <div class="comparison-row">
        <strong>Booking</strong><span>Six shared Cal.com booking groups</span
        ><span
          >The spa’s platform, staff, rooms, availability, and policies</span
        >
      </div>
      <div class="comparison-row">
        <strong>Communication</strong><span>Demonstration email paths</span
        ><span
          >The spa’s domain, consent, templates, and escalation process</span
        >
      </div>
      <div class="comparison-row">
        <strong>Operations</strong><span>Representative staff views</span><span
          >Named owners, permissions, monitoring, and support</span
        >
      </div>
    </div>
  </section>

  <section class="demo-actions" aria-labelledby="demo-title">
    <div>
      <p class="kicker">Explore the working prototype</p>
      <h2 id="demo-title">See the journey in context</h2>
    </div>
    <div>
      <button type="button" onclick={openConcierge}
        >Try the concierge <span>→</span></button
      ><a href="/">View the spa website <span>↗</span></a><a href="#top"
        >Back to top <span>↑</span></a
      >
    </div>
  </section>
</main>

<footer class="document-footer">
  <span>Tranquility Spa Concierge</span><span>System overview · 2026</span><span
    >Portfolio demonstration</span
  >
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(:root) {
    --ink: #251b25;
    --muted: #655e63;
    --paper: #fffdfa;
    --ground: #ebe8e3;
    --line: #cfc9c2;
    --accent: #9a5938;
  }
  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    background: var(--ground);
    color: var(--ink);
    font-family: 'Avenir Next', Avenir, 'Helvetica Neue', sans-serif;
    margin: 0;
  }
  :global(button),
  :global(a) {
    font: inherit;
  }
  :global(a) {
    color: inherit;
  }
  :global(:focus-visible) {
    outline: 3px solid var(--accent);
    outline-offset: 3px;
  }
  :global(section[id]) {
    scroll-margin-top: 5rem;
  }
  .document-bar {
    align-items: center;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 0.9rem max(1.25rem, calc((100vw - 1120px) / 2));
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .document-bar p {
    color: var(--muted);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    margin: 0;
    text-transform: uppercase;
  }
  .wordmark {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.8rem;
    letter-spacing: -0.06em;
    text-decoration: none;
  }
  .wordmark span,
  .kicker,
  .section-label,
  .responsibility-label {
    color: var(--accent);
  }
  .return-link {
    font-size: 0.78rem;
    justify-self: end;
    text-decoration: none;
  }
  .report {
    background: var(--paper);
    box-shadow: 0 0 0 1px rgba(37, 27, 37, 0.04);
    margin: 2rem auto;
    max-width: 1120px;
  }
  .cover {
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    min-height: 42rem;
  }
  .cover-copy {
    align-content: center;
    display: grid;
    padding: clamp(3rem, 7vw, 6rem);
  }
  .kicker,
  .section-label,
  .responsibility-label {
    font-size: 0.66rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }
  h1,
  h2,
  h3,
  h4,
  p {
    margin-top: 0;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-weight: 400;
    letter-spacing: -0.035em;
  }
  h1 {
    font-size: clamp(3.2rem, 5.5vw, 5.8rem);
    line-height: 0.95;
    margin-bottom: 2rem;
    max-width: 9ch;
  }
  h2 {
    font-size: clamp(2.2rem, 3.5vw, 3.6rem);
    line-height: 1;
    margin-bottom: 1.2rem;
    max-width: 14ch;
  }
  h3 {
    font-size: 1.35rem;
  }
  p {
    line-height: 1.6;
  }
  .summary {
    color: var(--muted);
    font-size: 1.1rem;
    max-width: 34rem;
  }
  .document-meta {
    border-top: 1px solid var(--line);
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 2rem 0 0;
  }
  .document-meta div {
    border-bottom: 1px solid var(--line);
    padding: 1rem 1rem 1rem 0;
  }
  .document-meta div:nth-child(odd) {
    border-right: 1px solid var(--line);
  }
  .document-meta div:nth-child(even) {
    padding-left: 1rem;
  }
  .document-meta dt {
    color: var(--accent);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .document-meta dd {
    font-size: 0.8rem;
    line-height: 1.4;
    margin: 0.35rem 0 0;
  }
  .cover-figure {
    background: #ddd4c9;
    margin: 0;
    min-height: 34rem;
    position: relative;
  }
  .cover-figure img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
  .cover-figure figcaption {
    background: rgba(37, 27, 37, 0.88);
    bottom: 1.5rem;
    color: #fff;
    font-size: 0.7rem;
    left: 1.5rem;
    max-width: 15rem;
    padding: 0.75rem;
    position: absolute;
  }
  .report-section {
    border-bottom: 1px solid var(--line);
    padding: clamp(3rem, 6vw, 5.5rem);
  }
  .section-label {
    border-bottom: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding-bottom: 0.7rem;
  }
  .section-intro {
    display: grid;
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 3rem;
  }
  .section-intro p {
    color: var(--muted);
    margin: 0.3rem 0 0;
    max-width: 30rem;
  }
  .summary-table {
    border-left: 1px solid var(--line);
    border-top: 1px solid var(--line);
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 2rem;
  }
  .summary-table div {
    border-bottom: 1px solid var(--line);
    border-right: 1px solid var(--line);
    padding: 1.5rem;
  }
  .summary-table strong {
    color: var(--accent);
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    margin-bottom: 0.6rem;
    text-transform: uppercase;
  }
  .summary-table p {
    font-size: 0.88rem;
    margin: 0;
  }
  .key-point {
    background: #f2eee8;
    border-left: 4px solid var(--accent);
    display: grid;
    gap: 1rem;
    grid-template-columns: 8rem 1fr;
    margin-top: 2rem;
    padding: 1.5rem;
  }
  .key-point strong {
    color: var(--accent);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .key-point p {
    margin: 0;
  }
  .contents ol,
  .journey-list {
    border-top: 1px solid var(--line);
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .contents li,
  .journey-list li {
    border-bottom: 1px solid var(--line);
  }
  .contents a {
    display: grid;
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.4rem;
    gap: 1rem;
    grid-template-columns: 3rem 1fr;
    padding: 1rem 0;
    text-decoration: none;
  }
  .contents a span,
  .journey-list > li > span {
    color: var(--accent);
  }
  .contents a span {
    font-family: 'Avenir Next', Avenir, sans-serif;
    font-size: 0.72rem;
    padding-top: 0.35rem;
  }
  .journey-list li {
    display: grid;
    gap: 2rem;
    grid-template-columns: 4rem 1fr;
    padding: 1.4rem 0;
  }
  .journey-list > li > span {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.5rem;
  }
  .journey-list h3 {
    margin: 0 0 0.4rem;
  }
  .journey-list p {
    color: var(--muted);
    font-size: 0.88rem;
    margin: 0;
    max-width: 43rem;
  }
  .system-map {
    border: 1px solid var(--line);
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 9rem 1fr;
    margin: 0;
    padding: 2rem;
  }
  .map-column {
    display: grid;
    gap: 0.7rem;
  }
  .map-heading {
    color: var(--accent);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }
  .map-node {
    background: #f5f2ed;
    border: 1px solid var(--line);
    display: grid;
    gap: 0.35rem;
    padding: 1rem;
    text-align: center;
  }
  .map-node strong {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.1rem;
    font-weight: 400;
  }
  .map-node span,
  .map-bridge small {
    color: var(--muted);
    font-size: 0.7rem;
    line-height: 1.4;
  }
  .map-pair {
    display: grid;
    gap: 0.7rem;
    grid-template-columns: 1fr 1fr;
  }
  .arrow {
    color: var(--accent);
    text-align: center;
  }
  .map-bridge {
    align-self: center;
    display: grid;
    justify-items: center;
    text-align: center;
  }
  .map-bridge > span {
    color: var(--accent);
    font-size: 1.8rem;
  }
  .map-bridge strong {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.4rem;
    font-weight: 400;
  }
  .system-map figcaption,
  .screen-grid figcaption {
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.7rem;
    line-height: 1.45;
    padding-top: 0.8rem;
  }
  .system-map figcaption {
    grid-column: 1/-1;
  }
  .screen-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 0.75fr 1.25fr;
  }
  .screen-grid figure {
    border: 1px solid var(--line);
    margin: 0;
    padding: 1rem;
  }
  .figure-heading {
    border-bottom: 1px solid var(--line);
    display: flex;
    font-size: 0.7rem;
    justify-content: space-between;
    padding-bottom: 0.7rem;
  }
  .figure-heading span {
    color: var(--accent);
    text-transform: uppercase;
  }
  .screen-grid figcaption {
    margin-top: 1rem;
  }
  .phone {
    background: #faf8f5;
    border: 0.45rem solid #251f24;
    border-radius: 2.2rem;
    margin: 1.5rem auto;
    max-width: 16rem;
    min-height: 29rem;
    overflow: hidden;
  }
  .phone-top {
    display: flex;
    font-size: 0.55rem;
    justify-content: space-between;
    padding: 1rem 1.1rem 0.6rem;
  }
  .chat-title {
    border-bottom: 1px solid var(--line);
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 0.95rem;
    padding: 0.7rem;
    text-align: center;
  }
  .chat-body {
    display: grid;
    gap: 0.7rem;
    padding: 1rem 0.8rem;
  }
  .bubble {
    background: #e8e4df;
    border-radius: 0.8rem 0.8rem 0.8rem 0.2rem;
    font-size: 0.7rem;
    line-height: 1.45;
    margin: 0;
    padding: 0.7rem;
  }
  .bubble.guest {
    background: var(--ink);
    border-radius: 0.8rem 0.8rem 0.2rem 0.8rem;
    color: #fff;
    justify-self: end;
    max-width: 82%;
  }
  .chat-body button {
    background: var(--ink);
    border: 0;
    color: #fff;
    cursor: pointer;
    font-size: 0.68rem;
    padding: 0.75rem;
  }
  .staff-ui {
    background: #eee9e3;
    display: grid;
    grid-template-columns: 8rem 1fr;
    min-height: 28rem;
  }
  .staff-ui aside {
    align-content: start;
    background: var(--ink);
    color: #fff;
    display: grid;
    gap: 1rem;
    padding: 1.2rem 0.9rem;
  }
  .staff-ui aside strong {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .staff-ui aside span {
    font-size: 0.56rem;
    opacity: 0.65;
  }
  .staff-ui aside span.active {
    color: #e4a07b;
    opacity: 1;
  }
  .staff-main {
    min-width: 0;
    padding: 1.2rem;
  }
  .staff-heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .staff-heading small {
    color: var(--muted);
    font-size: 0.55rem;
  }
  .staff-heading h4 {
    font-size: 1.6rem;
    margin: 0.3rem 0 1rem;
  }
  .staff-heading > span {
    border: 1px solid var(--line);
    border-radius: 2rem;
    font-size: 0.56rem;
    padding: 0.4rem 0.6rem;
  }
  .staff-panels {
    display: grid;
    gap: 0.7rem;
    grid-template-columns: 1.3fr 0.8fr;
  }
  .staff-panels section {
    background: #fff;
    padding: 0.8rem;
  }
  .panel-title {
    display: flex;
    font-size: 0.6rem;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .panel-title small {
    color: var(--accent);
  }
  .queue > div:not(.panel-title) {
    align-items: center;
    border-top: 1px solid #ded7d0;
    display: grid;
    font-size: 0.52rem;
    gap: 0.4rem;
    grid-template-columns: 2.2rem 1fr auto;
    padding: 0.65rem 0;
  }
  .queue span,
  .attention p {
    display: grid;
  }
  .queue small,
  .attention small {
    color: var(--muted);
    font-family: 'Avenir Next', Avenir, sans-serif;
  }
  .queue em {
    background: #f2ded1;
    border-radius: 2rem;
    font-style: normal;
    padding: 0.25rem 0.35rem;
  }
  .queue em.ready {
    background: #dde8da;
  }
  .attention p {
    border-top: 1px solid #ded7d0;
    font-family: 'Avenir Next', Avenir, sans-serif;
    font-size: 0.54rem;
    gap: 0.2rem;
    margin: 0;
    padding: 0.65rem 0;
  }
  .data-table,
  .comparison {
    border-left: 1px solid var(--line);
    border-top: 1px solid var(--line);
  }
  .table-row,
  .comparison-row {
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: 0.8fr 1.5fr 0.8fr;
  }
  .comparison-row {
    grid-template-columns: 0.6fr 1fr 1.2fr;
  }
  .table-row > *,
  .comparison-row > * {
    border-right: 1px solid var(--line);
    font-size: 0.8rem;
    line-height: 1.45;
    padding: 1rem;
  }
  .table-row strong,
  .comparison-row strong {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1rem;
    font-weight: 400;
  }
  .table-head,
  .comparison-head {
    background: #f2eee8;
  }
  .table-head > *,
  .comparison-head > * {
    color: var(--accent);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .responsibility-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .responsibility-grid article {
    border: 1px solid var(--line);
    margin-right: -1px;
    padding: 1.5rem;
  }
  .responsibility-grid h3 {
    min-height: 2.4em;
  }
  .responsibility-grid ul {
    border-top: 1px solid var(--line);
    list-style: none;
    margin: 1.5rem 0 0;
    padding: 1rem 0 0;
  }
  .responsibility-grid li {
    color: var(--muted);
    font-size: 0.78rem;
    line-height: 1.45;
    padding: 0.35rem 0 0.35rem 1rem;
    position: relative;
  }
  .responsibility-grid li::before {
    color: var(--accent);
    content: '—';
    left: 0;
    position: absolute;
  }
  .demo-actions {
    align-items: center;
    background: var(--ink);
    color: #fff;
    display: grid;
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
    padding: clamp(3rem, 6vw, 5rem);
  }
  .demo-actions h2 {
    margin: 0;
  }
  .demo-actions > div:last-child {
    display: grid;
  }
  .demo-actions button,
  .demo-actions a {
    background: transparent;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    text-align: left;
    text-decoration: none;
  }
  .document-footer {
    color: var(--muted);
    display: flex;
    font-size: 0.68rem;
    justify-content: space-between;
    margin: 0 auto 2rem;
    max-width: 1120px;
    padding: 1rem 0;
  }
  @media (max-width: 800px) {
    .document-bar {
      grid-template-columns: 1fr auto;
    }
    .document-bar p {
      display: none;
    }
    .report {
      margin: 0;
    }
    .cover,
    .section-intro,
    .screen-grid,
    .demo-actions {
      grid-template-columns: 1fr;
    }
    .cover {
      min-height: 0;
    }
    .cover-figure {
      min-height: 22rem;
      order: -1;
    }
    .cover-copy {
      padding: 3rem 1.5rem;
    }
    .report-section,
    .demo-actions {
      padding: 3rem 1.5rem;
    }
    .section-intro {
      gap: 0;
    }
    .system-map {
      grid-template-columns: 1fr;
    }
    .map-bridge {
      grid-template-columns: 1fr auto 1fr;
    }
    .map-bridge > span {
      transform: rotate(90deg);
    }
    .map-bridge small {
      display: none;
    }
    .system-map figcaption {
      grid-column: auto;
    }
    .responsibility-grid {
      grid-template-columns: 1fr;
    }
    .responsibility-grid article {
      margin: 0 0 -1px;
    }
    .document-footer {
      padding: 1rem 1.5rem;
    }
  }
  @media (max-width: 560px) {
    .return-link {
      font-size: 0.68rem;
    }
    .document-meta,
    .summary-table {
      grid-template-columns: 1fr;
    }
    .document-meta div:nth-child(odd) {
      border-right: 0;
    }
    .document-meta div:nth-child(even) {
      padding-left: 0;
    }
    .key-point {
      grid-template-columns: 1fr;
    }
    .map-pair {
      grid-template-columns: 1fr;
    }
    .staff-ui {
      grid-template-columns: 1fr;
    }
    .staff-ui aside {
      display: flex;
      overflow-x: auto;
    }
    .staff-ui aside strong {
      margin: 0 1rem 0 0;
    }
    .staff-ui aside span {
      white-space: nowrap;
    }
    .staff-panels {
      grid-template-columns: 1fr;
    }
    .staff-heading > span {
      display: none;
    }
    .table-row,
    .comparison-row {
      grid-template-columns: 1fr;
    }
    .table-row > *,
    .comparison-row > * {
      border-right: 0;
    }
    .table-head,
    .comparison-head {
      display: none;
    }
    .responsibility-grid h3 {
      min-height: 0;
    }
    .document-footer {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.4rem;
    }
  }
  @media print {
    :global(body) {
      background: #fff;
    }
    .document-bar,
    .demo-actions,
    :global(typebot-bubble) {
      display: none !important;
    }
    .report {
      box-shadow: none;
      margin: 0;
      max-width: none;
    }
    .report-section,
    .cover {
      break-inside: avoid;
    }
    .document-footer {
      margin-bottom: 0;
    }
  }
</style>
