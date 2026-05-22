"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/config/navigation';

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
      
      <div className="p-4 border-t">
        {/* User profile brief or logout can go here */}
      </div>
    </aside>
  );
}
