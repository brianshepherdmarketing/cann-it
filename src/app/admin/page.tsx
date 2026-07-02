"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DUMPSTER_SPECS,
  RELOCATION_FEE,
  OVERFILL_FEE,
  calculateWeightOverageFee,
  type DumpsterSize,
} from "@/lib/pricing";

// ── Mock data — replaced by real DB queries when Stripe + DB are live ──
const MOCK_JOBS = [
  {
    id: "clx001",
    createdAt: "2026-06-10",
    status: "active",
    customerName: "Mike Johnson",
    customerEmail: "mike.j@email.com",
    customerPhone: "(555) 234-5678",
    dumpsterSize: "20yd" as DumpsterSize,
    dropoffDate: "2026-06-10",
    pickupDate: "2026-06-17",
    deliveryAddress: "45 Oak Street, Springfield, IL 62701",
    notes: "Park on the right side of the driveway",
    estimatedTotal: 1050,
    finalTotal: null as number | null,
    depositPaid: 500,
  },
  {
    id: "clx002",
    createdAt: "2026-06-11",
    status: "scheduled",
    customerName: "ABC Contractors LLC",
    customerEmail: "dispatch@abccontractors.com",
    customerPhone: "(555) 987-6543",
    dumpsterSize: "30yd" as DumpsterSize,
    dropoffDate: "2026-06-15",
    pickupDate: "2026-06-22",
    deliveryAddress: "800 Industrial Pkwy, Springfield, IL 62702",
    notes: "",
    estimatedTotal: 950,
    finalTotal: null as number | null,
    depositPaid: 500,
  },
  {
    id: "clx003",
    createdAt: "2026-06-01",
    status: "complete",
    customerName: "Sarah Williams",
    customerEmail: "sarah.w@gmail.com",
    customerPhone: "(555) 111-2222",
    dumpsterSize: "30yd" as DumpsterSize,
    dropoffDate: "2026-06-01",
    pickupDate: "2026-06-08",
    deliveryAddress: "112 Maple Ave, Springfield, IL 62703",
    notes: "",
    estimatedTotal: 950,
    finalTotal: 1049,
    depositPaid: 500,
  },
];

const STATUS_STYLE: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  active: "bg-green-100 text-green-700",
  complete: "bg-gray-100 text-gray-600",
  archived: "bg-gray-100 text-gray-400",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [finalTotal, setFinalTotal] = useState("");
  const [actualWeight, setActualWeight] = useState("");
  const [relocations, setRelocations] = useState("0");
  const [overfill, setOverfill] = useState(false);
  const [charging, setCharging] = useState(false);

  function login() {
    // Temporary client-side gate — will be replaced by middleware checking ADMIN_PASSWORD env var
    if (pw === "admin") {
      setAuthed(true);
      setPwError("");
    } else {
      setPwError("Incorrect password.");
    }
  }

  const selected = MOCK_JOBS.find((j) => j.id === selectedId);
  const balance = Number(finalTotal) - 500;

  const weightOverageFee = selected && actualWeight
    ? calculateWeightOverageFee(selected.dumpsterSize, Number(actualWeight))
    : 0;
  const relocationFee = Number(relocations || 0) * RELOCATION_FEE;
  const overfillFeeAmount = overfill ? OVERFILL_FEE : 0;
  const suggestedTotal = selected
    ? selected.estimatedTotal + weightOverageFee + relocationFee + overfillFeeAmount
    : 0;
  const hasExtras = weightOverageFee > 0 || relocationFee > 0 || overfillFeeAmount > 0;

  function handleCharge() {
    setCharging(true);
    // TODO: POST /api/admin/charge-balance { jobId: selected.id, finalTotal }
    setTimeout(() => {
      setCharging(false);
      alert(
        "Stripe not connected yet — this button will fire the balance charge once live."
      );
    }, 800);
  }

  // ── Password gate ──
  if (!authed) {
    return (
      <main className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/logo.png"
              alt="Cann-It Dumpster Rentals"
              width={180}
              height={54}
              priority
            />
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-3">Admin Portal</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600 text-sm">Password</Label>
              <Input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                className="mt-1"
                placeholder="Enter admin password"
              />
            </div>
            {pwError && (
              <p className="text-red-500 text-xs">{pwError}</p>
            )}
            <Button
              className="w-full bg-brand-orange hover:opacity-90 text-white font-bold uppercase"
              onClick={login}
            >
              Log In
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // ── Admin header ──
  const AdminBar = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Cann-It" width={130} height={39} />
        <span className="text-xs text-gray-400 uppercase tracking-widest border-l border-gray-200 pl-3">Admin</span>
      </div>
      <button
        onClick={() => {
          setAuthed(false);
          setPw("");
          setSelectedId(null);
        }}
        className="text-xs text-gray-400 hover:text-brand-orange transition-colors"
      >
        Sign Out
      </button>
    </div>
  );

  // ── Job detail view ──
  if (selectedId && selected) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <AdminBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => {
              setSelectedId(null);
              setFinalTotal("");
              setActualWeight("");
              setRelocations("0");
              setOverfill(false);
            }}
            className="text-sm text-gray-500 hover:text-brand-black mb-6 flex items-center gap-1 transition-colors"
          >
            ← Back to jobs
          </button>

          <div className="flex items-center gap-3 mb-6">
            <h1 className="font-heading text-2xl font-extrabold uppercase text-brand-black">
              {selected.customerName}
            </h1>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${STATUS_STYLE[selected.status]}`}
            >
              {selected.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Customer */}
            <Card title="Customer">
              <DL>
                <DLRow label="Name" value={selected.customerName} />
                <DLRow label="Email" value={selected.customerEmail} />
                <DLRow label="Phone" value={selected.customerPhone} />
              </DL>
            </Card>

            {/* Job */}
            <Card title="Job">
              <DL>
                <DLRow
                  label="Size"
                  value={`${selected.dumpsterSize.replace("yd", " YD")} · ${DUMPSTER_SPECS[selected.dumpsterSize].weightAllowanceLbs.toLocaleString()} lbs included`}
                />
                <DLRow label="Drop-off" value={selected.dropoffDate} />
                <DLRow label="Est. Pickup" value={selected.pickupDate} />
                <DLRow label="Address" value={selected.deliveryAddress} />
                {selected.notes && (
                  <DLRow label="Notes" value={selected.notes} />
                )}
              </DL>
            </Card>
          </div>

          {/* Billing + Charge action */}
          <Card title="Billing" className="mt-5">
            <DL className="mb-6">
              <DLRow
                label="Estimated Total"
                value={`$${selected.estimatedTotal.toLocaleString()}`}
              />
              <DLRow label="Deposit Paid" value="−$500" valueClass="text-green-600" />
              {selected.finalTotal && (
                <>
                  <DLRow
                    label="Final Total"
                    value={`$${selected.finalTotal.toLocaleString()}`}
                    bold
                  />
                  <DLRow
                    label="Balance Charged"
                    value={`$${(selected.finalTotal - 500).toLocaleString()}`}
                    bold
                    valueClass="text-green-600"
                  />
                </>
              )}
            </DL>

            {selected.status !== "complete" ? (
              <div className="space-y-5 border-t border-gray-100 pt-5">
                {/* Job-close inputs that drive the suggested final total */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Actual Weight (lbs)</Label>
                    <Input
                      type="number"
                      placeholder={`e.g. ${DUMPSTER_SPECS[selected.dumpsterSize].weightAllowanceLbs}`}
                      value={actualWeight}
                      onChange={(e) => setActualWeight(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Relocation Pulls</Label>
                    <Input
                      type="number"
                      min={0}
                      value={relocations}
                      onChange={(e) => setRelocations(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={overfill}
                        onChange={(e) => setOverfill(e.target.checked)}
                        className="accent-brand-orange w-4 h-4"
                      />
                      Overfilled (+${OVERFILL_FEE})
                    </label>
                  </div>
                </div>

                {hasExtras && (
                  <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
                    {weightOverageFee > 0 && (
                      <div className="flex justify-between text-gray-500">
                        <span>Weight overage</span>
                        <span>${weightOverageFee}</span>
                      </div>
                    )}
                    {relocationFee > 0 && (
                      <div className="flex justify-between text-gray-500">
                        <span>Relocation ({relocations} pull{Number(relocations) !== 1 ? "s" : ""})</span>
                        <span>${relocationFee}</span>
                      </div>
                    )}
                    {overfillFeeAmount > 0 && (
                      <div className="flex justify-between text-gray-500">
                        <span>Overfill charge</span>
                        <span>${overfillFeeAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-brand-black border-t border-gray-200 pt-1 mt-1">
                      <span>Suggested Final Total</span>
                      <span>${suggestedTotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mt-1">
                    <Label>Final Total ($)</Label>
                    {hasExtras && (
                      <button
                        type="button"
                        onClick={() => setFinalTotal(String(suggestedTotal))}
                        className="text-xs text-brand-orange hover:underline"
                      >
                        Use suggested ${suggestedTotal.toLocaleString()}
                      </button>
                    )}
                  </div>
                  <Input
                    type="number"
                    placeholder={`e.g. ${selected.estimatedTotal}`}
                    value={finalTotal}
                    onChange={(e) => setFinalTotal(e.target.value)}
                    className="mt-1 max-w-xs"
                  />
                </div>
                {finalTotal && balance > 0 && (
                  <p className="text-sm text-gray-500">
                    Balance to charge:{" "}
                    <strong className="text-brand-black">
                      ${balance.toLocaleString()}
                    </strong>
                  </p>
                )}
                <Button
                  className="bg-brand-orange hover:opacity-90 text-white font-bold uppercase"
                  onClick={handleCharge}
                  disabled={!finalTotal || balance <= 0 || charging}
                >
                  {charging ? "Charging..." : "Charge Balance & Close Job"}
                </Button>
                <p className="text-xs text-gray-400">
                  This will charge the saved card for the balance, send a
                  receipt, and mark the job complete.
                </p>
              </div>
            ) : (
              <p className="text-sm text-green-600 font-semibold border-t border-gray-100 pt-4">
                ✓ Job complete — balance charged
              </p>
            )}
          </Card>
        </div>
      </main>
    );
  }

  // ── Job list ──
  return (
    <main className="bg-gray-50 min-h-screen">
      <AdminBar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-extrabold uppercase text-brand-black">
            Open Jobs
          </h1>
          <span className="text-sm text-gray-400">
            {MOCK_JOBS.filter((j) => j.status !== "archived").length} active
          </span>
        </div>

        <div className="space-y-3">
          {MOCK_JOBS.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedId(job.id)}
              className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-brand-orange transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-brand-black">
                  {job.customerName}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${STATUS_STYLE[job.status]}`}
                >
                  {job.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 flex flex-wrap gap-x-5 gap-y-1">
                <span>📍 {job.deliveryAddress}</span>
                <span>📅 Drop: {job.dropoffDate}</span>
                <span>🗑️ {job.dumpsterSize.replace("yd", " YD")}</span>
                <span>💰 Est. ${job.estimatedTotal.toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

// ── Tiny layout helpers ──

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h2 className="font-heading text-lg font-extrabold uppercase text-brand-black mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function DL({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <dl className={`space-y-2 text-sm ${className}`}>{children}</dl>;
}

function DLRow({
  label,
  value,
  capitalize,
  bold,
  valueClass = "",
}: {
  label: string;
  value: string;
  capitalize?: boolean;
  bold?: boolean;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500 shrink-0">{label}</dt>
      <dd
        className={`text-right max-w-[220px] ${capitalize ? "capitalize" : ""} ${bold ? "font-bold" : "font-medium"} ${valueClass}`}
      >
        {value}
      </dd>
    </div>
  );
}
