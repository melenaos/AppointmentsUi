import { useState } from "react";
import type { Route } from "./+types/home";
import {AppointmentForm} from "../appointments/components/AppointmentForm"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Appointments App" },
    { name: "description", content: "View and create new Appointments!" },
  ];
}

export default function Appointments() {
  const { data, isLoading } = useAppointments();

  const createAppointment = async (data: AppointmentInput) => {
    setLoading(true);
    await appointmentService.create(data);
    setLoading(false);
  };

  return (
     <AppointmentForm
      onSubmit={createAppointment}
      loading={loading}
    />
  );
}
