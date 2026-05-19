import React from 'react';

export default function CrisisButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2">
        <span>🚨</span> Get Help Now
      </button>
    </div>
  );
}
