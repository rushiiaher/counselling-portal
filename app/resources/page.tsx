import Link from 'next/link';

const categories = [
  {
    icon: '🎯',
    title: 'Career Resources',
    color: 'from-blue-500 to-blue-700',
    resources: [
      { title: 'Career Aptitude Assessment Guide', type: 'PDF', size: '2.4 MB', desc: 'A comprehensive guide to understanding your aptitude and matching it with suitable career options.' },
      { title: 'Top 500 Career Options in India', type: 'PDF', size: '5.1 MB', desc: 'Detailed profiles of 500+ career options including eligibility, scope, and salary expectations.' },
      { title: 'Entrance Exam Calendar 2026', type: 'PDF', size: '1.2 MB', desc: 'Complete schedule of all major entrance examinations for engineering, medical, law, and management.' },
      { title: 'Resume Writing Template Pack', type: 'ZIP', size: '3.8 MB', desc: 'Professional resume templates for freshers and experienced candidates across various industries.' },
    ],
  },
  {
    icon: '🧠',
    title: 'Mental Wellness',
    color: 'from-green-500 to-green-700',
    resources: [
      { title: 'Stress Management Workbook', type: 'PDF', size: '3.2 MB', desc: 'A practical workbook with exercises, techniques, and strategies to manage stress effectively.' },
      { title: 'Mindfulness & Meditation Guide', type: 'PDF', size: '2.8 MB', desc: 'Step-by-step guide to mindfulness practices and meditation techniques for beginners.' },
      { title: 'Understanding Anxiety – Self-Help Guide', type: 'PDF', size: '1.9 MB', desc: 'Evidence-based information and coping strategies for managing anxiety in daily life.' },
      { title: 'Sleep Hygiene & Mental Health', type: 'PDF', size: '1.4 MB', desc: 'Tips and techniques for improving sleep quality and its positive impact on mental health.' },
    ],
  },
  {
    icon: '📚',
    title: 'Educational Guides',
    color: 'from-purple-500 to-purple-700',
    resources: [
      { title: 'Study Skills & Time Management Handbook', type: 'PDF', size: '2.6 MB', desc: 'Proven study techniques, time management strategies, and exam preparation tips for students.' },
      { title: 'Scholarship Guide 2026 – India', type: 'PDF', size: '4.3 MB', desc: 'Comprehensive list of government and private scholarships available for students at all levels.' },
      { title: 'Higher Education Planning Workbook', type: 'PDF', size: '3.1 MB', desc: 'A structured workbook to help students plan their higher education journey step by step.' },
      { title: 'Learning Disability Awareness Guide', type: 'PDF', size: '2.0 MB', desc: 'Information for parents and teachers on identifying and supporting students with learning disabilities.' },
    ],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family & Parenting',
    color: 'from-orange-500 to-orange-700',
    resources: [
      { title: 'Positive Parenting Handbook', type: 'PDF', size: '3.5 MB', desc: 'Evidence-based parenting strategies to build strong, healthy relationships with your children.' },
      { title: 'Teenage Communication Guide for Parents', type: 'PDF', size: '2.2 MB', desc: 'Practical tips for parents to communicate effectively with teenagers and navigate common challenges.' },
      { title: 'Digital Parenting in the 21st Century', type: 'PDF', size: '2.7 MB', desc: 'Guide to managing screen time, online safety, and digital wellness for children and teens.' },
      { title: 'Family Conflict Resolution Workbook', type: 'PDF', size: '1.8 MB', desc: 'Structured exercises and strategies for resolving family conflicts and improving communication.' },
    ],
  },
  {
    icon: '💼',
    title: 'Skill Development',
    color: 'from-teal-500 to-teal-700',
    resources: [
      { title: 'Skill India Schemes – Complete Guide', type: 'PDF', size: '4.8 MB', desc: 'Detailed information on all Skill India schemes, eligibility criteria, and enrollment process.' },
      { title: 'Vocational Training Options in India', type: 'PDF', size: '3.6 MB', desc: 'Comprehensive guide to ITI courses, polytechnic programs, and vocational training opportunities.' },
      { title: 'Entrepreneurship Starter Kit', type: 'PDF', size: '5.2 MB', desc: 'Step-by-step guide to starting a small business, including government schemes and funding options.' },
      { title: 'Interview Preparation Guide', type: 'PDF', size: '2.3 MB', desc: 'Tips, common questions, and strategies to ace job interviews across different industries.' },
    ],
  },
  {
    icon: '🌱',
    title: 'Youth Development',
    color: 'from-pink-500 to-pink-700',
    resources: [
      { title: 'Life Skills for Young Adults', type: 'PDF', size: '3.0 MB', desc: 'Essential life skills including financial literacy, communication, and decision-making for youth.' },
      { title: 'Peer Pressure & Substance Abuse Prevention', type: 'PDF', size: '2.1 MB', desc: 'Awareness material and coping strategies to help youth resist peer pressure and substance abuse.' },
      { title: 'Leadership Development Workbook', type: 'PDF', size: '2.9 MB', desc: 'Exercises and activities to develop leadership qualities, teamwork, and problem-solving skills.' },
      { title: 'Online Safety & Digital Citizenship Guide', type: 'PDF', size: '1.7 MB', desc: 'Guidance on staying safe online, responsible social media use, and digital citizenship.' },
    ],
  },
];

const helplines = [
  { name: 'iCall – Psychological Helpline', number: '9152987821', hours: 'Mon–Sat, 8 AM – 10 PM', org: 'TISS Mumbai' },
  { name: 'Vandrevala Foundation Helpline', number: '1860-2662-345', hours: '24/7', org: 'Vandrevala Foundation' },
  { name: 'NIMHANS Helpline', number: '080-46110007', hours: 'Mon–Sat, 8 AM – 8 PM', org: 'NIMHANS Bangalore' },
  { name: 'Snehi Helpline', number: '044-24640050', hours: 'Mon–Fri, 8 AM – 10 PM', org: 'Snehi NGO' },
];

export default function ResourcesPage() {
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
              <Link href="/events" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Events</Link>
              <Link href="/resources" className="text-blue-200 border-b-2 border-blue-300 text-sm font-medium">Resources</Link>
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
            <span className="text-white">Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Resources &amp; Downloads</h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Access our library of free guides, workbooks, and informational materials on career guidance, mental wellness, education, and more. All resources are available for free download.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {categories.map((cat) => (
              <span key={cat.title} className="bg-white bg-opacity-20 text-white text-xs px-3 py-1.5 rounded-full border border-white border-opacity-30">
                {cat.icon} {cat.title}
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
              { icon: '📄', label: '24+ Free Resources' },
              { icon: '🆓', label: 'Free to Download' },
              { icon: '📂', label: '6 Categories' },
              { icon: '🔄', label: 'Regularly Updated' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2 text-sm text-gray-700 font-medium">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCE CATEGORIES */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1a3a6b]">{category.title}</h2>
                  <p className="text-gray-500 text-sm">{category.resources.length} resources available</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.resources.map((resource) => (
                  <div key={resource.title} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-200 flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-100">
                      <span className="text-[#2563eb] font-bold text-xs">{resource.type}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#1a3a6b] text-sm mb-1 leading-snug">{resource.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">{resource.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">{resource.size}</span>
                        <button className="text-[#2563eb] text-xs font-semibold hover:underline flex items-center gap-1">
                          ⬇ Download Free
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HELPLINES */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Need Immediate Help?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Mental Health Helplines</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">If you or someone you know needs immediate mental health support, please reach out to these helplines.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {helplines.map((line) => (
              <div key={line.name} className="flex items-center gap-4 p-5 bg-red-50 rounded-xl border border-red-100 hover:border-red-300 transition-colors">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📞
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm mb-0.5">{line.name}</h3>
                  <p className="text-red-600 font-bold text-base">{line.number}</p>
                  <p className="text-gray-500 text-xs">{line.hours} · {line.org}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-sm text-red-700">
              <strong>Emergency:</strong> If you are in immediate danger, please call <strong>112</strong> (National Emergency Number) or visit your nearest hospital.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Personalized Guidance?</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Resources are a great starting point, but nothing replaces a one-on-one session with a certified counsellor. Book a free appointment today.
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
