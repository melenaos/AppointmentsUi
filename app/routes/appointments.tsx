import type { Route } from "./+types/appointments";
import { AppointmentForm } from "~/appointments/components/AppointmentForm";
import { AppointmentList } from "~/appointments/components/AppointmentList";
import { useAppointments } from "~/appointments/hooks/useAppointments";
import { useCreateAppointment } from "~/appointments/hooks/useCreateAppointment";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Appointments App" },
    { name: "description", content: "View and create new Appointments!" },
  ];
}

export default function Appointments() {
  const create = useCreateAppointment();
  const appointments = useAppointments();

  return (
    <div className="container mx-auto max-w-lg my-10">
      
      <AppointmentForm
        onSubmit={create.mutate}
        loading={create.isPending}
        error={create.error}
      />

      {create.isSuccess && create.data && (
        <div className="success-message">
          {create.data.message}
        </div>
      )}


      {appointments.isLoading && <p>Loading appointments…</p>}

      {appointments.isError && (
        <p className="error">
          Failed to load appointments
        </p>
      )}

      {appointments.isSuccess && (
        <AppointmentList items={appointments.data} />
      )}

    </div>
  );
}
