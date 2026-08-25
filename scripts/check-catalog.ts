import { spaServices } from '../src/lib/catalog.ts';

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(`Catalog check failed: ${message}`);
};

assert(
  spaServices.length === 20,
  `expected 20 services, found ${spaServices.length}`
);
assert(
  new Set(spaServices.map((service) => service.key)).size === 20,
  'service keys must be unique'
);
assert(
  spaServices.every((service) =>
    /^https:\/\/cal\.com\/hanifcarroll(?:\/[-a-z0-9]+)?$/.test(
      service.bookingUrl
    )
  ),
  'booking URLs must use the approved Cal.com profile or event URL'
);
assert(
  spaServices.every((service) => service.active),
  'all catalog records must be active'
);
assert(
  spaServices.every((service) => service.durationMinutes > 0),
  'durations must be positive'
);

console.log(`Catalog integrity passed: ${spaServices.length} active services.`);
