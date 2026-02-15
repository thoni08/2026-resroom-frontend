import { useLocation, useNavigate, useParams } from "react-router"
import { useRoom } from "../api/useRoom"
import { useUpdateRoom } from "../api/useUpdateRoom"
import type { RoomFormValues } from "../components/RoomFormSchema"
import { RoomForm } from "../components/RoomForm"
import toast from "react-hot-toast"

export const EditRoomPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const { id } = useParams<{ id: string }>()
  const roomId = Number(id)

  const { data: room, isLoading: isLoadingRoom, isError } = useRoom(roomId)
  const { mutate, isPending: isSaving } = useUpdateRoom()

  if (isLoadingRoom) return <div>Loading room...</div>
  if (isError) return <div>Failed to load room.</div>
  if (!room) return <div>Room not found.</div>

  const handleUpdate = (data: RoomFormValues) => {
    mutate({ id: roomId, data }, {
      onSuccess: () => {
        navigate(-1)
        toast.success("Room updated successfully")
      },
      onError: () => {
        toast.error("Failed to update room. Please check your input and try again.")
      }
    })
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-2xl p-4 bg-white rounded-lg shadow">
        <RoomForm 
          defaultValues={{
            name: room.name,
            capacity: room.capacity,
            location: room.location,
            description: room.description
          }}
          onSubmit={handleUpdate} 
          isLoading={isSaving} 
          submitLabel="Save changes"
          readOnly={isSaving || location.pathname.endsWith('/edit') === false} />
      </div>
    </div>
  )
}