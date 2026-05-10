import Link from 'next/link';

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
    speaker: 'Dr. Priya Sharma, Career Counsellor',
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
    speaker: 'Dr. Anita Verma, Clinical Psychologist',
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
    speaker: 'Mr. Rajesh Kumar, Youth Development Expert',
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
    speaker: 'Ms. Sunita Patel, Family Counsellor',
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
    speaker: 'Dr. Kavita Singh, Mindfulness Practitioner',
  },
];

const pastEvents = [
  { title: 'National Youth Day Counselling Camp', date: 'January 12, 2026', participants: '450+', type: 'Camp' },
  { title: 'Career Fair 2025 – Connecting Youth with Opportunities', date: 'December 15, 2025', participants: '800+', type: 'Fair' },
  { title: 'World Mental Health Day Awareness Drive', date: 'October 10, 2025', participants: '1,200+', type: 'Drive' },
  { title: 'Back to School Counselling Program', date: 'July 5, 2025', participants: '600+', type: 'Program' },
];

export default function EventsPage() {
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
              <Link href="/counselors" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Counsellors</Link>
              <Link href="/events" className="text-blue-200 border-b-2 border-blue-300 text-sm font-medium">Events</Link>
              <Link href="/resources" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Resources</Link>
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
            <span className="text-white">Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events &amp; Workshops</h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Stay connected with our upcoming workshops, seminars, awareness programs, and community events. All events are free and open to district residents.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {['Workshop', 'Seminar', 'Program', 'Camp', 'Fair'].map((tag) => (
              <span key={tag} className="bg-white bg-opacity-20 text-white text-xs px-3 py-1.5 rounded-full border border-white border-opacity-30">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '📅', label: '6 Upcoming Events' },
              { icon: '🆓', label: 'All Events Free' },
              { icon: '📍', label: 'Multiple Venues' },
              { icon: '🎟️', label: 'Registration Required' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Don&apos;t Miss Out</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Upcoming Events</h2>
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
                    <p className="text-blue-200 text-xs mt-1">🕐 {event.time}</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-[#1a3a6b] text-base mb-2 leading-snug">{event.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{event.desc}</p>
                  <div className="space-y-1.5 text-sm text-gray-500 mb-4">
                    <p>📍 {event.location}</p>
                    <p>🎤 {event.speaker}</p>
                    <p>🎟️ {event.seats}</p>
                  </div>
                  <button className="w-full bg-[#1a3a6b] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors">
                    Register Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Our Track Record</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Past Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A glimpse of the impactful events we have organized to serve our community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastEvents.map((event) => (
              <div key={event.title} className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📋
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

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Organize an Event?</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Schools, colleges, and community organizations can request a counselling workshop or awareness program at their premises. Contact us to schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#1a3a6b] px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              📞 Contact Us
            </Link>
            <Link href="/book-appointment" className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-[#1a3a6b] transition-colors">
              Book Appointment →
            </Link>
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
              <p className="text-blue-200 text-sm leading-relaxed">
                Providing professional counselling and guidance services to empower the youth and families of our district.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Quick Links</h4>
              <ul className="space-y-2">
                {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Events', href: '/events' }, { label: 'Resources', href: '/resources' }, { label: 'Contact', href: '/contact' }].map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">→ {link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {['Career Counselling', 'Educational Guidance', 'Mental Wellness', 'Youth Guidance', 'Skill Development', 'Family Counselling'].map((service) => (
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
