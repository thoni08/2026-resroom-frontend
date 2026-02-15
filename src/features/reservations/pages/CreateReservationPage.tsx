import { useNavigate } from "react-router"
import toast from "react-hot-toast"
import { useCreateReservation } from "../api/useCreateReservation"
import { ReservationForm } from "../components/ReservationForm"
import type { ReservationFormValues } from "../components/ReservationFormSchema"

export const CreateReservationPage = () => {
  const { mutateAsync, isPending } = useCreateReservation()
  const navigate = useNavigate()

  const handleCreate = async (data: ReservationFormValues) => {
    await mutateAsync(data, {
      onSuccess: () => {
        navigate(-1)
        toast.success("Reservation created successfully")
      },
      onError: () => {
        toast.error("Failed to create reservation. Please check your input and try again.")
      }
    })
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-2xl p-4 bg-white rounded-lg shadow">
        <ReservationForm onSubmit={handleCreate} isLoading={isPending} submitLabel="Add reservation" />
      </div>
    </div>
  )
}