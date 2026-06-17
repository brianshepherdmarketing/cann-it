import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="font-heading font-extrabold text-2xl text-white tracking-widest uppercase mb-3">
              CANN-<span className="text-brand-amber">IT</span>
            </div>
            {/* [COPY] 1-2 sentence company description — e.g. "Family-owned dumpster rental serving [City] since [Year]." */}
            <p className="text-sm leading-relaxed text-gray-500">
              [COPY: Short company description — who you are, where you serve, what makes you different]
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wide text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#service-area" className="hover:text-white transition-colors">
                  Service Area
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-white transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wide text-sm mb-4">Contact</h4>
            {/* [COPY] Replace all placeholders with real contact info */}
            <ul className="space-y-2 text-sm">
              <li>[PHONE NUMBER]</li>
              <li>[EMAIL ADDRESS]</li>
              <li>[CITY, STATE]</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-dark mt-10 pt-6 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} Cann-It. All rights reserved. &nbsp;·&nbsp;
          {/* [LINK] Add Privacy Policy / Terms of Service pages when ready */}
          <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
