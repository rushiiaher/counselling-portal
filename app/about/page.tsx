import Link from 'next/link';
import SiteNavbar from '@/components/layout/SiteNavbar';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Landmark,
  Target,
  AlertTriangle,
  Globe,
  BookOpen,
  Handshake,
  UserCheck,
  Network,
} from 'lucide-react';

const keyIssues = [
  { text: 'No central platform for all students', icon: <AlertTriangle className="w-5 h-5" /> },
  { text: 'Limited access to counselling and guidance', icon: <Users className="w-5 h-5" /> },
  { text: 'Lack of communication between institutions and administration', icon: <Network className="w-5 h-5" /> },
  { text: 'Students missing opportunities due to lack of information', icon: <BookOpen className="w-5 h-5" /> },
  { text: 'No structured system to track student participation and issues', icon: <Target className="w-5 h-5" /> },
  { text: 'Alumni not connected with current students', icon: <Handshake className="w-5 h-5" /> },
];


const targetUsers = [
  { label: 'All students in these institutions', desc: 'Students across all 78 Higher Secondary Schools and 10 Colleges in the district', icon: <Users className="w-6 h-6 text-blue-600" /> },
  { label: 'Alumni', desc: 'Former students who can mentor, guide, and stay connected with current students', icon: <UserCheck className="w-6 h-6 text-emerald-600" /> },
  { label: 'District Administration & Counselling Center', desc: 'Officials and counsellors managing student welfare, guidance, and development programs', icon: <Landmark className="w-6 h-6 text-amber-600" /> },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteNavbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/about.webp"
          alt="About Us"
          className="w-full h-80 object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About <em className="italic">Us</em></h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Empowering students, connecting institutions, and building a brighter future for the youth of Anantnag.
            </p>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-14 px-4" style={{ background: 'linear-gradient(to bottom, #fff5e6, #ffffff, #eaf6ea)' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Who We Are</span>
          <div className="text-left">
            <h2 className="block w-fit bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-8 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Introduction</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start">
            <div className="space-y-5">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Under the District Administration of Anantnag, we have established a <strong className="text-[#1a2e4a]">Counselling and Youth Development Center</strong> to support students in areas such as mental well-being, career guidance, and overall development.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                As part of this initiative, we have built the <strong className="text-[#1a2e4a]">District Student & Youth Digital Portal</strong> — this very platform you are using right now. It serves as a common digital platform connecting all Higher Secondary Schools, Colleges, students, and the District Administration under one roof.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Through this portal, students can access free counselling services, explore career guidance, book appointments, attend events, and connect with qualified counsellors — all from the comfort of their homes.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a3a6b] rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[#1a2e4a] text-base">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-[#c07a2a] pl-4 italic">
                To create a single digital platform that connects students, institutions, and administration for learning, interaction, counselling, and overall development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEED FOR THE PORTAL */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Why This Portal</span>
          <div className="text-left">
            <h2 className="block w-fit bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-8 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Need For The <em className="italic">Portal</em></h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 max-w-3xl">
            At present, there is no single system where all students and institutions are connected. Schools and colleges work separately, and students often do not know where to go for help, guidance, or opportunities.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-3xl">
            Because of this, many students are not able to get the right support at the right time. Some key issues observed are:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyIssues.map((issue) => (
              <div key={issue.text} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-start gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  {issue.icon}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{issue.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="py-14 px-4" style={{ background: 'linear-gradient(to bottom, #fff5e6, #ffffff, #eaf6ea)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Our Mission</span>
          <div className="flex justify-center">
            <h2 className="block w-fit bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-10 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Purpose Of The <em className="italic">Portal</em></h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-[#1a3a6b] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <p className="text-[#1a2e4a] text-lg sm:text-xl font-bold leading-relaxed">
              To create a single digital platform that connects students, institutions, and administration for learning, interaction, counselling, and overall development.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {['Learning', 'Interaction', 'Counselling', 'Development'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-blue-50 text-[#1a3a6b] text-xs font-semibold border border-blue-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TARGET USERS */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Who Benefits</span>
          <div className="text-left">
            <h2 className="block w-fit bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mt-2 mb-8 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Target <em className="italic">Users</em></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {targetUsers.map((user) => (
              <div key={user.label} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                  {user.icon}
                </div>
                <h3 className="font-bold text-[#1a2e4a] text-sm mb-2">{user.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4" style={{ background: 'linear-gradient(to right, #fff5e6, #ffffff, #eaf6ea)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center">
            <h2 className="block w-fit bg-[#424242] text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wide mb-6 px-6 py-2.5 rounded-lg shadow-md border-b-4 border-[#c07a2a]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Be Part Of The <em className="italic">Change</em></h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Join us in building a connected, supportive ecosystem for the youth of Anantnag. Whether you are a student, parent, teacher, or alumni — this portal is for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="w-full sm:w-auto bg-[#1a2e4a] hover:bg-[#2d5fa6] text-white py-3 px-8 rounded-xl font-semibold text-sm transition-colors"
            >
              Explore Our Services
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white border-2 border-[#1a2e4a] text-[#1a2e4a] hover:bg-[#1a2e4a] hover:text-white py-3 px-8 rounded-xl font-semibold text-sm transition-colors"
            >
              Get In Touch
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
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#1a3a6b]" />
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
                {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Contact', href: '/contact' }].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {['Career Counselling', 'Educational Guidance', 'Mental Wellness', 'Youth Guidance', 'Family Counselling'].map((service) => (
                  <li key={service}>
                    <Link href="/services" className="text-blue-300 hover:text-white text-sm transition-colors">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Contact</h4>
              <ul className="space-y-2 text-blue-300 text-sm">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> Civil Lines, District HQ – 110001</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> Helpline: 1800-XXX-XXXX</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> info@dcc.gov.in</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" /> Mon–Fri: 9 AM – 5 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-blue-300 text-sm">&copy; 2025 District Counselling Center, Government of India. All Rights Reserved.</p>
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
