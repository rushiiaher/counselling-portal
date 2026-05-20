"use client";

import React, { useState, useEffect, use } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fetchAvailableSlots, bookSlotAction } from "@/app/actions/scheduling.actions";
import { Feedback } from "@/lib/feedback";
import { useRouter } from "next/navigation";

export default function BookAppointmentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id: counsellorId } = use(params);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<{start: string, end: string}[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{start: string, end: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [mode, setMode] = useState<"VIDEO" | "IN_PERSON">("VIDEO");

  useEffect(() => {
    if (!selectedDate) return;
    setSelectedSlot(null);
    setIsLoading(true);
    
    // Server action dynamic slots fetching
    fetchAvailableSlots(counsellorId, selectedDate.toISOString())
      .then(res => {
        if (res.success) setSlots(res.slots || []);
        else Feedback.error(res.error || "Failed to load slots");
      })
      .finally(() => setIsLoading(false));
  }, [selectedDate, counsellorId]);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setIsBooking(true);
    try {
      const res = await bookSlotAction({
        counsellorId,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
        mode
      });
      if (res.success) {
        Feedback.success("Appointment Confirmed!");
        router.push("/student/appointments");
      } else {
        Feedback.error(res.error || "Slot may have just been booked. Try another.");
      }
    } catch (err) {
      Feedback.error("An error occurred");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Schedule Session</h1>
        
        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          {/* Calendar Picker */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-4">1. Select Date</h3>
            <DayPicker 
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={[{ before: new Date() }]}
              className="border border-slate-100 p-3 rounded-lg flex justify-center"
              modifiersClassNames={{
                selected: 'bg-slate-900 text-white hover:bg-slate-800 rounded-full',
                today: 'text-blue-600 font-bold'
              }}
            />
          </div>

          {/* Slot Picker */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-4">2. Select Time (Local Time)</h3>
            
            {isLoading ? (
              <p className="text-slate-500 text-sm">Finding available slots...</p>
            ) : slots.length === 0 ? (
              <p className="text-slate-500 text-sm p-4 bg-slate-50 rounded-lg border border-slate-100">
                No slots available on this date.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {slots.map((s, i) => {
                  const dateObj = new Date(s.start);
                  const isSelected = selectedSlot?.start === s.start;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedSlot(s)}
                      className={`py-2 px-3 text-sm rounded-lg border transition ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {format(dateObj, "h:mm a")}
                    </button>
                  );
                })}
              </div>
            )}

            {selectedSlot && (
              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-slate-700 mb-3">3. Session Mode</h3>
                <select 
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none mb-6"
                >
                  <option value="VIDEO">Video Call (Secure Room)</option>
                  <option value="IN_PERSON">In-Person (Center)</option>
                </select>

                <button 
                  onClick={handleBook}
                  disabled={isBooking}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg shadow hover:bg-slate-800 transition disabled:opacity-70 font-medium"
                >
                  {isBooking ? "Confirming..." : "Confirm Booking"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
