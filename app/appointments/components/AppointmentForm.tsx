import type { CreateAppointment } from "../types";

export function AppointmentForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: CreateAppointment) => void;
  loading: boolean;
}) {
  return (
    <button onClick={() => onSubmit({
      AppointmentTime: "2026-01-01",
      ServiceDurationMinutes: 30,
      ClientName: "Menelaos Vergis",
    })}>
      {loading ? "Saving..." : "Create appointment"}
    </button>
  );
}