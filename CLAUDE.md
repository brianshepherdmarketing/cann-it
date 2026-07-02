# Cann It — Project Context for Claude Code

## Project Overview
**Company:** Cann It  
**Tagline:** "You fill it, we spill it"  
**Type:** B2B/B2C dumpster rental startup — no existing assets, building from scratch  
**Reference site:** sourgum.com (visual/UX benchmark)

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Payments:** Stripe (two-stage: deposit capture + balance charge)
- **Email:** Resend (transactional confirmations)
- **Deployment:** Vercel (free tier)
- **Font:** Barlow Condensed (headlines), Inter (body)

---

## Brand
- **Primary:** `#E8620C` orange — Tailwind class: `brand-orange` (replaces old `brand-amber`)
- **Base:** `#1A1A1A` near-black — `brand-black`
- **Dark neutral:** `#2C2C2C` — `brand-dark`
- **Gray:** `#4A4A4A` — `brand-gray`
- **Light bg:** `#FAF8F5` warm off-white — `brand-light`
- **Cream section bg:** `#F0EDEA` — `brand-cream`
- **Theme:** Light — warm off-white background, dark footer, hero stays dark (for future full-bleed photo)
- **Tone:** Confident, direct, industrial — not mom & pop, not corporate
- **Logo:** `/public/logo.png` — orange dumpster illustration + CANN-IT DUMPSTER RENTALS wordmark. Always use `<Image src="/logo.png" />`, never the old text span format.

---

## Pricing Model
Source of truth: `src/lib/pricing.ts`. Confirmed by Billy 2026-07-02 (Pricepoint Proposal) — replaces the earlier residential/construction rate-matrix model below.

### Variables
- **Dumpster size:** 10 YD | 20 YD | 30 YD (one flat rate structure for everyone — no residential/construction price split)
- **Fees:** Flat drop-off+pickup fee + Daily rate × billable days, plus job-close extras (weight overage, relocation, overfill) entered by Billy in the admin panel

### Core rates
```js
const FLAT_RATE = 350;              // drop-off + pickup, combined, all sizes
const DAILY_RATE = 100;             // per day on-site
const RELOCATION_FEE = 100;         // per on-site reposition ("pull")
const OVERFILL_FEE = 150;           // loaded above the container's side walls
const OVERAGE_PER_HALF_TON = 99;    // per 1,000 lbs over the included weight allowance
```

### Size specs
| Size | Weight Included | First Day Free |
|------|-----------------|-----------------|
| 10 YD | 1,000 lbs (0.5 ton) | Yes |
| 20 YD | 1,750 lbs (0.875 ton) | No |
| 30 YD | 3,500 lbs (1.75 ton) | Yes |

### Estimate formula (at booking — weight unknown until pickup)
```
billableDays = totalDays - (firstDayFree ? 1 : 0), floored at 0
estimatedTotal = FLAT_RATE + (DAILY_RATE × billableDays)
```

### Job-close extras (admin-entered, not part of the booking estimate)
- **Weight overage:** `ceil(max(0, actualWeightLbs - weightAllowanceLbs) / 1000) × $99`
- **Relocation:** `$100 × number of pulls`
- **Overfill:** flat `$150` if loaded above the side walls
- Final total = estimate + any of the above, or any custom amount Billy enters directly

### Prohibited materials & rules (shown on `/pricing`)
- Strictly prohibited: batteries, tires, paints, liquids, oils, chemicals, asbestos, flammable liquids, biohazardous/medical waste
- Special handling fees may apply for large appliances, mattresses, e-waste (set by the local disposal facility)
- Nothing above the container's side walls — overfill triggers the $150 fee, dry-run fees, sorting penalties, or rejection at customer's expense

---

## Payment Flow (Stripe)

### Stage 1 — Booking
- Customer selects tier, size, drop-off date, estimated pickup date
- Pricing calculator shows estimated total
- Customer pays **$500 deposit** via Stripe (captured immediately)
- Stripe Customer object created with saved payment method
- Booking record saved to DB with status: `scheduled`

### Stage 2 — Job Completion (Admin triggered)
- Billy opens admin panel
- Selects the job
- Inputs **final total** (may differ from estimate due to extras, extra days, overweight, etc.)
- System calculates: `final_total - 500 = remaining_balance`
- Charges saved payment method for remaining balance
- Sends receipt email to customer
- Job status updated to: `complete`

### Stripe objects used
- `PaymentIntent` — deposit charge at booking
- `Customer` — stores identity + payment method
- `PaymentMethod` — saved card for balance charge
- `Webhook` — confirms payment success, triggers confirmation email

---

## Job Status States
```
scheduled → active → complete → archived
```

---

## Site Structure

```
/ (Home)
  Hero — bold headline, tagline, dual CTA
  Trust strip — stats or service highlights
  Scope of service — "We Handle The Heavy Lifting" (3 feature callouts)
  Dumpster size cards — 10/20/30 YD, one flat rate for everyone
  How it works — 3 steps
  Service area — text or simple map
  Bottom CTA banner
  Footer

/order
  Full booking flow
  Stripe $500 deposit checkout

/admin (password protected — env var)
  List of open jobs — searchable (name/email/phone/address) and sortable (newest first | status)
  Job detail: customer info, dumpster size, dates, estimated total
  Job-close inputs: actual weight, relocation pulls, overfilled checkbox → computes a suggested final total (weight overage + relocation + overfill fees)
  Input: final total (accepts the suggestion or any manual override)
  Button: Charge Balance → fires Stripe charge → sends receipt

/api/stripe/webhook
  Handles payment confirmation
  Updates job status
  Triggers confirmation email
```

---

## Data Model

### Booking
```ts
{
  id: string
  createdAt: DateTime
  status: 'scheduled' | 'active' | 'complete' | 'archived'
  
  // Customer
  customerName: string
  customerEmail: string
  customerPhone: string
  
  // Job
  dumpsterSize: '10yd' | '20yd' | '30yd'
  dropoffDate: Date
  pickupDate: Date  // estimated at booking, confirmed at close
  deliveryAddress: string
  notes: string
  
  // Pricing
  estimatedTotal: number
  finalTotal: number | null
  depositPaid: number  // 500
  balanceCharged: number | null
  actualWeightLbs: number | null  // entered by admin at job close, drives weight overage fee
  
  // Stripe
  stripeCustomerId: string
  stripePaymentMethodId: string
  stripeDepositPaymentIntentId: string
  stripeBalancePaymentIntentId: string | null
}
```

---

## Environment Variables Needed
```
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
ADMIN_PASSWORD=
RESEND_API_KEY=
DATABASE_URL=
```

---

## Key Decisions Already Made
- Custom Next.js build, not WordPress/Squarespace — pricing logic too complex for plugins
- Two-charge Stripe model (not manual capture) — final amount unknown at booking due to potential extras
- $500 flat deposit at booking, balance charged at job close
- Admin panel is internal only — simple password protection, no auth library needed at MVP
- No CMS at MVP — content is hardcoded, Billy calls developer to update pricing
- Vercel for hosting — free tier sufficient at launch volume

---

## Out of Scope (MVP)
- Customer portal / job tracking
- SMS notifications
- Recurring service / subscription pickups
- Multi-operator / hauler management
- CMS for content editing
- Permit handling
