import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ReservationDto } from "../types"
import { api } from "@/lib/axios"

export const useCreateReservation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newReservation: ReservationDto) => api.post("/reservations", newReservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] })
    }
  })
}