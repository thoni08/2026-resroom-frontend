import { api } from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteReservation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reservationId: number) => api.delete(`/reservations/${reservationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] })
    }
  })
}