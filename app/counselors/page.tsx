'use client';

import Link from 'next/link';
import { useState } from 'react';

type Counsellor = {
  id: number;
  name: string;
  qualification: string;
  experience: number;
  specializations: string[];
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  availability: string;
  bio: string;
};

const counsellors: Counsellor[] = [
  { id: 1, name: 'Dr. Priya Sharma', qualification: 'Ph.D. Psychology', experience: 15, specializations: ['Career Counselling', 'Mental Wellness', 'Anxiety'], rating: 5, reviews: 128, location: 'District HQ Center', languages: ['Hindi', 'English'], availability: 'Mon–Fri', bio: 'Dr. Priya Sharma is a senior psychologist with 15 years of experience in career counselling and mental wellness. She has guided over 2,000 students in making informed career decisions.' },
  { id: 2, name: 'Mr. Rajesh Kumar', qualification: 'M.A. Counselling Psychology', experience: 10, specializations: ['Youth Guidance', 'Family Counselling', 'Peer Pressure'], rating: 5, reviews: 94, location: 'Block A Center', languages: ['Hindi', 'English', 'Bhojpuri'], availability: 'Mon–Sat', bio: 'Mr. Rajesh Kumar specializes in youth development and family counselling. His community-based approach has helped hundreds of families strengthen their bonds.' },
  { id: 3, name: 'Dr. Anita Verma', qualification: 'Ph.D. Educational Psychology', experience: 18, specializations: ['Educational Guidance', 'Learning Disabilities', 'Academic Stress'], rating: 5, reviews: 156, location: 'District HQ Center', languages: ['Hindi', 'English', 'Urdu'], availability: 'Mon–Fri', bio: 'Dr. Anita Verma is an expert in educational psychology with 18 years of experience. She has helped thousands of students overcome academic challenges and achieve their educational goals.' },
  { id: 4, name: 'Ms. Sunita Patel', qualification: 'M.Sc. Clinical Psychology', experience: 8, specializations: ['Personal Counselling', 'Grief Counselling', 'Self-Esteem'], rating: 4, reviews: 72, location: 'Block B Center', languages: ['Hindi', 'Gujarati', 'English'], availability: 'Tue–Sat', bio: 'Ms. Sunita Patel is a compassionate counsellor specializing in personal development and grief counselling. She creates a safe, non-judgmental space for her clients.' },
  { id: 5, name: 'Dr. Arun Mishra', qualification: 'Ph.D. Counselling', experience: 20, specializations: ['Career Counselling', 'Skill Development', 'Entrepreneurship'], rating: 5, reviews: 203, location: 'District HQ Center', languages: ['Hindi', 'English'], availability: 'Mon–Fri', bio: 'Dr. Arun Mishra is the Head of Career Guidance with 20 years of experience. He has helped over 5,000 youth find their career path and develop entrepreneurial skills.' },
  { id: 6, name: 'Ms. Kavita Singh', qualification: 'M.A. Psychology, B.Ed.', experience: 12, specializations: ['Educational Guidance', 'Career Counselling', 'Study Skills'], rating: 4, reviews: 88, location: 'Block C Center', languages: ['Hindi', 'English', 'Maithili'], availability: 'Mon–Sat', bio: 'Ms. Kavita Singh combines her psychology and education background to provide holistic guidance to students. She is known for her practical and student-friendly approach.' },
  { id: 7, name: 'Dr. Suresh Yadav', qualification: 'Ph.D. Clinical Psychology', experience: 14, specializations: ['Mental Wellness', 'Trauma Counselling', 'Stress Management'], rating: 5, reviews: 117, location: 'District HQ Center', languages: ['Hindi', 'English'], availability: 'Mon–Fri', bio: 'Dr. Suresh Yadav is a clinical psychologist specializing in trauma-informed care and stress management. He uses evidence-based CBT and mindfulness techniques.' },
  { id: 8, name: 'Ms. Rekha Gupta', qualification: 'M.Sc. Psychology, RCI Certified', experience: 9, specializations: ['Family Counselling', 'Personal Counselling', 'Women Empowerment'], rating: 4, reviews: 65, location: 'Block D Center', languages: ['Hindi', 'English', 'Punjabi'], availability: 'Mon–Sat', bio: 'Ms. Rekha Gupta is an RCI-certified counsellor with a focus on family therapy and women empowerment. She runs special programs for women and girls in the district.' },
];

const allSpecializations = Array.from(new Set(counsellors.flatMap((c) => c.specializations))).sort();

function StarRating({ rating, total = 5 }: { rating: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
      ))}
    </div>
  );
}

export default function CounsellorsPage() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');

  const filtered = counsellors.filter((c) => {
    const matchesSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase())) || c.qualification.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || c.specializations.includes(selectedSpec);
    const matchesRating = selectedRating === 'All' || c.rating >= parseInt(selectedRating, 10);
    return matchesSearch && matchesSpec && matchesRating;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#1a3a6b] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#1a3a6b] font-bold text-lg">🏛</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">District Counselling Center</p>
                <p className="text-blue-200 text-xs">Govt. of India</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Home</Link>
              <Link href="/about" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">About</Link>
              <Link href="/services" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Services</Link>
              <Link href="/counselors" className="text-blue-200 border-b-2 border-blue-300 text-sm font-medium">Counsellors</Link>
              <Link href="/events" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Events</Link>
              <Link href="/contact" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-white border border-white px-4 py-1.5 rounded text-sm hover:bg-white hover:text-[#1a3a6b] transition-colors font-medium">Login</Link>
              <Link href="/signup" className="bg-white text-[#1a3a6b] px-4 py-1.5 rounded text-sm hover:bg-blue-100 transition-colors font-medium">Register</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-[#1a3a6b] via-[#1e4d8c] to-[#2563eb] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Counsellors</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Expert Counsellors</h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Meet our team of certified, experienced, and compassionate counsellors. All our counsellors are registered with the Rehabilitation Council of India (RCI) and follow strict ethical guidelines.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {[{ icon: '🏅', label: 'RCI Certified' }, { icon: '🔒', label: 'Confidential Sessions' }, { icon: '🌐', label: 'Online & Offline' }, { icon: '🆓', label: 'Free Services' }].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 bg-white bg-opacity-20 text-white text-sm px-4 py-2 rounded-full border border-white border-opacity-30">
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER BAR */}
      <section className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
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
              <div className="text-6xl mb-4">🔍</div>
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
                  <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] p-6 text-center relative">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(counsellor.name)}&background=1a3a6b&color=fff&size=128`}
                      alt={counsellor.name}
                      className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <div className="absolute top-3 right-3 bg-green-400 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      Available
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-center mb-4">
                      <h3 className="font-bold text-[#1a3a6b] text-lg leading-tight">{counsellor.name}</h3>
                      <p className="text-[#2563eb] text-sm font-medium mt-0.5">{counsellor.qualification}</p>
                      <p className="text-gray-500 text-xs mt-1">{counsellor.experience} Years Experience</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <StarRating rating={counsellor.rating} />
                      <span className="text-xs text-gray-500">({counsellor.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                      {counsellor.specializations.map((spec) => (
                        <span key={spec} className="bg-blue-50 text-[#1a3a6b] text-xs px-2.5 py-1 rounded-full border border-blue-100 font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-2"><span>📍</span><span>{counsellor.location}</span></div>
                      <div className="flex items-center gap-2"><span>🗣</span><span>{counsellor.languages.join(', ')}</span></div>
                      <div className="flex items-center gap-2"><span>📅</span><span>{counsellor.availability}</span></div>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-5 line-clamp-3 flex-1">{counsellor.bio}</p>
                    <div className="flex gap-2 mt-auto">
                      <Link href={`/counselors/${counsellor.id}`} className="flex-1 text-center border border-[#1a3a6b] text-[#1a3a6b] py-2 rounded-lg text-xs font-semibold hover:bg-[#1a3a6b] hover:text-white transition-colors">
                        View Profile
                      </Link>
                      <Link href="/student/counsellors" className="flex-1 text-center bg-[#1a3a6b] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#2563eb] transition-colors">
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* JOIN AS COUNSELLOR CTA */}
      <section className="bg-white py-16 px-4 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 border border-blue-100">
            <div className="text-5xl mb-4">👩‍⚕️</div>
            <h2 className="text-2xl font-bold text-[#1a3a6b] mb-3">Are You a Qualified Counsellor?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our growing network of certified counsellors and make a difference in the lives of students and families across the district. We welcome RCI-registered and qualified counselling professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-[#1a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors">
                Apply to Join Our Team
              </Link>
              <Link href="/about" className="border border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Learn More About Us
              </Link>
            </div>
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
                  <span className="text-[#1a3a6b] font-bold">🏛</span>
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
                {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Contact', href: '/contact' }].map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">→ {link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {['Career Counselling', 'Educational Guidance', 'Mental Wellness', 'Youth Guidance', 'Skill Development', 'Family Counselling', 'Personal Counselling'].map((service) => (
                  <li key={service}><Link href="/services" className="text-blue-300 hover:text-white text-sm transition-colors">→ {service}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Contact</h4>
              <ul className="space-y-2 text-blue-300 text-sm">
                <li>📍 Civil Lines, District HQ – 110001</li>
                <li>📞 Helpline: 1800-XXX-XXXX</li>
                <li>📧 info@dcc.gov.in</li>
                <li>🕐 Mon–Fri: 9 AM – 5 PM</li>
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
