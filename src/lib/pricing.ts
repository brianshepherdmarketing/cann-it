export const RATES = {
  residential: {
    "20yd": { drop: 450, daily: 100 },
    "30yd": { drop: 550, daily: 100 },
  },
  construction: {
    "20yd": { drop: 450, daily: 100 },
    "30yd": { drop: 550, daily: 100 },
  },
} as const;

export type CustomerType = keyof typeof RATES;
export type DumpsterSize = "20yd" | "30yd";
export const DEPOSIT = 500;

export function calculateEstimate(
  customerType: CustomerType,
  size: DumpsterSize,
  days: number
): number {
  const { drop, daily } = RATES[customerType][size];
  return drop + daily * days;
}
