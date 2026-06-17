'use client';

import Link from 'next/link';
import { useState } from 'react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import BookAppointmentModal from '@/components/shared/BookAppointmentModal';
import { Building2, MapPin, Phone, Mail, Clock, Languages, CalendarDays, Search, UserRound } from 'lucide-react';

type Counsellor = {
  id: number;
  name: string;
  qualification: string;
  experience: number;
  specializations: string[];
  rating: number;
  reviews: number;
  languages: string[];
  availability: string;
  bio: string;
};

const counsellors: Counsellor[] = [
  { id: 1, name: 'Dr. Aamir Wani', qualification: 'Ph.D. Psychology', experience: 15, specializations: ['Career Counselling', 'Mental Wellness', 'Anxiety'], rating: 5, reviews: 128, languages: ['Kashmiri', 'Urdu', 'English'], availability: 'Mon–Fri', bio: 'Dr. Aamir Wani is a senior psychologist with 15 years of experience in career counselling and mental wellness. He has guided over 2,000 students across Srinagar in making informed career decisions.' },
  { id: 2, name: 'Mr. Tariq Ahmed Lone', qualification: 'M.A. Counselling Psychology', experience: 10, specializations: ['Youth Guidance', 'Family Counselling', 'Peer Pressure'], rating: 5, reviews: 94, languages: ['Kashmiri', 'Urdu', 'English'], availability: 'Mon–Sat', bio: 'Mr. Tariq Ahmed Lone specializes in youth development and family counselling. His community-based approach has helped hundreds of families in Baramulla strengthen their bonds.' },
  { id: 3, name: 'Dr. Nighat Bhat', qualification: 'Ph.D. Educational Psychology', experience: 18, specializations: ['Educational Guidance', 'Learning Disabilities', 'Academic Stress'], rating: 5, reviews: 156, languages: ['Kashmiri', 'Urdu', 'English'], availability: 'Mon–Fri', bio: 'Dr. Nighat Bhat is an expert in educational psychology with 18 years of experience. She has helped thousands of students in Anantnag overcome academic challenges and achieve their educational goals.' },
  { id: 4, name: 'Ms. Iqra Mir', qualification: 'M.Sc. Clinical Psychology', experience: 8, specializations: ['Personal Counselling', 'Grief Counselling', 'Self-Esteem'], rating: 4, reviews: 72, languages: ['Kashmiri', 'Urdu', 'English'], availability: 'Tue–Sat', bio: 'Ms. Iqra Mir is a compassionate counsellor specializing in personal development and grief counselling. She creates a safe, non-judgmental space for her clients in Budgam.' },
  { id: 5, name: 'Dr. Mudasir Khan', qualification: 'Ph.D. Counselling', experience: 20, specializations: ['Career Counselling', 'Skill Development', 'Entrepreneurship'], rating: 5, reviews: 203, languages: ['Kashmiri', 'Urdu', 'English'], availability: 'Mon–Fri', bio: 'Dr. Mudasir Khan is the Head of Career Guidance with 20 years of experience. He has helped over 5,000 youth in Pulwama find their career path and develop entrepreneurial skills.' },
  { id: 6, name: 'Ms. Sana Malik', qualification: 'M.A. Psychology, B.Ed.', experience: 12, specializations: ['Educational Guidance', 'Career Counselling', 'Study Skills'], rating: 4, reviews: 88, languages: ['Kashmiri', 'Urdu', 'English'], availability: 'Mon–Sat', bio: 'Ms. Sana Malik combines her psychology and education background to provide holistic guidance to students. She is known for her practical and student-friendly approach in Kupwara.' },
  { id: 7, name: 'Dr. Imran Dar', qualification: 'Ph.D. Clinical Psychology', experience: 14, specializations: ['Mental Wellness', 'Trauma Counselling', 'Stress Management'], rating: 5, reviews: 117, languages: ['Dogri', 'Hindi', 'Urdu', 'English'], availability: 'Mon–Fri', bio: 'Dr. Imran Dar is a clinical psychologist specializing in trauma-informed care and stress management. He uses evidence-based CBT and mindfulness techniques with clients across Jammu.' },
  { id: 8, name: 'Ms. Farida Sheikh', qualification: 'M.Sc. Psychology, RCI Certified', experience: 9, specializations: ['Family Counselling', 'Personal Counselling', 'Women Empowerment'], rating: 4, reviews: 65, languages: ['Dogri', 'Hindi', 'English'], availability: 'Mon–Sat', bio: 'Ms. Farida Sheikh is an RCI-certified counsellor with a focus on family therapy and women empowerment. She runs special programs for women and girls in Kathua district.' },
];

const allSpecializations = Array.from(new Set(counsellors.flatMap((c) => c.specializations))).sort();

export default function CounsellorsPage() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [bookingOpen, setBookingOpen] = useState(false);

  const filtered = counsellors.filter((c) => {
    const matchesSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase())) || c.qualification.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || c.specializations.includes(selectedSpec);
    const matchesRating = selectedRating === 'All' || c.rating >= parseInt(selectedRating, 10);
    return matchesSearch && matchesSpec && matchesRating;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <BookAppointmentModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <SiteNavbar onBookClick={() => setBookingOpen(true)} />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/con3.webp"
          alt="Our Counsellors"
          className="w-full h-80 object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Counsellors</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Our Expert <em className="italic">Counsellors</em></h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Certified, compassionate professionals here to guide you — free, confidential, and available in your language.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER BAR */}
      <section className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search by name, specialization, or qualification..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white text-gray-700"
              >
                <option value="All">All Specializations</option>
                {allSpecializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div className="md:w-48">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white text-gray-700"
              >
                <option value="All">All Ratings</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4 Stars &amp; Above</option>
                <option value="3">3 Stars &amp; Above</option>
              </select>
            </div>
            {(search !== '' || selectedSpec !== 'All' || selectedRating !== 'All') && (
              <button
                onClick={() => { setSearch(''); setSelectedSpec('All'); setSelectedRating('All'); }}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Showing <span className="font-semibold text-[#1a3a6b]">{filtered.length}</span> of {counsellors.length} counsellors
          </div>
        </div>
      </section>

      {/* COUNSELLORS GRID */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a6b] mb-2">No counsellors found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => { setSearch(''); setSelectedSpec('All'); setSelectedRating('All'); }}
                className="bg-[#1a3a6b] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((counsellor) => (
                <div key={counsellor.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 flex flex-col">
                  <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] p-3 text-center relative">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(counsellor.name)}&background=1a3a6b&color=fff&size=128`}
                      alt={counsellor.name}
                      className="w-16 h-16 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-400 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      Available
                    </div>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <div className="text-center mb-2">
                      <h3 className="font-bold text-[#1a3a6b] text-base leading-tight">{counsellor.name}</h3>
                      <p className="text-[#2563eb] text-sm font-medium mt-0.5">{counsellor.qualification}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{counsellor.experience} Years Experience</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < counsellor.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({counsellor.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-2">
                      {counsellor.specializations.map((spec) => (
                        <span key={spec} className="bg-blue-50 text-[#1a3a6b] text-xs px-2.5 py-1 rounded-full border border-blue-100 font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-2"><Languages className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" /><span>{counsellor.languages.join(', ')}</span></div>
                      <div className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" /><span>{counsellor.availability}</span></div>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 md:h-[52px] md:overflow-y-auto pr-1 scrollbar-thin">{counsellor.bio}</p>
                    <div className="mt-auto">
                      <button onClick={() => setBookingOpen(true)} className="w-full text-center bg-[#1a3a6b] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#2563eb] transition-colors">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* JOIN AS COUNSELLOR CTA */}
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
              <p className="text-blue-200 text-sm leading-relaxed">Providing professional counselling and guidance services to empower the youth and families of our district.</p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Quick Links</h4>
              <ul className="space-y-2">
                {[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Contact', href: '/contact' }].map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {['Career Counselling', 'Educational Guidance', 'Mental Wellness', 'Youth Guidance', 'Skill Development', 'Family Counselling', 'Personal Counselling'].map((service) => (
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
