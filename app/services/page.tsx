'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import BookAppointmentModal from '@/components/shared/BookAppointmentModal';
import { ChevronRight, ArrowRight, Building2, MapPin, Phone, Mail, Clock, CalendarDays } from 'lucide-react';

const services = [
  {
    title: 'Career Counselling',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Career Growth & Professional Development',
    para1: 'Our Career Counselling service is a comprehensive, evidence-based program designed to help students, graduates, and working professionals make informed and confident career decisions. We understand that choosing the right career path is one of the most important decisions in a person\'s life, and our certified career counsellors are here to guide you every step of the way.',
    para2: 'We use scientifically validated tools such as <strong>Holland\'s Career Interest Inventory</strong>, <strong>MBTI Personality Assessment</strong>, and <strong>Multiple Intelligence Tests</strong> to map your strengths, interests, and aptitudes to the most suitable career options. Our counsellors then work with you to build a personalised career roadmap.',
    para3: 'Our expertise covers over 500+ career options across engineering, medicine, law, arts, commerce, government services, entrepreneurship, and emerging fields like AI, data science, and digital marketing. Whether you are a Class 10 student choosing a stream or a professional looking to switch careers, we have the right guidance for you.',
    highlights: [
      'Scientifically validated aptitude & interest assessments',
      'One-on-one personalised career counselling sessions',
      'Guidance on 500+ career options across all fields',
      'Entrance exam strategy (JEE, NEET, UPSC, CAT, CLAT)',
      'Resume building & interview preparation support',
      'Scholarship, fellowship & financial aid information',
      'Industry exposure, internship & placement guidance',
    ],
    audience: 'Students (Class 8–12), College Students, Working Professionals',
    duration: '60–90 minutes per session',
    sessions: '3–5 sessions recommended',
  },
  {
    title: 'Educational Guidance',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Academic Excellence & Higher Education',
    para1: 'Educational Guidance services are designed to help students navigate the complex landscape of academic choices and challenges. From selecting the right subjects in school to choosing the best college and course for higher education, our educational counsellors provide evidence-based guidance tailored to each student\'s unique profile.',
    para2: 'We address a wide range of academic concerns including <strong>subject and stream selection</strong>, <strong>study skills coaching</strong>, <strong>learning disability assessment</strong>, and <strong>higher education planning</strong>. Our counsellors work closely with students and parents to create a structured academic plan.',
    para3: 'We also provide guidance on studying abroad, including university selection, application strategy, SOP writing, scholarship opportunities, and visa support. Our counsellors have helped hundreds of students secure admissions in top universities across India and internationally.',
    highlights: [
      'Subject & stream selection guidance (Class 9–12)',
      'College & university selection support',
      'Entrance exam preparation strategies',
      'Study skills & time management coaching',
      'Learning disability assessment & support',
      'Scholarship & fellowship information',
      'Abroad education guidance & visa support',
    ],
    audience: 'School Students (Class 6–12), College Students, Parents',
    duration: '45–60 minutes per session',
    sessions: '2–4 sessions recommended',
  },
  {
    title: 'Mental Wellness',
    img: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Psychological Well-being & Mental Health',
    para1: 'Our Mental Wellness program offers a safe, confidential, and non-judgmental space for individuals to address mental health challenges. Our licensed clinical psychologists and counsellors use evidence-based therapeutic approaches to help you achieve emotional balance and lasting mental well-being.',
    para2: 'We focus on a range of therapeutic approaches, each tailored to the specific requirements of our clients. Our team utilises advanced approaches such as <strong>Cognitive Behavioral Therapy (CBT)</strong>, <strong>Mindfulness-Based Stress Reduction (MBSR)</strong>, <strong>Solution-Focused Brief Therapy (SFBT)</strong>, and Acceptance & Commitment Therapy (ACT) to ensure each individual receives a comprehensive, personalised treatment plan.',
    para3: 'Our expertise extends to treating common issues such as stress, burnout, and relationship difficulties, as well as more complex conditions like anxiety disorders, depression, bipolar disorder, OCD, PTSD, and emotional regulation challenges. We also offer group therapy and peer support programs.',
    highlights: [
      'Confidential individual therapy sessions',
      'Anxiety & depression management',
      'Stress, burnout & trauma counselling',
      'CBT, MBSR, SFBT & ACT therapeutic approaches',
      'Mindfulness & relaxation techniques',
      'Group therapy & peer support groups',
      'Crisis intervention & emergency support',
    ],
    audience: 'All Age Groups (10 years and above)',
    duration: '50–60 minutes per session',
    sessions: 'Ongoing as per clinical assessment',
  },
  {
    title: 'Youth Guidance',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Youth Development & Life Skills',
    para1: 'The Youth Guidance program is specifically designed for young people aged 13–25 who are navigating the challenges of adolescence and early adulthood. Our youth counsellors provide a supportive environment to address issues related to identity, peer pressure, relationships, and life skills development.',
    para2: 'We address critical youth issues including <strong>identity and self-esteem development</strong>, <strong>peer pressure and bullying</strong>, <strong>substance abuse prevention</strong>, and <strong>digital wellness</strong>. Our programs are interactive, engaging, and designed to resonate with today\'s youth.',
    para3: 'Our leadership development workshops and life skills programs equip young people with the tools they need to make positive decisions, build healthy relationships, and navigate life transitions with confidence and resilience.',
    highlights: [
      'Adolescent development & identity counselling',
      'Peer pressure & bullying intervention',
      'Substance abuse prevention programs',
      'Life skills & decision-making workshops',
      'Leadership development programs',
      'Online safety & digital wellness guidance',
      'Positive youth development activities',
    ],
    audience: 'Youth aged 13–25 years',
    duration: '45–60 minutes per session',
    sessions: '4–6 sessions recommended',
  },
  {
    title: 'Skill Development',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Vocational Training & Employment Readiness',
    para1: 'Our Skill Development Counselling service bridges the gap between education and employment by helping individuals identify their vocational strengths and connect them with appropriate skill development opportunities. We work in close collaboration with the Skill India Mission and NSDC.',
    para2: 'We provide guidance on <strong>government skill development schemes</strong>, <strong>ITI and polytechnic courses</strong>, <strong>PMKVY enrollment</strong>, and <strong>entrepreneurship development</strong>. Our counsellors help you identify the right vocational path based on your aptitude and market demand.',
    para3: 'Our job placement assistance, career fairs, and self-employment guidance programs have helped hundreds of youth secure meaningful employment and start their own ventures. We also provide support for those looking to upskill or reskill for better career opportunities.',
    highlights: [
      'Vocational aptitude & interest assessment',
      'Government skill development scheme guidance',
      'ITI, polytechnic & vocational course support',
      'PMKVY & other scheme enrollment assistance',
      'Entrepreneurship development counselling',
      'Job placement assistance & career fairs',
      'Self-employment & startup guidance',
    ],
    audience: 'Youth (16–35 years), School Dropouts, Unemployed Youth',
    duration: '60 minutes per session',
    sessions: '3–5 sessions recommended',
  },
  {
    title: 'Family Counselling',
    img: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Family Harmony & Relationship Wellness',
    para1: 'Family Counselling services focus on improving family dynamics, communication patterns, and relationships. Our family therapists work with the entire family unit to identify and resolve conflicts, improve understanding, and build a healthier, more supportive home environment.',
    para2: 'We address issues ranging from <strong>parent-child conflicts</strong> to <strong>marital challenges</strong>, <strong>blended family adjustments</strong>, and <strong>elder care concerns</strong>. Our therapists use Emotionally Focused Therapy (EFT), Narrative Therapy, and Structural Family Therapy to bring lasting positive change.',
    para3: 'Our parenting skills workshops and communication improvement programs have helped thousands of families build stronger bonds, resolve long-standing conflicts, and create a nurturing environment for children to thrive.',
    highlights: [
      'Family communication improvement workshops',
      'Parent-child relationship counselling',
      'Marital & couples counselling',
      'Conflict resolution & mediation',
      'Parenting skills development programs',
      'Blended family & divorce adjustment support',
      'Elder care & intergenerational conflict resolution',
    ],
    audience: 'Families, Couples, Parents, Children',
    duration: '60–90 minutes per session',
    sessions: '5–8 sessions recommended',
  },
  {
    title: 'Personal Counselling',
    img: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Personal Growth & Emotional Well-being',
    para1: 'Personal Counselling provides individualized support for a wide range of personal challenges that affect daily functioning and quality of life. Whether you are dealing with low self-esteem, relationship difficulties, grief, life transitions, or simply feeling stuck, our counsellors offer a compassionate and professional space.',
    para2: 'Our counsellors are trained in <strong>Person-Centered Therapy</strong>, <strong>Cognitive Behavioral Therapy (CBT)</strong>, <strong>Motivational Interviewing</strong>, and <strong>Narrative Therapy</strong> to help you explore your concerns, understand your patterns, and develop effective coping strategies tailored to your unique situation.',
    para3: 'We help individuals build self-awareness, develop emotional resilience, set meaningful goals, and create a life aligned with their values. Our sessions are completely confidential, non-judgmental, and focused entirely on your well-being and growth.',
    highlights: [
      'Self-esteem & confidence building',
      'Grief, loss & bereavement counselling',
      'Relationship & interpersonal skills',
      'Life transitions & adjustment support',
      'Goal setting & motivation coaching',
      'Anger management & emotional regulation',
      'Personal development & self-discovery',
    ],
    audience: 'All Adults (18 years and above)',
    duration: '50–60 minutes per session',
    sessions: 'As per individual need',
  },
  {
    title: 'Crisis Support',
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=700&h=500&fit=crop',
    detailImg: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop',
    heading: 'Complete Solution For Crisis Intervention & Emergency Mental Health',
    para1: 'Our Crisis Support service provides immediate, compassionate, and professional intervention for individuals experiencing acute mental health crises, emotional breakdowns, or situations of immediate risk. Our trained crisis counsellors are available to provide rapid response and stabilisation.',
    para2: 'We are equipped to handle a wide range of crisis situations including <strong>suicidal ideation</strong>, <strong>acute anxiety and panic attacks</strong>, <strong>trauma and PTSD episodes</strong>, <strong>domestic violence situations</strong>, and <strong>substance abuse crises</strong>. Our team follows evidence-based crisis intervention protocols to ensure safety and stabilisation.',
    para3: 'Following immediate crisis intervention, we provide a structured follow-up care plan including ongoing therapy, referrals to psychiatric services if needed, and connection to community support resources. Our goal is not just to manage the crisis but to help individuals build long-term resilience.',
    highlights: [
      'Immediate crisis assessment & intervention',
      'Suicidal ideation & self-harm support',
      'Trauma & PTSD crisis management',
      'Domestic violence & abuse support',
      'Substance abuse crisis intervention',
      'Psychiatric referral & coordination',
      'Follow-up care & safety planning',
    ],
    audience: 'All individuals in acute distress (any age)',
    duration: 'As needed — immediate response',
    sessions: 'Ongoing follow-up care provided',
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleServiceClick = (title: string) => {
    if (activeService === title) {
      setActiveService(null);
    } else {
      setActiveService(title);
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const selected = services.find((s) => s.title === activeService);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <BookAppointmentModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <SiteNavbar onBookClick={() => setBookingOpen(true)} />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <img
          src="/con2.jpg"
          alt="Counselling Services"
          className="w-full h-[320px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a3a6b]/65" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Services</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Our Counselling <em className="italic">Services</em></h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
              Comprehensive, free, and professional counselling services designed to support every individual at every stage of life.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES IMAGE GRID */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#c07a2a] font-semibold text-xs uppercase tracking-widest">Our Services</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2" style={{ fontFamily: 'Georgia, serif' }}>Counselling Services <em className="italic">We Offer</em></h2>
            <div className="w-16 h-[2px] bg-[#c07a2a] mx-auto mt-3 mb-6 rounded-full" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
              We offer a team of the most trusted and experienced psychologists, best therapists, certified counsellors, and mental health professionals to take care of your mind and well-being. Click on any service below to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                onClick={() => handleServiceClick(service.title)}
                className={`group relative overflow-hidden rounded-lg cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${activeService === service.title ? 'ring-4 ring-[#1a2e4a] ring-offset-2' : ''}`}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute bottom-0 left-0 right-0 py-3 px-4 text-center transition-colors duration-200 ${activeService === service.title ? 'bg-[#1a2e4a]' : 'bg-[#1a2e4a]/80 group-hover:bg-[#1a2e4a]'}`}>
                  <p className="text-white font-semibold text-sm">{service.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL PANEL — shown on click, reference design */}
      {selected && (
        <section ref={detailRef} className="bg-gray-50 py-16 px-4 border-t-4 border-[#1a2e4a]">
          <div className="max-w-7xl mx-auto">
            {/* Close button */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug" style={{ fontFamily: 'Georgia, serif' }}>{selected.heading}</h2>
                <div className="w-16 h-[2px] bg-[#c07a2a] mt-2 rounded-full" />
              </div>
              <button
                onClick={() => setActiveService(null)}
                className="text-gray-400 hover:text-gray-700 transition-colors text-sm flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            {/* Main content — left text, right image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* LEFT — text */}
              <div>
                <p className="text-gray-700 leading-relaxed mb-5 text-[15px]">{selected.para1}</p>
                <p
                  className="text-gray-700 leading-relaxed mb-5 text-[15px]"
                  dangerouslySetInnerHTML={{ __html: selected.para2 }}
                />
                <p className="text-gray-700 leading-relaxed mb-8 text-[15px]">{selected.para3}</p>

                {/* Key highlights */}
                <h3 className="text-base font-bold text-gray-900 mb-4">Key Highlights</h3>
                <ul className="space-y-2 mb-8">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-blue-100 text-[#1a2e4a] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm">
                    <p className="text-blue-400 text-xs font-medium mb-0.5">For</p>
                    <p className="text-blue-900 font-semibold">{selected.audience}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm">
                    <p className="text-blue-400 text-xs font-medium mb-0.5">Duration</p>
                    <p className="text-blue-900 font-semibold">{selected.duration}</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm">
                    <p className="text-green-400 text-xs font-medium mb-0.5">Sessions</p>
                    <p className="text-green-900 font-semibold">{selected.sessions}</p>
                  </div>
                </div>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#1a2e4a] hover:bg-[#2d5fa6] text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-colors shadow-md"
                >
                  📅 Book Free Appointment
                </button>
              </div>

              {/* RIGHT — image */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={selected.detailImg}
                  alt={selected.title}
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}



      {/* CTA SECTION */}
      <section className="bg-[#eef2f9] py-16 px-4 border-t border-blue-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Ready to Take <em className="italic">the First Step?</em></h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            All our services are completely free for district residents. Book your appointment today and take the first step towards a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setBookingOpen(true)} className="bg-[#1a2e4a] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#2d5fa6] transition-colors shadow-md">
              📅 Book Free Appointment
            </button>
            <Link href="/counselors" className="border-2 border-[#1a2e4a] text-[#1a2e4a] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#1a2e4a] hover:text-white transition-colors">
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
                {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Counsellors', href: '/counselors' }, { label: 'Contact', href: '/contact' }].map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-blue-300 hover:text-white text-sm transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-blue-100">Our Services</h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.title}><Link href="/services" className="text-blue-300 hover:text-white text-sm transition-colors">{s.title}</Link></li>
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
