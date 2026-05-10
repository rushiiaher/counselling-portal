'use client';


import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

const mockUsers = [
  { id: '1', name: 'Amit Sharma', email: 'amit@example.com', role: 'client', status: 'active', joined: '2025-01-10' },
  { id: '2', name: 'Priya Singh', email: 'priya@example.com', role: 'client', status: 'active', joined: '2025-01-12' },
  { id: '3', name: 'Rahul Verma', email: 'rahul@example.com', role: 'client', status: 'inactive', joined: '2025-01-05' },
  { id: '4', name: 'Sunita Patel', email: 'sunita@example.com', role: 'client', status: 'active', joined: '2024-12-20' },
  { id: '5', name: 'Deepak Yadav', email: 'deepak@example.com', role: 'client', status: 'active', joined: '2024-12-15' },
  { id: '6', name: 'Meena Gupta', email: 'meena@example.com', role: 'client', status: 'active', joined: '2024-12-10' },
  { id: '7', name: 'Vikram Joshi', email: 'vikram@example.com', role: 'client', status: 'inactive', joined: '2024-11-28' },
  { id: '8', name: 'Kavita Rao', email: 'kavita@example.com', role: 'client', status: 'active', joined: '2024-11-20' },
];

const mockCounsellors = [
  { id: '1', name: 'Dr. Priya Sharma', email: 'priya.sharma@dcc.gov.in', specialization: 'Career & Mental Wellness', status: 'active', appointments: 24, joined: '2024-06-01' },
  { id: '2', name: 'Mr. Rajesh Kumar', email: 'rajesh.kumar@dcc.gov.in', specialization: 'Youth & Family Guidance', status: 'active', appointments: 18, joined: '2024-06-15' },
  { id: '3', name: 'Dr. Anita Verma', email: 'anita.verma@dcc.gov.in', specialization: 'Educational Guidance', status: 'active', appointments: 31, joined: '2024-05-01' },
  { id: '4', name: 'Ms. Sunita Patel', email: 'sunita.patel@dcc.gov.in', specialization: 'Personal Counselling', status: 'inactive', appointments: 12, joined: '2024-07-01' },
  { id: '5', name: 'Dr. Arun Mishra', email: 'arun.mishra@dcc.gov.in', specialization: 'Career & Skill Development', status: 'active', appointments: 20, joined: '2024-08-01' },
  { id: '6', name: 'Ms. Rekha Nair', email: 'rekha.nair@dcc.gov.in', specialization: 'Mental Health & Wellness', status: 'active', appointments: 15, joined: '2024-09-01' },
];

const mockAppointments = [
  { id: '1', clientName: 'Amit Sharma', counsellorName: 'Dr. Priya Sharma', type: 'Career Counselling', date: '2025-01-27', time: '10:00 AM', status: 'pending', mode: 'offline' },
  { id: '2', clientName: 'Priya Singh', counsellorName: 'Mr. Rajesh Kumar', type: 'Youth Guidance', date: '2025-01-28', time: '11:30 AM', status: 'pending', mode: 'online' },
  { id: '3', clientName: 'Rahul Verma', counsellorName: 'Dr. Anita Verma', type: 'Educational Guidance', date: '2025-01-29', time: '2:00 PM', status: 'approved', mode: 'offline' },
  { id: '4', clientName: 'Sunita Patel', counsellorName: 'Ms. Sunita Patel', type: 'Personal Counselling', date: '2025-01-20', time: '3:00 PM', status: 'completed', mode: 'offline' },
  { id: '5', clientName: 'Deepak Yadav', counsellorName: 'Dr. Priya Sharma', type: 'Career Counselling', date: '2025-01-15', time: '10:00 AM', status: 'completed', mode: 'online' },
  { id: '6', clientName: 'Meena Gupta', counsellorName: 'Dr. Arun Mishra', type: 'Skill Development', date: '2025-01-25', time: '9:00 AM', status: 'approved', mode: 'offline' },
  { id: '7', clientName: 'Vikram Joshi', counsellorName: 'Ms. Rekha Nair', type: 'Mental Wellness', date: '2025-01-22', time: '4:00 PM', status: 'rejected', mode: 'online' },
  { id: '8', clientName: 'Kavita Rao', counsellorName: 'Mr. Rajesh Kumar', type: 'Family Guidance', date: '2025-01-30', time: '11:00 AM', status: 'pending', mode: 'offline' },
  { id: '9', clientName: 'Amit Sharma', counsellorName: 'Dr. Anita Verma', type: 'Educational Guidance', date: '2025-01-18', time: '2:30 PM', status: 'completed', mode: 'offline' },
  { id: '10', clientName: 'Priya Singh', counsellorName: 'Dr. Priya Sharma', type: 'Career Counselling', date: '2025-01-16', time: '10:00 AM', status: 'completed', mode: 'online' },
];

const recentActivity = [
  { id: '1', text: 'New appointment booked by Amit Sharma', time: '5 min ago', icon: '📅' },
  { id: '2', text: 'Dr. Priya Sharma approved appointment #3', time: '12 min ago', icon: '✅' },
  { id: '3', text: 'New user registered: Kavita Rao', time: '1 hr ago', icon: '👤' },
  { id: '4', text: 'Session completed: Deepak Yadav with Dr. Priya Sharma', time: '2 hr ago', icon: '🎯' },
  { id: '5', text: 'Feedback submitted for session #5', time: '3 hr ago', icon: '⭐' },
  { id: '6', text: 'Counsellor Ms. Rekha Nair updated availability', time: '4 hr ago', icon: '🗓️' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-500 border-gray-200',
};

const navItems = [
  { id: 'overview', label: 'Overview', icon: '🏠' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'counsellors', label: 'Counsellor Management', icon: '🩺' },
  { id: 'appointments', label: 'Appointment Management', icon: '📅' },
  { id: 'reports', label: 'Reports & Analytics', icon: '📊' },
  { id: 'feedback', label: 'Feedback', icon: '⭐' },
  { id: 'contact', label: 'Contact Inquiries', icon: '📬' },
  { id: 'settings', label: 'System Settings', icon: '⚙️' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [aptFilter, setAptFilter] = useState('all');
  const [appointments, setAppointments] = useState(mockAppointments);
  const [users, setUsers] = useState(mockUsers);
  const [counsellors, setCounsellors] = useState(mockCounsellors);
  const [settings, setSettings] = useState({
    platformName: 'District Counselling Center',
    supportEmail: 'support@dcc.gov.in',
    helpline: '1800-XXX-XXXX',
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    minPasswordLength: '8',
    requireSpecialChar: true,
  });

  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  const totalUsers = users.length;
  const totalCounsellors = counsellors.length;
  const totalAppointments = appointments.length;
  const pendingApprovals = appointments.filter((a) => a.status === 'pending').length;
  const completedSessions = appointments.filter((a) => a.status === 'completed').length;
  const activeToday = appointments.filter((a) => a.status === 'approved').length;

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredApts = aptFilter === 'all' ? appointments : appointments.filter((a) => a.status === aptFilter);

  const handleApproveApt = (id: string) => setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: 'approved' } : a));
  const handleRejectApt = (id: string) => setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: 'rejected' } : a));
  const toggleUserStatus = (id: string) => setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  const toggleCounsellorStatus = (id: string) => setCounsellors((prev) => prev.map((c) => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));

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
              <p className="text-blue-300 text-xs">Admin Portal</p>
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
              <p className="text-blue-300 text-xs">Administrator</p>
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
              {item.id === 'appointments' && pendingApprovals > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{pendingApprovals}</span>
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
              <p className="text-xs text-gray-500">District Counselling Center — Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-[#1a3a6b]">
              🔔
              {pendingApprovals > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
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
                <h2 className="text-xl font-bold mb-1">Admin Dashboard 🏛</h2>
                <p className="text-blue-100 text-sm">District Counselling Center — Platform Overview</p>
              </div>

              {/* 6 Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Total Users', value: totalUsers, icon: '👥', color: 'bg-blue-50 border-blue-200' },
                  { label: 'Total Counsellors', value: totalCounsellors, icon: '🩺', color: 'bg-indigo-50 border-indigo-200' },
                  { label: 'Total Appointments', value: totalAppointments, icon: '📅', color: 'bg-purple-50 border-purple-200' },
                  { label: 'Pending Approvals', value: pendingApprovals, icon: '⏳', color: 'bg-yellow-50 border-yellow-200' },
                  { label: 'Completed Sessions', value: completedSessions, icon: '✅', color: 'bg-green-50 border-green-200' },
                  { label: 'Active Today', value: activeToday, icon: '🟢', color: 'bg-teal-50 border-teal-200' },
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
                    { label: 'Manage Users', icon: '👥', action: () => setActiveTab('users') },
                    { label: 'Manage Counsellors', icon: '🩺', action: () => setActiveTab('counsellors') },
                    { label: 'Review Appointments', icon: '📅', action: () => setActiveTab('appointments') },
                    { label: 'View Reports', icon: '📊', action: () => setActiveTab('reports') },
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

              {/* Recent Activity Feed */}
              <div>
                <h3 className="text-base font-bold text-[#1a3a6b] mb-3">Recent Activity</h3>
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-4">
                      <span className="text-xl flex-shrink-0">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">{activity.text}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* USER MANAGEMENT TAB */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-bold text-[#1a3a6b]">User Management</h2>
                <button className="bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors self-start sm:self-auto">
                  + Add User
                </button>
              </div>
              {/* Search */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>
              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Email</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Role</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Status</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Joined</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=1a3a6b&color=fff&size=32`}
                                alt={u.name}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                              />
                              <span className="font-medium text-[#1a3a6b]">{u.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{u.email}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="bg-blue-50 text-[#1a3a6b] border border-blue-100 text-xs px-2 py-0.5 rounded-full font-medium capitalize">{u.role}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[u.status]}`}>
                              {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-500">{u.joined}</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button className="text-xs text-[#2563eb] border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                              <button
                                onClick={() => toggleUserStatus(u.id)}
                                className={`text-xs border px-2.5 py-1 rounded-lg transition-colors ${u.status === 'active' ? 'text-orange-600 border-orange-200 hover:bg-orange-50' : 'text-green-600 border-green-200 hover:bg-green-50'}`}
                              >
                                {u.status === 'active' ? 'Deactivate' : 'Activate'}
                              </button>
                              <button className="text-xs text-red-600 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredUsers.length === 0 && (
                  <div className="p-8 text-center text-gray-500 text-sm">No users found matching your search.</div>
                )}
              </div>
            </div>
          )}

          {/* COUNSELLOR MANAGEMENT TAB */}
          {activeTab === 'counsellors' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-bold text-[#1a3a6b]">Counsellor Management</h2>
                <button className="bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2563eb] transition-colors self-start sm:self-auto">
                  + Add Counsellor
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Specialization</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Appointments</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Status</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Joined</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {counsellors.map((c) => (
                        <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=2563eb&color=fff&size=32`}
                                alt={c.name}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                              />
                              <div>
                                <p className="font-medium text-[#1a3a6b]">{c.name}</p>
                                <p className="text-xs text-gray-400">{c.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-xs">{c.specialization}</td>
                          <td className="py-3 px-4 text-center font-semibold text-[#1a3a6b]">{c.appointments}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[c.status]}`}>
                              {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-500">{c.joined}</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button className="text-xs text-[#2563eb] border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                              <button
                                onClick={() => toggleCounsellorStatus(c.id)}
                                className={`text-xs border px-2.5 py-1 rounded-lg transition-colors ${c.status === 'active' ? 'text-orange-600 border-orange-200 hover:bg-orange-50' : 'text-green-600 border-green-200 hover:bg-green-50'}`}
                              >
                                {c.status === 'active' ? 'Deactivate' : 'Activate'}
                              </button>
                              <button className="text-xs text-red-600 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* APPOINTMENT MANAGEMENT TAB */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-bold text-[#1a3a6b]">Appointment Management</h2>
                {/* Status Filter */}
                <select
                  value={aptFilter}
                  onChange={(e) => setAptFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white text-gray-700 self-start sm:self-auto"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Client</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Counsellor</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Type</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Date &amp; Time</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Mode</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Status</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApts.map((apt) => (
                        <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-[#1a3a6b]">{apt.clientName}</td>
                          <td className="py-3 px-4 text-gray-600 text-xs">{apt.counsellorName}</td>
                          <td className="py-3 px-4 text-gray-600 text-xs">{apt.type}</td>
                          <td className="py-3 px-4 text-center text-gray-500 text-xs whitespace-nowrap">{apt.date}<br />{apt.time}</td>
                          <td className="py-3 px-4 text-center text-xs">
                            <span className={`px-2 py-0.5 rounded-full border font-medium ${apt.mode === 'online' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                              {apt.mode === 'online' ? '💻 Online' : '🏢 Offline'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[apt.status]}`}>
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {apt.status === 'pending' && (
                              <div className="flex items-center justify-center gap-1.5">
                                <button onClick={() => handleApproveApt(apt.id)} className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 transition-colors font-medium">✓ Approve</button>
                                <button onClick={() => handleRejectApt(apt.id)} className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-lg hover:bg-red-600 transition-colors font-medium">✗ Reject</button>
                              </div>
                            )}
                            {apt.status === 'approved' && (
                              <button className="text-xs text-[#2563eb] border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors">Reschedule</button>
                            )}
                            {(apt.status === 'completed' || apt.status === 'rejected') && (
                              <span className="text-xs text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredApts.length === 0 && (
                  <div className="p-8 text-center text-gray-500 text-sm">No appointments found for the selected filter.</div>
                )}
              </div>
            </div>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1a3a6b]">Reports &amp; Analytics</h2>
                <button className="text-xs bg-[#1a3a6b] text-white px-4 py-2 rounded-lg hover:bg-[#2563eb] transition-colors font-medium">⬇ Export Report</button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Sessions', value: totalAppointments, color: 'bg-blue-50 border-blue-200 text-blue-700' },
                  { label: 'Completed', value: completedSessions, color: 'bg-green-50 border-green-200 text-green-700' },
                  { label: 'Pending', value: pendingApprovals, color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                  { label: 'Active Counsellors', value: counsellors.filter((c) => c.status === 'active').length, color: 'bg-purple-50 border-purple-200 text-purple-700' },
                ].map((s) => (
                  <div key={s.label} className={`${s.color} border rounded-xl p-4`}>
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs mt-0.5 opacity-80">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CSS Bar Chart */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-[#1a3a6b] mb-4">Monthly Appointments (Bar Chart)</h3>
                <div className="space-y-3">
                  {[
                    { month: 'August 2024', count: 32 },
                    { month: 'September 2024', count: 45 },
                    { month: 'October 2024', count: 38 },
                    { month: 'November 2024', count: 52 },
                    { month: 'December 2024', count: 41 },
                    { month: 'January 2025', count: 28 },
                  ].map((row) => (
                    <div key={row.month} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-32 flex-shrink-0">{row.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1a3a6b] to-[#2563eb] rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${(row.count / 52) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">{row.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Stats Table */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-[#1a3a6b] mb-4">Monthly Statistics Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Month</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">Appointments</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">Completed</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">New Users</th>
                        <th className="text-center py-2 px-3 text-gray-500 font-semibold">Active Counsellors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { month: 'November 2024', appointments: 52, completed: 48, newUsers: 14, activeCounsellors: 6 },
                        { month: 'December 2024', appointments: 41, completed: 38, newUsers: 10, activeCounsellors: 5 },
                        { month: 'January 2025', appointments: 28, completed: 10, newUsers: 8, activeCounsellors: 5 },
                      ].map((row) => (
                        <tr key={row.month} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-3 font-medium text-[#1a3a6b]">{row.month}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{row.appointments}</td>
                          <td className="py-3 px-3 text-center text-green-600 font-medium">{row.completed}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{row.newUsers}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{row.activeCounsellors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1a3a6b]">Feedback</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: '1', user: 'Amit Sharma', counsellor: 'Dr. Priya Sharma', rating: 5, comment: 'Excellent session! Very helpful guidance on career options.', date: '2025-01-20' },
                  { id: '2', user: 'Sunita Patel', counsellor: 'Ms. Sunita Patel', rating: 4, comment: 'Good session. The counsellor was very understanding and supportive.', date: '2025-01-18' },
                  { id: '3', user: 'Deepak Yadav', counsellor: 'Dr. Priya Sharma', rating: 5, comment: 'Very professional. Helped me prepare for interviews effectively.', date: '2025-01-15' },
                  { id: '4', user: 'Kavita Rao', counsellor: 'Mr. Rajesh Kumar', rating: 4, comment: 'Informative session. Would recommend to others.', date: '2025-01-12' },
                ].map((fb) => (
                  <div key={fb.id} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fb.user)}&background=1a3a6b&color=fff&size=36`}
                          alt={fb.user}
                          className="w-9 h-9 rounded-full flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-[#1a3a6b] text-sm">{fb.user}</p>
                          <p className="text-gray-500 text-xs">for {fb.counsellor}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{fb.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-lg ${star <= fb.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{fb.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT INQUIRIES TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1a3a6b]">Contact Inquiries</h2>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-semibold">Subject</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Date</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Status</th>
                        <th className="text-center py-3 px-4 text-gray-500 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: '1', name: 'Ravi Kumar', email: 'ravi@example.com', subject: 'Appointment booking issue', date: '2025-01-26', status: 'open' },
                        { id: '2', name: 'Ananya Sharma', email: 'ananya@example.com', subject: 'Request for career counselling', date: '2025-01-25', status: 'resolved' },
                        { id: '3', name: 'Mohan Das', email: 'mohan@example.com', subject: 'Unable to login to portal', date: '2025-01-24', status: 'open' },
                        { id: '4', name: 'Lata Mishra', email: 'lata@example.com', subject: 'Feedback on session quality', date: '2025-01-22', status: 'resolved' },
                      ].map((inquiry) => (
                        <tr key={inquiry.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-[#1a3a6b]">{inquiry.name}</td>
                          <td className="py-3 px-4 text-gray-600">{inquiry.email}</td>
                          <td className="py-3 px-4 text-gray-600">{inquiry.subject}</td>
                          <td className="py-3 px-4 text-center text-gray-500">{inquiry.date}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${inquiry.status === 'open' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                              {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="text-xs text-[#2563eb] border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                              {inquiry.status === 'open' ? 'Reply' : 'View'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-lg font-bold text-[#1a3a6b]">System Settings</h2>

              {/* Platform Settings */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-[#1a3a6b] mb-4">Platform Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Platform Name</label>
                    <input
                      type="text"
                      value={settings.platformName}
                      onChange={(e) => setSettings((prev) => ({ ...prev, platformName: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Support Email</label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => setSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Helpline Number</label>
                    <input
                      type="text"
                      value={settings.helpline}
                      onChange={(e) => setSettings((prev) => ({ ...prev, helpline: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-[#1a3a6b] mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send email alerts for new appointments and updates' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Send SMS reminders to users and counsellors' },
                    { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Send reminders 24 hours before scheduled sessions' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setSettings((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${settings[item.key as keyof typeof settings] ? 'bg-[#2563eb]' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Password Policy */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-[#1a3a6b] mb-4">Password Policy</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Minimum Password Length</label>
                    <input
                      type="number"
                      min="6"
                      max="20"
                      value={settings.minPasswordLength}
                      onChange={(e) => setSettings((prev) => ({ ...prev, minPasswordLength: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Require Special Characters</p>
                      <p className="text-xs text-gray-500 mt-0.5">Passwords must contain at least one special character</p>
                    </div>
                    <button
                      onClick={() => setSettings((prev) => ({ ...prev, requireSpecialChar: !prev.requireSpecialChar }))}
                      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${settings.requireSpecialChar ? 'bg-[#2563eb]' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.requireSpecialChar ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#1a3a6b] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#2563eb] transition-colors">
                💾 Save All Settings
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
