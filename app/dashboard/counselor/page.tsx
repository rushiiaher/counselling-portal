'use client';


import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

const mockAppointments = [
  { id: '1', clientName: 'Amit Sharma', type: 'Career Counselling', date: '2025-01-27', time: '10:00 AM', status: 'pending', mode: 'offline', notes: '' },
  { id: '2', clientName: 'Priya Singh', type: 'Educational Guidance', date: '2025-01-28', time: '11:30 AM', status: 'pending', mode: 'online', notes: '' },
  { id: '3', clientName: 'Rahul Verma', type: 'Personal Counselling', date: '2025-01-29', time: '2:00 PM', status: 'approved', mode: 'offline', notes: '' },
  { id: '4', clientName: 'Sunita Patel', type: 'Youth Guidance', date: '2025-01-20', time: '3:00 PM', status: 'completed', mode: 'offline', notes: 'Discussed career options. Student is interested in engineering. Recommended aptitude test.' },
  { id: '5', clientName: 'Deepak Yadav', type: 'Career Counselling', date: '2025-01-15', time: '10:00 AM', status: 'completed', mode: 'online', notes: 'Session focused on resume building and interview preparation. Good progress noted.' },
];

const mockClients = [
  { id: '1', name: 'Amit Sharma', email: 'amit@example.com', phone: '+91 98765 43210', sessions: 1, lastSession: '2025-01-27', status: 'active' },
  { id: '2', name: 'Priya Singh', email: 'priya@example.com', phone: '+91 87654 32109', sessions: 1, lastSession: '2025-01-28', status: 'active' },
  { id: '3', name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 76543 21098', sessions: 2, lastSession: '2025-01-29', status: 'active' },
  { id: '4', name: 'Sunita Patel', email: 'sunita@example.com', phone: '+91 65432 10987', sessions: 3, lastSession: '2025-01-20', status: 'active' },
  { id: '5', name: 'Deepak Yadav', email: 'deepak@example.com', phone: '+91 54321 09876', sessions: 2, lastSession: '2025-01-15', status: 'inactive' },
];

const mockNotes = [
  { id: '1', clientName: 'Sunita Patel', date: '2025-01-20', type: 'Career Counselling', content: 'Discussed career options. Student is interested in engineering. Recommended aptitude test. Follow-up in 2 weeks.' },
  { id: '2', clientName: 'Deepak Yadav', date: '2025-01-15', type: 'Career Counselling', content: 'Session focused on resume building and interview preparation. Good progress noted. Shared resources for online courses.' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
};

const navItems = [
  { id: 'overview', label: 'Overview', icon: '🏠' },
  { id: 'appointments', label: 'My Appointments', icon: '📅' },
  { id: 'schedule', label: 'Schedule / Availability', icon: '🗓️' },
  { id: 'notes', label: 'Session Notes', icon: '📝' },
  { id: 'clients', label: 'My Clients', icon: '👥' },
  { id: 'reports', label: 'Reports', icon: '📊' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initialAvailability: Record<string, Record<string, boolean>> = {};
weekDays.forEach((day) => {
  initialAvailability[day] = {};
  timeSlots.forEach((slot) => {
    initialAvailability[day][slot] = day !== 'Saturday' && slot !== '1:00 PM';
  });
});

export default function CounselorDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availability, setAvailability] = useState(initialAvailability);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [noteForm, setNoteForm] = useState({ appointmentId: '', content: '' });
  const [notes, setNotes] = useState(mockNotes);
  const [profileForm, setProfileForm] = useState({
    name: 'Dr. Priya Sharma',
    qualification: 'M.Sc. Psychology, Ph.D. Counselling',
    specializations: 'Career Counselling, Mental Wellness, Youth Guidance',
    bio: 'Experienced counsellor with 10+ years in educational and career guidance. Committed to helping students and citizens achieve their full potential.',
    languages: 'Hindi, English, Marathi',
  });

  if (!user || user.role !== 'counselor') {
    redirect('/login');
  }

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const approvedCount = appointments.filter((a) => a.status === 'approved').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const thisWeek = appointments.filter((a) => a.status !== 'rejected').length;

  const handleAccept = (id: string) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: 'approved' } : a));
  };

  const handleReject = (id: string) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: 'rejected' } : a));
  };

  const handleAddNote = () => {
    if (!noteForm.appointmentId || !noteForm.content.trim()) return;
    const apt = appointments.find((a) => a.id === noteForm.appointmentId);
    if (!apt) return;
    const newNote = {
      id: String(notes.length + 1),
      clientName: apt.clientName,
      date: apt.date,
      type: apt.type,
      content: noteForm.content,
    };
    setNotes((prev) => [newNote, ...prev]);
    setNoteForm({ appointmentId: '', content: '' });
  };

  const toggleSlot = (day: string, slot: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: !prev[day][slot] },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a3a6b] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="p-5 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#1a3a6b] font-bold text-lg">🏛</span>
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">District Counselling</p>
              <p className="text-blue-300 text-xs">Counsellor Portal</p>
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
              <p className="text-blue-300 text-xs">Counsellor</p>
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
              {item.id === 'appointments' && pendingCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{pendingCount}</span>
              )}
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

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-[#1a3a6b] text-xl">☰</button>
            <div>
              <h1 className="text-lg font-bold text-[#1a3a6b]">
                {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-500">District Counselling Center — Counsellor Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-[#1a3a6b]">
              🔔
              {pendingCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
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
                <h2 className="text-xl font-bold mb-1">Welcome, {user.name}! 👋</h2>
                <p className="text-blue-100 text-sm">Here is your counselling dashboard overview.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Clients', value: mockClients.length, icon: '👥', color: 'bg-blue-50 border-blue-200' },
                  { label: 'This Week', value: thisWeek, icon: '📅', color: 'bg-green-50 border-green-200' },
                  { label: 'Completed Sessions', value: completedCount, icon: '✅', color: 'bg-purple-50 border-purple-200' },
                  { label: 'Avg. Rating', value: '4.8 ★', icon: '⭐', color: 'bg-yellow-50 border-yellow-200' },
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
                    { label: 'View Appointments', icon: '📅', action: () => setActiveTab('appointments') },
                    { label: 'Manage Schedule', icon: '🗓️', action: () => setActiveTab('schedule') },
                    { label: 'Add Session Note', icon: '📝', action: () => setActiveTab('notes') },
                    { label: 'View Clients', icon: '👥', action: () => setActiveTab('clients') },
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
                <div className="space-y-3">
                  {appointments.filter((a) => a.status === 'pending' || a.status === 'approved').map((apt) => (
                    <div key={apt.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(apt.clientName)}&background=1a3a6b&color=fff&size=40`}
                          alt={apt.clientName}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-[#1a3a6b] text-sm">{apt.clientName}</p>
                          <p className="text-gray-500 text-xs">{apt.type}</p>
                          <p className="text-gray-500 text-xs mt-0.5">📅 {apt.date} at {apt.time} • {apt.mode === 'online' ? '💻 Online' : '🏢 Offline'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[apt.status]}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                        {apt.status === 'pending' && (
                          <>
                            <button onClick={() => handleAccept(apt.id)} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">Accept</button>
                            <button onClick={() => handleReject(apt.id)} className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">Reject</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {appointments.filter((a) => a.status === 'pending' || a.status === 'approved').length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                      <div className="text-4xl mb-3">📅</div>
                      <p className="text-gray-500 text-sm">No upcoming appointments</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* APPOINTMENTS TAB */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1a3a6b]">My Appointments</h2>
                <div className="flex gap-2 text-xs">
                  <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-2.5 py-1 rounded-full font-medium">{pendingCount} Pending</span>
                  <span className="bg-green-100 text-green-800 border border-green-200 px-2.5 py-1 rounded-full font-medium">{approvedCount} Approved</span>
                  <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full font-medium">{completedCount} Completed</span>
                </div>
              </div>
              {appointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(apt.clientName)}&background=1a3a6b&color=fff&size=48`}
                        alt={apt.clientName}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#1a3a6b]">{apt.clientName}</p>
                        <p className="text-gray-600 text-sm">{apt.type}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                          <span>📅 {apt.date}</span>
                          <span>🕐 {apt.time}</span>
                          <span>{apt.mode === 'online' ? '💻 Online' : '🏢 Offline'}</span>
                        </div>
                        {apt.notes && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-xs font-semibold text-[#1a3a6b] mb-1">📝 Session Notes:</p>
                            <p className="text-xs text-gray-600">{apt.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColors[apt.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                      {apt.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => handleAccept(apt.id)} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium">✓ Accept</button>
                          <button onClick={() => handleReject(apt.id)} className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors font-medium">✗ Reject</button>
                        </div>
                      )}
                      {apt.status === 'approved' && (
                        <button
                          onClick={() => { setNoteForm({ appointmentId: apt.id, content: '' }); setActiveTab('notes'); }}
                          className="text-xs bg-[#1a3a6b] text-white px-3 py-1.5 rounded-lg hover:bg-[#2563eb] transition-colors font-medium"
                        >
                          📝 Add Notes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1a3a6b]">Schedule &amp; Availability</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">Click a slot to toggle availability</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 overflow-x-auto">
                <table className="w-full min-w-[600px] text-xs">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 text-gray-500 font-semibold w-24">Time</th>
                      {weekDays.map((day) => (
                        <th key={day} className="text-center py-2 px-2 text-[#1a3a6b] font-semibold">{day.slice(0, 3)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => (
                      <tr key={slot} className="border-t border-gray-50">
                        <td className="py-2 px-3 text-gray-500 font-medium whitespace-nowrap">{slot}</td>
                        {weekDays.map((day) => (
                          <td key={day} className="py-1.5 px-2 text-center">
                            <button
                              onClick={() => toggleSlot(day, slot)}
                              className={`w-full py-1.5 rounded-md text-xs font-medium transition-colors ${
                                availability[day]?.[slot]
                                  ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200'
                              }`}
                            >
                              {availability[day]?.[slot] ? 'Available' : 'Off'}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-green-100 border border-green-200 inline-block"></span> Available</div>
                <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-gray-100 border border-gray-200 inline-block"></span> Not Available</div>
              </div>
              <button className="bg-[#1a3a6b] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors">
                Save Availability
              </button>
            </div>
          )}

          {/* SESSION NOTES TAB */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#1a3a6b]">Session Notes</h2>

              {/* Add Note Form */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-[#1a3a6b] mb-4">Add New Note</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Session</label>
                    <select
                      value={noteForm.appointmentId}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, appointmentId: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white text-gray-700"
                    >
                      <option value="">Select a session...</option>
                      {appointments.filter((a) => a.status === 'approved' || a.status === 'completed').map((apt) => (
                        <option key={apt.id} value={apt.id}>{apt.clientName} — {apt.date} ({apt.type})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Session Notes</label>
                    <textarea
                      rows={5}
                      value={noteForm.content}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Write detailed session notes here — observations, recommendations, follow-up actions..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-none"
                    />
                  </div>
                  <button
                    onClick={handleAddNote}
                    className="bg-[#1a3a6b] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors"
                  >
                    💾 Save Note
                  </button>
                </div>
              </div>

              {/* Past Notes */}
              <div>
                <h3 className="text-base font-bold text-[#1a3a6b] mb-3">Past Session Notes</h3>
                {notes.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-gray-500 text-sm">No session notes yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="bg-white rounded-xl border border-gray-100 p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(note.clientName)}&background=1a3a6b&color=fff&size=40`}
                              alt={note.clientName}
                              className="w-10 h-10 rounded-full flex-shrink-0"
                            />
                            <div>
                              <p className="font-bold text-[#1a3a6b] text-sm">{note.clientName}</p>
                              <p className="text-gray-500 text-xs">{note.type} • {note.date}</p>
                            </div>
                          </div>
                          <button className="text-xs text-[#2563eb] hover:underline flex-shrink-0">Edit</button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MY CLIENTS TAB */}
          {activeTab === 'clients' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1a3a6b]">My Clients</h2>
                <span className="text-sm text-gray-500">{mockClients.length} total clients</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockClients.map((client) => (
                  <div key={client.id} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=1a3a6b&color=fff&size=48`}
                        alt={client.name}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-[#1a3a6b] truncate">{client.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${client.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                            {client.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mt-0.5">{client.email}</p>
                        <p className="text-gray-500 text-xs">{client.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-50">
                      <span>📅 {client.sessions} session{client.sessions !== 1 ? 's' : ''}</span>
                      <span>Last: {client.lastSession}</span>
                      <button className="text-[#2563eb] hover:underline font-medium">View History</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#1a3a6b]">Reports</h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Sessions', value: appointments.length, color: 'bg-blue-50 border-blue-200 text-blue-700' },
                  { label: 'Completed', value: completedCount, color: 'bg-green-50 border-green-200 text-green-700' },
                  { label: 'Pending', value: pendingCount, color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                  { label: 'Clients Served', value: mockClients.length, color: 'bg-purple-50 border-purple-200 text-purple-700' },
                ].map((s) => (
                  <div key={s.label} className={`${s.color} border rounded-xl p-4`}>
                    <div className={`text-2xl font-bold`}>{s.value}</div>
                    <div className="text-xs mt-0.5 opacity-80">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Monthly Bar Chart (CSS) */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-[#1a3a6b] mb-4">Monthly Sessions (CSS Chart)</h3>
                <div className="space-y-3">
                  {[
                    { month: 'August', sessions: 8 },
                    { month: 'September', sessions: 12 },
                    { month: 'October', sessions: 10 },
                    { month: 'November', sessions: 15 },
                    { month: 'December', sessions: 9 },
                    { month: 'January', sessions: 5 },
                  ].map((row) => (
                    <div key={row.month} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-20 flex-shrink-0">{row.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                        <div
                          className="h-full bg-[#2563eb] rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                          style={{ width: `${(row.sessions / 15) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">{row.sessions}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Stats Table */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#1a3a6b]">Monthly Statistics</h3>
                  <button className="text-xs bg-[#1a3a6b] text-white px-4 py-2 rounded-lg hover:bg-[#2563eb] transition-colors font-medium">⬇ Export Report</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Month</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">Sessions</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">Clients</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">Completed</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { month: 'November 2024', sessions: 15, clients: 12, completed: 14, rating: '4.9' },
                        { month: 'December 2024', sessions: 9, clients: 8, completed: 9, rating: '4.7' },
                        { month: 'January 2025', sessions: 5, clients: 5, completed: 2, rating: '4.8' },
                      ].map((row) => (
                        <tr key={row.month} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-3 font-medium text-[#1a3a6b]">{row.month}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{row.sessions}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{row.clients}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{row.completed}</td>
                          <td className="py-3 px-3 text-center text-yellow-600 font-medium">{row.rating} ★</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <h2 className="text-lg font-bold text-[#1a3a6b] mb-6">My Profile</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a3a6b&color=fff&size=80`}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-4 border-blue-100"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#1a3a6b]">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <span className="inline-block mt-1 bg-blue-50 text-[#1a3a6b] text-xs px-2.5 py-0.5 rounded-full border border-blue-100 font-medium">Counsellor</span>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Qualification</label>
                    <input
                      type="text"
                      value={profileForm.qualification}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, qualification: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Specializations</label>
                    <input
                      type="text"
                      value={profileForm.specializations}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, specializations: e.target.value }))}
                      placeholder="e.g. Career Counselling, Mental Wellness"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Languages Known</label>
                    <input
                      type="text"
                      value={profileForm.languages}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, languages: e.target.value }))}
                      placeholder="e.g. Hindi, English, Marathi"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Professional Bio</label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-none"
                    />
                  </div>
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
