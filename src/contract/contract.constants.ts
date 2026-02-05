export const CURVE_KEYS = [
  'supplyKink',
  'supplyPerSecondInterestRateSlopeLow',
  'supplyPerSecondInterestRateSlopeHigh',
  'supplyPerSecondInterestRateBase',
  'borrowKink',
  'borrowPerSecondInterestRateSlopeLow',
  'borrowPerSecondInterestRateSlopeHigh',
  'borrowPerSecondInterestRateBase',
] as const;

export const LEGACY_REWARDS_NETWORKS = new Set<string>(['mainnet', 'polygon']);
