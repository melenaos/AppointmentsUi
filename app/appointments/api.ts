import { HttpError } from "~/lib/http/HttpError";
import { http } from "../lib/http";
import type { Appointment, AppointmentCreatedResponse, CreateAppointment } from "./types";
import type { ApiError } from "~/lib/http/ApiError";

export function getAppointments(/* pagination and filters */) {
  return http<Appointment[]>(`/appointments`);
}

export function getAppointment(id: string) {
  return http<Appointment[]>(`/appointments/${id}`);
}

export async function createAppointment(input: CreateAppointment) {
 try {
    return await http<AppointmentCreatedResponse>(
      "/appointments/ingest",
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );
  } catch (err) {
    if (err instanceof HttpError && err.status === 400) {
      const apiError = err.data as ApiError;

      throw apiError; // or map to form errors
    }

    throw err;
  }
}
