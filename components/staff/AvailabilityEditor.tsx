"use client";

import React, { useState, useEffect, useTransition } from "react";
import { getAvailabilityAction, saveAvailabilityAction, blockDatesAction } from "@/app/actions/availability.actions";
import { Feedback } from "@/lib/feedback";

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DEFAULT_SLOT = { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", slotDuration: 60, isActive: true };

type Slot = { dayOfWeek: number; startTime: string; endTime: string; slotDuration: number; isActive: boolean };

export function AvailabilityEditorModal({ onClose }: { onClose: () => void }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailabilityAction().then(res => {
      if (res.success) setSlots(res.slots as Slot[]);
      setLoading(false);
    });
  }, []);

  const addSlot = () => setSlots(prev => [...prev, { ...DEFAULT_SLOT }]);
  const removeSlot = (i: number) => setSlots(prev => prev.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof Slot, value: any) =>
    setSlots(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

  const handleSave = () => {
    startTransition(async () => {
      const res = await saveAvailabilityAction(slots);
      if (res.success) { Feedback.success("Availability saved"); onClose(); }
      else Feedback.error(res.error || "Failed to save");
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Edit Weekly Availability</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-4">
          {loading ? (
            <p className="text-slate-400 text-sm">Loading...</p>
          ) : slots.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">No availability set. Add a day below.</p>
          ) : (
            slots.map((slot, i) => (
              <div key={i} className="grid grid-cols-5 gap-3 items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                <select
                  value={slot.dayOfWeek}
                  onChange={e => update(i, "dayOfWeek", parseInt(e.target.value))}
                  className="col-span-1 px-2 py-1.5 border border-slate-200 rounded text-sm"
                >
                  {DAYS.map((d, idx) => <option key={idx} value={idx}>{d}</option>)}
                </select>
                <input type="time" value={slot.startTime} onChange={e => update(i, "startTime", e.target.value)} className="px-2 py-1.5 border border-slate-200 rounded text-sm" />
                <input type="time" value={slot.endTime} onChange={e => update(i, "endTime", e.target.value)} className="px-2 py-1.5 border border-slate-200 rounded text-sm" />
                <select value={slot.slotDuration} onChange={e => update(i, "slotDuration", parseInt(e.target.value))} className="px-2 py-1.5 border border-slate-200 rounded text-sm">
                  {[30,45,60,90].map(d => <option key={d} value={d}>{d} min</option>)}
                </select>
                <button onClick={() => removeSlot(i)} className="text-rose-500 hover:text-rose-700 font-bold text-sm">Remove</button>
              </div>
            ))
          )}
          <button onClick={addSlot} className="text-sm font-bold text-blue-600 hover:underline">+ Add day</button>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
          <button onClick={handleSave} disabled={isPending} className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50">
            {isPending ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function BlockDatesModal({ onClose }: { onClose: () => void }) {
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [reason, setReason] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startsAt || !endsAt) return;
    startTransition(async () => {
      const res = await blockDatesAction(startsAt, endsAt, reason || undefined);
      if (res.success) { Feedback.success("Dates blocked"); onClose(); }
      else Feedback.error(res.error || "Failed");
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Block Dates (Leave)</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
            <input type="datetime-local" value={startsAt} onChange={e => setStartsAt(e.target.value)} required className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
            <input type="datetime-local" value={endsAt} onChange={e => setEndsAt(e.target.value)} required className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason (optional)</label>
            <input type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g. Annual leave" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50">
              {isPending ? "Saving..." : "Block Dates"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
