import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-white border-b border-brand-cream sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Cann-It Dumpster Rentals"
            width={180}
            height={54}
            priority
          />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/home#how-it-works"
            className="text-sm font-medium text-brand-gray hover:text-brand-orange transition-colors uppercase tracking-wide"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-brand-gray hover:text-brand-orange transition-colors uppercase tracking-wide"
          >
            Pricing
          </Link>
          <Link
            href="/home#service-area"
            className="text-sm font-medium text-brand-gray hover:text-brand-orange transition-colors uppercase tracking-wide"
          >
            Service Area
          </Link>
          <Link
            href="/order"
            className="bg-brand-orange text-white text-sm font-bold uppercase tracking-wide px-5 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
