'use client';

import { Megaphone, Target, Briefcase, BookOpen, Trophy } from 'lucide-react';

export default function NewsTicker() {
  const updates = [
    { icon: Megaphone, text: "New Mental Wellness Program launched for students" },
    { icon: Target, text: "Career Guidance Workshop on Feb 15, 2025" },
    { icon: Briefcase, text: "Free Skill Development Sessions available" },
    { icon: BookOpen, text: "Educational Guidance for Class 11-12 students now open" },
    { icon: Trophy, text: "100% success rate in recent counselling programs" },
  ];

  const renderUpdates = () =>
    updates.map((update, idx) => {
      const Icon = update.icon;
      return (
        <span key={idx} className="inline-flex items-center gap-1.5 mx-3">
          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
          {update.text}
        </span>
      );
    });

  return (
    <div className="gov-ticker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="flex-shrink-0 font-bold uppercase text-sm tracking-wide">
            Latest Updates:
          </span>
          <div className="overflow-hidden flex-1">
            <div className="gov-ticker-content flex items-center">
              {renderUpdates()}
              {renderUpdates()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
