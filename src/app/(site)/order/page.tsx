"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  RATES,
  calculateEstimate,
  DEPOSIT,
  DUMPSTER_SPECS,
  type CustomerType,
  type DumpsterSize,
} from "@/lib/pricing";

type Step = 1 | 2 | 3;

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerType: CustomerType;
  rentalDays: number;        // total days: drop-off day + days between + pickup day
  dumpsterSize: DumpsterSize;
  dropoffDate: string;
  pickupDate: string;        // always derived: dropoffDate + rentalDays
  deliveryAddress: string;
  notes: string;
}

const empty: FormData = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customerType: "residential",
  rentalDays: 7,
  dumpsterSize: "20yd" as DumpsterSize,
  dropoffDate: "",
  pickupDate: "",
  deliveryAddress: "",
  notes: "",
};

// pickup = dropoff + rentalDays calendar days
function computePickup(dropoff: string, rentalDays: number): string {
  if (!dropoff) return "";
  const d = new Date(dropoff);
  d.setDate(d.getDate() + rentalDays);
  return d.toISOString().split("T")[0];
}

// drop-off day and pickup day are both free — only days in between are billed
function toBillable(rentalDays: number): number {
  return Math.max(0, rentalDays - 2);
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const today = new Date().toISOString().split("T")[0];

export default function OrderPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(empty);

  const billable = toBillable(form.rentalDays);
  const total = calculateEstimate(form.customerType, form.dumpsterSize, billable);
  const { drop, daily } = RATES[form.customerType][form.dumpsterSize];

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleDropoffChange(date: string) {
    setForm((f) => ({
      ...f,
      dropoffDate: date,
      pickupDate: computePickup(date, f.rentalDays),
    }));
  }

  function handleRentalDaysChange(days: number) {
    const clamped = Math.max(1, Math.min(30, days));
    setForm((f) => ({
      ...f,
      rentalDays: clamped,
      pickupDate: computePickup(f.dropoffDate, clamped),
    }));
  }

  const step1Valid =
    form.customerName.trim() && form.customerEmail.trim() && form.customerPhone.trim();

  const step2Valid = form.deliveryAddress.trim() && form.dropoffDate;

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress bar */}
        <div className="flex items-center mb-10">
          {([1, 2, 3] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s
                    ? "bg-brand-orange text-brand-black"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              <span
                className={`ml-2 text-sm hidden md:block ${
                  step === s ? "text-brand-black font-semibold" : "text-gray-400"
                }`}
              >
                {s === 1 ? "Your Info" : s === 2 ? "Job Details" : "Review & Pay"}
              </span>
              {i < 2 && (
                <div
                  className={`mx-3 h-px w-10 md:w-16 flex-shrink-0 transition-colors ${
                    step > s ? "bg-brand-orange" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* ─── STEP 1: Customer info + rental duration ─── */}
          {step === 1 && (
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-brand-black uppercase mb-1">
                WHO ARE YOU?
              </h1>
              <p className="text-gray-500 text-sm mb-8">
                We&apos;ll send your confirmation and receipt here.
              </p>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={form.customerName}
                    onChange={(e) => set("customerName", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.customerEmail}
                    onChange={(e) => set("customerEmail", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={form.customerPhone}
                    onChange={(e) => set("customerPhone", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">I Am A</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["residential", "construction"] as CustomerType[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("customerType", t)}
                        className={`py-3 rounded-xl border-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                          form.customerType === t
                            ? "border-brand-orange bg-brand-orange/10 text-brand-black"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Rental duration ── */}
                <div>
                  <Label className="mb-2 block">How Long Do You Need It?</Label>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-xl border border-gray-200 p-4">
                    <button
                      type="button"
                      onClick={() => handleRentalDaysChange(form.rentalDays - 1)}
                      disabled={form.rentalDays <= 1}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-xl font-bold text-brand-black hover:border-brand-orange transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      −
                    </button>

                    <div className="flex-1 text-center">
                      <div className="font-heading text-3xl font-extrabold text-brand-black">
                        {form.rentalDays === 1 ? "Same day" : `${form.rentalDays} days`}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {billable === 0
                          ? "No daily rate — just drop-off & pickup fees"
                          : `${billable} billable day${billable !== 1 ? "s" : ""} × $100`}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRentalDaysChange(form.rentalDays + 1)}
                      disabled={form.rentalDays >= 30}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-xl font-bold text-brand-black hover:border-brand-orange transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 text-center">
                    Drop-off and pickup days are always free
                  </p>
                </div>
              </div>

              <Button
                className="mt-8 w-full bg-brand-orange hover:opacity-90 text-brand-black font-bold py-6 uppercase tracking-wide"
                onClick={() => setStep(2)}
                disabled={!step1Valid}
              >
                Next: Job Details →
              </Button>
            </div>
          )}

          {/* ─── STEP 2: Job details ─── */}
          {step === 2 && (
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-brand-black uppercase mb-1">
                TELL US ABOUT THE JOB
              </h1>
              <p className="text-gray-500 text-sm mb-8">
                Size, address, and when you need it.
              </p>

              <div className="space-y-5">
                <div>
                  <Label className="mb-2 block">Dumpster Size</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["10yd", "20yd", "30yd", "40yd"] as DumpsterSize[]).map((s) => {
                      const { label, uses } = DUMPSTER_SPECS[s];
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => set("dumpsterSize", s)}
                          className={`py-4 px-3 rounded-xl border-2 text-sm font-bold transition-colors text-left ${
                            form.dumpsterSize === s
                              ? "border-brand-orange bg-brand-orange/10 text-brand-black"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-xl font-extrabold font-heading">{label}</div>
                          <div className="text-xs mt-1 font-normal text-gray-400 leading-snug">
                            {uses[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State 12345"
                    value={form.deliveryAddress}
                    onChange={(e) => set("deliveryAddress", e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Drop-off date + auto-calculated pickup */}
                <div>
                  <Label htmlFor="dropoff">Drop-off Date</Label>
                  <Input
                    id="dropoff"
                    type="date"
                    value={form.dropoffDate}
                    min={today}
                    onChange={(e) => handleDropoffChange(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className={`rounded-xl border-2 p-4 transition-colors ${
                  form.pickupDate ? "border-brand-orange/30 bg-brand-orange/5" : "border-gray-100 bg-gray-50"
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Estimated Pickup Date
                      </p>
                      <p className={`font-heading text-lg font-bold ${form.pickupDate ? "text-brand-black" : "text-gray-300"}`}>
                        {form.pickupDate ? formatDate(form.pickupDate) : "Select a drop-off date first"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {form.rentalDays === 1 ? "Same day" : `${form.rentalDays} day rental`}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-brand-orange hover:underline mt-0.5"
                      >
                        Change duration
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Driveway constraints, gate codes, access instructions..."
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" className="flex-1 py-6" onClick={() => setStep(1)}>
                  ← Back
                </Button>
                <Button
                  className="flex-1 bg-brand-orange hover:opacity-90 text-brand-black font-bold py-6 uppercase tracking-wide"
                  onClick={() => setStep(3)}
                  disabled={!step2Valid}
                >
                  Review Order →
                </Button>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Review & Pay ─── */}
          {step === 3 && (
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-brand-black uppercase mb-1">
                REVIEW YOUR ORDER
              </h1>
              <p className="text-gray-500 text-sm mb-8">
                Double-check everything before you pay.
              </p>

              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl p-5 mb-5 text-sm space-y-2">
                <Row label="Name" value={form.customerName} />
                <Row label="Email" value={form.customerEmail} />
                <Row label="Phone" value={form.customerPhone} />
                <Row label="Type" value={form.customerType} capitalize />
                <div className="border-t border-gray-200 pt-2 space-y-2">
                  <Row
                    label="Dumpster"
                    value={`${DUMPSTER_SPECS[form.dumpsterSize].label} Dumpster`}
                  />
                  <Row label="Rental" value={form.rentalDays === 1 ? "Same day" : `${form.rentalDays} days`} />
                  <Row label="Address" value={form.deliveryAddress} />
                  <Row label="Drop-off" value={formatDate(form.dropoffDate)} />
                  <Row label="Est. Pickup" value={formatDate(form.pickupDate)} />
                  {form.notes && <Row label="Notes" value={form.notes} />}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="border border-gray-200 rounded-xl p-5 mb-5 text-sm">
                <div className="flex justify-between text-gray-500 mb-1">
                  <span>Drop-off fee</span>
                  <span>${drop}</span>
                </div>
                <div className="flex justify-between text-gray-500 mb-1">
                  <span>
                    {billable === 0
                      ? "Daily rate (drop-off + pickup day are free)"
                      : `$${daily}/day × ${billable} day${billable !== 1 ? "s" : ""}`}
                  </span>
                  <span>${daily * billable}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base text-brand-black">
                  <span>Estimated Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment stub */}
              <div className="bg-brand-orange rounded-xl p-6 mb-5">
                <div className="text-white font-bold text-sm mb-1">
                  DUE TODAY — $500 DEPOSIT
                </div>
                <div className="text-orange-100 text-xs mb-5">
                  Balance of ${(total - DEPOSIT).toLocaleString()} charged at job close
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-8 text-center">
                  <p className="text-white/70 text-sm">[ STRIPE PAYMENT ELEMENT ]</p>
                  <p className="text-white/50 text-xs mt-1">
                    Credit / Debit Card · Secured by Stripe
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center mb-6">
                By booking you agree to our terms of service. Final total may vary based
                on actual rental days and waste type.
              </p>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 py-6" onClick={() => setStep(2)}>
                  ← Back
                </Button>
                <Button
                  className="flex-1 bg-brand-orange/40 text-brand-black/50 font-bold py-6 uppercase tracking-wide cursor-not-allowed"
                  disabled
                >
                  Pay $500 Deposit — Coming Soon
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500 shrink-0">{label}</span>
      <span className={`font-medium text-right ${capitalize ? "capitalize" : ""}`}>
        {value}
      </span>
    </div>
  );
}
