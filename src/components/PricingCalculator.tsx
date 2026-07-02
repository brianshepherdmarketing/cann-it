"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FLAT_RATE,
  DAILY_RATE,
  OVERAGE_PER_HALF_TON,
  RELOCATION_FEE,
  DEPOSIT,
  DUMPSTER_SPECS,
  billableDays as getBillableDays,
  calculateEstimate,
  type DumpsterSize,
} from "@/lib/pricing";

export default function PricingCalculator() {
  const [size, setSize] = useState<DumpsterSize>("20yd");
  const [days, setDays] = useState(7);

  const spec = DUMPSTER_SPECS[size];
  const billable = getBillableDays(size, days);
  const total = calculateEstimate(size, days);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Size */}
        <div>
          <Label className="text-gray-500 text-xs tracking-widest uppercase mb-3 block">
            Dumpster Size
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {(["10yd", "20yd", "30yd"] as DumpsterSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors border-2 ${
                  size === s
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white text-gray-500 border-gray-200 hover:border-brand-orange"
                }`}
              >
                {DUMPSTER_SPECS[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Days slider */}
        <div>
          <Label className="text-gray-500 text-xs tracking-widest uppercase mb-3 block">
            {days === 1 ? "Rental Period — Same Day" : `Rental Period — ${days} Days`}
          </Label>
          <input
            type="range"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-brand-orange mt-2"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Same day</span>
            <span>30 days</span>
          </div>
        </div>
      </div>

      {/* Price breakdown + CTA */}
      <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-1 text-sm">
          <div className="flex gap-6 text-gray-500">
            <span>Drop-off &amp; pickup (flat rate)</span>
            <span className="text-brand-black font-medium">${FLAT_RATE}</span>
          </div>
          <div className="flex gap-6 text-gray-500">
            <span>
              {spec.firstDayFree
                ? billable === 0
                  ? "Daily rate (first day free)"
                  : `$${DAILY_RATE}/day × ${billable} day${billable !== 1 ? "s" : ""} (first day free)`
                : `$${DAILY_RATE}/day × ${billable} day${billable !== 1 ? "s" : ""}`}
            </span>
            <span className="text-brand-black font-medium">${DAILY_RATE * billable}</span>
          </div>
          <div className="flex gap-6 pt-2 border-t border-gray-200 text-brand-orange font-bold text-xl">
            <span>Estimated Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-400 pt-1">
            ${DEPOSIT} deposit today · balance charged at job close
          </p>
        </div>

        <Link href="/order">
          <Button className="bg-brand-orange hover:opacity-90 text-white font-bold text-base px-8 py-6 uppercase tracking-wide">
            Book Now — $500 Deposit
          </Button>
        </Link>
      </div>

      {/* Weight allowance / fees callout */}
      <div className="border-t border-gray-200 mt-8 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500">
        <div>
          <span className="block font-bold text-brand-black uppercase tracking-wide mb-1">
            Weight Included
          </span>
          {spec.weightAllowanceLbs.toLocaleString()} lbs · ${OVERAGE_PER_HALF_TON} per half-ton over
        </div>
        <div>
          <span className="block font-bold text-brand-black uppercase tracking-wide mb-1">
            On-Site Relocation
          </span>
          ${RELOCATION_FEE} per pull, if you need it moved
        </div>
        <div>
          <span className="block font-bold text-brand-black uppercase tracking-wide mb-1">
            Loading
          </span>
          Keep it below the side walls — no overfill
        </div>
      </div>
    </div>
  );
}
