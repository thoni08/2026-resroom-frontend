import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type { Room, RoomParams } from "../types"
import type { PaginationMetadata, PaginatedResponse } from "@/types"

const getRooms = async (params: RoomParams): Promise<PaginatedResponse<Room>> => {
  const response = await api.get('/rooms', { params })
  const paginationHeader = JSON.parse(response.headers['x-pagination'] as string) as PaginationMetadata
  
  return {
    items: response.data,
    pagination: paginationHeader
  }
}

export const useRooms = (params: RoomParams) => {
  return useQuery({
    queryKey: ['rooms', params],
    queryFn: () => getRooms(params),
    placeholderData: keepPreviousData
  })
}