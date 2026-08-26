<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { serviceCategories, spaServices } from '$lib/catalog';

  gsap.registerPlugin(ScrollTrigger);

  type TypebotClient = {
    open?: () => void;
  };
  type ConciergeWindow = typeof globalThis & {
    Typebot?: TypebotClient;
    typebotReady?: Promise<unknown>;
  };

  let activeCategory = $state('All');
  const visibleServices = $derived(
    activeCategory === 'All'
      ? spaServices
      : spaServices.filter((service) => service.category === activeCategory)
  );
  const steps = [
    [
      '01',
      'Choose with confidence',
      'Start in free text, add your goal and time, then receive one concise recommendation.'
    ],
    [
      '02',
      'Book with clarity',
      'View available times through Cal.com, the source of truth for your booking and contact details.'
    ],
    [
      '03',
      'Arrive already known',
      'The operator receives a useful summary, while Tally gathers post-booking intake when it is relevant.'
    ],
    [
      '04',
      'Continue the care',
      'Post-visit feedback helps the spa keep the experience thoughtful beyond the room.'
    ]
  ];
  const faqs = [
    [
      'How do I know which service is right for me?',
      'Start with how you want to feel rather than a treatment name. The concierge can help you weigh energy, focus, pressure, and time, then point you to one place to begin.'
    ],
    [
      'What should I know before I arrive?',
      'Plan to arrive a few minutes early so you can settle in without rushing. Wear what feels comfortable, and share preferences or accessibility needs when you book or speak with the concierge.'
    ],
    [
      'How do I ask the spa a question?',
      'Choose Ask the spa when you need staff help. Typebot collects your name and email for that request only; it does not handle booking.'
    ],
    [
      'What happens after I book?',
      'Cal.com confirms the appointment and collects booking contact details. Tally can then collect post-booking intake and feedback, and the operator receives a useful summary.'
    ]
  ];

  async function openConcierge() {
    const conciergeWindow = globalThis as ConciergeWindow;
    await conciergeWindow.typebotReady;
    conciergeWindow.Typebot?.open?.();
  }

  onMount(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          desktop: '(min-width: 801px)',
          reduceMotion: '(prefers-reduced-motion: reduce)'
        },
        ({ conditions }) => {
          if (conditions?.reduceMotion) {
            return;
          }

          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from(
              '.hero .eyebrow, .hero h1, .hero .copper-rule, .hero-lede, .hero .actions, .hero-note',
              {
                duration: 0.75,
                opacity: 0,
                y: 18,
                stagger: 0.08
              }
            )
            .from('.hero-visual', { duration: 1, opacity: 0, y: 12 }, '-=0.55');

          gsap.utils
            .toArray<HTMLElement>('[data-reveal]')
            .forEach((element) => {
              gsap.from(element, {
                duration: 0.85,
                ease: 'power3.out',
                opacity: 0,
                scrollTrigger: {
                  trigger: element,
                  start: 'top 84%',
                  once: true
                },
                y: 24
              });
            });

          if (conditions?.desktop) {
            gsap.to('.hero-image', {
              ease: 'none',
              scrollTrigger: {
                end: 'bottom top',
                scrub: true,
                start: 'top top',
                trigger: '.hero'
              },
              yPercent: 3
            });
            gsap.to('.experience-intro img', {
              ease: 'none',
              scrollTrigger: {
                end: 'bottom 20%',
                scrub: true,
                start: 'top bottom',
                trigger: '.experience-image-wrap'
              },
              yPercent: 3
            });
          }
        }
      );
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  });
</script>

<svelte:head>
  <title>Tranquility — A considered spa concierge</title>
  <meta
    name="description"
    content="Find the treatment your body is asking for with Tranquility's considered spa concierge."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://spa-concierge-prototype.pages.dev/" />
  <link rel="icon" href="/favicon.svg" />
  <meta
    property="og:title"
    content="Tranquility — A considered spa concierge"
  />
  <meta
    property="og:description"
    content="Tell us what you need today. Our concierge will guide you to one considered recommendation."
  />
  <meta
    property="og:image"
    content="https://spa-concierge-prototype.pages.dev/images/treatment-room.png"
  />
  <meta property="og:type" content="website" />
</svelte:head>

<header class="site-header">
  <a class="wordmark" href="#top" aria-label="Tranquility home"
    >Tranquility<span aria-hidden="true">.</span></a
  >
  <nav class="desktop-nav" aria-label="Primary navigation">
    <a href="#services">Services</a>
    <a href="#experience">The experience</a>
    <a href="#about">Our approach</a>
    <a href="#faq">FAQ</a>
    <button class="header-cta" type="button" onclick={openConcierge}
      >Help me choose <span aria-hidden="true">↗</span></button
    >
  </nav>
  <details class="mobile-nav">
    <summary aria-label="Open navigation"
      ><span></span><span></span><span></span><b class="sr-only">Menu</b
      ></summary
    >
    <nav aria-label="Mobile navigation">
      <a href="#services">Services</a>
      <a href="#experience">The experience</a>
      <a href="#about">Our approach</a>
      <a href="#faq">FAQ</a>
      <button class="header-cta" type="button" onclick={openConcierge}
        >Help me choose <span aria-hidden="true">↗</span></button
      >
    </nav>
  </details>
</header>

<main id="top">
  <section class="hero section-rule" aria-labelledby="hero-title">
    <div class="hero-copy content-pad">
      <p class="eyebrow">A slower way to decide</p>
      <h1 id="hero-title">Find the treatment your body is asking for.</h1>
      <div class="copper-rule"></div>
      <p class="hero-lede">
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
      <p class="hero-note">
        <span aria-hidden="true">✦</span> Private, practical guidance · no pressure
        to book · Cal.com handles the appointment
      </p>
    </div>
    <div class="hero-visual">
      <img
        class="hero-image"
        src="/images/treatment-room.png"
        alt="A quiet treatment room with a linen massage table and warm stone walls"
      />
      <span class="image-caption">The treatment room · a place to arrive</span>
    </div>
  </section>

  <section
    class="services section-rule"
    id="services"
    aria-labelledby="services-title"
  >
    <div class="section-intro content-pad" data-reveal>
      <p class="eyebrow">The menu</p>
      <h2 id="services-title">A considered menu, made easier.</h2>
      <div class="copper-rule"></div>
      <p>
        Every treatment has a purpose. If you are unsure where to begin, tell us
        how you want to feel.
      </p>
    </div>
    <div class="service-layout content-pad" data-reveal>
      <div class="primary-list" aria-live="polite">
        {#each visibleServices as service, index (service.key)}
          <a
            class="service-row"
            href={service.bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${service.name}, ${service.durationMinutes} minutes, book on Cal (opens in a new tab)`}
          >
            <span class="service-index"
              >{String(index + 1).padStart(2, '0')}</span
            >
            <span class="service-main">
              <span class="service-name">{service.name}</span>
              <span class="service-description">{service.shortDescription}</span
              >
              <span class="service-meta"
                >{service.category} · {service.primaryGoal}</span
              >
            </span>
            <span class="service-duration">{service.durationMinutes} min</span>
            <span class="arrow" aria-hidden="true">→</span>
          </a>
        {/each}
      </div>
      <aside class="secondary-list" aria-labelledby="filter-title">
        <p class="eyebrow">Browse gently</p>
        <h3 id="filter-title">Find your kind of care</h3>
        <div
          class="category-filters"
          role="group"
          aria-label="Filter services by category"
        >
          {#each serviceCategories as category (category)}
            <button
              class:active={activeCategory === category}
              type="button"
              aria-pressed={activeCategory === category}
              onclick={() => (activeCategory = category)}
              >{category}<span class="arrow" aria-hidden="true"
                >{category === activeCategory ? '•' : '→'}</span
              ></button
            >
          {/each}
        </div>
        <p class="filter-count">
          Showing {visibleServices.length} of {spaServices.length} services.
        </p>
      </aside>
    </div>
    <div class="concierge-callout content-pad" data-reveal>
      <div>
        <p class="eyebrow">A little help is enough</p>
        <h3>Not sure where to begin?</h3>
        <p>
          Tell us how you want to feel and our concierge will guide you to the
          right treatment.
        </p>
      </div>
      <button class="button button-light" type="button" onclick={openConcierge}
        >Ask the concierge <span aria-hidden="true">→</span></button
      >
    </div>
  </section>

  <section
    class="approach section-rule"
    id="about"
    aria-labelledby="about-title"
  >
    <div class="approach-copy content-pad" data-reveal>
      <p class="eyebrow">Our approach</p>
      <h2 id="about-title">Care should feel personal before it begins.</h2>
      <p class="large-copy">
        Tranquility is built around a simple belief: the best wellness
        experience starts with being listened to. We keep the menu focused, the
        language clear, and the recommendation honest.
      </p>
      <p>
        There is no perfect treatment in the abstract. There is only what feels
        right for your body, your energy, and the day you are having. Our
        concierge helps make that first decision feel lighter.
      </p>
    </div>
    <div class="approach-aside" data-reveal>
      <span class="aside-mark" aria-hidden="true">T</span>
      <p>Less noise.<br />More attention.<br />A place to reset.</p>
    </div>
  </section>

  <section
    class="experience section-rule"
    id="experience"
    aria-labelledby="experience-title"
  >
    <div class="experience-intro content-pad" data-reveal>
      <div>
        <p class="eyebrow">The visit</p>
        <h2 id="experience-title">Held from start to finish.</h2>
        <div class="copper-rule"></div>
        <p>
          A thoughtful recommendation is only the beginning. Cal.com handles the
          booking, Tally supports post-booking intake and feedback, and the
          operator receives a useful summary.
        </p>
      </div>
      <div class="experience-image-wrap">
        <img
          src="/images/spa-corridor.png"
          alt="A softly lit spa corridor with a small pool and natural textures"
        /><span class="image-caption">A quiet transition between moments</span>
      </div>
    </div>
    <div class="steps content-pad" data-reveal>
      {#each steps as step (step[0])}
        <article class="step">
          <div class="step-number">{step[0]} <span></span></div>
          <h3>{step[1]}</h3>
          <p>{step[2]}</p>
        </article>
      {/each}
    </div>
    <div class="visit-details content-pad" data-reveal>
      <div>
        <p class="eyebrow">Before you arrive</p>
        <h3>Make room for the pause.</h3>
      </div>
      <p>
        Give yourself a few unhurried minutes before your appointment. Tally can
        collect the details that help the team prepare, without adding another
        decision to booking.
      </p>
      <p>
        Afterward, a short Tally check-in gives the spa useful feedback and
        helps the care continue beyond the room.
      </p>
    </div>
    <div class="final-cta content-pad" data-reveal>
      <h2>Begin with what you need today.</h2>
      <button class="button button-light" type="button" onclick={openConcierge}
        >Help me choose <span aria-hidden="true">→</span></button
      >
    </div>
  </section>

  <section class="faq section-rule" id="faq" aria-labelledby="faq-title">
    <div class="content-pad faq-heading" data-reveal>
      <p class="eyebrow">Good to know</p>
      <h2 id="faq-title">A few things, answered.</h2>
    </div>
    <div class="faq-list content-pad" data-reveal>
      {#each faqs as faq (faq[0])}
        <details>
          <summary>{faq[0]}<span aria-hidden="true">+</span></summary>
          <p>{faq[1]}</p>
        </details>
      {/each}
    </div>
  </section>
</main>

<footer class="site-footer content-pad">
  <div class="footer-brand">
    <a class="wordmark" href="#top"
      >Tranquility<span aria-hidden="true">.</span></a
    >
    <p>Considered care for the way you feel today.</p>
  </div>
  <div class="footer-links">
    <div>
      <p class="eyebrow">Explore</p>
      <a href="#services">Services</a><a href="#experience">The experience</a><a
        href="#about">Our approach</a
      ><a href="#faq">FAQ</a><a href="/system">How this system works</a>
    </div>
    <div>
      <p class="eyebrow">Concierge</p>
      <button type="button" onclick={openConcierge}
        >Help me choose <span aria-hidden="true">↗</span></button
      >
      <p>Monday–Friday<br />9–5 Eastern</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>
      A fictional spa experience built to demonstrate a no-code service
      concierge.
    </p>
    <p>© 2026 Tranquility</p>
  </div>
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(:root) {
    --ease-out-premium: cubic-bezier(0.16, 1, 0.3, 1);
  }
  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    margin: 0;
    background: #f4f0eb;
    color: #29172b;
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
    outline: 3px solid #b86e45;
    outline-offset: 4px;
  }
  :global(section[id]) {
    scroll-margin-top: 7rem;
  }
  .content-pad {
    padding-left: clamp(1.5rem, 7vw, 8rem);
    padding-right: clamp(1.5rem, 7vw, 8rem);
  }
  .site-header {
    align-items: center;
    backdrop-filter: blur(14px);
    background: rgba(244, 240, 235, 0.92);
    border-bottom: 1px solid #cfc4bb;
    display: flex;
    justify-content: space-between;
    padding: 1rem clamp(1.5rem, 3.5vw, 3.5rem);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .wordmark {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: clamp(1.9rem, 3vw, 2.7rem);
    letter-spacing: -0.07em;
    text-decoration: none;
  }
  .wordmark span {
    color: #b86e45;
  }
  nav {
    align-items: center;
    display: flex;
    gap: clamp(1.1rem, 3vw, 3rem);
  }
  nav a,
  .footer-links a {
    text-decoration: none;
    transition: color 0.35s var(--ease-out-premium);
  }
  nav a:hover,
  .footer-links a:hover,
  .footer-links button:hover {
    color: #b86e45;
  }
  .header-cta,
  .button {
    border: 1px solid #b86e45;
    cursor: pointer;
    display: inline-flex;
    gap: 1.5rem;
    justify-content: space-between;
    min-width: 12rem;
    padding: 0.95rem 1.15rem;
    text-align: left;
    text-decoration: none;
    transition:
      background 0.4s var(--ease-out-premium),
      color 0.4s var(--ease-out-premium),
      transform 0.4s var(--ease-out-premium);
  }
  .header-cta {
    background: #29172b;
    color: #f4f0eb;
    border: 0;
    min-width: 12rem;
    padding: 1rem 1.2rem;
  }
  .header-cta:hover,
  .button-primary:hover {
    background: #553653;
    transform: translateY(-2px);
  }
  .button-primary {
    background: #29172b;
    color: #f4f0eb;
    box-shadow: 0 4px 0 #b86e45;
  }
  .button-light {
    background: #f4f0eb;
    color: #29172b;
    border-color: #f4f0eb;
  }
  .button-light:hover {
    background: #fff;
    transform: translateY(-2px);
  }
  .button-secondary {
    color: #29172b;
  }
  .button-secondary:hover {
    background: #e9e1da;
    transform: translateY(-2px);
  }
  .mobile-nav {
    display: none;
  }
  .hero {
    display: grid;
    grid-template-columns: 0.92fr 1.08fr;
    height: clamp(40rem, calc(100svh - 5.5rem), 47rem);
  }
  .hero-copy {
    align-content: center;
    display: grid;
    padding-bottom: clamp(3rem, 5vh, 4rem);
    padding-left: clamp(2rem, 5.5vw, 6.5rem);
    padding-right: clamp(2rem, 5.5vw, 6.5rem);
    padding-top: clamp(3rem, 5vh, 4rem);
  }
  .hero-visual {
    overflow: hidden;
    position: relative;
  }
  .hero-image {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
    will-change: transform;
  }
  .image-caption {
    bottom: 1rem;
    color: #f4f0eb;
    font-size: 0.7rem;
    left: 1.2rem;
    letter-spacing: 0.12em;
    position: absolute;
    text-transform: uppercase;
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
  .step h3,
  .visit-details h3 {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-weight: 400;
    letter-spacing: -0.055em;
  }
  h1 {
    font-size: clamp(3.8rem, 5vw, 6.25rem);
    line-height: 0.94;
    margin-bottom: 1.25rem;
    max-width: 9.5ch;
  }
  h2 {
    font-size: clamp(3rem, 5.4vw, 6rem);
    line-height: 0.95;
    max-width: 10ch;
  }
  h3 {
    font-weight: 400;
  }
  p {
    font-size: 1.05rem;
    line-height: 1.6;
    max-width: 34rem;
  }
  .eyebrow {
    color: #b86e45;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    line-height: 1.3;
    margin-bottom: 1.3rem;
    max-width: none;
    text-transform: uppercase;
  }
  .copper-rule {
    background: #b86e45;
    height: 2px;
    margin: 1.5rem 0 2rem;
    width: 5.5rem;
  }
  .hero-lede {
    font-size: 1.1rem;
    max-width: 31rem;
  }
  .hero .copper-rule {
    margin: 0.75rem 0 1.35rem;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-top: 0.85rem;
  }
  .hero-note {
    color: #6f6260;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    margin: 1.75rem 0 0;
  }
  .hero-note span {
    color: #b86e45;
    margin-right: 0.4rem;
  }
  .section-rule {
    border-bottom: 1px solid #cfc4bb;
  }
  .services,
  .experience,
  .faq {
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
    border-top: 1px solid #cfc4bb;
    display: grid;
    gap: 1rem;
    padding: 1.35rem 0;
    text-decoration: none;
  }
  .service-row {
    grid-template-columns: 2.2rem 1fr auto auto;
  }
  .service-name,
  .service-row .arrow,
  .secondary-list button {
    transition:
      color 0.4s var(--ease-out-premium),
      transform 0.4s var(--ease-out-premium);
  }
  .service-row:hover .service-name,
  .secondary-list button:hover {
    color: #b86e45;
  }
  .service-row:hover .arrow,
  .secondary-list button:hover .arrow {
    transform: translateX(0.35rem);
  }
  .service-index {
    color: #b86e45;
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: 1rem;
  }
  .service-main {
    display: grid;
    gap: 0.55rem;
  }
  .service-name {
    font-size: clamp(1.7rem, 2.4vw, 2.5rem);
  }
  .service-description {
    color: #66595d;
    line-height: 1.45;
  }
  .service-meta,
  .filter-count {
    color: #8a7770;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .service-meta {
    line-height: 1.3;
  }
  .service-duration {
    color: #b86e45;
    font-size: 0.9rem;
    white-space: nowrap;
  }
  .arrow {
    color: #b86e45;
    font-size: 1.8rem;
  }
  .secondary-list h3 {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: 2rem;
    letter-spacing: -0.04em;
    margin: 0;
  }
  .secondary-list button {
    background: transparent;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    cursor: pointer;
    grid-template-columns: 1fr auto;
    padding: 1.1rem 0;
    text-align: left;
    width: 100%;
  }
  .secondary-list button.active {
    color: #b86e45;
  }
  .filter-count {
    margin-top: 1.5rem;
  }
  .concierge-callout {
    align-items: center;
    background: #29172b;
    color: #f4f0eb;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    margin: 5rem clamp(1.5rem, 7vw, 8rem) 0;
    padding-bottom: 2.5rem;
    padding-top: 2.5rem;
  }
  .concierge-callout .eyebrow {
    margin-bottom: 0.7rem;
  }
  .concierge-callout h3 {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: clamp(2rem, 3vw, 3rem);
    letter-spacing: -0.04em;
    margin-bottom: 0.5rem;
  }
  .concierge-callout p {
    font-size: 1rem;
    margin-bottom: 0;
  }
  .approach {
    align-items: stretch;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
  }
  .approach-copy {
    padding-bottom: clamp(5rem, 10vw, 9rem);
    padding-top: clamp(5rem, 10vw, 9rem);
  }
  .approach-copy h2 {
    max-width: 11ch;
  }
  .large-copy {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: clamp(1.5rem, 2.4vw, 2.25rem);
    letter-spacing: -0.03em;
    line-height: 1.25;
    max-width: 38rem;
  }
  .approach-aside {
    align-items: center;
    background: #e7ded6;
    display: flex;
    justify-content: center;
    min-height: 30rem;
    padding: 3rem;
  }
  .aside-mark {
    color: #b86e45;
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: clamp(12rem, 25vw, 23rem);
    line-height: 0.7;
    opacity: 0.7;
  }
  .approach-aside p {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: 1.35rem;
    line-height: 1.3;
    margin: 0 0 0 -3rem;
    position: relative;
  }
  .experience-intro {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
  }
  .experience-intro h2 {
    max-width: 9ch;
  }
  .experience-image-wrap {
    overflow: hidden;
    position: relative;
  }
  .experience-intro img {
    display: block;
    height: 100%;
    max-height: 34rem;
    object-fit: cover;
    width: 100%;
    will-change: transform;
  }
  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-bottom: 4rem;
    padding-top: 4rem;
  }
  .step {
    border-right: 1px solid #cfc4bb;
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
    color: #b86e45;
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: 2.6rem;
  }
  .step-number span {
    background: #b86e45;
    display: inline-block;
    height: 1px;
    margin: 0 0 0.7rem 0.8rem;
    width: 3.8rem;
  }
  .step h3 {
    font-size: 1.55rem;
    margin: 1.1rem 0 0.6rem;
  }
  .step p {
    color: #66595d;
    font-size: 0.95rem;
  }
  .visit-details {
    border-top: 1px solid #cfc4bb;
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
    padding-bottom: 4rem;
    padding-top: 3rem;
  }
  .visit-details h3 {
    font-size: 2.2rem;
    margin: 0;
    max-width: 9ch;
  }
  .visit-details p {
    font-size: 0.95rem;
  }
  .final-cta {
    align-items: center;
    background: #29172b;
    color: #f4f0eb;
    display: flex;
    justify-content: space-between;
    padding-bottom: 2.5rem;
    padding-top: 2.5rem;
  }
  .final-cta h2 {
    font-size: clamp(2rem, 3vw, 3rem);
    max-width: none;
    margin: 0;
  }
  .faq {
    display: grid;
    gap: 5rem;
    grid-template-columns: 0.8fr 1.2fr;
    padding-bottom: clamp(5rem, 10vw, 10rem);
  }
  .faq-heading h2 {
    max-width: 8ch;
  }
  .faq-list details {
    border-top: 1px solid #cfc4bb;
    padding: 1.35rem 0;
  }
  .faq-list details:last-child {
    border-bottom: 1px solid #cfc4bb;
  }
  .faq-list summary {
    cursor: pointer;
    display: flex;
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: clamp(1.3rem, 2vw, 1.8rem);
    gap: 1rem;
    justify-content: space-between;
    list-style: none;
  }
  .faq-list summary::-webkit-details-marker {
    display: none;
  }
  .faq-list summary span {
    color: #b86e45;
    font-family: 'Avenir Next', Avenir, 'Helvetica Neue', sans-serif;
    font-size: 1.5rem;
  }
  .faq-list details[open] summary span {
    transform: rotate(45deg);
  }
  .faq-list details p {
    color: #66595d;
    margin: 1rem 2rem 0 0;
  }
  .site-footer {
    background: #e7ded6;
    display: grid;
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 2.5rem;
    padding-top: 4rem;
  }
  .footer-brand p {
    font-family: 'Iowan Old Style', Baskerville, 'Times New Roman', serif;
    font-size: 1.1rem;
  }
  .footer-links {
    display: grid;
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
  }
  .footer-links div {
    display: grid;
    gap: 0.65rem;
    align-content: start;
  }
  .footer-links .eyebrow {
    margin-bottom: 0.35rem;
  }
  .footer-links button {
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }
  .footer-links p {
    font-size: 0.85rem;
    margin: 0.65rem 0 0;
  }
  .footer-bottom {
    border-top: 1px solid #cfc4bb;
    display: flex;
    font-size: 0.75rem;
    grid-column: 1 / -1;
    justify-content: space-between;
    padding-top: 1.5rem;
  }
  .footer-bottom p {
    font-size: 0.75rem;
    margin: 0;
    max-width: none;
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
    .desktop-nav {
      display: none;
    }
    .mobile-nav {
      display: block;
      position: relative;
    }
    .mobile-nav summary {
      cursor: pointer;
      list-style: none;
      padding: 0.4rem;
    }
    .mobile-nav summary::-webkit-details-marker {
      display: none;
    }
    .mobile-nav summary span {
      background: #29172b;
      display: block;
      height: 2px;
      margin: 4px 0;
      width: 1.4rem;
    }
    .mobile-nav[open] nav {
      align-items: stretch;
      background: #f4f0eb;
      border: 1px solid #cfc4bb;
      box-shadow: 0 1rem 2rem rgba(41, 23, 43, 0.12);
      display: grid;
      gap: 0;
      min-width: 13rem;
      padding: 0.5rem;
      position: absolute;
      right: 0;
      top: 2.7rem;
    }
    .mobile-nav nav a,
    .mobile-nav .header-cta {
      padding: 0.8rem;
    }
    .hero,
    .experience-intro,
    .service-layout,
    .approach,
    .faq {
      grid-template-columns: 1fr;
    }
    .hero {
      height: auto;
    }
    .hero-image {
      height: clamp(20rem, 55vw, 28rem);
    }
    .hero-copy {
      padding-bottom: 3.5rem;
      padding-top: 3.5rem;
    }
    .hero-visual {
      order: -1;
    }
    .service-layout {
      gap: 3rem;
    }
    .approach-aside {
      min-height: 20rem;
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
    .visit-details {
      grid-template-columns: 1fr 1fr;
    }
    .visit-details > :first-child {
      grid-column: 1 / -1;
    }
    .concierge-callout,
    .final-cta {
      align-items: flex-start;
      flex-direction: column;
    }
    .faq {
      gap: 3rem;
    }
    .site-footer {
      grid-template-columns: 1fr;
    }
    .footer-bottom {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 3.35rem;
    }
    .service-row {
      grid-template-columns: 1.8rem 1fr auto;
    }
    .service-duration {
      grid-column: 2;
    }
    .service-row .arrow {
      grid-column: 3;
      grid-row: 1 / span 2;
    }
    .steps,
    .visit-details,
    .footer-links {
      grid-template-columns: 1fr;
    }
    .visit-details > :first-child {
      grid-column: auto;
    }
    .step,
    .step:nth-child(2),
    .step:nth-child(3) {
      border-right: 0;
      border-top: 1px solid #cfc4bb;
      padding: 1.5rem 0 0;
    }
    .step:first-child {
      border-top: 0;
      padding-top: 0;
    }
    .approach-aside {
      justify-content: flex-start;
    }
    .aside-mark {
      font-size: 11rem;
    }
    .approach-aside p {
      margin-left: -2rem;
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
