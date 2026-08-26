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
      'Services, visit length, availability, matching guidance, and booking category.',
      'When the menu changes'
    ],
    [
      'Needs Attention',
      'Missing intake, staff-help requests, low feedback, and other items waiting for staff.',
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
      'Matches the guest’s answers to the approved service list.',
      'Typebot + spa guidance'
    ],
    [
      'Booking confirmation',
      'Confirms the time and captures booking contact details.',
      'Cal.com'
    ],
    ['Visit record', 'Creates the visit record for staff.', 'Make + Airtable'],
    ['Intake request', 'Sends the post-booking intake form.', 'Make + Tally'],
    [
      'Aftercare',
      'Sends the guidance recorded by staff after the visit.',
      'Make + email'
    ],
    [
      'Feedback',
      'Requests feedback and marks responses that need attention.',
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
  <a class="return-link" href="/">Return to spa website</a>
</header>

<main class="report" id="top">
  <section class="cover" aria-labelledby="report-title">
    <div class="cover-copy">
      <h1 id="report-title">How the spa concierge works</h1>
      <p class="summary">
        A guest can get help choosing a service, book a time, complete intake,
        and receive follow-up after the visit. Staff can see what they need at
        each step.
      </p>
      <dl class="document-meta">
        <div>
          <dt>Audience</dt>
          <dd>Spa owners and operations teams</dd>
        </div>
        <div>
          <dt>Purpose</dt>
          <dd>Help guests choose and reduce follow-up work</dd>
        </div>
        <div>
          <dt>Included here</dt>
          <dd>20 services across 6 booking groups</dd>
        </div>
        <div>
          <dt>Operating model</dt>
          <dd>Managed through familiar business tools</dd>
        </div>
      </dl>
    </div>
    <figure class="cover-figure">
      <img src="/images/treatment-room.png" alt="A calm spa treatment room" />
      <figcaption>The spa website is the starting point for guests.</figcaption>
    </figure>
  </section>

  <section class="report-section" aria-labelledby="summary-title">
    <h2 id="summary-title">Overview</h2>
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
          Booking, intake, visit notes, aftercare, and feedback are kept with
          the same visit.
        </p>
      </div>
      <div>
        <strong>For the owner</strong>
        <p>
          The owner can update services and review activity from simple staff
          views.
        </p>
      </div>
    </div>
    <aside class="key-point">
      <strong>Core idea</strong>
      <p>
        Spa staff define the services and matching rules. The concierge uses
        those rules the same way for every guest.
      </p>
    </aside>
  </section>

  <nav class="contents report-section" aria-label="Report contents">
    <h2>Contents</h2>
    <ol>
      <li><a href="#journey"><span>01</span>Guest journey</a></li>
      <li><a href="#map"><span>02</span>System map</a></li>
      <li><a href="#screens"><span>03</span>Guest and staff experience</a></li>
      <li><a href="#staff"><span>04</span>Staff views</a></li>
      <li>
        <a href="#automatic"><span>05</span>Messages and records</a>
      </li>
      <li>
        <a href="#maintenance"><span>06</span>What the spa team can update</a>
      </li>
      <li>
        <a href="#production"><span>07</span>Demonstration and live setup</a>
      </li>
    </ol>
  </nav>

  <section class="report-section" id="journey" aria-labelledby="journey-title">
    <div class="section-intro">
      <h2 id="journey-title">1. The guest journey</h2>
      <p>
        A guest moves through six clear steps, from asking for help to receiving
        follow-up after the visit.
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
    <div class="section-intro">
      <h2 id="map-title">2. How the system works</h2>
      <p>
        Each service has one job. Guests use the website, concierge, booking,
        and forms. Staff use Airtable and email.
      </p>
    </div>
    <figure class="system-map">
      <div class="map-column">
        <p class="map-heading">Guest tools</p>
        <div class="map-node">
          <strong>Spa website</strong><span
            >Explains the offer and opens the concierge</span
          >
        </div>
        <div class="map-node">
          <strong>Typebot concierge</strong><span
            >Collects the need and recommends an approved service</span
          >
        </div>
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
        <strong>Make</strong><small>Shares information between the tools</small>
      </div>
      <div class="map-column">
        <p class="map-heading">Staff tools</p>
        <div class="map-node">
          <strong>Airtable</strong><span
            >Service catalog, visit records, queues, and dashboard</span
          >
        </div>
        <div class="map-node">
          <strong>Email</strong><span
            >Confirmations, intake, aftercare, feedback, and alerts</span
          >
        </div>
      </div>
      <figcaption>
        The spa owns each account and can update its services without changing
        the website.
      </figcaption>
    </figure>
  </section>

  <section class="report-section" id="screens" aria-labelledby="screens-title">
    <div class="section-intro">
      <h2 id="screens-title">3. What guests and staff see</h2>
      <p>
        Guests have a short conversation. Staff have a daily view of visits and
        anything that needs attention.
      </p>
    </div>
    <div class="screen-grid">
      <figure>
        <div class="figure-heading">
          <strong>Concierge conversation</strong>
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
              >Continue to booking</button
            >
          </div>
        </div>
        <figcaption>
          The concierge asks a few questions, recommends one service, and opens
          the booking calendar.
        </figcaption>
      </figure>

      <figure>
        <div class="figure-heading">
          <strong>Daily operations view</strong>
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
                  <strong>Visit Queue</strong><small>View all</small>
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
          Staff can see upcoming visits, intake status, aftercare tasks, and
          feedback that needs a response.
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="report-section" id="staff" aria-labelledby="staff-title">
    <div class="section-intro">
      <h2 id="staff-title">4. Staff views</h2>
      <p>
        Four Airtable views give the team the information needed for daily work
        and regular review.
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
    <div class="section-intro">
      <h2 id="automatic-title">5. What the system sends and records</h2>
      <p>
        The system handles routine messages and record updates. Staff provide
        the service, write visit notes, and handle special requests.
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
    <div class="section-intro">
      <h2 id="maintenance-title">6. What the spa team can update</h2>
      <p>
        Staff update the service catalog in Airtable. Those changes are then
        used by the concierge and staff views.
      </p>
    </div>
    <div class="responsibility-grid">
      <article>
        <h3>Spa team</h3>
        <p>Updates spa information</p>
        <ul>
          <li>Service details and availability</li>
          <li>Recommendation guidance</li>
          <li>Visit outcomes and aftercare notes</li>
        </ul>
      </article>
      <article>
        <h3>System</h3>
        <p>Sends messages and updates records</p>
        <ul>
          <li>Move records between tools</li>
          <li>Send scheduled messages</li>
          <li>Surface missing information</li>
        </ul>
      </article>
      <article>
        <h3>Implementation partner</h3>
        <p>Changes how the system works</p>
        <ul>
          <li>New services, connections, or rules</li>
          <li>Staff access and error alerts</li>
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
    <div class="section-intro">
      <h2 id="production-title">7. From demonstration to real use</h2>
      <p>
        This version shows the full process with sample services and accounts. A
        real spa would use its own information, policies, and accounts.
      </p>
    </div>
    <div
      class="comparison"
      role="table"
      aria-label="Demonstration and real spa comparison"
    >
      <div class="comparison-row comparison-head">
        <span>Area</span><span>This demonstration</span><span
          >For a real spa</span
        >
      </div>
      <div class="comparison-row">
        <strong>Service catalog</strong><span>20 representative services</span
        ><span>The spa’s complete approved menu and rules</span>
      </div>
      <div class="comparison-row">
        <strong>Accounts</strong><span>Sample accounts and data</span><span
          >Client-owned accounts, staff access, and rules for how long records
          are kept</span
        >
      </div>
      <div class="comparison-row">
        <strong>Booking</strong><span>Six shared Cal.com booking groups</span
        ><span
          >The spa’s platform, staff, rooms, availability, and policies</span
        >
      </div>
      <div class="comparison-row">
        <strong>Communication</strong><span>Sample emails and alerts</span><span
          >The spa’s domain, consent, templates, and staff follow-up process</span
        >
      </div>
      <div class="comparison-row">
        <strong>Operations</strong><span>Representative staff views</span><span
          >Staff access, error alerts, and a support plan</span
        >
      </div>
    </div>
  </section>

  <section class="demo-actions" aria-labelledby="demo-title">
    <div>
      <h2 id="demo-title">Try the demonstration</h2>
    </div>
    <div>
      <button type="button" onclick={openConcierge}>Try the concierge</button><a
        href="/">View the spa website</a
      ><a href="#top">Back to top</a>
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.9rem max(1.25rem, calc((100vw - 1120px) / 2));
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .wordmark {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.8rem;
    letter-spacing: -0.06em;
    text-decoration: none;
  }
  .wordmark span {
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
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    min-height: 31rem;
  }
  .cover-copy {
    align-content: center;
    display: grid;
    padding: clamp(2.75rem, 5vw, 4.5rem);
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
    font-size: clamp(3rem, 4.6vw, 4.8rem);
    line-height: 0.98;
    margin-bottom: 1.5rem;
    max-width: 12ch;
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
    font-size: 1rem;
    max-width: 34rem;
  }
  .document-meta {
    display: grid;
    gap: 0.65rem 1.5rem;
    grid-template-columns: 1fr 1fr;
    margin: 1.5rem 0 0;
  }
  .document-meta div {
    background: #f4f1ec;
    padding: 0.8rem;
  }
  .document-meta dt {
    color: var(--muted);
    font-size: 0.7rem;
    font-weight: 600;
  }
  .document-meta dd {
    font-size: 0.8rem;
    line-height: 1.4;
    margin: 0.35rem 0 0;
  }
  .cover-figure {
    background: #ddd4c9;
    margin: 0;
    min-height: 31rem;
    position: relative;
  }
  .cover-figure img {
    height: 100%;
    object-fit: cover;
    object-position: 58% center;
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
    padding: clamp(3rem, 6vw, 5.5rem);
  }
  .report-section:nth-of-type(even) {
    background: #fbf9f6;
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
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    margin-top: 2rem;
  }
  .summary-table div {
    background: #f2eee8;
    padding: 1.5rem;
  }
  .summary-table strong {
    color: var(--accent);
    display: block;
    font-size: 0.68rem;
    margin-bottom: 0.6rem;
  }
  .summary-table p {
    font-size: 0.88rem;
    margin: 0;
  }
  .key-point {
    background: #f2eee8;
    display: grid;
    gap: 1rem;
    grid-template-columns: 8rem 1fr;
    margin-top: 2rem;
    padding: 1.5rem;
  }
  .key-point strong {
    color: var(--accent);
    font-size: 0.68rem;
  }
  .key-point p {
    margin: 0;
  }
  .contents ol,
  .journey-list {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr 1fr;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .contents a {
    background: #f2eee8;
    display: grid;
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.4rem;
    gap: 1rem;
    grid-template-columns: 3rem 1fr;
    padding: 1rem;
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
    background: #f2eee8;
    display: grid;
    gap: 2rem;
    grid-template-columns: 4rem 1fr;
    padding: 1.4rem;
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
    background: #f2eee8;
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
    color: var(--ink);
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0;
    text-align: center;
  }
  .map-node {
    background: var(--paper);
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
  .map-bridge {
    align-self: center;
    background: #e5d9ce;
    display: grid;
    justify-items: center;
    padding: 1.25rem 0.8rem;
    text-align: center;
  }
  .map-bridge strong {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.4rem;
    font-weight: 400;
  }
  .system-map figcaption,
  .screen-grid figcaption {
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
    background: #f2eee8;
    margin: 0;
    padding: 1rem;
  }
  .figure-heading {
    display: flex;
    font-size: 0.9rem;
    justify-content: space-between;
    padding-bottom: 0.7rem;
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
    background: #f2eee8;
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
    border-radius: 2rem;
    background: #f5f2ed;
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
    background: #f7f4f0;
    font-family: 'Avenir Next', Avenir, sans-serif;
    font-size: 0.54rem;
    gap: 0.2rem;
    margin: 0;
    padding: 0.65rem;
  }
  .data-table,
  .comparison {
    display: grid;
    gap: 0.5rem;
  }
  .table-row,
  .comparison-row {
    background: #f4f1ec;
    display: grid;
    grid-template-columns: 0.8fr 1.5fr 0.8fr;
  }
  .comparison-row {
    grid-template-columns: 0.6fr 1fr 1.2fr;
  }
  .table-row > *,
  .comparison-row > * {
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
    background: #e7ded6;
  }
  .table-head > *,
  .comparison-head > * {
    color: var(--accent);
    font-size: 0.62rem;
  }
  .responsibility-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
  .responsibility-grid article {
    background: #f2eee8;
    padding: 1.5rem;
  }
  .responsibility-grid h3 {
    margin-bottom: 0.35rem;
  }
  .responsibility-grid article > p {
    color: var(--muted);
    font-size: 0.82rem;
  }
  .responsibility-grid ul {
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
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .demo-actions button,
  .demo-actions a {
    background: rgba(255, 255, 255, 0.1);
    border: 0;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    padding: 0.85rem 1rem;
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
      min-height: 15rem;
      order: -1;
    }
    .cover-copy {
      padding: 2.5rem 1.5rem;
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
      padding: 1rem;
    }
    .system-map figcaption {
      grid-column: auto;
    }
    .responsibility-grid {
      grid-template-columns: 1fr;
    }
    .responsibility-grid article {
      margin: 0;
    }
    .document-footer {
      padding: 1rem 1.5rem;
    }
  }
  @media (max-width: 560px) {
    .return-link {
      font-size: 0.68rem;
    }
    .summary-table {
      grid-template-columns: 1fr;
    }
    .contents ol,
    .journey-list {
      grid-template-columns: 1fr;
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
