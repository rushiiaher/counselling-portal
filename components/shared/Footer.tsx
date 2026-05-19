import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center border-t text-sm text-slate-500 mt-auto">
      &copy; {new Date().getFullYear()} Mental Health Counselling Portal. All rights reserved.
    </footer>
  );
}
