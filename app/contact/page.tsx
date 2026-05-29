import Link from 'next/link';
import SiteNavbar from '@/components/layout/SiteNavbar';

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
    a: 'Sessions are available in Hindi, English, Kashmiri, and Urdu. Please mention your language preference when booking.',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteNavbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/con2.jpg"
          alt="Contact Us"
          className="w-full h-[320px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Contact</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Contact <em className="italic">Us</em></h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Reach out through any channel below — our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Send a Message</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2e4a] mt-2 mb-2">Get <em className="italic">In Touch</em></h2>
          <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT — FORM */}
            <form className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <input type="text" placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 focus:border-[#1a2e4a] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 focus:border-[#1a2e4a] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="email" placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 focus:border-[#1a2e4a] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject <span className="text-red-400">*</span></label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 focus:border-[#1a2e4a] transition-colors text-gray-700 bg-white">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message <span className="text-red-400">*</span></label>
                <textarea rows={5} placeholder="Please describe how we can help you..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 focus:border-[#1a2e4a] transition-colors resize-none" />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="consent" className="mt-0.5 flex-shrink-0 accent-[#1a2e4a]" />
                <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed">
                  I consent to the District Counselling Center collecting and processing my personal information to respond to my enquiry. My information will be kept confidential.
                </label>
              </div>
              <button type="submit"
                className="w-full bg-[#1a2e4a] hover:bg-[#2d5fa6] text-white py-3 rounded-xl font-semibold text-sm transition-colors">
                Send Message →
              </button>
            </form>

            {/* RIGHT — INFO */}
            <div className="space-y-6">

              {/* Quick contact */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#1a2e4a] text-base mb-4">📬 Contact Details</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { icon: '📞', label: 'Helpline (Toll-free)', value: '1800-XXX-XXXX' },
                    { icon: '📞', label: 'Office Direct', value: '+91-XXXXX-XXXXX' },
                    { icon: '💬', label: 'WhatsApp', value: '+91-XXXXX-XXXXX' },
                    { icon: '📧', label: 'General Enquiry', value: 'info@dcc.gov.in' },
                    { icon: '📧', label: 'Appointments', value: 'appointments@dcc.gov.in' },
                    { icon: '📍', label: 'Address', value: 'Civil Lines, Near Collectorate, District HQ – 110001' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="text-base w-5 flex-shrink-0">{item.icon}</span>
                      <span className="text-gray-500 w-32 flex-shrink-0 text-xs pt-0.5">{item.label}</span>
                      <span className="text-[#1a2e4a] font-medium text-xs">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office hours */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#1a2e4a] text-base mb-4">🕐 Office Timings</h3>
                <div className="space-y-2">
                  {[
                    { day: 'Monday – Friday', time: '9:00 AM – 5:00 PM', open: true },
                    { day: 'Saturday', time: '9:00 AM – 1:00 PM', open: true },
                    { day: 'Sunday', time: 'Closed', open: false },
                    { day: 'Public Holidays', time: 'Closed', open: false },
                  ].map((row) => (
                    <div key={row.day} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-700 text-sm">{row.day}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm">{row.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                          {row.open ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book appointment nudge */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-3">
                <span className="text-2xl flex-shrink-0">📅</span>
                <div>
                  <p className="text-amber-900 text-sm font-semibold mb-1">Book an Appointment</p>
                  <p className="text-amber-800 text-xs leading-relaxed">For counselling sessions, we recommend booking in advance. Walk-ins are accepted subject to counsellor availability.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Common Questions</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2e4a] mt-2 mb-2">Frequently Asked <em className="italic">Questions</em></h2>
          <div className="w-16 h-[2px] bg-[#c07a2a] rounded-full mb-8" />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#1a2e4a] text-sm mb-2 flex items-start gap-2">
                  <span className="text-[#c07a2a] flex-shrink-0 font-bold">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-5">{faq.a}</p>
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
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#1a3a6b] font-bold">🏛</span>
                </div>
                <div>
                  <p className="font-bold text-sm">District Counselling Center</p>
                  <p className="text-blue-300 text-xs">Anantnag, J&K</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Providing professional counselling and guidance services to empower the youth and families of our district.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Quick Links</h4>
              <ul className="space-y-2">
                {[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Events', href: '/events' }, { label: 'Contact', href: '/contact' }].map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">→ {link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {['Career Counselling', 'Educational Guidance', 'Mental Wellness', 'Youth Guidance', 'Family Counselling'].map((service) => (
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
