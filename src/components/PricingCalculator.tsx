"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  RATES,
  calculateEstimate,
  DEPOSIT,
  type CustomerType,
  type DumpsterSize,
} from "@/lib/pricing";

export default function PricingCalculator() {
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [size, setSize] = useState<DumpsterSize>("20yd");
  const [days, setDays] = useState(7);

  const billableDays = Math.max(0, days - 2); // drop-off day and pickup day are both free
  const total = calculateEstimate(customerType, size, billableDays);
  const { drop, daily } = RATES[customerType][size];

  return (
    <div className="bg-brand-dark rounded-2xl p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Customer type */}
        <div>
          <Label className="text-gray-400 text-xs tracking-widest uppercase mb-3 block">
            I Am A
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {(["residential", "construction"] as CustomerType[]).map((t) => (
              <button
                key={t}
                onClick={() => setCustomerType(t)}
                className={`py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                  customerType === t
                    ? "bg-brand-amber text-brand-black"
                    : "bg-brand-black text-gray-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <Label className="text-gray-400 text-xs tracking-widest uppercase mb-3 block">
            Dumpster Size
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {(["20yd", "30yd"] as DumpsterSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                  size === s
                    ? "bg-brand-amber text-brand-black"
                    : "bg-brand-black text-gray-400 hover:text-white"
                }`}
              >
                {s === "20yd" ? "20 YD" : "30 YD"}
              </button>
            ))}
          </div>
        </div>

        {/* Days slider */}
        <div>
          <Label className="text-gray-400 text-xs tracking-widest uppercase mb-3 block">
            {days === 1 ? "Rental Period — Same Day" : `Rental Period — ${days} Days`}
          </Label>
          <input
            type="range"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-brand-amber mt-2"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Same day</span>
            <span>30 days</span>
          </div>
        </div>
      </div>

      {/* Price breakdown + CTA */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-1 text-sm">
          <div className="flex gap-6 text-gray-400">
            <span>Drop-off fee</span>
            <span className="text-white font-medium">${drop}</span>
          </div>
          <div className="flex gap-6 text-gray-400">
            <span>
              {billableDays === 0
                ? "Daily rate (drop-off + pickup day are free)"
                : `$${daily}/day × ${billableDays} day${billableDays !== 1 ? "s" : ""}`}
            </span>
            <span className="text-white font-medium">${daily * billableDays}</span>
          </div>
          <div className="flex gap-6 pt-2 border-t border-white/10 text-brand-amber font-bold text-xl">
            <span>Estimated Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-600 pt-1">
            ${DEPOSIT} deposit today · balance charged at job close
          </p>
        </div>

        <Link href="/order">
          <Button className="bg-brand-amber hover:bg-amber-400 text-brand-black font-bold text-base px-8 py-6 uppercase tracking-wide">
            Book Now — $500 Deposit
          </Button>
        </Link>
      </div>
    </div>
  );
}
