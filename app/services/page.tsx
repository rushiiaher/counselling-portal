import Link from 'next/link';

const services = [
  {
    icon: '🎯',
    title: 'Career Counselling',
    shortDesc: 'Expert guidance on career paths, aptitude assessment, and professional development.',
    fullDesc: 'Our Career Counselling service provides comprehensive support to students and young professionals in making informed career decisions. Through scientifically validated aptitude tests, interest inventories, and one-on-one counselling sessions, our certified career counsellors help you identify your strengths, explore career options, and create a clear roadmap for your professional journey.',
    benefits: ['Scientifically validated aptitude and interest assessments', 'One-on-one career counselling sessions', 'Information on over 500+ career options', 'Guidance on entrance exams and competitive tests', 'Resume building and interview preparation', 'Scholarship and financial aid information', 'Industry exposure and internship guidance'],
    audience: 'Students (Class 8–12), College Students, Working Professionals',
    duration: '60–90 minutes per session',
    sessions: '3–5 sessions recommended',
  },
  {
    icon: '📚',
    title: 'Educational Guidance',
    shortDesc: 'Support for academic challenges, course selection, and higher education planning.',
    fullDesc: 'Educational Guidance services are designed to help students navigate the complex landscape of academic choices and challenges. From selecting the right subjects in school to choosing the best college and course for higher education, our educational counsellors provide evidence-based guidance tailored to each student\'s unique profile, aspirations, and circumstances.',
    benefits: ['Subject and stream selection guidance (Class 9–12)', 'College and university selection support', 'Entrance exam preparation strategies', 'Study skills and time management coaching', 'Learning disability assessment and support', 'Scholarship and fellowship information', 'Abroad education guidance and visa support'],
    audience: 'School Students (Class 6–12), College Students, Parents',
    duration: '45–60 minutes per session',
    sessions: '2–4 sessions recommended',
  },
  {
    icon: '🧠',
    title: 'Mental Wellness Counselling',
    shortDesc: 'Confidential mental health support, stress management, and emotional well-being programs.',
    fullDesc: 'Our Mental Wellness program offers a safe, confidential, and non-judgmental space for individuals to address mental health challenges. Our licensed clinical psychologists and counsellors use evidence-based therapeutic approaches including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Stress Reduction (MBSR), and Solution-Focused Brief Therapy (SFBT) to help you achieve emotional balance and mental well-being.',
    benefits: ['Confidential individual therapy sessions', 'Anxiety and depression management', 'Stress and burnout counselling', 'Trauma-informed care and PTSD support', 'Mindfulness and relaxation techniques', 'Group therapy and support groups', 'Crisis intervention and emergency support'],
    audience: 'All Age Groups (10 years and above)',
    duration: '50–60 minutes per session',
    sessions: 'Ongoing as per clinical assessment',
  },
  {
    icon: '🌱',
    title: 'Youth Guidance',
    shortDesc: 'Specialized programs for youth development, leadership skills, and life transitions.',
    fullDesc: 'The Youth Guidance program is specifically designed for young people aged 13–25 who are navigating the challenges of adolescence and early adulthood. Our youth counsellors provide a supportive environment to address issues related to identity, peer pressure, relationships, substance abuse prevention, and life skills development.',
    benefits: ['Adolescent development and identity counselling', 'Peer pressure and bullying intervention', 'Substance abuse prevention programs', 'Life skills and decision-making workshops', 'Leadership development programs', 'Positive youth development activities', 'Online safety and digital wellness guidance'],
    audience: 'Youth aged 13–25 years',
    duration: '45–60 minutes per session',
    sessions: '4–6 sessions recommended',
  },
  {
    icon: '💼',
    title: 'Skill Development',
    shortDesc: 'Vocational training guidance, skill assessment, and development programs.',
    fullDesc: 'Our Skill Development Counselling service bridges the gap between education and employment by helping individuals identify their vocational strengths and connect them with appropriate skill development opportunities. We work in close collaboration with the Skill India Mission, NSDC, and local ITIs to provide comprehensive vocational guidance.',
    benefits: ['Vocational aptitude and interest assessment', 'Information on government skill development schemes', 'ITI, polytechnic, and vocational course guidance', 'Entrepreneurship development counselling', 'PMKVY and other scheme enrollment support', 'Job placement assistance and career fairs', 'Self-employment and startup guidance'],
    audience: 'Youth (16–35 years), School Dropouts, Unemployed Youth',
    duration: '60 minutes per session',
    sessions: '3–5 sessions recommended',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Counselling',
    shortDesc: 'Strengthening family bonds through communication workshops and conflict resolution.',
    fullDesc: 'Family Counselling services focus on improving family dynamics, communication patterns, and relationships. Our family therapists work with the entire family unit to identify and resolve conflicts, improve understanding, and build a healthier, more supportive home environment. We address issues ranging from parent-child conflicts to marital challenges and family crises.',
    benefits: ['Family communication improvement workshops', 'Parent-child relationship counselling', 'Marital and couples counselling', 'Conflict resolution and mediation', 'Parenting skills development programs', 'Blended family and divorce adjustment support', 'Elder care and intergenerational conflict resolution'],
    audience: 'Families, Couples, Parents, Children',
    duration: '60–90 minutes per session',
    sessions: '5–8 sessions recommended',
  },
  {
    icon: '🤝',
    title: 'Personal Counselling',
    shortDesc: 'One-on-one sessions addressing personal challenges, self-esteem, and life goals.',
    fullDesc: 'Personal Counselling provides individualized support for a wide range of personal challenges that affect daily functioning and quality of life. Whether you are dealing with low self-esteem, relationship difficulties, grief, life transitions, or simply feeling stuck, our counsellors offer a compassionate and professional space to explore your concerns and develop effective coping strategies.',
    benefits: ['Self-esteem and confidence building', 'Grief and loss counselling', 'Relationship and interpersonal skills', 'Life transitions and adjustment support', 'Goal setting and motivation coaching', 'Anger management and emotional regulation', 'Personal development and self-discovery'],
    audience: 'All Adults (18 years and above)',
    duration: '50–60 minutes per session',
    sessions: 'As per individual need',
  },
];

export default function ServicesPage() {
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
              <Link href="/services" className="text-blue-200 border-b-2 border-blue-300 text-sm font-medium">Services</Link>
              <Link href="/counselors" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Counsellors</Link>
              <Link href="/events" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Events</Link>
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
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Counselling Services</h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Comprehensive, free, and professional counselling services designed to support every individual at every stage of life. All services are provided by certified counsellors in a safe and confidential environment.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {services.map((s) => (
              <span key={s.title} className="bg-white bg-opacity-20 text-white text-xs px-3 py-1.5 rounded-full border border-white border-opacity-30">
                {s.icon} {s.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW STRIP */}
      <section className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '✅', label: '100% Free Services' },
              { icon: '🔒', label: 'Fully Confidential' },
              { icon: '🏅', label: 'Certified Counsellors' },
              { icon: '🌐', label: 'Online & Offline' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES DETAILED CARDS */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={service.title} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden">
                <div className={`flex flex-col lg:flex-row ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-72 bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] p-8 flex flex-col items-center justify-center text-center flex-shrink-0">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h2 className="text-white font-bold text-xl mb-2">{service.title}</h2>
                    <p className="text-blue-200 text-sm leading-relaxed">{service.shortDesc}</p>
                    <div className="mt-6 space-y-2 w-full">
                      <div className="bg-white bg-opacity-10 rounded-lg p-2 text-xs text-blue-100">
                        <span className="font-semibold text-white">Duration:</span> {service.duration}
                      </div>
                      <div className="bg-white bg-opacity-10 rounded-lg p-2 text-xs text-blue-100">
                        <span className="font-semibold text-white">Sessions:</span> {service.sessions}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-8">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#1a3a6b] mb-2">About This Service</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{service.fullDesc}</p>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-base font-bold text-[#1a3a6b] mb-3">Key Benefits</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">For: </span>
                        {service.audience}
                      </div>
                      <Link href="/book-appointment" className="bg-[#1a3a6b] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors flex-shrink-0">
                        📅 Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take the First Step?</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            All our services are completely free for district residents. Book your appointment today and take the first step towards a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment" className="bg-white text-[#1a3a6b] px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              📅 Book Free Appointment
            </Link>
            <Link href="/counselors" className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-[#1a3a6b] transition-colors">
              Meet Our Counsellors →
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
                {services.map((s) => (
                  <li key={s.title}><Link href="/services" className="text-blue-300 hover:text-white text-sm transition-colors">→ {s.title}</Link></li>
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
