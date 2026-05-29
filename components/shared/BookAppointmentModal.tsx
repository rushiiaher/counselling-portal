"use client";

import { useState, useEffect, useRef } from "react";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNSELLING_TYPES = [
  "Career Counselling",
  "Mental Wellness / Therapy",
  "Educational Guidance",
  "Anxiety & Depression",
  "Trauma & PTSD Support",
  "Family Counselling",
  "Group Therapy",
  "Other",
];

export default function BookAppointmentModal({ isOpen, onClose }: BookAppointmentModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    counsellingType: "",
    preferredDate: "",
    preferredTime: "",
    mode: "",
    message: "",
  });

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setForm({ fullName: "", phone: "", email: "", counsellingType: "", preferredDate: "", preferredTime: "", mode: "", message: "" });
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
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
    if (!form.counsellingType) e.counsellingType = "Please select a counselling type";
    if (!form.preferredDate) e.preferredDate = "Please select a date";
    if (!form.mode) e.mode = "Please select a session mode";
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

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(10,20,40,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a2e4a] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-white font-bold text-base font-sans">Book a Free Appointment</h2>
            <p className="text-blue-200 text-xs font-sans mt-0.5">Confidential · Free · All languages supported</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-blue-200 hover:text-white transition-colors ml-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            /* Success */
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1a2e4a] font-sans mb-1">Appointment Requested!</h3>
              <p className="text-gray-500 text-sm font-sans max-w-xs leading-relaxed mb-1">
                Thank you, <span className="font-semibold text-[#1a2e4a]">{form.fullName}</span>. We'll confirm your slot within 24 hours.
              </p>
              <p className="text-gray-400 text-xs font-sans mb-6">
                {form.counsellingType} &nbsp;·&nbsp; {form.preferredDate}
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

              {/* Full Name */}
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

              {/* Phone & Email */}
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
              </div>

              {/* Type of Counselling */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Type of Counselling Required <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.counsellingType}
                  onChange={(e) => set("counsellingType", e.target.value)}
                  className={`${inp("counsellingType")} appearance-none bg-white`}
                >
                  <option value="">— Select counselling type —</option>
                  {COUNSELLING_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.counsellingType && <p className="text-red-500 text-xs mt-1 font-sans">{errors.counsellingType}</p>}
              </div>

              {/* Session Mode */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Session Mode <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.mode}
                  onChange={(e) => set("mode", e.target.value)}
                  className={`${inp("mode")} appearance-none bg-white`}
                >
                  <option value="">— Select mode —</option>
                  <option>Video Call (Online)</option>
                  <option>In-Person (Center Visit)</option>
                </select>
                {errors.mode && <p className="text-red-500 text-xs mt-1 font-sans">{errors.mode}</p>}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                    Preferred Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={form.preferredDate}
                    onChange={(e) => set("preferredDate", e.target.value)}
                    className={inp("preferredDate")}
                  />
                  {errors.preferredDate && <p className="text-red-500 text-xs mt-1 font-sans">{errors.preferredDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={form.preferredTime}
                    onChange={(e) => set("preferredTime", e.target.value)}
                    className={`${inp("preferredTime")} appearance-none bg-white`}
                  >
                    <option value="">Any time</option>
                    <option>Morning (9 AM – 12 PM)</option>
                    <option>Afternoon (12 PM – 3 PM)</option>
                    <option>Evening (3 PM – 6 PM)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 font-sans mb-1">
                  Additional Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe what you'd like help with..."
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm font-sans outline-none resize-none focus:border-[#1a2e4a] focus:ring-2 focus:ring-[#1a2e4a]/10 transition-colors"
                />
              </div>

              {/* Info note */}
              <div className="flex gap-2 bg-amber-50 border border-amber-100 rounded-lg p-3">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-amber-800 text-xs font-sans leading-relaxed">
                  All sessions are <strong>completely free</strong> and <strong>confidential</strong>. We'll confirm within 24 hours.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#1a2e4a] hover:bg-[#2d5fa6] text-white py-3 rounded-xl font-semibold font-sans text-sm transition-colors"
              >
                Request Appointment
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
