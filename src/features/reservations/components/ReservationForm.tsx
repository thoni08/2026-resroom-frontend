import { useNavigate } from "react-router";
import { reservationSchema, type ReservationFormValues } from "./ReservationFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { useRooms } from "@/features/rooms/api/useRooms";

interface ReservationFormProps {
  defaultValues?: ReservationFormValues
  onSubmit: (data: ReservationFormValues) => Promise<void>
  isLoading: boolean
  submitLabel: string
  readOnly?: boolean
}

export const ReservationForm = (props: ReservationFormProps) => {
  const navigate = useNavigate();
  const { data: roomsData } = useRooms({pageSize: 0, sortBy: 'name', sortDirection: 'asc'})

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: props.defaultValues || {
      roomId: 0,
      startTime: '',
      endTime: '',
      reservedBy: '',
      purpose: '',
      status: "Pending"
    }
  })

  const onFormSubmit = async (data: ReservationFormValues) => {
    try {
      await props.onSubmit(data)
    } catch (error: Error | any) {
      if (error.response?.status == 400) {
        const validationErrors = error.response.data.errors
        Object.keys(validationErrors).forEach((field) => {
          setError(field.replace(/^./, char => char.toLowerCase()) as keyof ReservationFormValues, { type: 'custom', message: validationErrors[field].join(", ") })
          console.log(`Validation error on ${field.replace(/^./, char => char.toLowerCase())}: ${validationErrors[field].join(", ")}`)
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-row space-x-4 w-full">
            <div className="w-full">
              <label htmlFor="roomId" className="block mb-2 text-sm font-medium text-gray-900">Room</label>
              <select disabled={props.readOnly} {...register("roomId", { valueAsNumber: true })} id="roomId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5">
                <option value={0} disabled>Select a room</option>
                {roomsData?.items.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="reservedBy" className="block mb-2 text-sm font-medium text-gray-900">Reserved By</label>
              <input disabled={props.readOnly} type="text" {...register("reservedBy")} id="reservedBy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Reserved by" />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="w-[inherit]">
              {errors.roomId && <span className="text-xs text-red-600 mt-1.5">{errors.roomId.message}</span>}
            </div>
            {errors.reservedBy && <span className="text-xs text-red-600 mt-1.5">{errors.reservedBy.message}</span>}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row space-x-4 w-full">
            <div className="w-full">
              <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
              <input disabled={props.readOnly} type="datetime-local" {...register("startTime")} id="startTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
            </div>
            <div className="w-full">
              <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
              <input disabled={props.readOnly} type="datetime-local" {...register("endTime")} id="endTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="w-[inherit]">
              {errors.startTime && <span className="text-xs text-red-600 mt-1.5">{errors.startTime.message}</span>}
            </div>
            {errors.endTime && <span className="text-xs text-red-600 mt-1.5">{errors.endTime.message}</span>}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row space-x-4 w-full">
            <div className="w-full">
              <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-gray-900">Purpose</label>
              <input disabled={props.readOnly} type="text" {...register("purpose")} id="purpose" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Reservation purpose" />
            </div>
            <div className="w-full">
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
              <select disabled={props.readOnly} {...register("status")} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="w-[inherit]">
              {errors.purpose && <span className="text-xs text-red-600 mt-1.5">{errors.purpose.message}</span>}
            </div>
            {errors.status && <span className="text-xs text-red-600 mt-1.5">{errors.status.message}</span>}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button hidden={props.readOnly} type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 cursor-pointer">
          {props.submitLabel}
        </button>
        <Button onClick={() => navigate(-1)} className="px-5 py-2.5 mt-4 sm:mt-6 text-center text-black bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200">
          Cancel
        </Button>
      </div>
    </form>
  )
}