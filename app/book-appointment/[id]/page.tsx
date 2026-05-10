'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

const counsellors = [
  { id: '1', name: 'Dr. Priya Sharma', qualification: 'Ph.D. Psychology', specializations: ['Career Counselling', 'Mental Wellness', 'Anxiety'], experience: 15, rating: 5, reviews: 128, location: 'District HQ Center', languages: ['Hindi', 'English'] },
  { id: '2', name: 'Mr. Rajesh Kumar', qualification: 'M.A. Counselling Psychology', specializations: ['Youth Guidance', 'Family Counselling', 'Peer Pressure'], experience: 10, rating: 5, reviews: 94, location: 'Block A Center', languages: ['Hindi', 'English', 'Bhojpuri'] },
  { id: '3', name: 'Dr. Anita Verma', qualification: 'Ph.D. Educational Psychology', specializations: ['Educational Guidance', 'Learning Disabilities', 'Academic Stress'], experience: 18, rating: 5, reviews: 156, location: 'District HQ Center', languages: ['Hindi', 'English', 'Urdu'] },
  { id: '4', name: 'Ms. Sunita Patel', qualification: 'M.Sc. Clinical Psychology', specializations: ['Personal Counselling', 'Grief Counselling', 'Self-Esteem'], experience: 8, rating: 4, reviews: 72, location: 'Block B Center', languages: ['Hindi', 'Gujarati', 'English'] },
  { id: '5', name: 'Dr. Arun Mishra', qualification: 'Ph.D. Counselling', specializations: ['Career Counselling', 'Skill Development', 'Entrepreneurship'], experience: 20, rating: 5, reviews: 203, location: 'District HQ Center', languages: ['Hindi', 'English'] },
];

const counsellingTypes = [
  'Career Counselling',
  'Educational Guidance',
  'Mental Wellness Counselling',
  'Youth Guidance',
  'Skill Development',
  'Family Counselling',
  'Personal Counselling',
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const nextDays = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return date.toISOString().split('T')[0];
});

export default function BookAppointmentPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [counsellingType, setCounsellingType] = useState('');
  const [notes, setNotes] = useState('');
  const [mode, setMode] = useState<'offline' | 'online'>('offline');
  const [isLoading, setIsLoading] = useState(false);

  const counsellorId = params?.id as string;
  const counsellor = counsellors.find((c) => c.id === counsellorId) || counsellors[0];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-[#1a3a6b] mb-3">Login Required</h2>
          <p className="text-gray-600 text-sm mb-6">Please login to book an appointment with our counsellors.</p>
          <Link href="/login" className="block w-full bg-[#1a3a6b] text-white py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition-colors">
            Login to Continue
          </Link>
          <Link href="/signup" className="block w-full mt-3 border border-[#1a3a6b] text-[#1a3a6b] py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Create New Account
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !counsellingType) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success('Appointment booked successfully! You will receive a confirmation shortly.');
      router.push('/dashboard/client');
    } catch {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* NAVBAR */}
      <nav className="bg-[#1a3a6b] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#1a3a6b] font-bold text-lg">🏛</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">District Counselling Center</p>
                <p className="text-blue-200 text-xs">Govt. of India</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/counselors" className="text-blue-200 hover:text-white text-sm transition-colors">← Back to Counsellors</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/counselors" className="hover:text-white">Counsellors</Link>
            <span>/</span>
            <span className="text-white">Book Appointment</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Book an Appointment</h1>
          <p className="text-blue-100 text-sm">All appointments are free of charge. Please fill in the details below.</p>
        </div>
      </section>

      {/* BOOKING FORM */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Counsellor Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] p-6 text-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(counsellor.name)}&background=1a3a6b&color=fff&size=128`}
                  alt={counsellor.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg mb-3"
                />
                <h2 className="text-white font-bold text-lg">{counsellor.name}</h2>
                <p className="text-blue-200 text-sm">{counsellor.qualification}</p>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-400">{'★'.repeat(counsellor.rating)}</span>
                  <span className="text-gray-500">({counsellor.reviews} reviews)</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><span>🏅</span><span>{counsellor.experience} Years Experience</span></p>
                  <p className="flex items-center gap-2"><span>📍</span><span>{counsellor.location}</span></p>
                  <p className="flex items-center gap-2"><span>🗣</span><span>{counsellor.languages.join(', ')}</span></p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {counsellor.specializations.map((spec) => (
                      <span key={spec} className="bg-blue-50 text-[#1a3a6b] text-xs px-2 py-0.5 rounded-full border border-blue-100">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <p className="text-green-700 font-bold text-sm">🆓 FREE SERVICE</p>
                  <p className="text-green-600 text-xs">No charges for district residents</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-[#1a3a6b] mb-6">Appointment Details</h3>

              <form onSubmit={handleBooking} className="space-y-6">
                {/* Counselling Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Counselling Type *</label>
                  <select
                    value={counsellingType}
                    onChange={(e) => setCounsellingType(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white text-gray-700"
                  >
                    <option value="">Select counselling type...</option>
                    {counsellingTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Session Mode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Session Mode *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'offline', label: 'In-Person', icon: '🏢', desc: 'Visit the center' },
                      { value: 'online', label: 'Online', icon: '💻', desc: 'Video call session' },
                    ].map((m) => (
                      <label
                        key={m.value}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          mode === m.value ? 'border-[#2563eb] bg-blue-50' : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="mode"
                          value={m.value}
                          checked={mode === m.value}
                          onChange={() => setMode(m.value as 'offline' | 'online')}
                          className="sr-only"
                        />
                        <span className="text-2xl">{m.icon}</span>
                        <div>
                          <p className="font-semibold text-sm text-[#1a3a6b]">{m.label}</p>
                          <p className="text-xs text-gray-500">{m.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Select Date *</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {nextDays.slice(0, 14).map((date) => {
                      const d = new Date(date);
                      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                      return (
                        <button
                          key={date}
                          type="button"
                          disabled={isWeekend}
                          onClick={() => setSelectedDate(date)}
                          className={`p-2 rounded-lg border text-center transition-all ${
                            selectedDate === date
                              ? 'border-[#2563eb] bg-[#2563eb] text-white'
                              : isWeekend
                              ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                              : 'border-gray-200 hover:border-[#2563eb] hover:bg-blue-50'
                          }`}
                        >
                          <div className="text-xs font-medium">{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                          <div className="text-sm font-bold">{d.getDate()}</div>
                          <div className="text-xs">{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🕐 Select Time Slot *</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'border-[#2563eb] bg-[#2563eb] text-white'
                            : 'border-gray-200 hover:border-[#2563eb] hover:bg-blue-50 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Brief Description (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly describe what you would like to discuss in the session..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">This information is confidential and will only be shared with your counsellor.</p>
                </div>

                {/* Summary */}
                {selectedDate && selectedTime && counsellingType && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <h4 className="font-bold text-[#1a3a6b] mb-3">📋 Appointment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Counsellor:</span>
                        <span className="font-semibold text-[#1a3a6b]">{counsellor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-semibold text-[#1a3a6b]">{counsellingType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold text-[#1a3a6b]">
                          {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-semibold text-[#1a3a6b]">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mode:</span>
                        <span className="font-semibold text-[#1a3a6b]">{mode === 'online' ? '💻 Online' : '🏢 In-Person'}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-blue-200">
                        <span className="text-gray-600">Charges:</span>
                        <span className="font-bold text-green-600">🆓 FREE</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !selectedDate || !selectedTime || !counsellingType}
                  className="w-full bg-[#1a3a6b] text-white py-3.5 rounded-xl font-semibold text-base hover:bg-[#2563eb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '⏳ Booking Appointment...' : '📅 Confirm Appointment'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our{' '}
                  <a href="#" className="text-[#2563eb] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#2563eb] hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#1a3a6b] text-white py-4 text-center mt-8">
        <p className="text-blue-300 text-xs">© 2025 District Counselling Center, Government of India. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
