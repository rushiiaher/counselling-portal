'use client';

import Link from 'next/link';
import { useState } from 'react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import BookAppointmentButton from '@/components/shared/BookAppointmentButton';
import EventRegistrationModal from '@/components/shared/EventRegistrationModal';
import { ChevronRight, ArrowRight, Building2, MapPin, Phone, Mail, Clock } from 'lucide-react';

const events = [
  {
    day: '25', month: 'JAN', year: '2026',
    title: 'Career Guidance Workshop for Class 12 Students',
    location: 'District Community Hall, Main Road',
    time: '10:00 AM – 1:00 PM',
    type: 'Workshop',
    typeColor: 'bg-blue-100 text-blue-800',
    desc: 'A comprehensive workshop helping Class 12 students explore career options, understand entrance exams, and plan their higher education journey with expert counsellors.',
    seats: '150 seats available',
    speaker: 'Dr. Aamir Wani, Career Counsellor',
  },
  {
    day: '05', month: 'FEB', year: '2026',
    title: 'Mental Health Awareness Seminar',
    location: 'Government College Auditorium',
    time: '2:00 PM – 5:00 PM',
    type: 'Seminar',
    typeColor: 'bg-green-100 text-green-800',
    desc: 'An awareness seminar focused on recognizing signs of mental health challenges, reducing stigma, and promoting help-seeking behavior among students and youth.',
    seats: '300 seats available',
    speaker: 'Dr. Nighat Bhat, Clinical Psychologist',
  },
  {
    day: '15', month: 'FEB', year: '2026',
    title: 'Youth Leadership Development Program',
    location: 'District Counselling Center, Block A',
    time: '9:00 AM – 4:00 PM',
    type: 'Program',
    typeColor: 'bg-purple-100 text-purple-800',
    desc: 'A full-day immersive program designed to build leadership skills, communication abilities, and decision-making capabilities in youth aged 16–25.',
    seats: '60 seats available',
    speaker: 'Mr. Tariq Ahmed Lone, Youth Development Expert',
  },
  {
    day: '22', month: 'FEB', year: '2026',
    title: 'Parenting in the Digital Age – Workshop for Parents',
    location: 'Town Hall, Sector 5',
    time: '11:00 AM – 2:00 PM',
    type: 'Workshop',
    typeColor: 'bg-blue-100 text-blue-800',
    desc: 'A practical workshop helping parents understand digital safety, screen time management, and how to support their children\'s mental health in the digital era.',
    seats: '100 seats available',
    speaker: 'Ms. Iqra Mir, Family Counsellor',
  },
  {
    day: '10', month: 'MAR', year: '2026',
    title: 'Skill India Vocational Guidance Camp',
    location: 'ITI Campus, Industrial Area',
    time: '9:00 AM – 3:00 PM',
    type: 'Camp',
    typeColor: 'bg-orange-100 text-orange-800',
    desc: 'A vocational guidance camp connecting youth with Skill India schemes, ITI courses, and PMKVY enrollment. Includes aptitude testing and one-on-one counselling.',
    seats: '200 seats available',
    speaker: 'Multiple Skill Development Experts',
  },
  {
    day: '20', month: 'MAR', year: '2026',
    title: 'Stress Management & Mindfulness Workshop',
    location: 'District Counselling Center, Seminar Hall',
    time: '3:00 PM – 6:00 PM',
    type: 'Workshop',
    typeColor: 'bg-blue-100 text-blue-800',
    desc: 'Learn practical mindfulness techniques, breathing exercises, and stress management strategies to improve mental well-being and academic/work performance.',
    seats: '80 seats available',
    speaker: 'Ms. Sana Malik, Mindfulness Practitioner',
  },
];

const pastEvents = [
  { title: 'National Youth Day Counselling Camp', date: 'January 12, 2026', participants: '450+', type: 'Camp' },
  { title: 'Career Fair 2025 – Connecting Youth with Opportunities', date: 'December 15, 2025', participants: '800+', type: 'Fair' },
  { title: 'World Mental Health Day Awareness Drive', date: 'October 10, 2025', participants: '1,200+', type: 'Drive' },
  { title: 'Back to School Counselling Program', date: 'July 5, 2025', participants: '600+', type: 'Program' },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteNavbar />
      <EventRegistrationModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventTitle={selectedEvent?.title}
        eventDate={`${selectedEvent?.day} ${selectedEvent?.month} ${selectedEvent?.year}`}
        eventLocation={selectedEvent?.location}
      />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/events.jpg"
          alt="Events & Workshops"
          className="w-full h-80 object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Events</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Events &amp; <em className="italic">Workshops</em></h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Free workshops, seminars, and community programs — open to all district residents.
            </p>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-gradient-to-r from-[#1a3a6b] to-[#0a1628] py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                value: '6',
                label: 'Upcoming Events',
                iconBg: 'bg-blue-500/20',
                iconColor: 'text-blue-300',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
              },
              {
                value: '100%',
                label: 'All Events Free',
                iconBg: 'bg-emerald-500/20',
                iconColor: 'text-emerald-300',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
              },
              {
                value: '10+',
                label: 'Venues Across District',
                iconBg: 'bg-rose-500/20',
                iconColor: 'text-rose-300',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
              },
              {
                value: 'Free',
                label: 'Registration Required',
                iconBg: 'bg-amber-500/20',
                iconColor: 'text-amber-300',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" /></svg>,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/10">
                <div className={`${item.iconBg} ${item.iconColor} p-2 rounded-lg shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-none">{item.value}</p>
                  <p className="text-white/60 text-xs mt-1 leading-tight">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="bg-gray-50 pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Don&apos;t Miss Out</span>
            <div className="text-center">
              <h2 className="inline-block bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-3 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Upcoming <em className="italic">Events</em></h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">Register early to secure your spot. All events are conducted by certified professionals and are completely free of charge.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.title} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden flex flex-col">
                <div className="bg-[#1a3a6b] p-4 flex items-center gap-4">
                  <div className="text-center bg-white rounded-lg p-3 min-w-[64px]">
                    <div className="text-[#1a3a6b] font-bold text-2xl leading-none">{event.day}</div>
                    <div className="text-[#2563eb] text-xs font-bold">{event.month}</div>
                    <div className="text-gray-400 text-xs">{event.year}</div>
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${event.typeColor}`}>{event.type}</span>
                    <div className="flex items-center gap-1.5 text-blue-200 text-xs mt-1">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {event.time}
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-[#1a3a6b] text-base mb-2 leading-snug">{event.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{event.desc}</p>
                  <div className="space-y-1.5 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                      <span>{event.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                      <span>{event.seats}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full bg-[#1a3a6b] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors"
                  >
                    Register Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 bg-[#c07a2a]" />

      {/* PAST EVENTS */}
      <section className="bg-[#f7f8fa] pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Our Track Record</span>
            <div className="text-center">
              <h2 className="inline-block bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-3 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Past <em className="italic">Events</em></h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">A glimpse of the impactful events we have organized to serve our community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastEvents.map((event) => (
              <div key={event.title} className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#1a2e4a]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1a3a6b] text-sm mb-1">{event.title}</h3>
                  <p className="text-gray-500 text-xs">{event.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[#2563eb] font-bold text-sm">{event.participants}</div>
                  <div className="text-gray-400 text-xs">Participants</div>
                </div>
              </div>
            ))}
          </div>
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
                {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Events', href: '/events' }, { label: 'Contact', href: '/contact' }].map((link) => (
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
