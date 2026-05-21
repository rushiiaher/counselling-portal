import Link from 'next/link';
import HeroCarousel from '@/components/home/HeroCarousel';

export default function HomePage() {
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
              <Link href="/" className="text-blue-200 border-b-2 border-blue-300 text-sm font-medium">Home</Link>
              <Link href="/about" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">About</Link>
              <Link href="/services" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Services</Link>
              <Link href="/counselors" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Counsellors</Link>
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

      {/* CAROUSEL SECTION */}
      <HeroCarousel />

      {/* STATISTICS SECTION */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '150+', label: 'Certified Counsellors', icon: '👨‍⚕️', color: 'from-blue-50 to-white' },
              { number: '25,000+', label: 'Students Guided', icon: '🎓', color: 'from-green-50 to-white' },
              { number: '50,000+', label: 'Sessions Conducted', icon: '💬', color: 'from-purple-50 to-white' },
              { number: '500+', label: 'Workshops Completed', icon: '🏆', color: 'from-orange-50 to-white' },
            ].map((stat) => (
              <div key={stat.label} className={`text-center p-6 rounded-xl bg-gradient-to-br ${stat.color} border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#1a3a6b] mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Our Counselling Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive guidance and counselling services tailored to meet the diverse needs of students, youth, and families in our district.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Career Counselling', desc: 'Expert guidance on career paths, aptitude assessment, and professional development to help you make informed career decisions.' },
              { icon: '📚', title: 'Educational Guidance', desc: 'Support for academic challenges, course selection, scholarship information, and higher education planning.' },
              { icon: '🧠', title: 'Mental Wellness', desc: 'Confidential mental health support, stress management, anxiety counselling, and emotional well-being programs.' },
              { icon: '🌱', title: 'Youth Guidance', desc: 'Specialized programs for youth development, leadership skills, and navigating life transitions effectively.' },
              { icon: '💼', title: 'Skill Development', desc: 'Vocational training guidance, skill assessment, and development programs aligned with industry requirements.' },
              { icon: '👨‍👩‍👧', title: 'Family Counselling', desc: 'Strengthening family bonds through communication workshops, conflict resolution, and family therapy sessions.' },
              { icon: '🤝', title: 'Personal Counselling', desc: 'One-on-one sessions addressing personal challenges, self-esteem, relationship issues, and life goals.' },
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200 group">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-[#1a3a6b] font-bold text-lg mb-3 group-hover:text-[#2563eb] transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                <Link href="/services" className="text-[#2563eb] text-sm font-semibold hover:underline">Learn More →</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-block bg-[#1a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-6">Dedicated to Empowering Every Individual</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                The District Counselling Center is a government-established institution committed to providing accessible, professional, and confidential counselling services. We serve students, youth, and families across the district with a team of certified and experienced counsellors.
              </p>
              <div className="space-y-4">
                {[
                  { title: '🎯 Our Mission', desc: 'To provide accessible, professional counselling services that empower individuals to overcome challenges and achieve their full potential.' },
                  { title: '🔭 Our Vision', desc: 'A district where every individual has access to quality mental health and guidance services, fostering a resilient and empowered community.' },
                  { title: '📋 Our Objectives', desc: 'Deliver evidence-based counselling, promote mental health awareness, build counsellor capacity, and ensure equitable access to all.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-[#2563eb]">
                    <div>
                      <h4 className="font-bold text-[#1a3a6b] mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/about" className="inline-block bg-[#1a3a6b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors">
                  Learn More About Us →
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  'Government-certified and accredited counsellors',
                  'Free services for all district residents',
                  'Completely confidential and safe environment',
                  'Available in multiple regional languages',
                  'Online and offline session options',
                  'Specialized programs for different age groups',
                  'Evidence-based counselling approaches',
                  'Follow-up support and progress tracking',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <span className="text-green-300 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-blue-100">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COUNSELLORS SECTION */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Meet Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Our Expert Counsellors</h2>
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
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
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
            <Link href="/counselors" className="inline-block bg-[#1a3a6b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors">
              View All Counsellors →
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Upcoming Events &amp; Workshops</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Join our upcoming events, workshops, and awareness programs designed to support your growth and well-being.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { day: '25', month: 'JAN', title: 'Career Guidance Workshop for Class 12 Students', location: 'District Community Hall, Main Road', time: '10:00 AM – 1:00 PM', type: 'Workshop', color: 'bg-blue-100 text-blue-800' },
              { day: '05', month: 'FEB', title: 'Mental Health Awareness Seminar', location: 'Government College Auditorium', time: '2:00 PM – 5:00 PM', type: 'Seminar', color: 'bg-green-100 text-green-800' },
              { day: '15', month: 'FEB', title: 'Youth Leadership Development Program', location: 'District Counselling Center, Block A', time: '9:00 AM – 4:00 PM', type: 'Program', color: 'bg-purple-100 text-purple-800' },
            ].map((event) => (
              <div key={event.title} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden">
                <div className="bg-[#1a3a6b] p-4 flex items-center gap-4">
                  <div className="text-center bg-white rounded-lg p-3 min-w-[60px]">
                    <div className="text-[#1a3a6b] font-bold text-2xl leading-none">{event.day}</div>
                    <div className="text-[#2563eb] text-xs font-bold">{event.month}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${event.color}`}>{event.type}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1a3a6b] text-base mb-3 leading-snug">{event.title}</h3>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <p>📍 {event.location}</p>
                    <p>🕐 {event.time}</p>
                  </div>
                  <button className="mt-4 w-full bg-blue-50 text-[#2563eb] py-2 rounded-lg text-sm font-semibold hover:bg-[#2563eb] hover:text-white transition-colors border border-blue-200">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">What Our Beneficiaries Say</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">Real stories from students and families whose lives have been positively impacted by our counselling services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Amit Sharma', role: 'Class 12 Student', text: 'The career counselling session helped me identify my strengths and choose the right stream. I am now pursuing engineering with full confidence. Thank you, District Counselling Center!', rating: 5 },
              { name: 'Meena Devi', role: 'Parent', text: 'My son was struggling with anxiety and poor academic performance. After just 3 sessions with Dr. Priya, we saw a remarkable improvement. The counsellors are truly dedicated and compassionate.', rating: 5 },
              { name: 'Rahul Gupta', role: 'College Student', text: 'I was confused about my career after graduation. The vocational guidance and skill assessment helped me find my true calling. I am now successfully placed in a reputed company.', rating: 5 },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-blue-100 text-sm leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=ffffff&color=1a3a6b&size=48`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-white border-opacity-50"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-blue-200 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We are here to help. Reach out to us through any of the following channels.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📍', title: 'Address', lines: ['District Counselling Center', 'Civil Lines, Near Collectorate', 'District Headquarters – 110001'] },
              { icon: '📞', title: 'Phone', lines: ['Helpline: 1800-XXX-XXXX', 'Office: +91-XXXXX-XXXXX', 'WhatsApp: +91-XXXXX-XXXXX'] },
              { icon: '📧', title: 'Email', lines: ['info@dcc.gov.in', 'appointments@dcc.gov.in', 'grievance@dcc.gov.in'] },
              { icon: '🕐', title: 'Office Timings', lines: ['Mon – Fri: 9:00 AM – 5:00 PM', 'Saturday: 9:00 AM – 1:00 PM', 'Sunday & Holidays: Closed'] },
            ].map((contact) => (
              <div key={contact.title} className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="font-bold text-[#1a3a6b] text-lg mb-3">{contact.title}</h3>
                {contact.lines.map((line) => (
                  <p key={line} className="text-gray-600 text-sm mb-1">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a3a6b] text-white">
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
              <p className="text-blue-200 text-sm leading-relaxed">
                Providing professional counselling and guidance services to empower the youth and families of our district.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Services', href: '/services' },
                  { label: 'Counsellors', href: '/counselors' },
                  { label: 'Events', href: '/events' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">→ {link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {['Career Counselling', 'Educational Guidance', 'Mental Wellness', 'Youth Guidance', 'Skill Development', 'Family Counselling', 'Personal Counselling'].map((service) => (
                  <li key={service}>
                    <Link href="/services" className="text-blue-300 hover:text-white text-sm transition-colors">→ {service}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Important Links</h4>
              <ul className="space-y-2">
                {['Ministry of Education', 'NCERT', 'UGC', 'AICTE', 'National Career Service', 'Skill India', 'Digital India'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors">→ {link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-blue-300 text-sm text-center md:text-left">
              © 2025 District Counselling Center, Government of India. All Rights Reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
