export type DumpsterSize = "10yd" | "20yd" | "30yd";

// One flat rate structure for every customer — no residential/construction split.
export const FLAT_RATE = 350; // drop-off + pickup, combined
export const DAILY_RATE = 100; // per day on-site
export const RELOCATION_FEE = 100; // per on-site reposition ("pull")
export const OVERFILL_FEE = 150; // loaded above the container's side walls
export const OVERAGE_PER_HALF_TON = 99; // per 1,000 lbs over the included weight allowance
export const DEPOSIT = 500;

export const DUMPSTER_SPECS: Record<DumpsterSize, {
  label: string;
  dimensions: string;
  uses: string[];
  popular?: boolean;
  weightAllowanceLbs: number;
  firstDayFree: boolean;
}> = {
  "10yd": {
    label: "10 Yard",
    dimensions: `11'L × 8'4"W × 4'5"H`,
    uses: ["Concrete or asphalt", "Brick or tile", "Dirt or sand", "Small remodels"],
    weightAllowanceLbs: 1000,
    firstDayFree: true,
  },
  "20yd": {
    label: "20 Yard",
    dimensions: `22'11"L × 7'9"W × 4'5"H`,
    uses: ["Roofing projects", "Small remodels", "Seasonal cleanouts"],
    popular: true,
    weightAllowanceLbs: 1750,
    firstDayFree: false,
  },
  "30yd": {
    label: "30 Yard",
    dimensions: `22'11"L × 7'9"W × 6'1"H`,
    uses: ["Mid-sized remodels", "Mid-sized cleanups", "Tree trimming", "Light demolition"],
    weightAllowanceLbs: 3500,
    firstDayFree: true,
  },
};

// Estimate at booking time — weight isn't known until pickup, so overage,
// relocation, and overfill fees are never part of the estimate.
export function billableDays(size: DumpsterSize, totalDays: number): number {
  const freeDays = DUMPSTER_SPECS[size].firstDayFree ? 1 : 0;
  return Math.max(0, totalDays - freeDays);
}

export function calculateEstimate(size: DumpsterSize, totalDays: number): number {
  return FLAT_RATE + DAILY_RATE * billableDays(size, totalDays);
}

// Job-close helper — weight overage in $99 increments per 1,000 lbs (half ton) over allowance.
export function calculateWeightOverageFee(size: DumpsterSize, actualWeightLbs: number): number {
  const overageLbs = Math.max(0, actualWeightLbs - DUMPSTER_SPECS[size].weightAllowanceLbs);
  const halfTonsOver = Math.ceil(overageLbs / 1000);
  return halfTonsOver * OVERAGE_PER_HALF_TON;
}
