import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b py-4 px-6 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold text-slate-800">Counselling Portal</Link>
      <div className="flex gap-4 items-center">
        {/* Navigation links will go here */}
      </div>
    </nav>
  );
}
