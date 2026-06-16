# Government Website Redesign - Implementation Guide

## ✅ Completed Changes

### 1. Global Styles (globals.css)
- ✅ Added Government of India color palette
- ✅ Implemented Noto Sans & Roboto Slab fonts
- ✅ Created government card, button, and section styles
- ✅ Added fade-in animations and ticker styles
- ✅ Implemented government table and document link styles

### 2. Navbar Component (SiteNavbar.tsx)
- ✅ Added top utility bar with skip links, font size toggle, language switcher
- ✅ Redesigned main header with government emblem and search
- ✅ Created navigation bar with saffron bottom border
- ✅ Implemented government nav link hover effects
- ✅ Mobile responsive menu with government styling

### 3. News Ticker Component
- ✅ Created scrolling news ticker with latest updates
- ✅ Styled with saffron background and white text

### 4. Homepage Updates
- ✅ Added News Ticker below navbar
- ✅ Updated Statistics section with government stat boxes

## 🔄 Remaining Changes Needed

### Services Section (page.tsx lines 113-252)
Replace the existing services grid with government card style:

```tsx
{/* SERVICES SECTION */}
<section className="gov-section-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="section-title">What We Offer</h2>
    <p className="text-gray-600 mb-8">
      From career guidance to trauma therapy — expert, free support for J&K youth.
    </p>
    <Link href="/services" className="text-[#003366] font-semibold hover:text-[#FF6600] flex items-center gap-1 mb-8">
      View all services <ArrowRight className="w-4 h-4" />
    </Link>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {servicesData.map((service) => (
        <div key={service.title} className="gov-card">
          <div className="p-6">
            <div className="w-12 h-12 rounded-md bg-[#E8F0FE] flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="font-bold text-[#003366] text-base mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.desc}</p>
            <button onClick={() => setModalOpen(true)} className="btn-secondary-gov w-full">
              Book Session
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### About Section (lines 254-332)
Replace with government layout:

```tsx
{/* ABOUT SECTION */}
<section className="gov-section-light gov-emblem-bg">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="section-title">About Us</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The District Counselling Center is a government-established institution...
        </p>
        
        {/* Mission/Vision/Values as government alert boxes */}
        <div className="gov-alert-info mb-4">
          <strong className="text-[#003366]">Mission:</strong> Accessible, professional counselling...
        </div>
        <div className="gov-alert-info mb-4">
          <strong className="text-[#003366]">Vision:</strong> A district where every individual...
        </div>
        {/* Add more alerts for Objectives and Values */}
      </div>
      
      <div className="gov-card">
        <div className="p-6">
          <h3 className="font-bold text-[#003366] text-lg mb-4">Why Choose Us</h3>
          <ul className="space-y-3">
            {whyChoosePoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="text-[#FF6600] font-bold">▸</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Counsellors Section (lines 334-357)
Update to government style:

```tsx
{/* COUNSELLORS SECTION */}
<section className="gov-section-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-10">
      <h2 className="section-title inline-block">Our Expert Counsellors</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mt-2">
        Our team of certified professionals brings years of experience...
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {counsellorsData.map((counsellor) => (
        <div key={counsellor.name} className="gov-card-saffron">
          <div className="p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#003366] flex items-center justify-center border-4 border-[#FF6600]">
              <span className="text-white font-bold text-2xl">{counsellor.initials}</span>
            </div>
            <h3 className="font-bold text-[#003366] mb-1">{counsellor.name}</h3>
            <p className="text-[#FF6600] text-sm font-semibold mb-1">{counsellor.qual}</p>
            <p className="text-gray-600 text-xs mb-3">{counsellor.spec}</p>
            <Link href="/counselors" className="btn-secondary-gov w-full">
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center mt-8">
      <Link href="/counselors" className="btn-primary-gov inline-flex items-center gap-2">
        View All Counsellors <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</section>
```

### Events Section (lines 359-442)
Update with government table/card style:

```tsx
{/* EVENTS SECTION */}
<section className="gov-section-gray">
  <div className="max-w-5xl mx-auto px-4">
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="section-title">Upcoming Events & Workshops</h2>
      </div>
      <Link href="/events" className="text-[#003366] font-semibold hover:text-[#FF6600] flex items-center gap-1">
        See all events <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    
    <div className="space-y-4">
      {eventsData.map((event) => (
        <div key={event.title} className="gov-card flex flex-col sm:flex-row gap-4 p-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-md bg-[#FF6600] text-white flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{event.day}</span>
            <span className="text-xs uppercase">{event.month}</span>
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold text-[#FF6600] uppercase">{event.type}</span>
            <h3 className="font-bold text-[#003366] mt-1 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.location} • {event.time}</p>
          </div>
          <Link href="/events" className="btn-secondary-gov self-start sm:self-center">
            Register
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Testimonials Section (lines 444-535)
Government styling for testimonials:

```tsx
{/* TESTIMONIALS SECTION */}
<section className="gov-section-white">
  <div className="max-w-5xl mx-auto px-4">
    <div className="text-center mb-10">
      <h2 className="section-title inline-block">Student Voices</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mt-2">
        Hear from the students and families we've helped...
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonialsData.map((t) => (
        <div key={t.name} className="gov-card">
          <div className="p-6">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-[#FF6600] text-lg">★</span>
              ))}
            </div>
            <p className="text-gray-700 italic text-sm leading-relaxed mb-6">
              {t.text}
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold">
                {t.initials}
              </div>
              <div>
                <p className="font-bold text-[#003366] text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3 Easy Steps Section (lines 537-598)
Government process flow:

```tsx
{/* 3 EASY STEPS SECTION */}
<section className="gov-section-light">
  <div className="max-w-4xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="section-title inline-block">Get Help in 3 Easy Steps</h2>
      <p className="text-gray-600 mt-2">
        No complicated forms, no long waits. Start your wellness journey today.
      </p>
    </div>
    
    <div className="relative">
      {/* Connection line */}
      <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-[#FF6600] opacity-20" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {[
          { n: '1', title: 'Choose Your Service', desc: 'Pick from career, mental health...' },
          { n: '2', title: 'Pick a Counsellor & Slot', desc: 'Browse certified counsellors...' },
          { n: '3', title: 'Attend Your Session', desc: 'Visit our center or join via video...' }
        ].map((step) => (
          <div key={step.n} className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#003366] border-4 border-[#FF6600] flex items-center justify-center">
              <span className="text-white font-bold text-4xl">{step.n}</span>
            </div>
            <h3 className="font-bold text-[#003366] mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

### Footer (lines 600-683)
Replace entire footer:

```tsx
{/* FOOTER */}
<footer className="gov-footer">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      
      {/* Column 1: About */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#003366]" />
          </div>
          <div>
            <p className="font-bold text-sm">District Counselling Center</p>
            <p className="text-xs opacity-80">Anantnag, J&K</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed opacity-90">
          Official Website of the District Counselling Center, Government of India.
        </p>
        <p className="text-xs mt-3 opacity-75">
          © 2025 Government of India. All Rights Reserved.
        </p>
      </div>

      {/* Column 2: Quick Links */}
      <div>
        <h4 className="font-bold text-sm mb-4 uppercase tracking-wide">Quick Links</h4>
        <ul className="space-y-2">
          {['Home', 'Services', 'Counsellors', 'Events', 'Contact'].map((link) => (
            <li key={link}>
              <a href="#" className="text-sm opacity-90 hover:opacity-100 hover:text-[#FF6600]">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3: Services */}
      <div>
        <h4 className="font-bold text-sm mb-4 uppercase tracking-wide">Our Services</h4>
        <ul className="space-y-2">
          {['Career Counselling', 'Mental Wellness', 'Educational Guidance', 'Family Counselling', 'Group Therapy'].map((service) => (
            <li key={service}>
              <a href="/services" className="text-sm opacity-90 hover:opacity-100 hover:text-[#FF6600]">
                {service}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 4: Contact */}
      <div>
        <h4 className="font-bold text-sm mb-4 uppercase tracking-wide">Contact Us</h4>
        <ul className="space-y-3 text-sm opacity-90">
          <li>📍 Civil Lines, Anantnag - 192101</li>
          <li>📞 Helpline: 1800-XXX-XXXX</li>
          <li>✉️ info@dcc.gov.in</li>
          <li>🕒 Mon-Fri: 9 AM - 5 PM</li>
        </ul>
      </div>

    </div>
  </div>
  
  {/* Footer Bottom Bar */}
  <div className="gov-footer-bottom">
    <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs">Last Updated: June 9, 2026 | Visitors: 125,847</p>
      <div className="flex gap-4 text-xs">
        <a href="#" className="hover:text-[#FF6600]">Privacy Policy</a>
        <a href="#" className="hover:text-[#FF6600]">Terms of Use</a>
        <a href="#" className="hover:text-[#FF6600]">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
```

## Additional Files to Update

### HeroCarousel.tsx
Update banner overlay color and button styles:
- Change overlay gradient to use `#003366` instead of `#0a1628`
- Update tag color to `#FF6600`
- Update buttons to use `btn-primary-gov` and `btn-secondary-gov` classes

### Services Page (services/page.tsx)
- Update banner image overlay to government navy
- Replace service cards with `gov-card` style
- Update buttons to government button classes
- Change breadcrumb styling to use `gov-breadcrumb` class

### Contact Page
- Update form styling with government colors
- Use `gov-card` for form container
- Update submit button to `btn-primary-gov`

## Quick Implementation Commands

After making manual changes, restart the dev server:
```bash
cd "c:\Users\abhin\OneDrive\Desktop\myCanoProjects\counselling portal\counselling-portal"
npm run dev
```

Then test in browser at http://localhost:3000

## Testing Checklist
- [ ] Top utility bar displays with font size toggle
- [ ] Main header shows government emblem with gold border
- [ ] Navigation bar has saffron bottom border
- [ ] News ticker scrolls properly
- [ ] Statistics boxes use navy background with saffron accents
- [ ] All cards have proper government styling
- [ ] Footer has government navy background with gold top border
- [ ] Mobile responsive menu works
- [ ] All buttons use government color scheme
- [ ] Sections alternate between white and light blue backgrounds
