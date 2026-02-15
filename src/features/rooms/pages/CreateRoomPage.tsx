import { useNavigate } from "react-router"
import { useCreateRoom } from "../api/useCreateRoom"
import { RoomForm } from "../components/RoomForm"
import type { RoomFormValues } from "../components/RoomFormSchema"
import toast from "react-hot-toast"

export const CreateRoomPage = () => {
  const { mutate, isPending } = useCreateRoom()
  const navigate = useNavigate()

  const handleCreate = (data: RoomFormValues) => {
    mutate(data, {
      onSuccess: () => {
        navigate(-1)
        toast.success("Room created successfully")
      },
      onError: () => {
        toast.error("Failed to create room. Please check your input and try again.")
      }
    })
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-2xl p-4 bg-white rounded-lg shadow">
        <RoomForm onSubmit={handleCreate} isLoading={isPending} submitLabel="Add room" />
      </div>
    </div>
  )
}