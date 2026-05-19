import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 h-full min-h-screen bg-slate-50 border-r flex flex-col p-4 hidden md:flex">
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="p-2 hover:bg-slate-200 rounded text-slate-700">Dashboard</Link>
        <Link href="/appointments" className="p-2 hover:bg-slate-200 rounded text-slate-700">Appointments</Link>
      </nav>
    </aside>
  );
}
