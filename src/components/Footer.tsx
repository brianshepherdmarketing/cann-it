import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/home" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Cann-It Dumpster Rentals"
                width={150}
                height={45}
              />
            </Link>
            {/* [COPY] 1-2 sentence company description */}
            <p className="text-sm leading-relaxed text-gray-500">
              [COPY: Short company description — who you are, where you serve, what makes you different]
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wide text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/home#how-it-works" className="hover:text-brand-orange transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/home#pricing" className="hover:text-brand-orange transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/home#service-area" className="hover:text-brand-orange transition-colors">
                  Service Area
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-brand-orange transition-colors">
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

        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} Cann-It Dumpster Rentals. All rights reserved. &nbsp;·&nbsp;
          <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
