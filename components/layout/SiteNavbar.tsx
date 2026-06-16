"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";

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

  const handleBookClick = () => {
    console.log('Book button clicked!');
    if (onBookClick) {
      console.log('Calling onBookClick function');
      onBookClick();
    } else {
      console.log('No onBookClick function provided!');
    }
  };

  return (
    <nav className="shadow-md bg-white">
      {/* TOP HEADER BAR - Exact beige/tan color like reference */}
      <div className="bg-[#D9D5D2] border-b border-[#B8B5B2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Left side - Gov branding */}
            <div className="flex items-center gap-8">
              <div className="text-[11px] font-bold text-[#333333] tracking-tight leading-[1.2]" style={{ fontFamily: 'Arial, sans-serif' }}>
                भारत सरकार<br />
                <span className="text-[10px] font-semibold">GOVERNMENT OF INDIA</span>
              </div>
            </div>

            {/* Right side - J&K Administration */}
            <div className="flex items-center gap-2">
              <div className="text-[11px] font-bold text-[#333333] tracking-tight leading-[1.2] text-right" style={{ fontFamily: 'Arial, sans-serif' }}>
                जम्मू और कश्मीर प्रशासन<br />
                <span className="text-[10px] font-semibold">JAMMU & KASHMIR ADMINISTRATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER - White background with centered content */}
      <div className="bg-white py-4 border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT: Digital India Logo */}
            <Link href="/" className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-16 sm:w-40 sm:h-20">
                  <Image
                    src="/digital-india.png"
                    alt="Digital India"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* TITLE - Centered, Bold, Arial */}
              <div className="flex-1 text-center">
                <div className="mb-1 text-base sm:text-lg md:text-xl text-[#003399] font-normal tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                  जिला श्रीनगर–अनंतनाग छात्र एवं युवा डिजिटल परामर्श एवं मार्गदर्शन पोर्टल
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight tracking-tight mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                YOUTH DIGITAL COUNSELLING AND GUIDANCE PORTAL
                </h1>
              </div>
            </Link>

            {/* RIGHT: Logo */}
            <div className="hidden lg:block flex-shrink-0 ml-4">
              <div className="relative w-64 h-16 sm:w-80 sm:h-20">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR - Exact light gray like reference */}
      <div className="sticky top-0 z-[9999] bg-[#E8E8E8] border-b-2 border-[#CCCCCC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-start gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-2.5 px-4 text-[13px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#FFA500] text-white"
                      : "bg-transparent text-[#333333] hover:bg-[#D5D5D5]"
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
                onClick={() => { setMobileOpen(false); onBookClick?.(); }}
                className="w-full py-3 px-4 text-sm font-bold uppercase bg-green-600 text-white hover:bg-green-700 transition-colors rounded-sm"
              >
                Book Free Session
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
