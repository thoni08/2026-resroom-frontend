import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type { Room } from "../types"

const getRoom = async (roomId: number): Promise<Room> => {
  const response = await api.get(`/rooms/${roomId}`)
  return response.data
}

export const useRoom = (roomId: number) => {
  return useQuery({
    queryKey: ['rooms', roomId],
    queryFn: () => getRoom(roomId),
    placeholderData: keepPreviousData
  })
}