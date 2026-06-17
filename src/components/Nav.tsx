import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-brand-black border-b border-brand-dark sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/home"
          className="font-heading font-extrabold text-2xl text-white tracking-widest uppercase"
        >
          CANN-<span className="text-brand-amber">IT</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/home#how-it-works"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
          >
            How It Works
          </Link>
          <Link
            href="/home#pricing"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
          >
            Pricing
          </Link>
          <Link
            href="/home#service-area"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
          >
            Service Area
          </Link>
        </div>
      </div>
    </nav>
  );
}
