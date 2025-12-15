import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}