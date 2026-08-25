export type BookingPoolId =
  | 'massage-bodywork'
  | 'facials'
  | 'body-treatments'
  | 'salt-cave'
  | 'restorative-rituals'
  | 'consultation';

export type BookingPool = {
  id: BookingPoolId;
  name: string;
  calSlug: string;
  allowedDurations: readonly number[];
};

export const bookingPools = [
  {
    id: 'massage-bodywork',
    name: 'Massage & Bodywork',
    calSlug: 'massage-bodywork',
    allowedDurations: [30, 45, 60, 75, 90]
  },
  {
    id: 'facials',
    name: 'Facials',
    calSlug: 'facials',
    allowedDurations: [30, 60, 75]
  },
  {
    id: 'body-treatments',
    name: 'Body Treatments',
    calSlug: 'body-treatments',
    allowedDurations: [60, 75, 90]
  },
  {
    id: 'salt-cave',
    name: 'Salt Cave',
    calSlug: 'salt-cave',
    allowedDurations: [45]
  },
  {
    id: 'restorative-rituals',
    name: 'Restorative Rituals',
    calSlug: 'restorative-rituals',
    allowedDurations: [30, 45]
  },
  {
    id: 'consultation',
    name: 'Consultation',
    calSlug: 'consultation',
    allowedDurations: [30]
  }
] as const satisfies readonly BookingPool[];

const bookingPoolById = Object.fromEntries(
  bookingPools.map((pool) => [pool.id, pool])
) as unknown as Record<BookingPoolId, BookingPool>;

export const createBookingUrl = (
  poolId: BookingPoolId,
  durationMinutes: number,
  serviceName: string
) => {
  const params = new URLSearchParams({
    duration: String(durationMinutes),
    notes: `Recommended service: ${serviceName}`
  });
  return `https://cal.com/hanifcarroll/${bookingPoolById[poolId].calSlug}?${params}`;
};

export type ServiceCategory = 'Massage' | 'Facial' | 'Body' | 'Ritual';
export type TouchLevel = 'None' | 'Low' | 'Moderate' | 'High';
export type Pressure = 'Light' | 'Moderate' | 'Firm' | 'Flexible';
export type Energy = 'Restorative' | 'Balanced' | 'Invigorating';

export type SpaService = {
  key: string;
  name: string;
  poolId: BookingPoolId;
  category: ServiceCategory;
  shortDescription: string;
  durationMinutes: number;
  primaryGoal: string;
  secondaryGoals: string[];
  touchLevel: TouchLevel;
  pressure: Pressure;
  energy: Energy;
  active: boolean;
  bookingUrl: string;
  priority: number;
};

export const spaServices = [
  {
    key: 'salt-cave-reset',
    name: 'Salt Cave Reset',
    poolId: 'salt-cave',
    category: 'Ritual',
    shortDescription: 'Quiet mineral air for a slower nervous system.',
    durationMinutes: 45,
    primaryGoal: 'Quiet reset',
    secondaryGoals: ['Breathing space', 'Stillness'],
    touchLevel: 'None',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl('salt-cave', 45, 'Salt Cave Reset'),
    priority: 1
  },
  {
    key: 'tranquility-massage',
    name: 'Tranquility Massage',
    poolId: 'massage-bodywork',
    category: 'Massage',
    shortDescription: 'Focused bodywork shaped around tension and preference.',
    durationMinutes: 60,
    primaryGoal: 'Release tension',
    secondaryGoals: ['Quiet focus', 'Body awareness'],
    touchLevel: 'High',
    pressure: 'Flexible',
    energy: 'Balanced',
    active: true,
    bookingUrl: createBookingUrl('massage-bodywork', 60, 'Tranquility Massage'),
    priority: 2
  },
  {
    key: 'radiance-facial',
    name: 'Radiance Facial',
    poolId: 'facials',
    category: 'Facial',
    shortDescription: 'A restorative facial for glow, hydration, and calm.',
    durationMinutes: 60,
    primaryGoal: 'Refresh complexion',
    secondaryGoals: ['Hydration', 'Quiet care'],
    touchLevel: 'Moderate',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl('facials', 60, 'Radiance Facial'),
    priority: 3
  },
  {
    key: 'deep-release-massage',
    name: 'Deep Release Massage',
    poolId: 'massage-bodywork',
    category: 'Massage',
    shortDescription: 'Intentional, slower work for areas carrying the day.',
    durationMinutes: 75,
    primaryGoal: 'Deep tension release',
    secondaryGoals: ['Mobility', 'Grounding'],
    touchLevel: 'High',
    pressure: 'Firm',
    energy: 'Balanced',
    active: true,
    bookingUrl: createBookingUrl(
      'massage-bodywork',
      75,
      'Deep Release Massage'
    ),
    priority: 4
  },
  {
    key: 'scalp-shoulder-release',
    name: 'Scalp & Shoulder Release',
    poolId: 'massage-bodywork',
    category: 'Massage',
    shortDescription:
      'Targeted comfort for the places that hold screen-time stress.',
    durationMinutes: 30,
    primaryGoal: 'Upper-body ease',
    secondaryGoals: ['Mental reset', 'Lightness'],
    touchLevel: 'Moderate',
    pressure: 'Flexible',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl(
      'massage-bodywork',
      30,
      'Scalp & Shoulder Release'
    ),
    priority: 5
  },
  {
    key: 'aromatherapy-reset',
    name: 'Aromatherapy Reset',
    poolId: 'restorative-rituals',
    category: 'Ritual',
    shortDescription:
      'A sensory pause pairing breath, scent, and gentle touch.',
    durationMinutes: 45,
    primaryGoal: 'Settle the senses',
    secondaryGoals: ['Mood lift', 'Breathing space'],
    touchLevel: 'Low',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl(
      'restorative-rituals',
      45,
      'Aromatherapy Reset'
    ),
    priority: 6
  },
  {
    key: 'seasonal-body-polish',
    name: 'Seasonal Body Polish',
    poolId: 'body-treatments',
    category: 'Body',
    shortDescription:
      'A renewing polish and finish for soft, comfortable skin.',
    durationMinutes: 60,
    primaryGoal: 'Renew skin',
    secondaryGoals: ['Softness', 'Ritual'],
    touchLevel: 'Moderate',
    pressure: 'Moderate',
    energy: 'Invigorating',
    active: true,
    bookingUrl: createBookingUrl('body-treatments', 60, 'Seasonal Body Polish'),
    priority: 7
  },
  {
    key: 'hydration-facial',
    name: 'Deep Hydration Facial',
    poolId: 'facials',
    category: 'Facial',
    shortDescription: 'A cushioned facial ritual for skin that feels thirsty.',
    durationMinutes: 75,
    primaryGoal: 'Restore hydration',
    secondaryGoals: ['Comfort', 'Glow'],
    touchLevel: 'Moderate',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl('facials', 75, 'Deep Hydration Facial'),
    priority: 8
  },
  {
    key: 'sculpting-facial',
    name: 'Sculpting Facial',
    poolId: 'facials',
    category: 'Facial',
    shortDescription:
      'Lifting massage and considered care for a brightened look.',
    durationMinutes: 60,
    primaryGoal: 'Brighten and tone',
    secondaryGoals: ['Circulation', 'Glow'],
    touchLevel: 'Moderate',
    pressure: 'Moderate',
    energy: 'Invigorating',
    active: true,
    bookingUrl: createBookingUrl('facials', 60, 'Sculpting Facial'),
    priority: 9
  },
  {
    key: 'foot-grounding-ritual',
    name: 'Foot Grounding Ritual',
    poolId: 'restorative-rituals',
    category: 'Ritual',
    shortDescription:
      'Warm towels and focused care to bring attention back down.',
    durationMinutes: 30,
    primaryGoal: 'Feel grounded',
    secondaryGoals: ['Refresh', 'Comfort'],
    touchLevel: 'Moderate',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl(
      'restorative-rituals',
      30,
      'Foot Grounding Ritual'
    ),
    priority: 10
  },
  {
    key: 'back-renewal',
    name: 'Back Renewal',
    poolId: 'massage-bodywork',
    category: 'Body',
    shortDescription:
      'A clarifying back treatment with massage and warm finish.',
    durationMinutes: 45,
    primaryGoal: 'Refresh the back',
    secondaryGoals: ['Softness', 'Release'],
    touchLevel: 'Moderate',
    pressure: 'Moderate',
    energy: 'Balanced',
    active: true,
    bookingUrl: createBookingUrl('massage-bodywork', 45, 'Back Renewal'),
    priority: 11
  },
  {
    key: 'warm-stone-ritual',
    name: 'Warm Stone Ritual',
    poolId: 'massage-bodywork',
    category: 'Ritual',
    shortDescription:
      'Gentle warmth and flowing touch for a deeply quiet pause.',
    durationMinutes: 75,
    primaryGoal: 'Deep relaxation',
    secondaryGoals: ['Warmth', 'Stillness'],
    touchLevel: 'High',
    pressure: 'Moderate',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl('massage-bodywork', 75, 'Warm Stone Ritual'),
    priority: 12
  },
  {
    key: 'restorative-massage',
    name: 'Restorative Massage',
    poolId: 'massage-bodywork',
    category: 'Massage',
    shortDescription: 'Unhurried full-body touch for a softer pace.',
    durationMinutes: 90,
    primaryGoal: 'Full-body restoration',
    secondaryGoals: ['Quiet', 'Ease'],
    touchLevel: 'High',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl('massage-bodywork', 90, 'Restorative Massage'),
    priority: 13
  },
  {
    key: 'energizing-massage',
    name: 'Energizing Massage',
    poolId: 'massage-bodywork',
    category: 'Massage',
    shortDescription: 'Brisk, flowing bodywork to leave you feeling awake.',
    durationMinutes: 60,
    primaryGoal: 'Feel energized',
    secondaryGoals: ['Movement', 'Focus'],
    touchLevel: 'High',
    pressure: 'Moderate',
    energy: 'Invigorating',
    active: true,
    bookingUrl: createBookingUrl('massage-bodywork', 60, 'Energizing Massage'),
    priority: 14
  },
  {
    key: 'express-glow-facial',
    name: 'Express Glow Facial',
    poolId: 'facials',
    category: 'Facial',
    shortDescription:
      'A focused refresh when time is short but care still matters.',
    durationMinutes: 30,
    primaryGoal: 'Quick refresh',
    secondaryGoals: ['Glow', 'Confidence'],
    touchLevel: 'Moderate',
    pressure: 'Light',
    energy: 'Invigorating',
    active: true,
    bookingUrl: createBookingUrl('facials', 30, 'Express Glow Facial'),
    priority: 15
  },
  {
    key: 'body-balance-wrap',
    name: 'Body Balance Wrap',
    poolId: 'body-treatments',
    category: 'Body',
    shortDescription:
      'A cocooning body ritual finished with nourishing hydration.',
    durationMinutes: 75,
    primaryGoal: 'Feel restored',
    secondaryGoals: ['Softness', 'Warmth'],
    touchLevel: 'Low',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl('body-treatments', 75, 'Body Balance Wrap'),
    priority: 16
  },
  {
    key: 'hand-and-arm-recovery',
    name: 'Hand & Arm Recovery',
    poolId: 'massage-bodywork',
    category: 'Body',
    shortDescription:
      'Focused relief for hands, wrists, and arms that do too much.',
    durationMinutes: 30,
    primaryGoal: 'Release working hands',
    secondaryGoals: ['Comfort', 'Ease'],
    touchLevel: 'Moderate',
    pressure: 'Flexible',
    energy: 'Balanced',
    active: true,
    bookingUrl: createBookingUrl('massage-bodywork', 30, 'Hand & Arm Recovery'),
    priority: 17
  },
  {
    key: 'quiet-scalp-ritual',
    name: 'Quiet Scalp Ritual',
    poolId: 'restorative-rituals',
    category: 'Ritual',
    shortDescription:
      'A low-light scalp treatment designed for gentle unwinding.',
    durationMinutes: 45,
    primaryGoal: 'Quiet the mind',
    secondaryGoals: ['Scalp care', 'Stillness'],
    touchLevel: 'Moderate',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: createBookingUrl(
      'restorative-rituals',
      45,
      'Quiet Scalp Ritual'
    ),
    priority: 18
  },
  {
    key: 'custom-care-consultation',
    name: 'Custom Care Consultation',
    poolId: 'consultation',
    category: 'Ritual',
    shortDescription: 'A slower conversation to shape the right first visit.',
    durationMinutes: 30,
    primaryGoal: 'Find a starting point',
    secondaryGoals: ['Clarity', 'Personalization'],
    touchLevel: 'None',
    pressure: 'Flexible',
    energy: 'Balanced',
    active: true,
    bookingUrl: createBookingUrl(
      'consultation',
      30,
      'Custom Care Consultation'
    ),
    priority: 19
  },
  {
    key: 'seasonal-reset-ritual',
    name: 'Seasonal Reset Ritual',
    poolId: 'body-treatments',
    category: 'Body',
    shortDescription:
      'A changing combination of grounding body care for the season.',
    durationMinutes: 90,
    primaryGoal: 'Complete reset',
    secondaryGoals: ['Renewal', 'Grounding'],
    touchLevel: 'Moderate',
    pressure: 'Flexible',
    energy: 'Balanced',
    active: true,
    bookingUrl: createBookingUrl(
      'body-treatments',
      90,
      'Seasonal Reset Ritual'
    ),
    priority: 20
  }
] as const satisfies readonly SpaService[];

export const serviceCategories = [
  'All',
  ...new Set(spaServices.map((service) => service.category))
];
