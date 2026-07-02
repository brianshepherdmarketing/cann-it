import PricingCalculator from "@/components/PricingCalculator";

export default function PricingPage() {
  return (
    <main>
      <section className="bg-brand-light py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-brand-black uppercase text-center mb-4">
            GET YOUR PRICE
          </h1>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
            No haggling. No surprises. What you see is what you pay.
          </p>
          <PricingCalculator />
          <p className="text-center text-gray-400 text-xs mt-6">
            * Weight, relocation, and overfill fees (if any) are added at job close based on actual usage — see rules below.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-black uppercase text-center mb-10">
            Waste Allowances &amp; Rules
          </h2>
          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-heading text-lg font-extrabold text-brand-black uppercase mb-1">
                Prohibited Materials
              </h3>
              <p>
                Batteries, tires, paints, liquids, oils, chemicals, asbestos,
                flammable liquids, and biohazardous/medical waste are not
                allowed under any circumstances.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-extrabold text-brand-black uppercase mb-1">
                Special Handling
              </h3>
              <p>
                Large appliances (refrigerators, AC units), mattresses, and
                electronic waste may be subject to additional environmental
                handling fees imposed by the local disposal facility.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-extrabold text-brand-black uppercase mb-1">
                Loading Rules
              </h3>
              <p>
                Nothing is allowed above the side walls of the container.
                Items exceeding the top edge will be left on the ground beside
                the roll-off or subject to a $150 extra handling charge. Loads
                must be distributed evenly for safe highway transport.
                Violating these guidelines may result in dry-run fees,
                sorting penalties, or container rejection at the customer&apos;s
                expense.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
