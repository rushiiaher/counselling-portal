'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

const mockAppointments = [
  { id: '1', counsellorName: 'Dr. Priya Sharma', type: 'Career Counselling', date: '2025-01-25', time: '10:00 AM', status: 'pending', mode: 'offline', location: 'District HQ Center' },
  { id: '2', counsellorName: 'Mr. Rajesh Kumar', type: 'Youth Guidance', date: '2025-01-28', time: '2:00 PM', status: 'approved', mode: 'online', location: 'Online (Zoom)' },
  { id: '3', counsellorName: 'Dr. Anita Verma', type: 'Educational Guidance', date: '2025-01-10', time: '11:00 AM', status: 'completed', mode: 'offline', location: 'District HQ Center', notes: 'Discussed stream selection for Class 11. Recommended Science stream based on aptitude test results. Follow-up session scheduled.' },
  { id: '4', counsellorName: 'Ms. Sunita Patel', type: 'Personal Counselling', date: '2024-12-20', time: '3:00 PM', status: 'completed', mode: 'offline', location: 'Block B Center', notes: 'Session focused on stress management techniques. Student showed good progress.' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
};

const navItems = [
  { id: 'overview', label: 'Dashboard', icon: '🏠' },
  { id: 'appointments', label: 'My Appointments', icon: '📅' },
  { id: 'book', label: 'Book Appointment', icon: '➕' },
  { id: 'history', label: 'Session History', icon: '📋' },
  { id: 'resources', label: 'Resources', icon: '📚' },
  { id: 'feedback', label: 'Feedback', icon: '⭐' },
  { id: 'profile', label: 'My Profile', icon: '👤' },
];

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== 'client') {
    redirect('/login');
  }

  const upcoming = mockAppointments.filter((a) => a.status === 'pending' || a.status === 'approved');
  const completed = mockAppointments.filter((a) => a.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a3a6b] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="p-5 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#1a3a6b] font-bold">🏛</span>
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">District Counselling</p>
              <p className="text-blue-300 text-xs">Student Portal</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff&size=48`}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <p className="text-blue-300 text-xs">Student / Citizen</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-white text-[#1a3a6b]'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200 hover:bg-blue-800 hover:text-white transition-colors"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
          <Link href="/" className="mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
            <span>🌐</span>
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-[#1a3a6b]">
              ☰
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#1a3a6b]">
                {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-500">District Counselling Center — Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-[#1a3a6b]">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a3a6b&color=fff&size=32`}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] rounded-2xl p-6 text-white">
                <h2 className="text-xl font-bold mb-1">Welcome back, {user.name}! 👋</h2>
                <p className="text-blue-100 text-sm">Here is an overview of your counselling journey.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Appointments', value: mockAppointments.length, icon: '📅', color: 'bg-blue-50 border-blue-200' },
                  { label: 'Upcoming Sessions', value: upcoming.length, icon: '⏰', color: 'bg-green-50 border-green-200' },
                  { label: 'Completed Sessions', value: completed.length, icon: '✅', color: 'bg-purple-50 border-purple-200' },
                  { label: 'Pending Approval', value: mockAppointments.filter((a) => a.status === 'pending').length, icon: '⏳', color: 'bg-yellow-50 border-yellow-200' },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.color} border rounded-xl p-4`}>
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-[#1a3a6b]">{stat.value}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-base font-bold text-[#1a3a6b] mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Book Appointment', icon: '📅', action: () => setActiveTab('book') },
                    { label: 'View History', icon: '📋', action: () => setActiveTab('history') },
                    { label: 'Download Resources', icon: '📚', action: () => setActiveTab('resources') },
                    { label: 'Submit Feedback', icon: '⭐', action: () => setActiveTab('feedback') },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={action.action}
                      className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#2563eb] hover:bg-blue-50 transition-all text-center"
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-xs font-medium text-[#1a3a6b]">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[#1a3a6b]">Upcoming Appointments</h3>
                  <button onClick={() => setActiveTab('appointments')} className="text-xs text-[#2563eb] hover:underline">View All</button>
                </div>
                {upcoming.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                    <div className="text-4xl mb-3">📅</div>
                    <p className="text-gray-500 text-sm mb-4">No upcoming appointments</p>
                    <button onClick={() => setActiveTab('book')} className="bg-[#1a3a6b] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors">
                      Book Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcoming.map((apt) => (
                      <div key={apt.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(apt.counsellorName)}&background=1a3a6b&color=fff&size=40`}
                            alt={apt.counsellorName}
                            className="w-10 h-10 rounded-full flex-shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-[#1a3a6b] text-sm">{apt.counsellorName}</p>
                            <p className="text-gray-500 text-xs">{apt.type}</p>
                            <p className="text-gray-500 text-xs mt-0.5">📅 {apt.date} at {apt.time} • {apt.mode === 'online' ? '💻 Online' : '🏢 ' + apt.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[apt.status]}`}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                          <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Reschedule</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* APPOINTMENTS TAB */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1a3a6b]">My Appointments</h2>
                <button onClick={() => setActiveTab('book')} className="bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors">
                  + Book New
                </button>
              </div>
              {mockAppointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(apt.counsellorName)}&background=1a3a6b&color=fff&size=48`}
                        alt={apt.counsellorName}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#1a3a6b]">{apt.counsellorName}</p>
                        <p className="text-gray-600 text-sm">{apt.type}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                          <span>📅 {apt.date}</span>
                          <span>🕐 {apt.time}</span>
                          <span>{apt.mode === 'online' ? '💻 Online' : '🏢 ' + apt.location}</span>
                        </div>
                        {apt.notes && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-xs font-semibold text-[#1a3a6b] mb-1">📝 Session Notes:</p>
                            <p className="text-xs text-gray-600">{apt.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColors[apt.status]}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                      {(apt.status === 'pending' || apt.status === 'approved') && (
                        <div className="flex gap-2">
                          <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Reschedule</button>
                          <button className="text-xs border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">Cancel</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BOOK APPOINTMENT TAB */}
          {activeTab === 'book' && (
            <div className="max-w-2xl">
              <h2 className="text-lg font-bold text-[#1a3a6b] mb-6">Book New Appointment</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <p className="text-gray-600 text-sm mb-6">Choose a counsellor and book your free appointment.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: '1', name: 'Dr. Priya Sharma', spec: 'Career & Mental Wellness' },
                    { id: '2', name: 'Mr. Rajesh Kumar', spec: 'Youth & Family Guidance' },
                    { id: '3', name: 'Dr. Anita Verma', spec: 'Educational Guidance' },
                    { id: '5', name: 'Dr. Arun Mishra', spec: 'Career & Skill Development' },
                  ].map((c) => (
                    <Link
                      key={c.id}
                      href={`/book-appointment/${c.id}`}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-[#2563eb] hover:bg-blue-50 transition-all"
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=1a3a6b&color=fff&size=48`}
                        alt={c.name}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-[#1a3a6b] text-sm">{c.name}</p>
                        <p className="text-gray-500 text-xs">{c.spec}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/counselors" className="text-[#2563eb] text-sm hover:underline">View all counsellors →</Link>
                </div>
              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1a3a6b]">Session History</h2>
              {completed.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <p className="text-gray-500 text-sm">No completed sessions yet</p>
                </div>
              ) : (
                completed.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-start gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(apt.counsellorName)}&background=1a3a6b&color=fff&size=48`}
                        alt={apt.counsellorName}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-[#1a3a6b]">{apt.counsellorName}</p>
                            <p className="text-gray-600 text-sm">{apt.type}</p>
                            <p className="text-gray-500 text-xs mt-1">📅 {apt.date} at {apt.time}</p>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full border font-medium bg-blue-100 text-blue-800 border-blue-200">Completed</span>
                        </div>
                        {apt.notes && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-xs font-semibold text-[#1a3a6b] mb-1">📝 Counsellor Notes:</p>
                            <p className="text-xs text-gray-600">{apt.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1a3a6b]">Resources &amp; Downloads</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Career Guidance Handbook', type: 'PDF', size: '2.4 MB', icon: '📄', category: 'Career' },
                  { title: 'Stress Management Techniques', type: 'PDF', size: '1.8 MB', icon: '🧘', category: 'Mental Wellness' },
                  { title: 'College Admission Guide 2025', type: 'PDF', size: '3.2 MB', icon: '🎓', category: 'Education' },
                  { title: 'Skill Development Schemes', type: 'PDF', size: '1.5 MB', icon: '💼', category: 'Skills' },
                  { title: 'Youth Leadership Workbook', type: 'PDF', size: '2.1 MB', icon: '🌱', category: 'Youth' },
                  { title: 'Family Communication Guide', type: 'PDF', size: '1.2 MB', icon: '👨‍👩‍👧', category: 'Family' },
                ].map((resource) => (
                  <div key={resource.title} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{resource.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1a3a6b] text-sm leading-tight">{resource.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{resource.type} • {resource.size}</p>
                        <span className="inline-block mt-1 bg-blue-50 text-[#1a3a6b] text-xs px-2 py-0.5 rounded-full border border-blue-100">{resource.category}</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full bg-[#1a3a6b] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#2563eb] transition-colors">
                      ⬇ Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <div className="max-w-2xl">
              <h2 className="text-lg font-bold text-[#1a3a6b] mb-6">Submit Feedback</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Session</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white text-gray-700">
                    <option>Select a completed session...</option>
                    {completed.map((apt) => (
                      <option key={apt.id}>{apt.counsellorName} — {apt.date}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-3xl text-gray-300 hover:text-yellow-400 transition-colors">★</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback</label>
                  <textarea
                    rows={4}
                    placeholder="Share your experience with the counselling session..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-none"
                  />
                </div>
                <button className="w-full bg-[#1a3a6b] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#2563eb] transition-colors">
                  Submit Feedback
                </button>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <h2 className="text-lg font-bold text-[#1a3a6b] mb-6">My Profile</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a3a6b&color=fff&size=80`}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-4 border-blue-100"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#1a3a6b]">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <span className="inline-block mt-1 bg-blue-50 text-[#1a3a6b] text-xs px-2.5 py-0.5 rounded-full border border-blue-100 font-medium">Student / Citizen</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: user.name, type: 'text' },
                    { label: 'Email Address', value: user.email, type: 'email' },
                    { label: 'Mobile Number', value: '+91 XXXXX XXXXX', type: 'tel' },
                    { label: 'District', value: 'District Headquarters', type: 'text' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      />
                    </div>
                  ))}
                  <button className="w-full bg-[#1a3a6b] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#2563eb] transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
