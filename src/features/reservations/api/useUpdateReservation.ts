import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ReservationDto } from "../types"
import { api } from "@/lib/axios"

interface UpdateReservationVariables {
  id: number,
  data: ReservationDto
}

export const useUpdateReservation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateReservationVariables) => api.put(`/reservations/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] })
      queryClient.invalidateQueries({ queryKey: ["reservations", variables.id] })
    }
  })
}