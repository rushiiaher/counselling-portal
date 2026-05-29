import Link from 'next/link';
import SiteNavbar from '@/components/layout/SiteNavbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteNavbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/con4.jpg"
          alt="About Us"
          className="w-full h-[320px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>About District <em className="italic">Counselling Center</em></h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Empowering individuals through professional, free, and confidential counselling since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT THE CENTER */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2e4a] mt-2 mb-6" style={{ fontFamily: 'Georgia, serif' }}>About <em className="italic">the Center</em></h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The District Counselling Center (DCC) was established under the Ministry of Education, Government of India, with the primary objective of providing free, professional, and confidential counselling services to students, youth, and families across the district.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Since our inception, we have served over 25,000 individuals through a network of 150+ certified counsellors spread across the district. Our center operates from the district headquarters with satellite centers in all major blocks.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We follow evidence-based counselling practices and adhere to the ethical guidelines set by the Rehabilitation Council of India (RCI) and the Indian Association of Counselling (IAC). All our counsellors are trained, certified, and regularly updated on the latest counselling methodologies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Established', value: '2010' },
                  { label: 'District Centers', value: '12' },
                  { label: 'Certified Staff', value: '150+' },
                  { label: 'Annual Beneficiaries', value: '5,000+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                    <div className="text-2xl font-bold text-[#1a3a6b]">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Our Core Values</h3>
                <ul className="space-y-3">
                  {[
                    { icon: '🤝', value: 'Empathy', desc: 'We listen with compassion and understanding' },
                    { icon: '🔒', value: 'Confidentiality', desc: 'Your privacy is our highest priority' },
                    { icon: '⚖️', value: 'Integrity', desc: 'Honest, ethical, and transparent practices' },
                    { icon: '🌍', value: 'Inclusivity', desc: 'Services accessible to all, regardless of background' },
                    { icon: '📈', value: 'Excellence', desc: 'Continuous improvement in service quality' },
                  ].map((val) => (
                    <li key={val.value} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">{val.icon}</span>
                      <div>
                        <span className="font-semibold text-white">{val.value}: </span>
                        <span className="text-blue-200 text-sm">{val.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION, VISION, OBJECTIVES */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Our Direction</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2e4a] mt-2 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Mission, Vision &amp; <em className="italic">Objectives</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">🎯</div>
              <h3 className="text-xl font-bold text-[#1a3a6b] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                To provide accessible, professional, and confidential counselling services that empower individuals to overcome personal, academic, and professional challenges, enabling them to achieve their full potential and lead fulfilling lives.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">🔭</div>
              <h3 className="text-xl font-bold text-[#1a3a6b] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                A district where every individual — regardless of age, gender, socioeconomic background, or location — has access to quality mental health and guidance services, fostering a resilient, empowered, and mentally healthy community.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">📋</div>
              <h3 className="text-xl font-bold text-[#1a3a6b] mb-4">Our Objectives</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                {[
                  'Deliver evidence-based counselling services',
                  'Promote mental health awareness in schools',
                  'Build capacity of local counsellors',
                  'Ensure equitable access to all communities',
                  'Collaborate with government departments',
                  'Conduct research and publish findings',
                ].map((obj) => (
                  <li key={obj} className="flex items-start gap-2">
                    <span className="text-[#2563eb] mt-0.5 flex-shrink-0">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANCE OF COUNSELLING */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Why It Matters</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2e4a] mt-2 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Importance of <em className="italic">Counselling</em></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Professional counselling plays a vital role in individual and community well-being. Here is why it matters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Mental Health Support', desc: 'Counselling provides a safe space to address anxiety, depression, stress, and other mental health challenges before they escalate.' },
              { icon: '🎓', title: 'Academic Success', desc: 'Students who receive counselling support show improved academic performance, better focus, and higher graduation rates.' },
              { icon: '💼', title: 'Career Clarity', desc: 'Professional guidance helps individuals make informed career decisions aligned with their strengths, interests, and market opportunities.' },
              { icon: '👨‍👩‍👧', title: 'Stronger Families', desc: 'Family counselling improves communication, resolves conflicts, and builds healthier relationships within the family unit.' },
              { icon: '🌱', title: 'Personal Growth', desc: 'Counselling fosters self-awareness, emotional intelligence, and resilience — essential skills for lifelong success.' },
              { icon: '🤝', title: 'Social Integration', desc: 'Counselling helps individuals develop better social skills, empathy, and the ability to build meaningful relationships.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-[#1a3a6b] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a2e4a] mt-2 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Our Leadership <em className="italic">Team</em></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experienced professionals leading the District Counselling Center with dedication and expertise.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Ramesh Chandra', role: 'Director', qual: 'Ph.D. Psychology, IIT Delhi', exp: '25 Years Experience' },
              { name: 'Dr. Kavita Singh', role: 'Deputy Director', qual: 'Ph.D. Counselling, DU', exp: '18 Years Experience' },
              { name: 'Mr. Arun Mishra', role: 'Head – Career Guidance', qual: 'M.A. Psychology, BHU', exp: '15 Years Experience' },
              { name: 'Dr. Sunita Rao', role: 'Head – Mental Wellness', qual: 'Ph.D. Clinical Psychology', exp: '20 Years Experience' },
            ].map((leader) => (
              <div key={leader.name} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center">
                <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] p-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=1a3a6b&color=fff&size=128`}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1a3a6b] text-base mb-1">{leader.name}</h3>
                  <p className="text-[#2563eb] text-sm font-semibold mb-1">{leader.role}</p>
                  <p className="text-gray-500 text-xs mb-1">{leader.qual}</p>
                  <p className="text-gray-400 text-xs">{leader.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNMENT AFFILIATION */}
      <section className="bg-[#1a3a6b] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">Official Affiliations</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Government Affiliations &amp; <em className="italic">Accreditations</em></h2>
            <p className="text-blue-100 max-w-2xl mx-auto">We operate under the aegis of the Government of India and are affiliated with leading national bodies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏛', name: 'Ministry of Education', desc: 'Established and funded under the Ministry of Education, Government of India.' },
              { icon: '📜', name: 'Rehabilitation Council of India', desc: 'All counsellors are registered with RCI and follow its ethical guidelines.' },
              { icon: '🎓', name: 'NCERT', desc: 'Curriculum and training programs developed in collaboration with NCERT.' },
              { icon: '🏥', name: 'Ministry of Health', desc: 'Mental wellness programs aligned with National Mental Health Policy 2014.' },
              { icon: '💼', name: 'Skill India Mission', desc: 'Skill development counselling integrated with the Skill India framework.' },
              { icon: '🌐', name: 'National Career Service', desc: 'Career guidance services linked to the NCS portal for job placement support.' },
            ].map((aff) => (
              <div key={aff.name} className="bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-colors">
                <div className="text-3xl mb-3">{aff.icon}</div>
                <h3 className="font-bold text-white text-base mb-2">{aff.name}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{aff.desc}</p>
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
                {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Contact', href: '/contact' }].map((link) => (
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
