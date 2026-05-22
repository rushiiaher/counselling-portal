"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/config/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';

function UserBrief() {
  const { data: session } = useSession();
  if (!session?.user) return null;
  const initials = session.user.name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() ?? "U";
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-700 truncate">{session.user.name}</p>
        <p className="text-[10px] text-slate-400 truncate">{(session.user as any).role}</p>
      </div>
    </div>
  );
}

export default function Sidebar({ navigation }: { navigation: NavItem[] }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r h-full shadow-sm">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/" className="text-xl font-bold text-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900 outline-none rounded">
          Counselling Portal
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1" aria-label="Main Navigation">
        {navigation.map((item) => {
          // Exact match for home/dashboard, startsWith for subroutes
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 outline-none ${
                isActive 
                  ? "bg-slate-100 text-slate-900 font-medium" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t space-y-2">
        <UserBrief />
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
