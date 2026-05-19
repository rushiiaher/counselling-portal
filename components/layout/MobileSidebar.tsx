"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/config/navigation';

export default function MobileSidebar({ navigation }: { navigation: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Bottom navigation bar for mobile accessibility */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 pb-safe z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
        aria-label="Mobile Navigation"
      >
        {navigation.slice(0, 5).map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[64px] min-h-[48px] focus-visible:ring-2 focus-visible:ring-slate-900 outline-none ${
                isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" aria-hidden="true" />
              <span className="text-[10px] font-medium truncate w-full text-center">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
