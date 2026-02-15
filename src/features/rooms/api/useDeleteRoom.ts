import { api } from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (roomId: number) => api.delete(`/rooms/${roomId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
    }
  })
}