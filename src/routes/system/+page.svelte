<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  type TypebotClient = { open?: () => void };
  type ConciergeWindow = typeof globalThis & {
    Typebot?: TypebotClient;
    typebotReady?: Promise<unknown>;
  };

  const journey = [
    [
      '01',
      'Describe needs',
      'A guest shares what they want, how much time they have, and what matters today.'
    ],
    [
      '02',
      'Get one recommendation',
      'The concierge uses the spa’s approved service rules to suggest a clear place to begin.'
    ],
    [
      '03',
      'Choose a time',
      'The guest sees real availability and books through the spa’s calendar.'
    ],
    [
      '04',
      'Complete intake',
      'A short form collects the details the team needs before the appointment.'
    ],
    [
      '05',
      'Visit prepared',
      'Staff can see the booking, intake, and service context together before the guest arrives.'
    ],
    [
      '06',
      'Continue the care',
      'Aftercare and feedback are sent automatically after the visit.'
    ]
  ];

  const teamTools = [
    [
      'Visit Queue',
      'See who is arriving, what they booked, and whether intake is complete.'
    ],
    [
      'Service Catalog',
      'Keep services, durations, descriptions, and recommendation rules current.'
    ],
    [
      'Needs Attention',
      'Bring missing details, low feedback, and unusual requests into one short list.'
    ],
    [
      'Operations Dashboard',
      'See bookings, completion, feedback, and service demand at a glance.'
    ]
  ];

  const automation = [
    ['Guest', 'Asks for guidance'],
    ['Concierge', 'Matches an approved service'],
    ['Booking', 'Confirms a time'],
    ['Team', 'Receives the visit context'],
    ['Visit', 'Records the outcome'],
    ['Follow-up', 'Sends aftercare and feedback']
  ];

  async function openConcierge() {
    const conciergeWindow = globalThis as ConciergeWindow;
    await conciergeWindow.typebotReady;
    conciergeWindow.Typebot?.open?.();
  }

  onMount(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-copy > *', {
            duration: 0.8,
            opacity: 0,
            stagger: 0.08,
            y: 20
          })
          .from(
            '.hero-image',
            { duration: 1.1, opacity: 0, scale: 1.025 },
            '-=0.7'
          );

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            duration: 0.85,
            ease: 'power3.out',
            opacity: 0,
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
            y: 24
          });
        });
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  });
</script>

<svelte:head>
  <title>How the system works — Tranquility</title>
  <meta
    name="description"
    content="A plain-language tour of the Tranquility spa concierge, from service guidance and booking to staff preparation and follow-up."
  />
  <link
    rel="canonical"
    href="https://spa-concierge-prototype.pages.dev/system"
  />
</svelte:head>

<header class="site-header">
  <a class="wordmark" href="/">Tranquility<span aria-hidden="true">.</span></a>
  <nav aria-label="Page navigation">
    <a href="#journey">Guest journey</a>
    <a href="#team">Staff experience</a>
    <a class="back-link" href="/"
      >Return to the spa <span aria-hidden="true">↗</span></a
    >
  </nav>
</header>

<main id="top">
  <section class="hero section-rule">
    <div class="hero-copy content-pad">
      <p class="eyebrow">Behind the experience</p>
      <h1>A calmer guest journey. A clearer way to operate.</h1>
      <p class="lede">
        Tranquility connects service guidance, booking, preparation, and
        follow-up so guests feel personally cared for and the team has less to
        chase.
      </p>
      <div class="actions">
        <button
          class="button button-primary"
          type="button"
          onclick={openConcierge}
          >Try the concierge <span aria-hidden="true">→</span></button
        >
        <a class="button button-secondary" href="#journey"
          >Follow the guest journey <span aria-hidden="true">↓</span></a
        >
      </div>
    </div>
    <div class="hero-visual">
      <img
        class="hero-image"
        src="/images/treatment-room.png"
        alt="A warm, softly lit spa treatment room"
      />
      <p class="image-note">
        One connected experience, before and after the room
      </p>
    </div>
  </section>

  <section class="problem content-pad section-rule" data-reveal>
    <div>
      <p class="eyebrow">The business problem</p>
      <h2>A complex menu. A personal promise.</h2>
    </div>
    <p>
      With dozens of services and many possible combinations, guests can arrive
      unsure where to begin. That creates slower decisions, repeated questions,
      and more work for staff.
    </p>
    <dl class="problem-stats">
      <div>
        <dt>20</dt>
        <dd>services in this demonstration</dd>
      </div>
      <div>
        <dt>1</dt>
        <dd>clear recommendation at a time</dd>
      </div>
      <div>
        <dt>0</dt>
        <dd>technical tools for guests to learn</dd>
      </div>
    </dl>
  </section>

  <section
    class="journey content-pad section-rule"
    id="journey"
    aria-labelledby="journey-title"
  >
    <div class="section-heading" data-reveal>
      <p class="eyebrow">The guest journey</p>
      <h2 id="journey-title">One guided path from question to follow-up.</h2>
      <p>
        The technology stays in the background. The guest simply moves through
        six familiar moments.
      </p>
    </div>
    <div class="journey-grid" data-reveal>
      {#each journey as step (step[0])}
        <article>
          <p class="step-number">{step[0]}</p>
          <h3>{step[1]}</h3>
          <p>{step[2]}</p>
        </article>
      {/each}
    </div>
  </section>

  <section
    class="in-action content-pad section-rule"
    id="team"
    aria-labelledby="action-title"
  >
    <div class="section-heading" data-reveal>
      <p class="eyebrow">The system in action</p>
      <h2 id="action-title">Simple for guests. Useful for the team.</h2>
    </div>
    <div class="experience-grid">
      <article class="experience-card guest-card" data-reveal>
        <div class="experience-copy">
          <p class="eyebrow">Guest experience</p>
          <h3>A personal conversation in the guest’s pocket.</h3>
          <p>
            Guests describe what they need, receive one approved recommendation,
            and move directly into booking.
          </p>
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
      </article>

      <article class="experience-card staff-card" data-reveal>
        <div class="experience-copy">
          <p class="eyebrow">Staff experience</p>
          <h3>A clear workspace for the day ahead.</h3>
          <p>
            The team sees what matters now: today’s visits, incomplete details,
            service updates, and overall performance.
          </p>
        </div>
        <div class="staff-ui" aria-label="Example staff operations dashboard">
          <aside>
            <strong>Tranquility</strong>
            <span class="active">Visit Queue</span><span>Service Catalog</span
            ><span>Needs Attention</span><span>Dashboard</span>
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
      </article>
    </div>
  </section>

  <section
    class="team-tools content-pad section-rule"
    aria-labelledby="tools-title"
  >
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Designed for the team</p>
      <h2 id="tools-title">Four views. No workflow diagrams required.</h2>
      <p>
        Staff work from straightforward screens built around the day, not from
        the automation behind them.
      </p>
    </div>
    <div class="tool-grid" data-reveal>
      {#each teamTools as tool, index (tool[0])}
        <article>
          <span aria-hidden="true">0{index + 1}</span>
          <h3>{tool[0]}</h3>
          <p>{tool[1]}</p>
        </article>
      {/each}
    </div>
  </section>

  <section
    class="automatic content-pad section-rule"
    aria-labelledby="automatic-title"
  >
    <div class="section-heading" data-reveal>
      <p class="eyebrow">What happens automatically</p>
      <h2 id="automatic-title">
        The right information reaches the right person.
      </h2>
    </div>
    <div class="automation-flow" data-reveal>
      {#each automation as item, index (item[0])}
        <article>
          <span class="flow-icon" aria-hidden="true"
            >{['◇', '✦', '□', '◎', '◌', '→'][index]}</span
          >
          <h3>{item[0]}</h3>
          <p>{item[1]}</p>
        </article>
        {#if index < automation.length - 1}<span
            class="flow-arrow"
            aria-hidden="true">→</span
          >{/if}
      {/each}
    </div>
  </section>

  <section
    class="maintenance content-pad section-rule"
    aria-labelledby="maintenance-title"
  >
    <div class="maintenance-intro" data-reveal>
      <p class="eyebrow">Keeping it current</p>
      <h2 id="maintenance-title">The business owns the knowledge.</h2>
      <p>
        Services change. Staff update the catalog and review exceptions through
        simple business screens; they do not edit chatbot logic or automation
        maps.
      </p>
    </div>
    <div class="maintenance-list" data-reveal>
      <article>
        <span>01</span>
        <div>
          <h3>Edit a service once</h3>
          <p>
            Change the name, duration, description, booking group, or whether it
            is currently offered.
          </p>
        </div>
      </article>
      <article>
        <span>02</span>
        <div>
          <h3>Review what needs attention</h3>
          <p>
            Missing intake, staff-help requests, and poor feedback appear in a
            focused queue.
          </p>
        </div>
      </article>
      <article>
        <span>03</span>
        <div>
          <h3>Use the dashboard to improve</h3>
          <p>
            See what guests request and where the journey needs more clarity.
          </p>
        </div>
      </article>
    </div>
  </section>

  <section
    class="growth content-pad section-rule"
    aria-labelledby="growth-title"
  >
    <div class="growth-heading" data-reveal>
      <p class="eyebrow">Prototype and production</p>
      <h2 id="growth-title">Prove the experience first. Then make it yours.</h2>
    </div>
    <div class="growth-grid" data-reveal>
      <article>
        <p class="phase">This demonstration</p>
        <h3>A realistic working model</h3>
        <ul>
          <li>Twenty sample services</li>
          <li>Working guidance and booking flow</li>
          <li>Intake, follow-up, and staff views</li>
          <li>Safe sample data and accounts</li>
        </ul>
      </article>
      <article class="production-card">
        <p class="phase">For a real spa</p>
        <h3>Connected to the business</h3>
        <ul>
          <li>The spa’s full catalog and rules</li>
          <li>Its existing booking system and domain</li>
          <li>Staff roles and client-owned accounts</li>
          <li>Privacy, monitoring, and ongoing support</li>
        </ul>
      </article>
      <figure>
        <img
          src="/images/spa-corridor.png"
          alt="A calm spa corridor with warm stone, water, and natural light"
        />
        <figcaption>
          The guest experience stays calm as the operation grows.
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="final-cta content-pad" data-reveal>
    <div>
      <p class="eyebrow">See it for yourself</p>
      <h2>Follow both sides of the experience.</h2>
    </div>
    <div class="actions">
      <button class="button button-light" type="button" onclick={openConcierge}
        >Try the concierge <span aria-hidden="true">→</span></button
      >
      <a class="button button-outline-light" href="#journey"
        >Follow the guest journey <span aria-hidden="true">↑</span></a
      >
      <a class="button button-outline-light" href="#team"
        >See the staff experience <span aria-hidden="true">↑</span></a
      >
    </div>
  </section>
</main>

<footer class="site-footer content-pad">
  <a class="wordmark" href="/">Tranquility<span aria-hidden="true">.</span></a>
  <p>
    A working demonstration of connected service guidance and spa operations.
  </p>
  <div><a href="/">Return to the spa</a><a href="#top">Back to top ↑</a></div>
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(:root) {
    --ink: #29172b;
    --paper: #f4f0eb;
    --wash: #e7ded6;
    --line: #cfc4bb;
    --copper: #b86e45;
    --muted: #6f6260;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }
  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: 'Avenir Next', Avenir, 'Helvetica Neue', sans-serif;
  }
  :global(button),
  :global(a) {
    font: inherit;
  }
  :global(a) {
    color: inherit;
  }
  :global(:focus-visible) {
    outline: 3px solid var(--copper);
    outline-offset: 4px;
  }
  :global(section[id]) {
    scroll-margin-top: 6rem;
  }
  .content-pad {
    padding-left: clamp(1.5rem, 6vw, 7rem);
    padding-right: clamp(1.5rem, 6vw, 7rem);
  }
  .section-rule {
    border-bottom: 1px solid var(--line);
  }
  .site-header {
    align-items: center;
    backdrop-filter: blur(14px);
    background: rgba(244, 240, 235, 0.92);
    border-bottom: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    padding: 1rem clamp(1.5rem, 3.5vw, 3.5rem);
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .wordmark {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: clamp(1.9rem, 3vw, 2.7rem);
    letter-spacing: -0.07em;
    text-decoration: none;
  }
  .wordmark span {
    color: var(--copper);
  }
  nav {
    align-items: center;
    display: flex;
    gap: clamp(1rem, 3vw, 2.5rem);
  }
  nav a {
    font-size: 0.88rem;
    text-decoration: none;
  }
  nav a:not(.back-link):hover {
    color: var(--copper);
  }
  .back-link {
    background: var(--ink);
    color: var(--paper);
    padding: 0.8rem 1rem;
    transition: background 0.35s var(--ease);
  }
  .back-link:hover {
    background: #553653;
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
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-weight: 400;
    letter-spacing: -0.05em;
  }
  h1 {
    font-size: clamp(3.7rem, 6.5vw, 7.3rem);
    line-height: 0.92;
    margin-bottom: 2rem;
    max-width: 9ch;
  }
  h2 {
    font-size: clamp(2.8rem, 4.8vw, 5.3rem);
    line-height: 0.96;
    margin-bottom: 1.5rem;
    max-width: 11ch;
  }
  h3 {
    font-size: clamp(1.4rem, 2vw, 2rem);
    line-height: 1.05;
  }
  p {
    font-size: 1rem;
    line-height: 1.6;
  }
  .eyebrow {
    color: var(--copper);
    font-family: 'Avenir Next', Avenir, sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.17em;
    margin-bottom: 1.2rem;
    text-transform: uppercase;
  }
  .hero {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    min-height: calc(100vh - 5.2rem);
  }
  .hero-copy {
    align-content: center;
    display: grid;
    padding-bottom: 5rem;
    padding-top: 5rem;
  }
  .lede {
    font-size: 1.15rem;
    max-width: 34rem;
  }
  .hero-visual {
    min-height: 40rem;
    overflow: hidden;
    position: relative;
  }
  .hero-image {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
  .image-note {
    background: rgba(41, 23, 43, 0.88);
    bottom: 1.2rem;
    color: var(--paper);
    font-size: 0.7rem;
    left: 1.2rem;
    letter-spacing: 0.1em;
    margin: 0;
    padding: 0.7rem 0.9rem;
    position: absolute;
    text-transform: uppercase;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.2rem;
  }
  .button {
    align-items: center;
    border: 1px solid var(--copper);
    cursor: pointer;
    display: inline-flex;
    gap: 1.4rem;
    justify-content: space-between;
    min-width: 12rem;
    padding: 0.95rem 1.1rem;
    text-decoration: none;
    transition:
      background 0.35s var(--ease),
      color 0.35s var(--ease),
      transform 0.35s var(--ease);
  }
  .button:hover {
    transform: translateY(-2px);
  }
  .button-primary {
    background: var(--ink);
    color: var(--paper);
  }
  .button-primary:hover {
    background: #553653;
  }
  .button-secondary {
    background: transparent;
    color: var(--ink);
  }
  .button-secondary:hover {
    background: var(--wash);
  }
  .problem {
    align-items: start;
    display: grid;
    gap: clamp(2rem, 5vw, 5rem);
    grid-template-columns: 0.8fr 1fr 1.3fr;
    padding-bottom: 4rem;
    padding-top: 4rem;
  }
  .problem h2 {
    font-size: clamp(2.4rem, 3.3vw, 4rem);
    margin: 0;
    max-width: 9ch;
  }
  .problem > p {
    color: var(--muted);
    margin-top: 2.2rem;
    max-width: 32rem;
  }
  .problem-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 2.2rem 0 0;
  }
  .problem-stats div {
    border-left: 1px solid var(--line);
    padding: 0 1.3rem;
  }
  .problem-stats dt {
    color: var(--copper);
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 2.8rem;
  }
  .problem-stats dd {
    font-size: 0.72rem;
    line-height: 1.4;
    margin: 0.35rem 0 0;
  }
  .journey,
  .in-action,
  .team-tools,
  .automatic,
  .maintenance,
  .growth {
    padding-bottom: clamp(5rem, 9vw, 9rem);
    padding-top: clamp(5rem, 9vw, 9rem);
  }
  .section-heading {
    margin-bottom: 3rem;
  }
  .section-heading h2 {
    max-width: 13ch;
  }
  .section-heading > p:last-child {
    color: var(--muted);
    max-width: 37rem;
  }
  .journey-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
  .journey-grid article {
    border-left: 1px solid var(--line);
    padding: 0 clamp(1rem, 2vw, 2rem);
  }
  .journey-grid article:first-child {
    border-left: 0;
    padding-left: 0;
  }
  .journey-grid .step-number {
    color: var(--copper);
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 2rem;
  }
  .journey-grid h3 {
    font-size: 1.35rem;
    min-height: 2.8em;
  }
  .journey-grid article > p:last-child {
    color: var(--muted);
    font-size: 0.83rem;
    line-height: 1.55;
  }
  .in-action {
    background: #efe9e3;
  }
  .experience-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.82fr 1.18fr;
  }
  .experience-card {
    background: var(--paper);
    border: 1px solid var(--line);
    display: grid;
    min-height: 39rem;
    overflow: hidden;
  }
  .guest-card {
    grid-template-columns: 0.7fr 1fr;
  }
  .staff-card {
    grid-template-rows: auto 1fr;
  }
  .experience-copy {
    padding: clamp(1.5rem, 3vw, 3rem);
  }
  .experience-copy h3 {
    font-size: clamp(2rem, 3vw, 3.3rem);
  }
  .experience-copy > p:last-child {
    color: var(--muted);
    font-size: 0.9rem;
  }
  .phone {
    align-self: end;
    background: #f9f7f4;
    border: 0.55rem solid #211c20;
    border-bottom: 0;
    border-radius: 2.6rem 2.6rem 0 0;
    box-shadow: 0 1.5rem 3rem rgba(41, 23, 43, 0.18);
    margin: 2rem 2rem 0 0;
    min-height: 34rem;
    overflow: hidden;
  }
  .phone-top {
    display: flex;
    font-size: 0.58rem;
    justify-content: space-between;
    padding: 1.1rem 1.2rem 0.7rem;
  }
  .chat-title {
    border-bottom: 1px solid #ddd5ce;
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    text-align: center;
  }
  .chat-body {
    display: grid;
    gap: 0.8rem;
    padding: 1.2rem 0.9rem;
  }
  .bubble {
    background: #e9e5e0;
    border-radius: 0.9rem 0.9rem 0.9rem 0.2rem;
    font-size: 0.75rem;
    line-height: 1.45;
    margin: 0;
    padding: 0.8rem;
  }
  .bubble.guest {
    background: var(--ink);
    border-radius: 0.9rem 0.9rem 0.2rem 0.9rem;
    color: var(--paper);
    justify-self: end;
    max-width: 82%;
  }
  .chat-body button {
    background: var(--ink);
    border: 0;
    color: var(--paper);
    cursor: pointer;
    font-size: 0.72rem;
    padding: 0.8rem;
  }
  .staff-ui {
    background: #eee7e0;
    border-top: 1px solid var(--line);
    display: grid;
    grid-template-columns: 9rem 1fr;
    margin: 0 1rem 1rem;
    min-height: 23rem;
  }
  .staff-ui aside {
    background: var(--ink);
    color: var(--paper);
    display: grid;
    gap: 1rem;
    padding: 1.5rem 1rem;
    align-content: start;
  }
  .staff-ui aside strong {
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  .staff-ui aside span {
    font-size: 0.63rem;
    opacity: 0.65;
  }
  .staff-ui aside span.active {
    color: #e5a37c;
    opacity: 1;
  }
  .staff-main {
    min-width: 0;
    padding: 1.3rem;
  }
  .staff-heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .staff-heading small {
    color: var(--muted);
    font-size: 0.6rem;
  }
  .staff-heading h4 {
    font-size: 1.8rem;
    margin: 0.3rem 0 1rem;
  }
  .staff-heading > span {
    border: 1px solid var(--line);
    border-radius: 2rem;
    font-size: 0.62rem;
    padding: 0.5rem 0.7rem;
  }
  .staff-panels {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 1.35fr 0.8fr;
  }
  .staff-panels section {
    background: #faf8f5;
    padding: 1rem;
  }
  .panel-title {
    display: flex;
    font-size: 0.68rem;
    justify-content: space-between;
    margin-bottom: 0.6rem;
  }
  .panel-title small {
    color: var(--copper);
  }
  .queue > div:not(.panel-title) {
    align-items: center;
    border-top: 1px solid #ded7d0;
    display: grid;
    font-size: 0.58rem;
    gap: 0.5rem;
    grid-template-columns: 2.5rem 1fr auto;
    padding: 0.7rem 0;
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
    padding: 0.3rem 0.4rem;
  }
  .queue em.ready {
    background: #dde8da;
  }
  .attention p {
    border-top: 1px solid #ded7d0;
    font-family: 'Avenir Next', Avenir, sans-serif;
    font-size: 0.6rem;
    gap: 0.25rem;
    margin: 0;
    padding: 0.75rem 0;
  }
  .tool-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .tool-grid article {
    border: 1px solid var(--line);
    margin-right: -1px;
    padding: 2rem;
  }
  .tool-grid span {
    color: var(--copper);
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.5rem;
  }
  .tool-grid h3 {
    margin: 2.5rem 0 0.7rem;
  }
  .tool-grid p {
    color: var(--muted);
    font-size: 0.85rem;
  }
  .automatic {
    background: var(--ink);
    color: var(--paper);
  }
  .automatic .section-heading > p:last-child {
    color: #cbbfc3;
  }
  .automation-flow {
    align-items: stretch;
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
  }
  .automation-flow article {
    border: 1px solid rgba(244, 240, 235, 0.25);
    display: grid;
    min-height: 12rem;
    padding: 1.2rem;
  }
  .flow-icon {
    color: #e5a37c;
    font-size: 2rem;
  }
  .automation-flow h3 {
    align-self: end;
    font-size: 1.25rem;
    margin: 1rem 0 0.3rem;
  }
  .automation-flow p {
    color: #cbbfc3;
    font-size: 0.75rem;
    line-height: 1.35;
    margin: 0;
  }
  .flow-arrow {
    align-self: center;
    color: #e5a37c;
    padding: 0 0.55rem;
  }
  .maintenance {
    display: grid;
    gap: clamp(3rem, 8vw, 8rem);
    grid-template-columns: 0.8fr 1.2fr;
  }
  .maintenance-intro p:last-child {
    color: var(--muted);
    max-width: 34rem;
  }
  .maintenance-list article {
    align-items: start;
    border-top: 1px solid var(--line);
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 3rem 1fr;
    padding: 1.5rem 0;
  }
  .maintenance-list article:last-child {
    border-bottom: 1px solid var(--line);
  }
  .maintenance-list span {
    color: var(--copper);
    font-family: 'Iowan Old Style', Baskerville, serif;
    font-size: 1.5rem;
  }
  .maintenance-list h3 {
    margin: 0 0 0.5rem;
  }
  .maintenance-list p {
    color: var(--muted);
    font-size: 0.88rem;
    margin: 0;
  }
  .growth {
    background: #eee7e0;
  }
  .growth-heading h2 {
    max-width: 13ch;
  }
  .growth-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.8fr 0.8fr 1.2fr;
  }
  .growth-grid article {
    background: var(--paper);
    min-height: 28rem;
    padding: clamp(1.5rem, 3vw, 3rem);
  }
  .growth-grid article.production-card {
    background: var(--ink);
    color: var(--paper);
  }
  .growth-grid .phase {
    color: var(--copper);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .growth-grid h3 {
    font-size: 2rem;
  }
  .growth-grid ul {
    list-style: none;
    margin: 3rem 0 0;
    padding: 0;
  }
  .growth-grid li {
    border-top: 1px solid var(--line);
    font-size: 0.85rem;
    padding: 0.8rem 0;
  }
  .production-card li {
    border-color: rgba(244, 240, 235, 0.25);
  }
  .growth-grid li::before {
    color: var(--copper);
    content: '○';
    margin-right: 0.6rem;
  }
  .growth-grid figure {
    margin: 0;
    min-height: 28rem;
    overflow: hidden;
    position: relative;
  }
  .growth-grid img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
  .growth-grid figcaption {
    background: rgba(41, 23, 43, 0.85);
    bottom: 1rem;
    color: var(--paper);
    font-size: 0.7rem;
    left: 1rem;
    max-width: 16rem;
    padding: 0.7rem;
    position: absolute;
  }
  .final-cta {
    align-items: center;
    background: var(--ink);
    color: var(--paper);
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    padding-bottom: 3rem;
    padding-top: 3rem;
  }
  .final-cta h2 {
    font-size: clamp(2.2rem, 3.5vw, 4rem);
    margin: 0;
    max-width: 12ch;
  }
  .final-cta .actions {
    justify-content: flex-end;
    margin: 0;
  }
  .button-light {
    background: var(--paper);
    color: var(--ink);
  }
  .button-outline-light {
    border-color: rgba(244, 240, 235, 0.5);
    color: var(--paper);
  }
  .button-outline-light:hover {
    background: rgba(244, 240, 235, 0.1);
  }
  .site-footer {
    align-items: center;
    background: var(--wash);
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
    padding-bottom: 2.5rem;
    padding-top: 2.5rem;
  }
  .site-footer > p {
    font-size: 0.78rem;
    margin: 0;
    text-align: center;
  }
  .site-footer div {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-end;
  }
  .site-footer div a {
    font-size: 0.78rem;
    text-decoration: none;
  }
  .site-footer div a:hover {
    color: var(--copper);
  }

  @media (max-width: 1000px) {
    .problem {
      grid-template-columns: 1fr 1fr;
    }
    .problem-stats {
      grid-column: 1 / -1;
    }
    .journey-grid {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 3rem;
    }
    .journey-grid article:nth-child(4) {
      border-left: 0;
      padding-left: 0;
    }
    .experience-grid {
      grid-template-columns: 1fr;
    }
    .experience-card {
      min-height: 34rem;
    }
    .tool-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .automation-flow {
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
    }
    .flow-arrow {
      display: none;
    }
    .growth-grid {
      grid-template-columns: 1fr 1fr;
    }
    .growth-grid figure {
      grid-column: 1 / -1;
      min-height: 22rem;
    }
    .final-cta {
      align-items: flex-start;
      flex-direction: column;
    }
    .final-cta .actions {
      justify-content: flex-start;
    }
  }
  @media (max-width: 720px) {
    nav > a:not(.back-link) {
      display: none;
    }
    .back-link {
      padding: 0.7rem 0.8rem;
    }
    .hero {
      grid-template-columns: 1fr;
    }
    .hero-visual {
      min-height: 22rem;
      order: -1;
    }
    .hero-copy {
      padding-bottom: 4rem;
      padding-top: 4rem;
    }
    .problem {
      grid-template-columns: 1fr;
    }
    .problem > p {
      margin-top: 0;
    }
    .problem-stats {
      grid-column: auto;
    }
    .journey-grid {
      grid-template-columns: 1fr 1fr;
    }
    .journey-grid article:nth-child(odd) {
      border-left: 0;
      padding-left: 0;
    }
    .journey-grid article:nth-child(4) {
      border-left: 1px solid var(--line);
      padding-left: clamp(1rem, 2vw, 2rem);
    }
    .guest-card {
      grid-template-columns: 1fr;
    }
    .phone {
      margin: 0 1.5rem;
      min-height: 30rem;
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
    .tool-grid,
    .maintenance,
    .growth-grid {
      grid-template-columns: 1fr;
    }
    .growth-grid figure {
      grid-column: auto;
    }
    .automation-flow {
      grid-template-columns: 1fr 1fr;
    }
    .final-cta .actions,
    .final-cta .button {
      width: 100%;
    }
    .site-footer {
      align-items: flex-start;
      grid-template-columns: 1fr;
    }
    .site-footer > p {
      text-align: left;
    }
    .site-footer div {
      justify-content: flex-start;
    }
  }
  @media (max-width: 430px) {
    h1 {
      font-size: 3.25rem;
    }
    .problem-stats {
      grid-template-columns: 1fr;
    }
    .problem-stats div {
      border-left: 0;
      border-top: 1px solid var(--line);
      padding: 1rem 0;
    }
    .journey-grid,
    .tool-grid,
    .automation-flow {
      grid-template-columns: 1fr;
    }
    .journey-grid article,
    .journey-grid article:nth-child(4) {
      border-left: 0;
      border-top: 1px solid var(--line);
      padding: 1.2rem 0 0;
    }
    .journey-grid article:first-child {
      border-top: 0;
    }
    .journey-grid h3 {
      min-height: 0;
    }
    .staff-ui {
      margin: 0 0.6rem 0.6rem;
    }
    .staff-heading > span {
      display: none;
    }
    .staff-main {
      padding: 0.8rem;
    }
    .site-footer div {
      flex-direction: column;
      gap: 0.7rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
    }
  }
</style>
