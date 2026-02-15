import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type { Reservation } from "../types"

const getReservation = async (reservationId: number): Promise<Reservation> => {
  const response = await api.get(`/reservations/${reservationId}`)
  return response.data
}

export const useReservation = (reservationId: number) => {
  return useQuery({
    queryKey: ['reservations', reservationId],
    queryFn: () => getReservation(reservationId),
    placeholderData: keepPreviousData
  })
}