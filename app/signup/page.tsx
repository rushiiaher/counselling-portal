'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/lib/auth-context';
import { toast } from 'sonner';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client' as UserRole,
    district: '',
    gender: '',
    dob: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name, formData.role);
      toast.success('Account created successfully! Welcome to District Counselling Center.');
      router.push(`/dashboard/${formData.role}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
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
              <span className="text-blue-200 text-sm">Already have an account?</span>
              <Link href="/login" className="text-white border border-white px-4 py-1.5 rounded text-sm hover:bg-white hover:text-[#1a3a6b] transition-colors font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* REGISTRATION FORM */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1a3a6b] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📝</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1a3a6b] mb-2">Create Your Account</h1>
            <p className="text-gray-600 text-sm">Register to access free counselling services from District Counselling Center</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {/* Role Selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">I am registering as:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'client', label: 'Student / Citizen', icon: '🎓', desc: 'Seeking counselling services' },
                  { value: 'counselor', label: 'Counsellor', icon: '👨‍⚕️', desc: 'Providing counselling services' },
                  { value: 'admin', label: 'Administrator', icon: '🏛', desc: 'Managing the portal' },
                ].map((role) => (
                  <label
                    key={role.value}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.role === role.value
                        ? 'border-[#2563eb] bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-2xl mb-1">{role.icon}</span>
                    <span className="font-semibold text-sm text-[#1a3a6b]">{role.label}</span>
                    <span className="text-xs text-gray-500 text-center mt-0.5">{role.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white text-gray-700"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth</label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">District</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white text-gray-700"
                >
                  <option value="">Select Your District</option>
                  <option value="district-hq">District Headquarters</option>
                  <option value="block-a">Block A</option>
                  <option value="block-b">Block B</option>
                  <option value="block-c">Block C</option>
                  <option value="block-d">Block D</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password *</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password *</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" required className="w-4 h-4 mt-0.5 text-[#2563eb] border-gray-300 rounded" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-[#2563eb] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#2563eb] hover:underline">Privacy Policy</a>
                  {' '}of District Counselling Center
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1a3a6b] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#2563eb] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? '⏳ Creating Account...' : '📝 Create My Account'}
              </button>
            </form>

            <div className="text-center mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-[#2563eb] hover:underline font-semibold">
                  Sign In Here
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Need help? Call our helpline:{' '}
              <a href="tel:1800XXXXXXX" className="text-[#2563eb] font-medium">1800-XXX-XXXX</a>
              {' '}(Toll Free)
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#1a3a6b] text-white py-4 text-center">
        <p className="text-blue-300 text-xs">© 2025 District Counselling Center, Government of India. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
