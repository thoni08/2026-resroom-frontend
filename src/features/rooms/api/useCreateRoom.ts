import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RoomDto } from "../types"
import { api } from "@/lib/axios"

export const useCreateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newRoom: RoomDto) => api.post("/rooms", newRoom),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
    }
  })
}