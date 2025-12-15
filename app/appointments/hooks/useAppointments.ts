import { useQuery } from "@tanstack/react-query";
import type { AppointmentDto } from "../types";
import type { ApiError } from "~/lib/http/ApiError";
import { HttpError } from "~/lib/http/HttpError";
import { getAppointments } from "../api";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}
