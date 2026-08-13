// Kept out of the model so client components can import the list without
// pulling mongoose into the browser bundle.
export const APPOINTMENT_STATUSES = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];
