"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarDays, MapPin } from "lucide-react";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
  eventDate?: string;
  eventLocation?: string;
}

export default function EventRegistrationModal({
  isOpen,
  onClose,
  eventTitle = "",
  eventDate = "",
  eventLocation = "",
}: EventRegistrationModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    occupation: "",
    participants: "1",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setForm({ fullName: "", phone: "", email: "", age: "", occupation: "", participants: "1", message: "" });
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number";
    if (!form.age) e.age = "Age is required";
    if (!form.occupation) e.occupation = "Please select your occupation";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const inp = (field: string) =>
    `w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans outline-none transition-colors ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 focus:border-[#1a2e4a] focus:ring-2 focus:ring-[#1a2e4a]/10"
    }`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(10,20,40,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a2e4a] px-6 py-4 flex items-start justify-between flex-shrink-0">
          <div>
            <h2 className="text-white font-bold text-base font-sans">Event Registration</h2>
            <p className="text-blue-200 text-xs font-sans mt-0.5 leading-relaxed max-w-xs">{eventTitle}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-blue-200 hover:text-white transition-colors ml-4 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Event info strip */}
        {(eventDate || eventLocation) && !submitted && (
          <div className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex gap-4 text-xs font-sans text-amber-800 flex-shrink-0">
            {eventDate && <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {eventDate}</span>}
            {eventLocation && <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {eventLocation}</span>}
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1a2e4a] font-sans mb-1">Registration Successful!</h3>
              <p className="text-gray-500 text-sm font-sans max-w-xs leading-relaxed mb-1">
                Thank you, <span className="font-semibold text-[#1a2e4a]">{form.fullName}</span>. Your seat has been reserved.
              </p>
              <p className="text-gray-400 text-xs font-sans mb-6">
                We'll send a confirmation to your phone/email before the event.
              </p>
              <button
                onClick={onClose}
                className="bg-[#1a2e4a] text-white px-6 py-2.5 rounded-lg text-sm font-semibold font-sans hover:bg-[#2d5fa6] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aadil Khan"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  className={inp("fullName")}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1 font-sans">{errors.fullName}</p>}
              </div>

              {/* Phone & Age */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inp("phone")}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-sans">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                    Age <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    min={10} max={80}
                    value={form.age}
                    onChange={(e) => set("age", e.target.value)}
                    className={inp("age")}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1 font-sans">{errors.age}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inp("email")}
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Occupation <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.occupation}
                  onChange={(e) => set("occupation", e.target.value)}
                  className={`${inp("occupation")} appearance-none bg-white`}
                >
                  <option value="">— Select —</option>
                  <option>School Student (Class 9–10)</option>
                  <option>School Student (Class 11–12)</option>
                  <option>College / University Student</option>
                  <option>Parent / Guardian</option>
                  <option>Teacher / Educator</option>
                  <option>Working Professional</option>
                  <option>Other</option>
                </select>
                {errors.occupation && <p className="text-red-500 text-xs mt-1 font-sans">{errors.occupation}</p>}
              </div>

              {/* Number of participants */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Number of Participants
                </label>
                <select
                  value={form.participants}
                  onChange={(e) => set("participants", e.target.value)}
                  className={`${inp("participants")} appearance-none bg-white`}
                >
                  {["1","2","3","4","5"].map((n) => (
                    <option key={n} value={n}>{n} {n === "1" ? "person" : "people"}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Any special requirements <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. wheelchair access, language preference..."
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm font-sans outline-none resize-none focus:border-[#1a2e4a] focus:ring-2 focus:ring-[#1a2e4a]/10 transition-colors"
                />
              </div>

              {/* Info */}
              <div className="flex gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-700 text-xs font-sans leading-relaxed">
                  This event is <strong>completely free</strong>. Registration confirms your seat — limited seats available.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a2e4a] hover:bg-[#2d5fa6] text-white py-3 rounded-xl font-semibold font-sans text-sm transition-colors"
              >
                Confirm Registration
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full text-gray-400 hover:text-gray-600 text-sm font-sans transition-colors py-1"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
