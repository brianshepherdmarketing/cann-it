import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DUMPSTER_SPECS, type DumpsterSize } from "@/lib/pricing";

export default function Home() {
  return (
    <main>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
          CONTENT NEEDED:
            • [HEADLINE] 4–6 words, all-caps, bold, punchy
            • [SUBHEAD] 1–2 sentences: fast, easy, fair, no BS
            • [HERO IMAGE] Full-bleed background — dumpster on job
              site, truck dropping a can, or clean industrial shot.
              Dark image preferred (overlay handles contrast).
              Recommended: 1920×1080px or wider, landscape
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-brand-black text-white overflow-hidden min-h-[80vh] flex items-center">
        {/* HERO IMAGE SLOT ↓ swap this div for next/image when ready */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-brand-dark flex items-center justify-center">
            <span className="text-brand-gray text-xs uppercase tracking-widest">
              [ HERO BACKGROUND IMAGE — dark industrial / dumpster on job site ]
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-28 md:py-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-6xl md:text-8xl font-extrabold uppercase leading-none tracking-tight mb-6">
              YOU FILL IT,
              <br />
              <span className="text-brand-orange">WE SPILL IT.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg mb-10 leading-relaxed">
              Residential and construction dumpster rentals — fast drop-off, easy pickup, no surprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/order">
                <Button className="bg-brand-orange hover:opacity-90 text-brand-black font-bold text-base px-8 py-6 uppercase tracking-wide">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="ghost"
                  className="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white text-base px-8 py-6 uppercase tracking-wide"
                >
                  See Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TRUST STRIP
          CONTENT NEEDED:
            • [STAT 1] How many hauls/jobs completed (real number)
            • [STAT 4] Service area description (city/region name)
            • Optional: any certifications, years in business, etc.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-brand-orange">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { stat: "[###]+", label: "HAULS COMPLETED" },       // ← [STAT 1] real number
              { stat: "SAME-DAY", label: "DROP-OFF AVAILABLE" },
              { stat: "ZERO", label: "HIDDEN FEES" },
              { stat: "[AREA]", label: "SERVICE COVERAGE" },       // ← [STAT 4] city/region
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="font-heading font-extrabold text-2xl md:text-3xl">{stat}</div>
                <div className="text-xs font-bold tracking-widest mt-1 opacity-70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DUMPSTER SIZE CARDS
          CONTENT NEEDED:
            • [SIZE IMAGES] One photo per dumpster size.
              Recommended: landscape, 600×400px+, consistent angle
              10 YD — small compact bin
              20 YD — mid-size (most popular)
              30 YD — large roll-off
              40 YD — largest roll-off
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="sizes" className="bg-brand-cream py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-brand-black uppercase text-center mb-4">
            ROLL-OFF DUMPSTER RENTALS
          </h2>
          <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
            Get the right size for your job — fast drop-off, easy pickup, no hidden fees.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["10yd", "20yd", "30yd", "40yd"] as DumpsterSize[]).map((size) => {
              const { label, dimensions, uses, popular } = DUMPSTER_SPECS[size];
              return (
                <div key={size} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-sm">
                  {/* ↓ [SIZE IMAGE] Replace div with next/image when ready */}
                  <div className="bg-gray-100 h-44 flex items-center justify-center text-xs text-gray-400 text-center px-4">
                    [ {label} YD dumpster image ]
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {popular && (
                      <span className="inline-block bg-brand-orange text-white text-xs font-bold tracking-wide px-2 py-0.5 rounded mb-2 uppercase self-start">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-heading text-2xl font-extrabold text-brand-black uppercase">
                      {label} Dumpster
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 mb-4">{dimensions}</p>
                    <ul className="text-sm text-gray-600 space-y-1 flex-1 mb-6">
                      {uses.map((u) => (
                        <li key={u} className="flex items-center gap-2">
                          <span className="text-brand-orange font-bold shrink-0">✓</span> {u}
                        </li>
                      ))}
                    </ul>
                    <Link href="/order">
                      <Button className="w-full bg-brand-orange hover:opacity-90 text-white font-bold uppercase tracking-wide">
                        Get a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/pricing" className="text-brand-orange font-semibold hover:underline text-sm uppercase tracking-wide">
              View full pricing calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS
          CONTENT NEEDED:
            • [STEP COPY] 2–3 sentences per step (3 steps below)
            • [STEP IMAGES] Icon, illustration, or photo for each
              step. Suggestions:
                Step 1 — calendar, phone, laptop (online booking)
                Step 2 — credit card, phone, payment confirmation
                Step 3 — truck, dumpster being dropped, full bin
              Recommended: square or landscape, min 600×400px
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-brand-black uppercase text-center mb-4">
            HOW IT WORKS
          </h2>
          {/* ↓ [SUBHEAD] Replace with final copy */}
          <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
            Three steps from your couch to a clean job site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "PICK YOUR SIZE & DATES",
                // ↓ [STEP 1 COPY]
                body: "Tell us what you're hauling, pick your dumpster size, and choose your drop-off and pickup dates. We'll show you the exact price before you commit.",
                // ↓ [STEP 1 IMAGE]
                img: "[ IMAGE: Calendar, phone, or online booking visual — Step 1 ]",
              },
              {
                step: "02",
                title: "PAY YOUR $500 DEPOSIT",
                // ↓ [STEP 2 COPY]
                body: "Lock in your date with a $500 deposit paid online. Your card is saved securely — we charge the balance at job close based on actual rental days.",
                // ↓ [STEP 2 IMAGE]
                img: "[ IMAGE: Credit card, phone payment, or security badge — Step 2 ]",
              },
              {
                step: "03",
                title: "FILL IT. WE HAUL IT.",
                // ↓ [STEP 3 COPY]
                body: "We show up on schedule, drop the can, and get out of your way. When you're done, one call and we come haul everything off. That's the whole job.",
                // ↓ [STEP 3 IMAGE]
                img: "[ IMAGE: Truck dropping dumpster, full bin, or completed cleanout — Step 3 ]",
              },
            ].map(({ step, title, body, img }) => (
              <div key={step} className="relative">
                <div className="font-heading text-9xl font-extrabold text-brand-orange/15 absolute -top-6 -left-2 select-none leading-none">
                  {step}
                </div>
                {/* IMAGE SLOT */}
                <div className="relative bg-gray-100 rounded-2xl h-44 mb-5 flex items-center justify-center text-xs text-gray-400 text-center px-4">
                  {img}
                </div>
                <h3 className="font-heading text-xl font-extrabold text-brand-black uppercase mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SERVICE TIERS
          CONTENT NEEDED:
            • [RESIDENTIAL IMAGE] Home cleanout, garage, moving
              boxes, yard debris. Bright/daytime preferred.
              Recommended: landscape, 800×500px+
            • [CONSTRUCTION IMAGE] Job site, lumber, drywall,
              concrete, renovation debris. Can be darker/grittier.
              Recommended: landscape, 800×500px+
            • [TIER BULLETS] Confirm bullet points match what you
              actually accept in each tier
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-brand-black uppercase text-center mb-4">
            WHAT ARE YOU HAULING?
          </h2>
          {/* ↓ [SUBHEAD] Replace with final copy */}
          <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
            Whether you&apos;re cleaning out the garage or clearing a job site,
            we&apos;ve got the right can.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Residential */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              {/* ↓ [RESIDENTIAL IMAGE] */}
              <div className="bg-gray-100 h-52 flex items-center justify-center text-xs text-gray-400 text-center px-6">
                [ IMAGE: Residential cleanout — garage, home, moving boxes, yard debris ]
                <br />
                Recommended: bright, daytime, 800×500px+
              </div>
              <div className="p-7">
                <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-3 uppercase">
                  Residential
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-brand-black uppercase mb-3">
                  HOME CLEANOUTS &amp; JUNK REMOVAL
                </h3>
                {/* ↓ [RESIDENTIAL BULLETS] Confirm these match what you accept */}
                <ul className="text-sm text-gray-600 space-y-1 mb-5">
                  <li>✓ Garage and basement cleanouts</li>
                  <li>✓ Moving and estate cleanouts</li>
                  <li>✓ Yard waste and landscaping debris</li>
                  <li>✓ General household junk</li>
                </ul>
                <p className="text-sm text-gray-500">
                  $600 drop-off · $600 pickup · $100/day
                </p>
              </div>
            </div>

            {/* Construction */}
            <div className="bg-brand-black rounded-2xl overflow-hidden">
              {/* ↓ [CONSTRUCTION IMAGE] */}
              <div className="bg-brand-dark h-52 flex items-center justify-center text-xs text-gray-500 text-center px-6">
                [ IMAGE: Construction/commercial — job site, lumber, drywall, concrete, demo debris ]
                <br />
                Can be gritty/industrial, 800×500px+
              </div>
              <div className="p-7">
                <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-3 uppercase">
                  Construction
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white uppercase mb-3">
                  CONSTRUCTION &amp; RENOVATION
                </h3>
                {/* ↓ [CONSTRUCTION BULLETS] Confirm these match what you accept */}
                <ul className="text-sm text-gray-400 space-y-1 mb-5">
                  <li>✓ Renovation and remodel debris</li>
                  <li>✓ Roofing materials and shingles</li>
                  <li>✓ Lumber, drywall, and concrete</li>
                  <li>✓ Demo and new construction waste</li>
                </ul>
                <p className="text-sm text-gray-500">
                  $500 drop-off · $500 pickup · $100/day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SERVICE AREA
          CONTENT NEEDED:
            • [AREA COPY] 2–3 sentences about where you serve
            • [CITY LIST] Replace placeholder towns with real ones
            • [MAP / AREA IMAGE] Options:
                A) Google Maps embed (iframe)
                B) Screenshot of service area with pins
                C) Regional lifestyle photo (roads, landmarks)
              Recommended: 800×600px landscape
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="service-area" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-brand-black uppercase mb-5">
                WHERE WE ROLL
              </h2>
              {/* ↓ [AREA COPY] Replace with real service area description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                [COPY: 2–3 sentences about your service area. E.g. &ldquo;We
                serve [City] and the surrounding [Region]. If you&apos;re within
                [X] miles of [Location], we&apos;ve got you. Not sure? Give us
                a call.&rdquo;]
              </p>
              {/* ↓ [CITY LIST] Replace with real towns you serve */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700 mb-8">
                {[
                  "[Town 1]",
                  "[Town 2]",
                  "[Town 3]",
                  "[Town 4]",
                  "[Town 5]",
                  "[Town 6]",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="text-brand-orange font-bold">✓</span>
                    {t}
                  </div>
                ))}
              </div>
              <Link href="/order">
                <Button className="bg-brand-orange hover:opacity-90 text-brand-black font-bold uppercase tracking-wide">
                  Book Your Drop-Off
                </Button>
              </Link>
            </div>

            {/* MAP / AREA IMAGE SLOT */}
            <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center text-xs text-gray-400 text-center px-6">
              [ MAP or AREA IMAGE ]
              <br />
              Options: Google Maps embed · service area screenshot · regional
              photo
              <br />
              Recommended: 800×600px landscape
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM CTA BANNER
          CONTENT NEEDED:
            • [CTA HEADLINE] 4–6 words, urgent, direct
            • [CTA SUBHEAD] 1 sentence — urgency or reassurance
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-brand-orange py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* ↓ [CTA HEADLINE] Replace with final copy */}
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-brand-black uppercase mb-4">
            READY TO FILL IT?
          </h2>
          {/* ↓ [CTA SUBHEAD] Replace with final copy */}
          <p className="text-brand-black/70 text-lg mb-8">
            Book online in minutes. $500 deposit secures your date.
          </p>
          <Link href="/order">
            <Button className="bg-brand-black hover:bg-brand-dark text-white font-bold text-lg px-10 py-6 uppercase tracking-wide">
              Book Your Dumpster
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
