import React from 'react';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export default function TopNavbar({ navigation }: { navigation: any }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shadow-sm z-30 shrink-0">
      <div className="flex items-center md:hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:z-50">
          Skip to content
        </a>
        <span className="font-bold text-lg text-slate-800">Counselling Portal</span>
      </div>
      
      <div className="hidden md:flex items-center">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:z-50">
          Skip to content
        </a>
        <h2 className="text-lg font-semibold text-slate-800">Portal</h2>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <button 
          className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm focus-visible:ring-2 focus-visible:ring-slate-900 outline-none"
          aria-label="User menu"
        >
          U
        </button>
      </div>
    </header>
  );
}
