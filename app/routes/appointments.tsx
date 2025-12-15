import type { Route } from "./+types/appointments";
import { AppointmentForm } from "~/appointments/components/AppointmentForm";
import { useCreateAppointment } from "~/appointments/hooks/useCreateAppointment";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Appointments App" },
    { name: "description", content: "View and create new Appointments!" },
  ];
}

export default function Appointments() {
  const create = useCreateAppointment();

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
    </div>
  );
}
