"use client";
import React from 'react';

// A mock role switcher for development/demo purposes
export default function RoleSwitcher() {
  return (
    <div className="p-2 border rounded text-xs bg-slate-100 text-slate-600">
      <label className="mr-2">View As:</label>
      <select className="bg-transparent outline-none">
        <option value="STUDENT">Student</option>
        <option value="PARENT">Parent</option>
        <option value="COUNSELLOR">Counsellor</option>
        <option value="ADMIN">Admin</option>
      </select>
    </div>
  );
}
