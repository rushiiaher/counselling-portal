"use client";

import React from 'react';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import TopNavbar from './TopNavbar';
import { NavItem } from '@/config/navigation';
import CrisisButton from '@/components/shared/CrisisButton';

interface AppShellProps {
  children: React.ReactNode;
  navigation: NavItem[];
}

export default function AppShell({ children, navigation }: AppShellProps) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Desktop Sidebar */}
      <Sidebar navigation={navigation} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar navigation={navigation} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 focus:outline-none" tabIndex={-1} id="main-content">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar/Bottom Nav (Hidden on Desktop) */}
      <MobileSidebar navigation={navigation} />
      
      {/* Global Crisis Button */}
      <CrisisButton />
    </div>
  );
}
