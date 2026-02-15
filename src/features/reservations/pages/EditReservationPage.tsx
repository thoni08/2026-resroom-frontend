import { useLocation, useNavigate, useParams } from "react-router"
import { useReservation } from "../api/useReservation"
import { useUpdateReservation } from "../api/useUpdateReservation"
import type { ReservationFormValues } from "../components/ReservationFormSchema"
import { ReservationForm } from "../components/ReservationForm"
import toast from "react-hot-toast"

export const EditReservationPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const { id } = useParams<{ id: string }>()
  const reservationId = Number(id)

  const { data: reservation, isLoading: isLoadingReservation, isError } = useReservation(reservationId)
  const { mutate, isPending: isSaving } = useUpdateReservation()

  if (isLoadingReservation) return <div>Loading reservation...</div>
  if (isError) return <div>Failed to load reservation.</div>
  if (!reservation) return <div>Reservation not found.</div>

  const handleUpdate = (data: ReservationFormValues) => {
    mutate({ id: reservationId, data }, {
      onSuccess: () => {
        navigate(-1)
        toast.success("Reservation updated successfully")
      },
      onError: () => {
        toast.error("Failed to update reservation. Please check your input and try again.")
      }
    })
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-2xl p-4 bg-white rounded-lg shadow">
        <ReservationForm 
          defaultValues={{
            roomId: reservation.roomId,
            startTime: reservation.startTime.slice(0, 16),
            endTime: reservation.endTime.slice(0, 16),
            reservedBy: reservation.reservedBy,
            purpose: reservation.purpose,
            status: reservation.status
          }}
          onSubmit={handleUpdate} 
          isLoading={isSaving} 
          submitLabel="Save changes"
          readOnly={isSaving || location.pathname.endsWith('/edit') === false} />
      </div>
    </div>
  )
}