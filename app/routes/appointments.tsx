import type { Route } from "./+types/home";
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
    <AppointmentForm onSubmit={create.mutate} loading={create.isPending} />
  );
}
