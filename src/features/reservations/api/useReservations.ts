import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type { Reservation, ReservationParams } from "../types"
import type { PaginationMetadata, PaginatedResponse } from "@/types"

const getReservations = async (params: ReservationParams): Promise<PaginatedResponse<Reservation>> => {
  const response = await api.get('/reservations', { params })
  const paginationHeader = JSON.parse(response.headers['x-pagination'] as string) as PaginationMetadata
  
  return {
    items: response.data,
    pagination: paginationHeader
  }
}

export const useReservations = (params: ReservationParams) => {
  return useQuery({
    queryKey: ['reservations', params],
    queryFn: () => getReservations(params),
    placeholderData: keepPreviousData
  })
}