"use client";

import { useState } from 'react';
import Link from 'next/link';
import HeroCarousel from '@/components/home/HeroCarousel';
import SiteNavbar from '@/components/layout/SiteNavbar';
import BookAppointmentModal from '@/components/shared/BookAppointmentModal';
import { ChevronRight, ArrowRight, Building2 } from 'lucide-react';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      <BookAppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <SiteNavbar onBookClick={() => setModalOpen(true)} />

      {/* CAROUSEL SECTION */}
      <HeroCarousel />

      {/* STATISTICS SECTION */}
      <section className="bg-[#eef4fb] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

            {/* Certified Counsellors */}
            <div className="stat-slide-up group flex items-center gap-4 bg-white hover:bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-2xl px-5 py-5 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(59,130,246,0.15)]">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1a2e4a] leading-tight">150+</div>
                <div className="text-gray-500 text-xs font-medium mt-0.5">Certified Counsellors</div>
              </div>
            </div>

            {/* Students Guided */}
            <div className="stat-slide-up group flex items-center gap-4 bg-white hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-300 rounded-2xl px-5 py-5 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(52,211,153,0.15)]">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1a2e4a] leading-tight">25,000+</div>
                <div className="text-gray-500 text-xs font-medium mt-0.5">Students Guided</div>
              </div>
            </div>

            {/* Sessions Conducted */}
            <div className="stat-slide-up group flex items-center gap-4 bg-white hover:bg-violet-50 border border-violet-100 hover:border-violet-300 rounded-2xl px-5 py-5 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(167,139,250,0.15)]">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1a2e4a] leading-tight">50,000+</div>
                <div className="text-gray-500 text-xs font-medium mt-0.5">Sessions Conducted</div>
              </div>
            </div>

            {/* Workshops Completed */}
            <div className="stat-slide-up group flex items-center gap-4 bg-white hover:bg-amber-50 border border-amber-100 hover:border-amber-300 rounded-2xl px-5 py-5 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(251,191,36,0.15)]">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1a2e4a] leading-tight">500+</div>
                <div className="text-gray-500 text-xs font-medium mt-0.5">Workshops Completed</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-[#f7f8fa] py-10 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-3">
            <div>
              <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">What We Offer</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1.5 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Counselling for{' '}
                <em className="italic" style={{ fontFamily: 'Georgia, serif' }}>Every Need</em>
              </h2>
              <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mt-3" />
              <p className="text-gray-500 text-sm mt-3 max-w-sm leading-relaxed">
                From career guidance to trauma therapy — expert, free support for J&amp;K youth.
              </p>
            </div>
            <Link href="/services" className="text-[#1a2e4a] text-sm font-medium hover:underline flex items-center gap-1 self-start md:self-auto whitespace-nowrap">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className={`${service.cardBg} rounded-xl p-5 border ${service.border} ${service.hoverBorder} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg ${service.iconBg} flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>

                {/* Title — plain sans-serif, no Georgia */}
                <h3 className="font-semibold text-[#1a2e4a] text-[15px] mb-2 leading-snug tracking-tight">{service.title}</h3>

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
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-[#f7f8fa] py-10 pb-0 md:py-12 md:pb-0 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* LEFT */}
            <div>
              <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">About Us</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Dedicated to Empowering <em className="italic">Every Individual</em>
              </h2>
              <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mb-4" />
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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-7">
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
      <section className="bg-[#f7f8fa] pt-0 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Meet Our Team</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Our Expert <em className="italic">Counsellors</em></h2>
            <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">Our team of certified professionals brings years of experience and compassion to every counselling session.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Priya Sharma', qual: 'Ph.D. Psychology', spec: 'Career & Mental Wellness', exp: '15 Years' },
              { name: 'Mr. Rajesh Kumar', qual: 'M.A. Counselling', spec: 'Youth & Family Guidance', exp: '10 Years' },
              { name: 'Dr. Anita Verma', qual: 'Ph.D. Education', spec: 'Educational Guidance', exp: '18 Years' },
              { name: 'Ms. Sunita Patel', qual: 'M.Sc. Psychology', spec: 'Personal Counselling', exp: '8 Years' },
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
                  <p className="text-gray-400 text-xs mb-4">{counsellor.exp} Experience</p>
                  <Link href="/counselors" className="block w-full bg-[#1a3a6b] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/counselors" className="inline-block bg-[#1a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors flex items-center gap-2">
              View All Counsellors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Upcoming</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 mb-1 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Events &amp; <em className="italic">Workshops</em>
              </h2>
              <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mt-2" />
            </div>
            <Link href="/events" className="text-[#1a2e4a] text-sm font-medium hover:underline flex items-center gap-1 whitespace-nowrap mb-2">
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
                  <span className="text-xl font-bold leading-none" style={{ fontFamily: 'Georgia, serif' }}>{event.day}</span>
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Stories of{' '}
              <em className="italic" style={{ fontFamily: 'Georgia, serif' }}>Healing &amp; Growth</em>
            </h2>
            <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Real experiences from students and families across Anantnag.</p>
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
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
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
      <section className="bg-[#eef2f9] py-10 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header — centered */}
          <div className="text-center mb-8 md:mb-14">
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Simple Process</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">
              Get Help in <em className="italic">3 Easy Steps</em>
            </h2>
            <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mx-auto mb-3" />
            <p className="text-gray-500 text-sm md:text-base">
              No complicated forms, no long waits. Start your wellness journey today.
            </p>
          </div>

          {/* Steps — horizontal card on mobile, centered column on desktop */}
          <div className="flex flex-col gap-4 md:hidden">
            {[
              { n: '1', title: 'Choose Your Service', desc: 'Pick from career, mental health, academic, group therapy or family counselling — in-person or online.' },
              { n: '2', title: 'Pick a Counsellor & Slot', desc: 'Browse certified counsellors by specialty and language, then select an available time slot.' },
              { n: '3', title: 'Attend Your Session', desc: 'Visit our center or join via video call. Free, confidential, and conducted by certified professionals.' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-[#c07a2a]/10">
                <div className="w-10 h-10 rounded-full bg-[#fdecd6] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c07a2a] font-bold text-lg">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3a6b] text-sm mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop layout — original centered columns */}
          <div className="hidden md:block">
            <div className="relative flex flex-row items-start justify-between">
              {/* Dotted connector line */}
              <div
                className="absolute top-[38px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] border-t-2 border-dashed border-[#c07a2a]/40"
                aria-hidden="true"
              />
              {[
                { n: '1', title: 'Choose Your Service', desc: 'Pick from career, mental health, academic, group therapy or family counselling — in-person or online. Anonymous option available.' },
                { n: '2', title: 'Pick a Counsellor & Slot', desc: 'Browse certified counsellors by specialty, language (Kashmiri/Urdu/Hindi/English), and select an available time slot.' },
                { n: '3', title: 'Attend Your Session', desc: 'Visit our center or join via video call. All sessions are completely free, confidential, and conducted by certified professionals.' },
              ].map((step) => (
                <div key={step.n} className="flex-1 flex flex-col items-center px-4 relative z-10 text-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-[#fdecd6] flex items-center justify-center mb-6 shadow-sm">
                    <span className="text-[#c07a2a] font-bold text-2xl">{step.n}</span>
                  </div>
                  <h3 className="font-bold text-[#1a3a6b] text-base mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a3a6b] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

          {/* Mobile: compact 2-col, Desktop: 4-col */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">

            {/* Brand — full width on mobile */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-[#1a3a6b]" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">District Counselling Center</p>
                  <p className="text-blue-300 text-xs">Anantnag, J&K</p>
                </div>
              </div>
              <p className="text-blue-200 text-xs leading-relaxed">
                Free, professional counselling for students, youth and families across the district.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm mb-3 text-blue-100">Quick Links</h4>
              <ul className="space-y-1.5">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: 'Counsellors', href: '/counselors' },
                  { label: 'Events', href: '/events' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-blue-300 hover:text-white text-xs transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="font-bold text-sm mb-3 text-blue-100">Services</h4>
              <ul className="space-y-1.5">
                {['Career Counselling', 'Mental Wellness', 'Educational Guidance', 'Family Counselling', 'Group Therapy'].map((service) => (
                  <li key={service}>
                    <Link href="/services" className="text-blue-300 hover:text-white text-xs transition-colors">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links — hidden on mobile */}
            <div className="hidden md:block">
              <h4 className="font-bold text-sm mb-3 text-blue-100">Important Links</h4>
              <ul className="space-y-1.5">
                {['Ministry of Education', 'NCERT', 'UGC', 'AICTE', 'National Career Service', 'Skill India', 'Digital India'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-300 hover:text-white text-xs transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-blue-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-blue-300 text-xs text-center sm:text-left">
              © 2025 District Counselling Center, Govt. of India. All Rights Reserved.
            </p>
            <div className="flex gap-3 text-xs">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
