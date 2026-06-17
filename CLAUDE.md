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
- **Primary:** `#F5A623` (construction amber)
- **Base:** `#1A1A1A` (near black)
- **Accent light:** `#FFFFFF`
- **Neutral:** `#2C2C2C`, `#4A4A4A`
- **Tone:** Confident, direct, industrial — not mom & pop, not corporate
- **Logo:** TBD — typographic wordmark in progress (Illustrator)

---

## Pricing Model

### Variables
- **Customer tier:** Residential | Commercial
- **Dumpster size:** Small | Large
- **Fees:** Drop-off fee + Pickup fee + Daily rate × number of days

### Formula
```
total = drop_fee + pickup_fee + (daily_rate × days)
```

### Rate matrix
```js
const RATES = {
  residential: {
    small: { drop: 600, pickup: 600, daily: 100 },
    large: { drop: 700, pickup: 700, daily: 100 },
  },
  construction: {
    small: { drop: 500, pickup: 500, daily: 100 },
    large: { drop: 600, pickup: 600, daily: 100 },
  },
}
```

### Pricing formula
```
total = drop_fee + pickup_fee + (daily_rate × days)
```

### Notes
- Drop-off fee and pickup fee are SEPARATE charges, each the same dollar amount per event
- Large (20 YD) adds $100 to EACH of drop and pickup vs small (10 YD)
- Residential small: $600 drop + $600 pickup · large: $700 drop + $700 pickup
- Construction small: $500 drop + $500 pickup · large: $600 drop + $600 pickup
- Daily rate is the same across all tiers and sizes ($100/day)
- TOS surcharge applies for anything outside of standard waste (non-waste materials, hazardous, etc.) — Billy handles this manually at job close via admin panel
- Construction customers may receive custom pricing for repeat/volume — handled offline by Billy, admin panel supports inputting any final total

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
  How it works — 3 steps
  Service tiers — Residential vs Construction cards
  Pricing calculator — interactive, live total
  Service area — text or simple map
  Footer

/order
  Full booking flow
  Stripe $500 deposit checkout

/admin (password protected — env var)
  List of open jobs
  Job detail: customer info, dumpster size, dates, estimated total
  Input: final total
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
  customerType: 'residential' | 'construction'
  
  // Job
  dumpsterSize: 'small' | 'large'
  dropoffDate: Date
  pickupDate: Date  // estimated at booking, confirmed at close
  deliveryAddress: string
  notes: string
  
  // Pricing
  estimatedTotal: number
  finalTotal: number | null
  depositPaid: number  // 500
  balanceCharged: number | null
  
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
