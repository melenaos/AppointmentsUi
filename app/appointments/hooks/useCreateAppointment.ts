import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api";
import type { AppointmentCreatedResponse, CreateAppointment } from "../types";
import type { ApiError } from "~/lib/http/ApiError";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<
    AppointmentCreatedResponse,
    ApiError,
    CreateAppointment 
  >({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}