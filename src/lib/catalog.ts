export type ServiceCategory = 'Massage' | 'Facial' | 'Body' | 'Ritual';
export type TouchLevel = 'None' | 'Low' | 'Moderate' | 'High';
export type Pressure = 'Light' | 'Moderate' | 'Firm' | 'Flexible';
export type Energy = 'Restorative' | 'Balanced' | 'Invigorating';

export type SpaService = {
  key: string;
  name: string;
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

const calProfile = 'https://cal.com/hanifcarroll';

export const spaServices = [
  {
    key: 'salt-cave-reset',
    name: 'Salt Cave Reset',
    category: 'Ritual',
    shortDescription: 'Quiet mineral air for a slower nervous system.',
    durationMinutes: 45,
    primaryGoal: 'Quiet reset',
    secondaryGoals: ['Breathing space', 'Stillness'],
    touchLevel: 'None',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: 'https://cal.com/hanifcarroll/salt-cave-reset-45',
    priority: 1
  },
  {
    key: 'tranquility-massage',
    name: 'Tranquility Massage',
    category: 'Massage',
    shortDescription: 'Focused bodywork shaped around tension and preference.',
    durationMinutes: 60,
    primaryGoal: 'Release tension',
    secondaryGoals: ['Quiet focus', 'Body awareness'],
    touchLevel: 'High',
    pressure: 'Flexible',
    energy: 'Balanced',
    active: true,
    bookingUrl: 'https://cal.com/hanifcarroll/tranquility-massage-60',
    priority: 2
  },
  {
    key: 'radiance-facial',
    name: 'Radiance Facial',
    category: 'Facial',
    shortDescription: 'A restorative facial for glow, hydration, and calm.',
    durationMinutes: 60,
    primaryGoal: 'Refresh complexion',
    secondaryGoals: ['Hydration', 'Quiet care'],
    touchLevel: 'Moderate',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: 'https://cal.com/hanifcarroll/radiance-facial-60',
    priority: 3
  },
  {
    key: 'deep-release-massage',
    name: 'Deep Release Massage',
    category: 'Massage',
    shortDescription: 'Intentional, slower work for areas carrying the day.',
    durationMinutes: 75,
    primaryGoal: 'Deep tension release',
    secondaryGoals: ['Mobility', 'Grounding'],
    touchLevel: 'High',
    pressure: 'Firm',
    energy: 'Balanced',
    active: true,
    bookingUrl: calProfile,
    priority: 4
  },
  {
    key: 'scalp-shoulder-release',
    name: 'Scalp & Shoulder Release',
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
    bookingUrl: calProfile,
    priority: 5
  },
  {
    key: 'aromatherapy-reset',
    name: 'Aromatherapy Reset',
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
    bookingUrl: calProfile,
    priority: 6
  },
  {
    key: 'seasonal-body-polish',
    name: 'Seasonal Body Polish',
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
    bookingUrl: calProfile,
    priority: 7
  },
  {
    key: 'hydration-facial',
    name: 'Deep Hydration Facial',
    category: 'Facial',
    shortDescription: 'A cushioned facial ritual for skin that feels thirsty.',
    durationMinutes: 75,
    primaryGoal: 'Restore hydration',
    secondaryGoals: ['Comfort', 'Glow'],
    touchLevel: 'Moderate',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: calProfile,
    priority: 8
  },
  {
    key: 'sculpting-facial',
    name: 'Sculpting Facial',
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
    bookingUrl: calProfile,
    priority: 9
  },
  {
    key: 'foot-grounding-ritual',
    name: 'Foot Grounding Ritual',
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
    bookingUrl: calProfile,
    priority: 10
  },
  {
    key: 'back-renewal',
    name: 'Back Renewal',
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
    bookingUrl: calProfile,
    priority: 11
  },
  {
    key: 'warm-stone-ritual',
    name: 'Warm Stone Ritual',
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
    bookingUrl: calProfile,
    priority: 12
  },
  {
    key: 'restorative-massage',
    name: 'Restorative Massage',
    category: 'Massage',
    shortDescription: 'Unhurried full-body touch for a softer pace.',
    durationMinutes: 90,
    primaryGoal: 'Full-body restoration',
    secondaryGoals: ['Quiet', 'Ease'],
    touchLevel: 'High',
    pressure: 'Light',
    energy: 'Restorative',
    active: true,
    bookingUrl: calProfile,
    priority: 13
  },
  {
    key: 'energizing-massage',
    name: 'Energizing Massage',
    category: 'Massage',
    shortDescription: 'Brisk, flowing bodywork to leave you feeling awake.',
    durationMinutes: 60,
    primaryGoal: 'Feel energized',
    secondaryGoals: ['Movement', 'Focus'],
    touchLevel: 'High',
    pressure: 'Moderate',
    energy: 'Invigorating',
    active: true,
    bookingUrl: calProfile,
    priority: 14
  },
  {
    key: 'express-glow-facial',
    name: 'Express Glow Facial',
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
    bookingUrl: calProfile,
    priority: 15
  },
  {
    key: 'body-balance-wrap',
    name: 'Body Balance Wrap',
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
    bookingUrl: calProfile,
    priority: 16
  },
  {
    key: 'hand-and-arm-recovery',
    name: 'Hand & Arm Recovery',
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
    bookingUrl: calProfile,
    priority: 17
  },
  {
    key: 'quiet-scalp-ritual',
    name: 'Quiet Scalp Ritual',
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
    bookingUrl: calProfile,
    priority: 18
  },
  {
    key: 'custom-care-consultation',
    name: 'Custom Care Consultation',
    category: 'Ritual',
    shortDescription: 'A slower conversation to shape the right first visit.',
    durationMinutes: 30,
    primaryGoal: 'Find a starting point',
    secondaryGoals: ['Clarity', 'Personalization'],
    touchLevel: 'None',
    pressure: 'Flexible',
    energy: 'Balanced',
    active: true,
    bookingUrl: calProfile,
    priority: 19
  },
  {
    key: 'seasonal-reset-ritual',
    name: 'Seasonal Reset Ritual',
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
    bookingUrl: calProfile,
    priority: 20
  }
] as const satisfies readonly SpaService[];

export const serviceCategories = [
  'All',
  ...new Set(spaServices.map((service) => service.category))
];
