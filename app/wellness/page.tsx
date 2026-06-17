'use client';

import Link from 'next/link';
import { useState } from 'react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import { ChevronRight, Building2, MapPin, Phone, Mail, Clock } from 'lucide-react';

const FILTERS = ['All Resources', 'Mental Health', 'Stress & Anxiety', 'Career', 'Trauma & Healing', 'Study Skills', 'Guided Meditations'];

const resources = [
  {
    id: 1,
    type: 'Video',
    typeBg: 'bg-blue-50',
    typeText: 'text-blue-600',
    thumbBg: 'bg-blue-100',
    category: 'Stress & Anxiety',
    categoryColor: 'text-[#c07a2a]',
    title: '5-Minute Breathing Technique for Exam Stress',
    desc: 'A simple box-breathing exercise proven to reduce exam anxiety in under 5 minutes.',
    author: 'Dr. Aamir Wani',
    meta: '3,200 views',
    duration: '8:45',
    filter: 'Stress & Anxiety',
    icon: (
      <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    type: 'Article',
    typeBg: 'bg-emerald-50',
    typeText: 'text-emerald-600',
    thumbBg: 'bg-emerald-100',
    category: 'Trauma & Healing',
    categoryColor: 'text-[#c07a2a]',
    title: 'Understanding PTSD: A Guide for J&K Students',
    desc: 'What conflict-related trauma looks like, and why seeking help is a sign of strength, not weakness.',
    author: 'Mental Health Team',
    meta: '8 min read',
    duration: null,
    filter: 'Trauma & Healing',
    icon: (
      <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: 3,
    type: 'Guide',
    typeBg: 'bg-yellow-50',
    typeText: 'text-yellow-700',
    thumbBg: 'bg-yellow-50',
    category: 'Career',
    categoryColor: 'text-[#c07a2a]',
    title: 'Career Paths After Class 12 in J&K — Complete Guide',
    desc: 'Engineering, medicine, law, arts, civil services — a complete breakdown of every option available.',
    author: 'Career Team',
    meta: '15 min read',
    duration: null,
    filter: 'Career',
    icon: (
      <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 4,
    type: 'Meditation',
    typeBg: 'bg-purple-50',
    typeText: 'text-purple-600',
    thumbBg: 'bg-purple-100',
    category: 'Guided Meditation',
    categoryColor: 'text-[#c07a2a]',
    title: '10-Minute Guided Meditation for Anxiety Relief',
    desc: 'A calming audio meditation in Urdu and English, designed for students experiencing persistent worry.',
    author: 'Wellness Team',
    meta: '1,890 listens',
    duration: '10:00',
    filter: 'Guided Meditations',
    icon: (
      <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 5,
    type: 'Article',
    typeBg: 'bg-emerald-50',
    typeText: 'text-emerald-600',
    thumbBg: 'bg-blue-50',
    category: 'Study Skills',
    categoryColor: 'text-[#c07a2a]',
    title: 'How to Build Effective Study Habits in 7 Days',
    desc: 'Science-backed study techniques that work even when you\'re struggling emotionally or mentally.',
    author: 'Dr. Nighat Bhat',
    meta: '6 min read',
    duration: null,
    filter: 'Study Skills',
    icon: (
      <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
      </svg>
    ),
  },
  {
    id: 6,
    type: 'Video',
    typeBg: 'bg-red-50',
    typeText: 'text-red-500',
    thumbBg: 'bg-red-50',
    category: 'Mental Health',
    categoryColor: 'text-[#c07a2a]',
    title: 'Healthy vs. Toxic Relationships — Recognizing the Signs',
    desc: 'How to identify unhealthy patterns in friendships, family, and romantic relationships.',
    author: 'Dr. Sameer Malik',
    meta: '4,100 views',
    duration: '12:00',
    filter: 'Mental Health',
    icon: (
      <svg className="w-8 h-8 text-red-200" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="7" />
      </svg>
    ),
  },
];

export default function WellnessHubPage() {
  const [activeFilter, setActiveFilter] = useState('All Resources');

  const filtered = activeFilter === 'All Resources'
    ? resources
    : resources.filter((r) => r.filter === activeFilter);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteNavbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/well.jpg"
          alt="Wellness Hub"
          className="w-full h-80 object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Wellness Hub</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Wellness Hub — <em className="italic">Learn &amp; Grow</em></h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Articles, videos, exercises and guides for mental health, career and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="px-6 py-5 border-b border-orange-100 sticky top-0 z-30" style={{ background: 'linear-gradient(to bottom, #fff5e6, #ffffff, #eaf6ea)' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 ${
                activeFilter === f
                  ? 'bg-[#1a2e4a] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* RESOURCE GRID */}
      <section className="py-10 px-6" style={{ background: 'linear-gradient(to bottom, #fff5e6, #ffffff, #eaf6ea)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer"
              >
                {/* Thumbnail */}
                <div className={`relative ${r.thumbBg} h-36 sm:h-44 flex items-center justify-center overflow-hidden`}>
                  {r.id === 1 ? (
                    <img src="/stress.jpg" alt={r.title} className="w-full h-full object-cover object-center" />
                  ) : r.id === 2 ? (
                    <img src="/trauma.jpg" alt={r.title} className="w-full h-full object-cover object-center" />
                  ) : r.id === 3 ? (
                    <img src="/career.jpg" alt={r.title} className="w-full h-full object-cover object-center" />
                  ) : r.id === 4 ? (
                    <img src="/wellness.jpg" alt={r.title} className="w-full h-full object-cover object-center" />
                  ) : r.id === 5 ? (
                    <img src="/study.jpg" alt={r.title} className="w-full h-full object-cover object-center" />
                  ) : (
                    <img src="/con1.jpg" alt={r.title} className="w-full h-full object-cover object-center" />
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${r.categoryColor}`}>
                    {r.category}
                  </span>
                  <h3 className="font-bold text-[#1a2e4a] text-sm leading-snug group-hover:text-[#2d5fa6] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              No resources found for this category.
            </div>
          )}
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
                {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Contact', href: '/contact' }].map((link) => (
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
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> Civil Lines, District HQ – 110001</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" /> Helpline: 1800-XXX-XXXX</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" /> info@dcc.gov.in</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 flex-shrink-0" /> Mon–Fri: 9 AM – 5 PM</li>
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
