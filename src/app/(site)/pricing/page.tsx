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
            * Non-waste items requiring special disposal (tires, appliances, hazardous materials, etc.) may be subject to additional surcharge fees. Rates shown are placeholder — confirm current pricing with us before booking.
          </p>
        </div>
      </section>
    </main>
  );
}
