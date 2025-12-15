import { http } from "../lib/http";
import type { Appointment, CreateAppointment } from "./types";

export function getAppointments(/* pagination and filters */) {
  return http<Appointment[]>(`/appointments`);
}

export function getAppointment(id: BigInt) {
  return http<Appointment[]>(`/appointments/${id}`);
}

export function createAppointment(input: CreateAppointment) {
  return http<void>("/appointments/ingest", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
