<script lang="ts">
  type Voiceflow = {
    chat?: {
      open?: () => void;
      load?: (options: unknown) => void | Promise<unknown>;
    };
  };
  type ConciergeWindow = typeof globalThis & {
    voiceflow?: Voiceflow;
    voiceflowReady?: Promise<void>;
  };

  const secondaryServices = [
    'Hot Stone Ritual',
    'Scalp & Shoulder Release',
    'Aromatherapy Reset',
    'Seasonal Body Polish'
  ];
  const steps = [
    [
      '01',
      'Choose with confidence',
      'Describe what you need and receive one considered recommendation.'
    ],
    [
      '02',
      'Prepare with intention',
      'Share preferences and anything the team should understand before you arrive.'
    ],
    [
      '03',
      'Arrive already known',
      'Your practitioner receives a concise summary, so the visit starts with context.'
    ],
    [
      '04',
      'Continue the care',
      'Aftercare and a private check-in help the experience extend beyond the room.'
    ]
  ];

  async function openConcierge() {
    const conciergeWindow = globalThis as ConciergeWindow;
    await conciergeWindow.voiceflowReady;
    conciergeWindow.voiceflow?.chat?.open?.();
  }
</script>

<svelte:head>
  <title>Tranquility — A considered spa concierge</title>
  <meta
    name="description"
    content="Find the treatment your body is asking for with Tranquility's considered spa concierge."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="/" />
  <link rel="icon" href="/favicon.svg" />
  <meta
    property="og:title"
    content="Tranquility — A considered spa concierge"
  />
  <meta
    property="og:description"
    content="Tell us what you need today. Our concierge will guide you to one considered recommendation."
  />
  <meta property="og:image" content="/images/treatment-room.png" />
  <meta property="og:type" content="website" />
</svelte:head>

<header class="site-header">
  <a class="wordmark" href="#top" aria-label="Tranquility home">Tranquility</a>
  <nav aria-label="Primary navigation">
    <a href="#services">Services</a>
    <a href="#experience">The experience</a>
    <a href="#about">About</a>
    <button class="header-cta" type="button" onclick={openConcierge}
      >Help me choose</button
    >
  </nav>
</header>

<main id="top">
  <section class="hero section-rule" aria-labelledby="hero-title">
    <div class="hero-copy content-pad">
      <h1 id="hero-title">Find the treatment your body is asking for.</h1>
      <div class="copper-rule"></div>
      <p>
        Tell us what you need today. Our concierge will guide you to one
        considered recommendation.
      </p>
      <div class="actions">
        <button
          class="button button-primary"
          type="button"
          onclick={openConcierge}
          >Help me choose <span aria-hidden="true">→</span></button
        >
        <a class="button button-secondary" href="#services"
          >Explore services <span aria-hidden="true">→</span></a
        >
      </div>
    </div>
    <img
      class="hero-image"
      src="/images/treatment-room.png"
      alt="A quiet treatment room with a linen massage table and warm stone walls"
    />
  </section>

  <section
    class="services section-rule"
    id="services"
    aria-labelledby="services-title"
  >
    <div class="section-intro content-pad">
      <h2 id="services-title">A considered menu, made easier.</h2>
      <div class="copper-rule"></div>
      <p>
        Every treatment has a purpose. If you are unsure where to begin, tell us
        how you want to feel.
      </p>
    </div>
    <div class="service-layout content-pad">
      <div class="primary-list">
        <a
          class="service-row"
          href="https://cal.com/hanifcarroll/salt-cave-reset-45"
          target="_blank"
          rel="noreferrer"
          aria-label="Salt Cave Reset, 45 min, book on Cal (opens in a new tab)"
        >
          <span class="service-main"
            ><span class="service-name">Salt Cave Reset</span><span
              class="service-description"
              >Quiet mineral air for a slower nervous system.</span
            ></span
          >
          <span class="service-duration">45 min</span><span
            class="arrow"
            aria-hidden="true">→</span
          >
        </a>
        <a
          class="service-row"
          href="https://cal.com/hanifcarroll/tranquility-massage-60"
          target="_blank"
          rel="noreferrer"
          aria-label="Tranquility Massage, 60 min, book on Cal (opens in a new tab)"
        >
          <span class="service-main"
            ><span class="service-name">Tranquility Massage</span><span
              class="service-description"
              >Focused bodywork shaped around tension and pressure preference.</span
            ></span
          >
          <span class="service-duration">60 min</span><span
            class="arrow"
            aria-hidden="true">→</span
          >
        </a>
        <a
          class="service-row"
          href="https://cal.com/hanifcarroll/radiance-facial-60"
          target="_blank"
          rel="noreferrer"
          aria-label="Radiance Facial, 60 min, book on Cal (opens in a new tab)"
        >
          <span class="service-main"
            ><span class="service-name">Radiance Facial</span><span
              class="service-description"
              >A restorative facial for glow, hydration, and calm.</span
            ></span
          >
          <span class="service-duration">60 min</span><span
            class="arrow"
            aria-hidden="true">→</span
          >
        </a>
      </div>
      <div class="secondary-list">
        <h3>More ways to restore</h3>
        {#each secondaryServices as service (service)}
          <button type="button" onclick={openConcierge}
            >{service}<span aria-hidden="true">→</span><span class="sr-only"
              >Ask the concierge about {service}</span
            ></button
          >
        {/each}
      </div>
    </div>
    <div class="concierge-callout content-pad">
      <div>
        <h3>Not sure where to begin?</h3>
        <p>
          Tell us how you want to feel and our concierge will guide you to the
          right treatment.
        </p>
      </div>
      <button class="button button-dark" type="button" onclick={openConcierge}
        >Ask the concierge <span aria-hidden="true">→</span></button
      >
    </div>
  </section>

  <section
    class="experience section-rule"
    id="experience"
    aria-labelledby="experience-title"
  >
    <div class="experience-intro content-pad">
      <div>
        <h2 id="experience-title">Your visit, held from start to finish.</h2>
        <div class="copper-rule"></div>
        <p>
          A thoughtful recommendation is only the beginning. We carry what you
          tell us through booking, preparation, and the care that follows.
        </p>
      </div>
      <img
        src="/images/spa-corridor.png"
        alt="A softly lit spa corridor with a small pool and natural textures"
      />
    </div>
    <div class="steps content-pad">
      {#each steps as step (step[0])}
        <article class="step">
          <div class="step-number">{step[0]} <span></span></div>
          <h3>{step[1]}</h3>
          <p>{step[2]}</p>
        </article>
      {/each}
    </div>
    <div class="final-cta content-pad">
      <h2>Begin with what you need today.</h2>
      <button class="button button-dark" type="button" onclick={openConcierge}
        >Help me choose <span aria-hidden="true">→</span></button
      >
    </div>
  </section>
</main>

<footer id="about" class="site-footer content-pad">
  <a class="wordmark" href="#top">Tranquility</a>
  <nav aria-label="Footer navigation">
    <a href="#services">Services</a><a href="#experience">The experience</a><a
      href="#about">About</a
    >
  </nav>
  <p>
    A fictional spa experience built to demonstrate a no-code service concierge.
  </p>
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    margin: 0;
    background: #f1eee9;
    color: #28132d;
    font-family: Arial, sans-serif;
  }
  :global(button),
  :global(a) {
    font: inherit;
  }
  :global(a) {
    color: inherit;
  }
  :global(:focus-visible) {
    outline: 3px solid #b56d42;
    outline-offset: 4px;
  }
  .content-pad {
    padding-left: clamp(1.5rem, 6vw, 6rem);
    padding-right: clamp(1.5rem, 6vw, 6rem);
  }
  .site-header {
    align-items: center;
    border-bottom: 1px solid #bdb5af;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem clamp(1.5rem, 3.5vw, 3.5rem);
  }
  .wordmark {
    font-family: Georgia, serif;
    font-size: clamp(2rem, 3vw, 3rem);
    letter-spacing: -0.06em;
    text-decoration: none;
  }
  nav {
    align-items: center;
    display: flex;
    gap: clamp(1.5rem, 4vw, 4rem);
  }
  nav a {
    text-decoration: none;
  }
  nav a:hover {
    color: #b56d42;
  }
  .header-cta,
  .button {
    border: 1px solid #b56d42;
    cursor: pointer;
    display: inline-flex;
    justify-content: space-between;
    min-width: 12rem;
    padding: 1rem 1.25rem;
    text-align: left;
    text-decoration: none;
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }
  .header-cta {
    background: #28132d;
    color: #f1eee9;
    border: 0;
    min-width: 13.5rem;
    padding: 1.25rem 1.5rem;
  }
  .header-cta:hover,
  .button-primary:hover {
    background: #4a2949;
  }
  .button-primary,
  .button-dark {
    background: #28132d;
    color: #f1eee9;
    box-shadow: 0 4px 0 #b56d42;
  }
  .button-secondary {
    color: #28132d;
  }
  .button-secondary:hover {
    background: #e5dfd8;
  }
  .button-dark:hover {
    background: #b56d42;
  }
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 46rem;
  }
  .hero-copy {
    align-content: center;
    display: grid;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }
  h1,
  h2,
  .service-name,
  .step h3 {
    font-family: Georgia, serif;
    font-weight: 400;
    letter-spacing: -0.055em;
  }
  h1 {
    font-size: clamp(3.8rem, 6.4vw, 7rem);
    line-height: 0.94;
    max-width: 9ch;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: clamp(3rem, 5vw, 5.6rem);
    line-height: 0.98;
    max-width: 11ch;
  }
  .copper-rule {
    background: #b56d42;
    height: 2px;
    margin: 1.5rem 0 2rem;
    width: 5.5rem;
  }
  p {
    font-size: 1.15rem;
    line-height: 1.55;
    max-width: 33rem;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-top: 1.5rem;
  }
  .hero-image {
    height: 100%;
    min-height: 46rem;
    object-fit: cover;
    width: 100%;
  }
  .section-rule {
    border-bottom: 1px solid #bdb5af;
  }
  .services {
    padding-top: clamp(5rem, 10vw, 10rem);
  }
  .section-intro p {
    max-width: 38rem;
  }
  .service-layout {
    display: grid;
    gap: clamp(3rem, 8vw, 8rem);
    grid-template-columns: minmax(0, 1.6fr) minmax(15rem, 0.8fr);
    margin-top: 3rem;
  }
  .service-row,
  .secondary-list button {
    align-items: center;
    border-top: 1px solid #bdb5af;
    display: grid;
    gap: 1rem;
    padding: 1.4rem 0;
    text-decoration: none;
  }
  .service-row {
    grid-template-columns: 1fr auto auto;
  }
  .service-row:hover .service-name,
  .secondary-list button:hover {
    color: #b56d42;
  }
  .service-main {
    display: grid;
    gap: 0.65rem;
  }
  .service-name {
    font-size: clamp(1.7rem, 2.4vw, 2.5rem);
  }
  .service-description {
    line-height: 1.45;
  }
  .service-duration {
    color: #b56d42;
    font-size: 1.1rem;
    white-space: nowrap;
  }
  .arrow {
    color: #b56d42;
    font-size: 1.8rem;
  }
  .secondary-list h3 {
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0;
    padding: 1.4rem 0;
  }
  .secondary-list button {
    background: transparent;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    cursor: pointer;
    grid-template-columns: 1fr auto;
    padding: 1.2rem 0;
    text-align: left;
    width: 100%;
  }
  .concierge-callout {
    align-items: center;
    background: #28132d;
    color: #f1eee9;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    margin: 4rem clamp(1.5rem, 6vw, 6rem) 0;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  .concierge-callout h3 {
    font-family: Georgia, serif;
    font-size: clamp(2rem, 3vw, 3rem);
    font-weight: 400;
    letter-spacing: -0.04em;
    margin-bottom: 0.5rem;
  }
  .concierge-callout p {
    font-size: 1rem;
    margin-bottom: 0;
  }
  .experience {
    padding-top: clamp(5rem, 10vw, 10rem);
  }
  .experience-intro {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
  }
  .experience-intro img {
    height: 100%;
    max-height: 34rem;
    object-fit: cover;
    width: 100%;
  }
  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .step {
    border-right: 1px solid #bdb5af;
    padding: 0 2.5rem;
  }
  .step:first-child {
    padding-left: 0;
  }
  .step:last-child {
    border-right: 0;
    padding-right: 0;
  }
  .step-number {
    color: #b56d42;
    font-family: Georgia, serif;
    font-size: 3rem;
  }
  .step-number span {
    background: #b56d42;
    display: inline-block;
    height: 1px;
    margin: 0 0 0.8rem 1rem;
    width: 5rem;
  }
  .step h3 {
    font-size: 1.6rem;
    margin: 1.1rem 0 0.6rem;
  }
  .step p {
    font-size: 1rem;
  }
  .final-cta {
    align-items: center;
    background: #28132d;
    color: #f1eee9;
    display: flex;
    justify-content: space-between;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  .final-cta h2 {
    font-size: clamp(2rem, 3vw, 3rem);
    max-width: none;
    margin: 0;
  }
  .site-footer {
    align-items: center;
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1.3fr 1fr;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  .site-footer nav {
    justify-content: center;
  }
  .site-footer p {
    font-size: 0.95rem;
    margin: 0;
  }
  .sr-only {
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  @media (max-width: 800px) {
    .site-header {
      align-items: flex-start;
      gap: 1.25rem;
    }
    .site-header nav {
      flex-wrap: wrap;
      gap: 0.9rem 1.25rem;
      justify-content: flex-end;
    }
    .header-cta {
      min-width: auto;
      padding: 0.8rem 1rem;
    }
    .hero,
    .experience-intro,
    .service-layout {
      grid-template-columns: 1fr;
    }
    .hero-image {
      min-height: 24rem;
      max-height: 30rem;
      order: -1;
    }
    .hero-copy {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
    .service-layout {
      gap: 3rem;
    }
    .concierge-callout,
    .final-cta {
      align-items: flex-start;
      flex-direction: column;
    }
    .steps {
      gap: 2.5rem;
      grid-template-columns: 1fr 1fr;
    }
    .step:nth-child(2) {
      border-right: 0;
    }
    .step:nth-child(3) {
      padding-left: 0;
    }
    .site-footer {
      align-items: start;
      grid-template-columns: 1fr;
    }
    .site-footer nav {
      justify-content: flex-start;
    }
  }
  @media (max-width: 500px) {
    .site-header {
      display: block;
    }
    .site-header nav {
      justify-content: flex-start;
      margin-top: 1.2rem;
    }
    .site-header nav a {
      font-size: 0.95rem;
    }
    h1 {
      font-size: 3.6rem;
    }
    .service-row {
      grid-template-columns: 1fr auto;
    }
    .service-duration {
      grid-column: 1;
      grid-row: 2;
    }
    .service-row .arrow {
      grid-column: 2;
      grid-row: 1 / span 2;
    }
    .steps {
      grid-template-columns: 1fr;
    }
    .step,
    .step:nth-child(2),
    .step:nth-child(3) {
      border-right: 0;
      border-top: 1px solid #bdb5af;
      padding: 1.5rem 0 0;
    }
    .step:first-child {
      border-top: 0;
      padding-top: 0;
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
