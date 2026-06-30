export const RATES = {
  residential: {
    "10yd": { drop: 350, daily: 100 },
    "20yd": { drop: 450, daily: 100 },
    "30yd": { drop: 550, daily: 100 },
    "40yd": { drop: 650, daily: 100 },
  },
  construction: {
    "10yd": { drop: 350, daily: 100 },
    "20yd": { drop: 450, daily: 100 },
    "30yd": { drop: 550, daily: 100 },
    "40yd": { drop: 650, daily: 100 },
  },
} as const;

export type CustomerType = keyof typeof RATES;
export type DumpsterSize = "10yd" | "20yd" | "30yd" | "40yd";
export const DEPOSIT = 500;

export function calculateEstimate(
  customerType: CustomerType,
  size: DumpsterSize,
  days: number
): number {
  const { drop, daily } = RATES[customerType][size];
  return drop + daily * days;
}

export const DUMPSTER_SPECS: Record<DumpsterSize, {
  label: string;
  dimensions: string;
  uses: string[];
  popular?: boolean;
}> = {
  "10yd": {
    label: "10 Yard",
    dimensions: `11'L × 8'4"W × 4'5"H`,
    uses: ["Concrete or asphalt", "Brick or tile", "Dirt or sand", "Small remodels"],
  },
  "20yd": {
    label: "20 Yard",
    dimensions: `22'11"L × 7'9"W × 4'5"H`,
    uses: ["Roofing projects", "Small remodels", "Seasonal cleanouts"],
    popular: true,
  },
  "30yd": {
    label: "30 Yard",
    dimensions: `22'11"L × 7'9"W × 6'1"H`,
    uses: ["Mid-sized remodels", "Mid-sized cleanups", "Tree trimming", "Light demolition"],
  },
  "40yd": {
    label: "40 Yard",
    dimensions: `22'11"L × 7'9"W × 7'11"H`,
    uses: ["Large remodels", "Large cleanups", "Construction projects", "Large bulky material"],
  },
};
