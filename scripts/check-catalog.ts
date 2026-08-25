import {
  bookingPools,
  createBookingUrl,
  spaServices
} from '../src/lib/catalog.ts';

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(`Catalog check failed: ${message}`);
};

const expectedPools = {
  'massage-bodywork': ['Massage & Bodywork', [30, 45, 60, 75, 90]],
  facials: ['Facials', [30, 60, 75]],
  'body-treatments': ['Body Treatments', [60, 75, 90]],
  'salt-cave': ['Salt Cave', [45]],
  'restorative-rituals': ['Restorative Rituals', [30, 45]],
  consultation: ['Consultation', [30]]
} as const;

const expectedServices = {
  'massage-bodywork': [
    'Tranquility Massage',
    'Deep Release Massage',
    'Scalp & Shoulder Release',
    'Back Renewal',
    'Warm Stone Ritual',
    'Restorative Massage',
    'Energizing Massage',
    'Hand & Arm Recovery'
  ],
  facials: [
    'Radiance Facial',
    'Deep Hydration Facial',
    'Sculpting Facial',
    'Express Glow Facial'
  ],
  'body-treatments': [
    'Seasonal Body Polish',
    'Body Balance Wrap',
    'Seasonal Reset Ritual'
  ],
  'salt-cave': ['Salt Cave Reset'],
  'restorative-rituals': [
    'Aromatherapy Reset',
    'Foot Grounding Ritual',
    'Quiet Scalp Ritual'
  ],
  consultation: ['Custom Care Consultation']
} as const;

assert(
  bookingPools.length === 6,
  `expected 6 booking pools, found ${bookingPools.length}`
);
for (const pool of bookingPools) {
  const expected = expectedPools[pool.id];
  assert(expected, `unexpected booking pool ${pool.id}`);
  assert(pool.name === expected[0], `wrong name for ${pool.id}`);
  assert(
    JSON.stringify(pool.allowedDurations) === JSON.stringify(expected[1]),
    `wrong durations for ${pool.id}`
  );
}

assert(
  spaServices.length === 20,
  `expected 20 services, found ${spaServices.length}`
);
assert(
  new Set(spaServices.map((service) => service.key)).size === 20,
  'service keys must be unique'
);
for (const [poolId, names] of Object.entries(expectedServices)) {
  const services = spaServices.filter((service) => service.poolId === poolId);
  assert(
    JSON.stringify(services.map((service) => service.name).sort()) ===
      JSON.stringify([...names].sort()),
    `wrong service mapping for ${poolId}`
  );
}
for (const service of spaServices) {
  const pool = bookingPools.find(
    (candidate) => candidate.id === service.poolId
  );
  assert(pool, `missing pool for ${service.name}`);
  assert(
    pool.allowedDurations.includes(service.durationMinutes),
    `${service.name} duration is not allowed by ${service.poolId}`
  );
  assert(service.active, `${service.name} must be active`);
  const expectedUrl = createBookingUrl(
    service.poolId,
    service.durationMinutes,
    service.name
  );
  assert(
    service.bookingUrl === expectedUrl,
    `wrong booking URL for ${service.name}`
  );
  const url = new URL(service.bookingUrl);
  assert(
    url.origin === 'https://cal.com',
    `wrong booking host for ${service.name}`
  );
  assert(
    url.pathname === `/hanifcarroll/${pool.calSlug}`,
    `wrong pool URL for ${service.name}`
  );
  assert(
    url.searchParams.get('duration') === String(service.durationMinutes),
    `missing duration prefill for ${service.name}`
  );
  assert(
    url.searchParams.get('notes') === `Recommended service: ${service.name}`,
    `missing service notes prefill for ${service.name}`
  );
}

console.log(
  `Catalog integrity passed: ${bookingPools.length} pools, ${spaServices.length} active services.`
);
