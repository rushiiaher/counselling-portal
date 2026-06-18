'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookAppointmentModal from '@/components/shared/BookAppointmentModal';

const districtStats = [
  { label: 'Certified Counsellors', value: '150+' },
  { label: 'Students Guided', value: '25,000+' },
  { label: 'Sessions Conducted', value: '50,000+' },
  { label: 'Workshops Completed', value: '500+' },
];

const slides = [
  {
    bg: '/banner.png',
    tag: '',
    heading: '',
    overlay: '',
    hideCaption: true,
    hideStats: false,
    pos: 'object-cover object-[70%]',
  },
  {
    bg: '/coun1.jpg',
    tag: '',
    heading: '',
    overlay: '',
    hideCaption: true,
    hideStats: false,
    pos: 'object-cover object-top',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <BookAppointmentModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      {/* CAROUSEL */}
      <section className="relative w-full h-56 sm:h-120 md:h-140 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img
              key={i === current ? `active-${i}` : `idle-${i}`}
              src={slide.bg}
              alt={slide.tag}
              className={`w-full h-full ${slide.pos} ${i === current ? 'sm:animate-kenburns' : ''}`}
            />
            {slide.overlay && <div className={`absolute inset-0 bg-linear-to-r ${slide.overlay}`} />}

            {/* Caption */}
            {!slide.hideCaption && (
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
                  <p className="text-orange-400 font-semibold text-xs sm:text-sm md:text-base uppercase tracking-widest mb-2 sm:mb-3">
                    {slide.tag}
                  </p>
                  <h2 className="text-white font-bold text-base sm:text-2xl md:text-4xl lg:text-5xl leading-tight max-w-2xl">
                    {slide.heading}
                  </h2>
                </div>
              </div>
            )}
          </div>
        ))}


        {/* District Stats Bar — desktop only (overlaid on image) */}
        <div className={`hidden sm:block absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${slides[current].hideStats ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 divide-x divide-white/20">
            {districtStats.map((stat) => (
              <div key={stat.label} className="px-6 py-4 text-left">
                <p className="text-white text-3xl font-bold leading-tight">{stat.value}</p>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wide leading-tight mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-3 sm:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-orange-400 w-6' : 'bg-white/50 hover:bg-white/80 w-2.5'}`}
            />
          ))}
        </div>

        {/* Prev / Next arrows — hidden on mobile */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full items-center justify-center text-xl transition-colors"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full items-center justify-center text-xl transition-colors"
        >
          ›
        </button>
      </section>


{/* BUTTONS BELOW IMAGE */}
      <div className="bg-white py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-4 sm:px-0 border-b border-gray-100">
        <button
          onClick={() => setBookingOpen(true)}
          className="bg-[#1a3a6b] hover:bg-[#2563eb] text-white font-semibold py-3 px-8 rounded-md text-base transition-colors w-full sm:w-auto"
        >
          Book an Appointment
        </button>
        <Link
          href="/assessments"
          className="bg-[#c07a2a] hover:bg-[#a8651f] text-white font-semibold py-3 px-8 rounded-md text-base transition-colors text-center w-full sm:w-auto"
        >
          Free Self Assessments
        </Link>
      </div>
    </div>
  );
}
