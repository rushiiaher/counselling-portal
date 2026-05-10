import Link from 'next/link';

const offices = [
  {
    name: 'District Headquarters Office',
    address: 'District Counselling Center, Civil Lines, Near Collectorate, District HQ – 110001',
    phone: '+91-XXXXX-XXXXX',
    email: 'hq@dcc.gov.in',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM | Sat: 9:00 AM – 1:00 PM',
    type: 'Main Office',
  },
  {
    name: 'North Block Counselling Center',
    address: 'Block Office Complex, North Block, District – 110002',
    phone: '+91-XXXXX-XXXXX',
    email: 'north@dcc.gov.in',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM',
    type: 'Block Center',
  },
  {
    name: 'South Block Counselling Center',
    address: 'Community Hall, South Block, District – 110003',
    phone: '+91-XXXXX-XXXXX',
    email: 'south@dcc.gov.in',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM',
    type: 'Block Center',
  },
  {
    name: 'East Block Counselling Center',
    address: 'Panchayat Bhawan, East Block, District – 110004',
    phone: '+91-XXXXX-XXXXX',
    email: 'east@dcc.gov.in',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM',
    type: 'Block Center',
  },
];

const faqs = [
  {
    q: 'Are the counselling services really free?',
    a: 'Yes, all counselling services provided by the District Counselling Center are completely free of charge for all district residents. This is a Government of India initiative.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'You can book an appointment online through our website, call our helpline at 1800-XXX-XXXX, or visit any of our offices in person during working hours.',
  },
  {
    q: 'Is my information kept confidential?',
    a: 'Absolutely. All counselling sessions and personal information are strictly confidential. We adhere to the ethical guidelines of the Rehabilitation Council of India (RCI).',
  },
  {
    q: 'Can I request a counsellor of a specific gender?',
    a: 'Yes, you can specify your preference when booking an appointment. We will do our best to accommodate your request based on availability.',
  },
  {
    q: 'Are online counselling sessions available?',
    a: 'Yes, we offer both online (video call) and offline (in-person) counselling sessions. You can choose your preferred mode when booking.',
  },
  {
    q: 'What languages are the sessions available in?',
    a: 'Sessions are available in Hindi, English, and major regional languages spoken in the district. Please mention your language preference when booking.',
  },
];

export default function ContactPage() {
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
              <Link href="/resources" className="text-white hover:text-blue-200 text-sm font-medium transition-colors">Resources</Link>
              <Link href="/contact" className="text-blue-200 border-b-2 border-blue-300 text-sm font-medium">Contact</Link>
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
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            We are here to help. Reach out to us through any of the channels below, or visit one of our offices across the district. Our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📞',
                title: 'Helpline',
                primary: '1800-XXX-XXXX',
                secondary: 'Toll-free | Mon–Sat, 9 AM – 6 PM',
                color: 'bg-blue-50 border-blue-100',
              },
              {
                icon: '📧',
                title: 'Email Us',
                primary: 'info@dcc.gov.in',
                secondary: 'Response within 24 hours',
                color: 'bg-green-50 border-green-100',
              },
              {
                icon: '💬',
                title: 'WhatsApp',
                primary: '+91-XXXXX-XXXXX',
                secondary: 'Mon–Fri, 9 AM – 5 PM',
                color: 'bg-emerald-50 border-emerald-100',
              },
              {
                icon: '📍',
                title: 'Visit Us',
                primary: 'Civil Lines, District HQ',
                secondary: 'Near Collectorate – 110001',
                color: 'bg-orange-50 border-orange-100',
              },
            ].map((card) => (
              <div key={card.title} className={`text-center p-6 rounded-xl border ${card.color}`}>
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-[#1a3a6b] text-lg mb-2">{card.title}</h3>
                <p className="text-gray-800 font-semibold text-sm mb-1">{card.primary}</p>
                <p className="text-gray-500 text-xs">{card.secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM + INFO */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* CONTACT FORM */}
            <div>
              <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Send a Message</span>
              <h2 className="text-3xl font-bold text-[#1a3a6b] mt-2 mb-6">Get In Touch</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-gray-700">
                    <option value="">Select a subject</option>
                    <option>Appointment Enquiry</option>
                    <option>Career Counselling</option>
                    <option>Mental Wellness Support</option>
                    <option>Educational Guidance</option>
                    <option>Family Counselling</option>
                    <option>Event Registration</option>
                    <option>Grievance / Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Please describe how we can help you..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="consent" className="mt-0.5 flex-shrink-0" />
                  <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed">
                    I consent to the District Counselling Center collecting and processing my personal information to respond to my enquiry. My information will be kept confidential and not shared with third parties.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a3a6b] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#2563eb] transition-colors"
                >
                  Send Message →
                </button>
              </form>
            </div>

            {/* OFFICE HOURS + INFO */}
            <div className="space-y-6">
              <div>
                <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Office Information</span>
                <h2 className="text-3xl font-bold text-[#1a3a6b] mt-2 mb-6">Office Hours &amp; Details</h2>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1a3a6b] text-base mb-4 flex items-center gap-2">
                  <span>🕐</span> Office Timings
                </h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday – Friday', time: '9:00 AM – 5:00 PM', status: 'Open' },
                    { day: 'Saturday', time: '9:00 AM – 1:00 PM', status: 'Open' },
                    { day: 'Sunday', time: 'Closed', status: 'Closed' },
                    { day: 'Public Holidays', time: 'Closed', status: 'Closed' },
                  ].map((row) => (
                    <div key={row.day} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-700 text-sm font-medium">{row.day}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm">{row.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1a3a6b] text-base mb-4 flex items-center gap-2">
                  <span>📬</span> All Contact Channels
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { icon: '📞', label: 'Helpline (Toll-free)', value: '1800-XXX-XXXX' },
                    { icon: '📞', label: 'Office Direct', value: '+91-XXXXX-XXXXX' },
                    { icon: '💬', label: 'WhatsApp', value: '+91-XXXXX-XXXXX' },
                    { icon: '📧', label: 'General Enquiry', value: 'info@dcc.gov.in' },
                    { icon: '📧', label: 'Appointments', value: 'appointments@dcc.gov.in' },
                    { icon: '📧', label: 'Grievances', value: 'grievance@dcc.gov.in' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="text-base w-6 flex-shrink-0">{item.icon}</span>
                      <span className="text-gray-500 w-36 flex-shrink-0">{item.label}:</span>
                      <span className="text-[#1a3a6b] font-medium">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>📅 Book an Appointment:</strong> For counselling sessions, we recommend booking in advance. Walk-ins are accepted subject to counsellor availability.
                </p>
                <Link href="/book-appointment" className="inline-block mt-3 bg-[#1a3a6b] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors">
                  Book Appointment →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICE LOCATIONS */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Our Office Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We have counselling centers across the district to ensure easy access for all residents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offices.map((office) => (
              <div key={office.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-[#1a3a6b] text-base leading-snug">{office.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${office.type === 'Main Office' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'}`}>
                    {office.type}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="flex-shrink-0">📍</span><span>{office.address}</span></li>
                  <li className="flex items-center gap-2"><span>📞</span><span>{office.phone}</span></li>
                  <li className="flex items-center gap-2"><span>📧</span><span>{office.email}</span></li>
                  <li className="flex items-start gap-2"><span className="flex-shrink-0">🕐</span><span>{office.hours}</span></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mt-2 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1a3a6b] text-base mb-2 flex items-start gap-2">
                  <span className="text-[#2563eb] flex-shrink-0">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">Still have questions? <Link href="/contact" className="text-[#2563eb] font-semibold hover:underline">Contact us directly</Link> or call our helpline at <strong>1800-XXX-XXXX</strong>.</p>
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
