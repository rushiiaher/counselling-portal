"use client";

import { useState } from 'react';
import Link from 'next/link';
import HeroCarousel from '@/components/home/HeroCarousel';
import SiteNavbar from '@/components/layout/SiteNavbar';
import BookAppointmentModal from '@/components/shared/BookAppointmentModal';
import { ArrowRight, Building2, ShieldCheck, Pause, Play, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [logosPaused, setLogosPaused] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <BookAppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <SiteNavbar onBookClick={() => setModalOpen(true)} />

      {/* CAROUSEL SECTION */}
      <HeroCarousel />

      {/* SERVICES SECTION */}
      <section className="bg-[#f7f8fa] py-10 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-3 gov-fade-up">
            <div>
              <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">What We Offer</span>
              <h2 className="bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-1.5 leading-tight px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                Counselling for{' '}
                <em className="italic" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Every Need</em>
              </h2>
              <p className="text-gray-500 text-sm mt-3 max-w-sm leading-relaxed">
                From career guidance to trauma therapy — expert, free support for J&amp;K youth.
              </p>
            </div>
            <Link href="/services" className="text-[#1a2e4a] text-sm font-medium hover:underline flex items-center gap-1 self-start md:self-auto whitespace-nowrap">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gov-stagger-child">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h3.75m0 0V3a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v1.5m-4.5 0h4.5M9.75 9h4.5m-4.5 3h4.5m-4.5 3h2.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5h-3a.75.75 0 00-.75.75V6h4.5V5.25a.75.75 0 00-.75-.75z" />
                  </svg>
                ),
                cardBg: 'bg-blue-50',
                iconBg: 'bg-blue-100',
                border: 'border-blue-200',
                hoverBorder: 'hover:border-blue-400',
                accent: 'border-t-[#1a3a6b]',
                title: 'Career Counselling',
                desc: 'Aptitude assessments, career mapping, stream selection for class 11–12, and professional development for graduates.',
                tags: [
                  { label: 'Class 11–12', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Graduates', color: 'bg-amber-100 text-amber-700' },
                ],
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                cardBg: 'bg-emerald-50',
                iconBg: 'bg-emerald-100',
                border: 'border-emerald-200',
                hoverBorder: 'hover:border-emerald-400',
                accent: 'border-t-emerald-600',
                title: 'Mental Wellness',
                desc: 'Trauma-informed therapy, PTSD support, anxiety & depression counselling in a completely confidential setting. Available in Kashmiri, Urdu & Hindi.',
                tags: [
                  { label: 'Trauma Informed', color: 'bg-emerald-100 text-emerald-700' },
                  { label: 'Anonymous', color: 'bg-teal-100 text-teal-700' },
                ],
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25l-8.25-4.5L12 5.25l8.25 4.5L12 14.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75v5.25m16.5-5.25v5.25M12 14.25v4.5m-4.5-2.25A4.5 4.5 0 0112 18.75a4.5 4.5 0 014.5-2.25" />
                  </svg>
                ),
                cardBg: 'bg-violet-50',
                iconBg: 'bg-violet-100',
                border: 'border-violet-200',
                hoverBorder: 'hover:border-violet-400',
                accent: 'border-t-violet-600',
                title: 'Educational Guidance',
                desc: 'Academic support, scholarship guidance, higher education planning, and study skill coaching from class 11 through PG.',
                tags: [
                  { label: 'Scholarships', color: 'bg-violet-100 text-violet-700' },
                  { label: 'Study Skills', color: 'bg-purple-100 text-purple-700' },
                ],
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
                cardBg: 'bg-rose-50',
                iconBg: 'bg-rose-100',
                border: 'border-rose-200',
                hoverBorder: 'hover:border-rose-400',
                accent: 'border-t-rose-500',
                title: 'Group Therapy',
                desc: 'Facilitated groups for peer support — conflict recovery, academic stress, identity building. 6–10 students, confidential environment.',
                tags: [
                  { label: 'Peer Support', color: 'bg-rose-100 text-rose-700' },
                  { label: '6–10 students', color: 'bg-pink-100 text-pink-700' },
                ],
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group relative h-64 cursor-pointer"
                style={{ perspective: '1000px' }}
                onClick={() => setFlippedCard(flippedCard === service.title ? null : service.title)}
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-3d md:group-hover:rotate-y-180 ${flippedCard === service.title ? 'rotate-y-180' : ''}`}>

                  {/* FRONT FACE */}
                  <div className={`absolute inset-0 backface-hidden ${service.cardBg} rounded-xl p-5 border ${service.border} ${service.hoverBorder} border-t-4 ${service.accent} shadow-sm flex flex-col items-center justify-center text-center gap-4`}>
                    <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#1a2e4a]/70 bg-white/70 px-2 py-0.5 rounded-full border border-gray-200">
                      <ShieldCheck className="w-3 h-3" /> Govt. Certified
                    </span>
                    <div className={`w-14 h-14 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-[#1a2e4a] text-base leading-snug tracking-tight">{service.title}</h3>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c07a2a]">Free Service</span>
                  </div>

                  {/* BACK FACE */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl p-5 border ${service.border} border-t-4 ${service.accent} shadow-lg flex flex-col`}>
                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{service.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.tags.map((tag) => (
                        <span key={tag.label} className={`text-xs px-2.5 py-1 rounded-full font-medium ${tag.color}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 pt-3">
                      <button
                        onClick={() => setModalOpen(true)}
                        className="text-[#1a2e4a] text-sm font-medium hover:text-[#2d5fa6] transition-colors flex items-center gap-1"
                      >
                        Book Session <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-[#f7f8fa] py-10 pb-0 md:py-12 md:pb-0 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* LEFT */}
            <div className="gov-slide-left">
              <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">About Us</span>
              <h2 className="inline-block bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-4 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                Dedicated to Empowering <em className="italic">Every Individual</em>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">
                The District Counselling Center is a government-established institution providing accessible, professional, and confidential counselling to students, youth, and families across the district.
              </p>

              {/* Mission / Vision / Objectives — colored cards */}
              <div className="space-y-3 mb-6">
                {[
                  {
                    label: 'Mission',
                    cardBg: 'bg-blue-50',
                    accent: 'border-l-blue-400',
                    labelColor: 'text-blue-500',
                    textColor: 'text-blue-900',
                    desc: 'Accessible, professional counselling that empowers individuals to overcome challenges and reach their full potential.',
                  },
                  {
                    label: 'Vision',
                    cardBg: 'bg-emerald-50',
                    accent: 'border-l-emerald-400',
                    labelColor: 'text-emerald-600',
                    textColor: 'text-emerald-900',
                    desc: 'A district where every individual has access to quality mental health and guidance services.',
                  },
                  {
                    label: 'Objectives',
                    cardBg: 'bg-amber-50',
                    accent: 'border-l-amber-400',
                    labelColor: 'text-amber-600',
                    textColor: 'text-amber-900',
                    desc: 'Evidence-based counselling, mental health awareness, counsellor capacity building, and equitable access for all.',
                  },
                  {
                    label: 'Values',
                    cardBg: 'bg-rose-50',
                    accent: 'border-l-rose-400',
                    labelColor: 'text-rose-500',
                    textColor: 'text-rose-900',
                    desc: 'Compassion, integrity, inclusivity, and respect for every individual we serve across the district.',
                  },
                ].map((item) => (
                  <div key={item.label} className={`flex gap-4 items-start ${item.cardBg} rounded-xl p-4 border-l-4 ${item.accent}`}>
                    <div className="flex-shrink-0 mt-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${item.labelColor}`}>{item.label}</span>
                    </div>
                    <p className={`${item.textColor} text-sm leading-relaxed`}>{item.desc}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT — Why Choose Us — image style */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-7 gov-slide-right">
              <h3 className="text-2xl font-bold text-[#1a2e4a] mb-1">Why Choose Us</h3>
              <p className="text-gray-500 text-sm mb-6">What sets our counselling center apart.</p>

              <div className="space-y-2">
                {[
                  'Government-certified & accredited counsellors',
                  'Free services for all district residents',
                  'Completely confidential and safe environment',
                  'Available in Kashmiri, Urdu, Hindi & English',
                  'Online and offline session options',
                  'Specialized programs for different age groups',
                  'Evidence-based counselling approaches',
                  'Follow-up support and progress tracking',
                ].map((point) => (
                  <div key={point} className="flex items-stretch gap-0">
                    {/* Orange left border bar */}
                    <div className="w-1 bg-[#c07a2a] rounded-full mr-4 flex-shrink-0" />
                    {/* Row */}
                    <div className="flex-1 bg-[#eef4fb] rounded-lg px-4 py-3">
                      <span className="text-[#1a2e4a] text-sm">{point}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COUNSELLORS SECTION */}
      <section className="bg-gradient-to-b from-[#fff5e6] via-white to-[#eaf6ea] pt-0 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 gov-fade-up">
            <div className="text-left">
              <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Meet Our Team</span>
              <h2 className="block w-fit bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-4 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Our Expert <em className="italic">Counsellors</em></h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">Our team of certified professionals brings years of experience and compassion to every counselling session.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gov-stagger-child">
            {[
              { name: 'Dr. Aamir Wani', qual: 'Ph.D. Psychology', spec: 'Career & Mental Wellness', exp: '15 Years', district: 'Srinagar' },
              { name: 'Mr. Tariq Ahmed Lone', qual: 'M.A. Counselling', spec: 'Youth & Family Guidance', exp: '10 Years', district: 'Baramulla' },
              { name: 'Dr. Nighat Bhat', qual: 'Ph.D. Education', spec: 'Educational Guidance', exp: '18 Years', district: 'Anantnag' },
              { name: 'Ms. Iqra Mir', qual: 'M.Sc. Psychology', spec: 'Personal Counselling', exp: '8 Years', district: 'Budgam' },
            ].map((counsellor) => (
              <div key={counsellor.name} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center">
                <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] p-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(counsellor.name)}&background=1a3a6b&color=fff&size=128`}
                    alt={counsellor.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1a3a6b] text-lg mb-1">{counsellor.name}</h3>
                  <p className="text-[#2563eb] text-sm font-medium mb-1">{counsellor.qual}</p>
                  <p className="text-gray-500 text-xs mb-1">{counsellor.spec}</p>
                  <p className="text-gray-400 text-xs mb-1">{counsellor.exp} Experience</p>
                  <p className="text-gray-400 text-xs mb-4">District: {counsellor.district}</p>
                  <Link href="/counselors" className="block w-full bg-[#1a3a6b] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/counselors" className="inline-flex items-center gap-2 bg-[#1a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors">
              View All Counsellors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE COUNSELLING BANNER */}
      <section className="bg-[#f7f8fa] py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#2160c4] rounded-2xl overflow-hidden px-5 md:px-12 py-5 flex flex-row items-center justify-between gap-3 shadow-xl min-h-32.5">
            {/* Decorative circles */}
            <div className="absolute right-32 md:right-48 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute right-24 md:right-40 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

            {/* LEFT — text */}
            <div className="relative z-10 flex-1 min-w-0">
              <h2 className="text-white text-sm sm:text-xl md:text-2xl font-bold leading-snug mb-1.5">
                Explore Your Counselling <span className="text-[#f5c842]">Journey Today!</span>
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">
                Connect with certified counsellors, take free self-assessments, and get expert guidance for career, education &amp; mental wellness.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 bg-[#f5c842] text-[#1a3a6b] font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg hover:bg-[#e6b800] transition-colors text-xs sm:text-sm shadow"
              >
                <span className="text-base">+</span> Start Your Counselling
              </button>
            </div>

            {/* RIGHT — earth image */}
            <div className="relative z-10 shrink-0 self-end">
              <img
                src="/earth.png"
                alt="Explore Counselling"
                className="h-20 sm:h-32 md:h-36 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-2">
            <div>
              <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Upcoming</span>
              <h2 className="bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-1 mb-1 leading-tight px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                Events &amp; <em className="italic">Workshops</em>
              </h2>
            </div>
            <Link href="/events" className="text-[#1a2e4a] text-sm font-medium hover:underline flex items-center gap-1 whitespace-nowrap sm:mb-2 self-start sm:self-auto">
              See all events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Event rows */}
          <div className="flex flex-col gap-3">
            {[
              {
                day: '28', month: 'MAY',
                type: 'Workshop', typeColor: 'text-amber-700',
                title: 'Career Guidance Workshop for Class 12 Students',
                location: 'District Community Hall',
                time: '10:00 AM – 1:00 PM',
                badge: 'Free · 80 seats',
                badgeStyle: 'text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full',
                cardBg: 'bg-amber-50 border-amber-200 hover:border-amber-300',
                dateBg: 'bg-amber-500',
                registerStyle: 'border border-amber-400 text-amber-700 hover:bg-amber-100',
              },
              {
                day: '05', month: 'JUN',
                type: 'Seminar', typeColor: 'text-emerald-700',
                title: 'Mental Health Awareness — Breaking the Stigma in Kashmir',
                location: 'GDC Anantnag',
                time: '2:00 PM – 5:00 PM',
                badge: null,
                badgeStyle: '',
                cardBg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
                dateBg: 'bg-emerald-600',
                registerStyle: 'border border-emerald-500 text-emerald-700 hover:bg-emerald-100',
              },
              {
                day: '15', month: 'JUN',
                type: 'Program', typeColor: 'text-blue-700',
                title: 'Youth Leadership & Resilience Development Program',
                location: 'DYEDC Center, Anantnag',
                time: 'Full Day',
                badge: 'Certificate provided',
                badgeStyle: 'text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded-full',
                cardBg: 'bg-blue-50 border-blue-200 hover:border-blue-300',
                dateBg: 'bg-blue-600',
                registerStyle: 'border border-blue-400 text-blue-700 hover:bg-blue-100',
              },
            ].map((event) => (
              <div
                key={event.title}
                className={`group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 border rounded-2xl px-4 sm:px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 ${event.cardBg}`}
              >
                {/* Date block */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white ${event.dateBg}`}>
                  <span className="text-xl font-bold leading-none" style={{ fontFamily: "'Noto Sans', sans-serif" }}>{event.day}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5 text-white/80">{event.month}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 font-sans">
                  <span className={`text-[10px] font-bold uppercase tracking-widest font-sans ${event.typeColor}`}>{event.type}</span>
                  <h3 className="font-semibold text-[#1a2e4a] text-sm leading-snug mt-0.5 mb-1.5 font-sans">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-sans">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </span>
                    {event.badge && (
                      <span className={`font-sans ${event.badgeStyle}`}>{event.badge}</span>
                    )}
                  </div>
                </div>

                {/* Register button */}
                <Link
                  href="/events"
                  className={`flex-shrink-0 text-xs font-semibold font-sans px-4 py-2 rounded-lg transition-colors duration-200 self-start sm:self-auto flex items-center gap-1 ${event.registerStyle}`}
                >
                  Register <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-[#f5f3ee] py-10 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Student Voices</span>
            <div className="text-center">
              <h2 className="inline-block bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-3 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                Stories of{' '}
                <em className="italic" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Healing &amp; Growth</em>
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm">
              Hear from the students and families we've helped on their journey toward healing, growth, and success.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                text: '"I didn\'t want anyone to know I was getting help. The anonymous booking option made all the difference — I finally talked to someone."',
                name: 'Aadil Khan',
                role: 'Class 12 Student, Anantnag',
                initials: 'AK',
                avatarBg: 'bg-[#d4e0f0] text-[#1a2e4a]',
                rating: 5,
              },
              {
                text: '"Dr. Priya helped me understand I had PTSD symptoms. I was told I was just being \'weak\' all my life. This center changed my world."',
                name: 'Sana Rashid',
                role: 'B.A. 2nd Year, GDC Anantnag',
                initials: 'SR',
                avatarBg: 'bg-[#d4e0f0] text-[#1a2e4a]',
                rating: 5,
              },
              {
                text: '"The career counsellor helped me see engineering wasn\'t right for me. Now I\'m pursuing law — and I love it. I wish this existed earlier."',
                name: 'Imran Mir',
                role: 'LLB Student, Anantnag',
                initials: 'IM',
                avatarBg: 'bg-[#f5e6c8] text-[#92400e]',
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border-2 border-[#1a3a6b] shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-[#f59e0b] text-base leading-none">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed italic flex-1">{t.text}</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.avatarBg}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[#1a2e4a] font-semibold text-sm leading-tight">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3 EASY STEPS SECTION */}
      <section className="bg-[#f7f8fa] py-10 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header — centered */}
          <div className="text-center mb-8 md:mb-14">
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Simple Process</span>
            <div className="text-center">
              <h2 className="inline-block bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-3 mb-3 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]">
                Get Help in <em className="italic">3 Easy Steps</em>
              </h2>
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              No complicated forms, no long waits. Start your wellness journey today.
            </p>
          </div>

          {/* Steps — horizontal card on mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {[
              { n: '1', title: 'Choose Your Service', desc: 'Pick from career, mental health, academic, group therapy or family counselling — in-person or online.' },
              { n: '2', title: 'Pick a Counsellor & Slot', desc: 'Browse certified counsellors by specialty and language, then select an available time slot.' },
              { n: '3', title: 'Attend Your Session', desc: 'Visit our center or join via video call. Free, confidential, and conducted by certified professionals.' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-[#c07a2a]/10">
                <div className="w-10 h-10 rounded-full bg-[#fdecd6] flex items-center justify-center shrink-0">
                  <span className="text-[#c07a2a] font-bold text-lg">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3a6b] text-sm mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop layout — centered columns */}
          <div className="hidden md:block">
            <div className="relative flex flex-row items-start justify-between">
              {/* Dotted connector line */}
              <div
                className="absolute top-9.5 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] border-t-2 border-dashed border-[#c07a2a]/40"
                aria-hidden="true"
              />
              {[
                { n: '1', title: 'Choose Your Service', desc: 'Pick from career, mental health, academic, group therapy or family counselling — in-person or online. Anonymous option available.' },
                { n: '2', title: 'Pick a Counsellor & Slot', desc: 'Browse certified counsellors by specialty, language (Kashmiri/Urdu/Hindi/English), and select an available time slot.' },
                { n: '3', title: 'Attend Your Session', desc: 'Visit our center or join via video call. All sessions are completely free, confidential, and conducted by certified professionals.' },
              ].map((step) => (
                <div key={step.n} className="flex-1 flex flex-col items-center px-4 relative z-10 text-center">
                  <div className="w-18 h-18 rounded-full bg-[#fdecd6] flex items-center justify-center mb-6 shadow-sm">
                    <span className="text-[#c07a2a] font-bold text-2xl">{step.n}</span>
                  </div>
                  <h3 className="font-bold text-[#1a3a6b] text-base mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-55 mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNMENT LOGOS / PARTNER PORTALS SECTION */}
      <section className="bg-[#eef0f7] pt-8 pb-4 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-5 w-max animate-scroll-logos"
              style={{ animationPlayState: logosPaused ? 'paused' : 'running' }}
            >
              {[...Array(2)].map((_, dup) => (
                [
                  /* 1. Digital India */
                  <div key={`digital-india-${dup}`} className="flex-shrink-0 w-52 h-24 bg-white rounded-xl shadow-md flex items-center justify-center px-4">
                    <img src="/digital-india.png" alt="Digital India" className="h-14 object-contain" />
                  </div>,

                  /* 2. gov.in */
                  <div key={`gov-in-${dup}`} className="flex-shrink-0 w-52 h-24 bg-white rounded-xl shadow-md flex items-center justify-center gap-3 px-5">
                    <div className="w-10 h-10 rounded-full bg-[#0066cc] flex items-center justify-center shrink-0 shadow">
                      <span className="text-white font-extrabold text-xl leading-none">@</span>
                    </div>
                    <p className="text-[22px] font-extrabold leading-none tracking-tight">
                      <span className="text-[#0066cc]">gov</span><span className="text-[#FF6600]">.in</span>
                    </p>
                  </div>,

                  /* 3. MeitY — Ashoka emblem (☸) + text, no wrong icon */
                  <div key={`meity-${dup}`} className="flex-shrink-0 w-72 h-24 bg-white rounded-xl shadow-md flex items-center gap-3 px-5">
                    <div className="shrink-0 flex flex-col items-center">
                      <span className="text-[28px] leading-none">☸</span>
                      <span className="text-[8px] text-gray-500 tracking-widest uppercase mt-0.5">सत्यमेव जयते</span>
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-[#003087] leading-tight">MeitY</p>
                      <p className="text-[10px] text-gray-600 leading-snug max-w-[170px]">Ministry of Electronics &amp; Information Technology, Government of India</p>
                    </div>
                  </div>,

                  /* 4. myGOV */
                  <div key={`mygov-${dup}`} className="flex-shrink-0 w-52 h-24 bg-white rounded-xl shadow-md flex flex-col items-center justify-center px-4">
                    <p className="font-extrabold leading-none" style={{ fontSize: '30px' }}>
                      <span className="text-[#00A651]">my</span><span className="text-[#0057A8]">GOV</span>
                    </p>
                    <p className="text-[#FF6600] font-bold text-sm mt-1">मेरी सरकार</p>
                  </div>,

                  /* 5. National Knowledge Network */
                  <div key={`nkn-${dup}`} className="flex-shrink-0 w-64 h-24 bg-white rounded-xl shadow-md flex items-center gap-3 px-5">
                    <div className="shrink-0 flex flex-col gap-1">
                      <div className="flex gap-1">
                        <span className="w-4 h-4 rounded bg-[#0057A8] block"></span>
                        <span className="w-4 h-4 rounded bg-[#0057A8] block opacity-60"></span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-4 h-4 rounded bg-[#00A651] block opacity-60"></span>
                        <span className="w-4 h-4 rounded bg-[#00A651] block"></span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#0057A8] leading-tight uppercase tracking-wide">National</p>
                      <p className="text-sm font-extrabold text-[#0057A8] leading-tight uppercase tracking-wide">Knowledge</p>
                      <p className="text-sm font-extrabold text-[#0057A8] leading-tight uppercase tracking-wide">Network</p>
                    </div>
                  </div>,

                  /* 6. ServicePlus */
                  <div key={`serviceplus-${dup}`} className="flex-shrink-0 w-64 h-24 bg-white rounded-xl shadow-md flex items-center gap-3 px-5">
                    <div className="shrink-0 w-10 h-10 rounded-full border-2 border-[#c0392b] flex items-center justify-center">
                      <span className="text-[#c0392b] font-extrabold text-lg leading-none">SP</span>
                    </div>
                    <div>
                      <p className="text-base font-extrabold text-[#1a3a6b] leading-tight">ServicePlus</p>
                      <p className="text-[9px] text-gray-500 leading-tight max-w-[150px]">Metadata-based Integrated eService Delivery Framework</p>
                    </div>
                  </div>,
                ]
              ))}
            </div>
          </div>
          <button
            onClick={() => setLogosPaused((p) => !p)}
            aria-label={logosPaused ? 'Play logo scroll' : 'Pause logo scroll'}
            className="mt-3 ml-1 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md text-[#1a3a6b] hover:bg-gray-100 transition-colors"
          >
            {logosPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a3a6b] text-white border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#1a3a6b]" />
                </div>
                <div>
                  <p className="font-bold text-sm">District Counselling Center</p>
                  <p className="text-blue-300 text-xs">Govt. of India</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Providing professional counselling and guidance services to empower the youth and families of our district.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Quick Links</h4>
              <ul className="space-y-2">
                {[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Events', href: '/events' }, { label: 'Contact', href: '/contact' }].map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {['Career Counselling', 'Educational Guidance', 'Mental Wellness', 'Youth Guidance', 'Skill Development', 'Family Counselling'].map((service) => (
                  <li key={service}><Link href="/services" className="text-blue-300 hover:text-white text-sm transition-colors">{service}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Contact</h4>
              <ul className="space-y-2 text-blue-300 text-sm">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> Civil Lines, District HQ – 110001</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> Helpline: 1800-XXX-XXXX</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> info@dcc.gov.in</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" /> Mon–Fri: 9 AM – 5 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-blue-300 text-sm">© 2025 District Counselling Center, Government of India. All Rights Reserved.</p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
