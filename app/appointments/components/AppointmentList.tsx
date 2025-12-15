import type { AppointmentDto } from "../types";

export function AppointmentList({
  items,
}: {
  items: AppointmentDto[];
}) {
  if (items.length === 0) {
    return <p>No appointments yet.</p>;
  }

  return (
    <ul>
      {items.map(a => (
        <li key={a.id}>
          <strong>{a.clientName}</strong>
          <br />
          {new Date(a.appointmentTime).toLocaleString()}
          {a.serviceDurationMinutes && (
            <> – {a.serviceDurationMinutes} min</>
          )}
        </li>
      ))}
    </ul>
  );
}
