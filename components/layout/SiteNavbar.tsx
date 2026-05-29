"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Find Counsellor", href: "/counselors" },
  { label: "Self Assessment", href: "/assessments" },
  { label: "Wellness Hub", href: "/wellness" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNavbar({ onBookClick }: { onBookClick?: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1a3a6b] shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a3a6b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold leading-tight truncate">
                <span className="text-xs sm:hidden">DCC Anantnag</span>
                <span className="hidden sm:inline text-sm">District Counselling Center</span>
              </p>
              <p className="text-blue-200 text-xs leading-tight hidden sm:block">Anantnag, J&amp;K</p>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={
                    isActive
                      ? "text-white border-b-2 border-[#c07a2a] text-sm font-medium pb-0.5"
                      : "text-blue-100 hover:text-white text-sm font-medium transition-colors"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Link
              href="/login"
              className="hidden sm:inline-block text-white border border-white/50 px-3 py-1.5 rounded-lg text-sm hover:bg-white hover:text-[#1a3a6b] transition-colors font-medium"
            >
              Login
            </Link>
            <button
              onClick={onBookClick}
              className="bg-[#c07a2a] hover:bg-[#a8661f] text-white rounded-lg text-xs sm:text-sm transition-colors font-semibold px-2.5 py-1.5 sm:px-3"
            >
              <span className="hidden sm:inline">Book Free Session</span>
              <span className="sm:hidden">Book</span>
            </button>

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#152f5a] border-t border-blue-800 px-4 pb-4">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center py-3 text-sm font-medium border-b border-blue-800/60 last:border-0 ${
                  isActive ? "text-[#c07a2a] font-semibold" : "text-blue-100 hover:text-white"
                }`}
              >
                {isActive && <span className="w-1 h-4 bg-[#c07a2a] rounded-full mr-3 flex-shrink-0" />}
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 flex gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center text-white border border-white/40 py-2.5 rounded-lg text-sm font-medium"
            >
              Login
            </Link>
            <button
              onClick={() => { setMobileOpen(false); onBookClick?.(); }}
              className="flex-1 bg-[#c07a2a] text-white py-2.5 rounded-lg text-sm font-semibold"
            >
              Book Free Session
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
