import { handleAppointmentBooked, handleCrisisEscalation } from "./notification.service";

type EventPayload = any;

const listeners: Record<string, ((payload: EventPayload) => Promise<void>)[]> = {
  "appointment.booked": [handleAppointmentBooked],
  "crisis.escalation": [handleCrisisEscalation],
  "assessment.crisis": [handleCrisisEscalation], // Route assessment crises to the same notification handler
};

export async function emitEvent(eventName: string, payload: EventPayload) {
  const handlers = listeners[eventName];
  if (!handlers) return;

  // Fire and forget - do not block the main request thread
  handlers.forEach(handler => {
    handler(payload).catch(err => {
      console.error(`[EVENT DISPATCH ERROR] Event: ${eventName}`, err);
    });
  });
}
