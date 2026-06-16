import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function CrisisButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" /> Get Help Now
      </button>
    </div>
  );
}
