'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      // Role-based redirect handled by auth context
      if (email.includes('admin')) router.push('/dashboard/admin');
      else if (email.includes('counselor') || email.includes('counsellor')) router.push('/dashboard/counselor');
      else router.push('/dashboard/client');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
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
              <span className="text-blue-200 text-sm">Don&apos;t have an account?</span>
              <Link href="/signup" className="bg-white text-[#1a3a6b] px-4 py-1.5 rounded text-sm hover:bg-blue-100 transition-colors font-medium">Register</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* LOGIN FORM */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1a3a6b] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1a3a6b] mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to your District Counselling Center account</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-xs font-semibold text-[#1a3a6b] mb-2">🔑 Demo Credentials:</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Student:</span> client@example.com / password</p>
                <p><span className="font-medium">Counsellor:</span> counselor@example.com / password</p>
                <p><span className="font-medium">Admin:</span> admin@example.com / password</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs text-[#2563eb] hover:underline">Forgot Password?</a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 text-[#2563eb] border-gray-300 rounded" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me for 30 days</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1a3a6b] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#2563eb] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? '⏳ Signing In...' : '🔐 Sign In to Portal'}
              </button>
            </form>

            <div className="text-center mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#2563eb] hover:underline font-semibold">
                  Register Here
                </Link>
              </p>
            </div>
          </div>

          {/* Help Text */}
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
