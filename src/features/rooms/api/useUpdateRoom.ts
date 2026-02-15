import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RoomDto } from "../types"
import { api } from "@/lib/axios"

interface UpdateRoomVariables {
  id: number,
  data: RoomDto
}

export const useUpdateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateRoomVariables) => api.put(`/rooms/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      queryClient.invalidateQueries({ queryKey: ["rooms", variables.id] })
    }
  })
}