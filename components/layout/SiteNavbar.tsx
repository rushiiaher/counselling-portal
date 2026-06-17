"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BookAppointmentModal from "@/components/shared/BookAppointmentModal";

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
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      setBookingOpen(true);
    }
  };

  return (
    <>
    <BookAppointmentModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    <nav className="shadow-md bg-white sticky top-0 z-9999">
      {/* TOP HEADER BAR */}
      <div className="bg-[#D9D5D2] border-b border-[#B8B5B2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 sm:h-10">
            {/* Left side - Gov branding */}
            <div className="text-[9px] sm:text-[11px] font-bold text-[#333333] tracking-tight leading-[1.2]" style={{ fontFamily: 'Arial, sans-serif' }}>
              भारत सरकार<br />
              <span className="font-semibold">GOVERNMENT OF INDIA</span>
            </div>
            {/* Right side - J&K Administration */}
            <div className="text-[9px] sm:text-[11px] font-bold text-[#333333] tracking-tight leading-[1.2] text-right" style={{ fontFamily: 'Arial, sans-serif' }}>
              जम्मू और कश्मीर प्रशासन<br />
              <span className="font-semibold text-[8px] sm:text-[10px]">J&K ADMINISTRATION</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER — sticky on mobile, static on desktop */}
      <div className="bg-white py-1 sm:py-4 border-b border-[#E5E5E5] shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">

            {/* LEFT: Digital India Logo + Title */}
            <Link href="/" className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <div className="shrink-0">
                <div className="relative w-16 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20">
                  <Image src="/digital-india.png" alt="Digital India" fill className="object-contain" />
                </div>
              </div>

              {/* TITLE */}
              <div className="flex-1 min-w-0 text-center">
                <div className="mb-0.5 text-[7px] sm:text-sm md:text-lg text-[#003399] font-normal tracking-tight leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                  जिला श्रीनगर–अनंतनाग छात्र एवं युवा डिजिटल परामर्श एवं मार्गदर्शन पोर्टल
                </div>
                <h1 className="text-[9px] sm:text-lg md:text-2xl lg:text-3xl font-bold text-black leading-tight tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                  YOUTH DIGITAL COUNSELLING &amp; GUIDANCE PORTAL
                </h1>
              </div>
            </Link>

            {/* RIGHT: Logo — hidden on mobile */}
            <div className="hidden sm:block shrink-0 ml-2 lg:ml-4">
              <div className="relative sm:w-32 sm:h-16 lg:w-64 lg:h-16 xl:w-80 xl:h-20">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:bg-gray-100 rounded-md shrink-0"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR — sticky on desktop only */}
      <div className="bg-[#E8E8E8] border-b-2 border-[#CCCCCC] shadow-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-2.5 px-4 text-[13px] font-semibold transition-all ${
                    isActive ? "bg-[#FFA500] text-white" : "bg-transparent text-[#333333] hover:bg-[#D5D5D5]"
                  }`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleBookClick}
              className="ml-auto py-2.5 px-5 text-[13px] font-bold bg-[#28A745] text-white hover:bg-[#218838] transition-colors shadow-sm"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              BOOK SESSION
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t-2 border-orange-500 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3">
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
                  className={`block py-3 px-4 text-sm font-semibold uppercase transition-colors border-l-4 ${
                    isActive 
                      ? "text-orange-600 bg-orange-50 border-orange-600" 
                      : "text-gray-700 border-transparent hover:border-orange-400 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => { setMobileOpen(false); handleBookClick(); }}
                className="w-full py-3 px-4 text-sm font-bold uppercase bg-green-600 text-white hover:bg-green-700 transition-colors rounded-sm"
              >
                Book Free Session
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
