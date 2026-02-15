import { useNavigate } from "react-router";
import { roomSchema, type RoomFormValues } from "./RoomFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";

interface RoomFormProps {
  defaultValues?: RoomFormValues
  onSubmit: (data: RoomFormValues) => void
  isLoading: boolean
  submitLabel: string
  readOnly?: boolean
}

export const RoomForm = (props: RoomFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: props.defaultValues || {
      name: '',
      capacity: 1,
      location: '',
      description: ''
    }
  })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Room Name</label>
          <input disabled={props.readOnly} type="text" {...register("name")} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Type room name" />
          {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row space-x-4 w-full">
            <div className="w-full">
              <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900">Capacity</label>
              <input disabled={props.readOnly} type="number" {...register("capacity", { valueAsNumber: true })} id="capacity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="1" />
            </div>
            <div className="w-full">
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
              <input disabled={props.readOnly} type="text" {...register("location")} id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Room location" />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="w-[inherit]">
              {errors.capacity && <span className="text-xs text-red-600 mt-1.5">{errors.capacity.message}</span>}
            </div>
            {errors.location && <span className="text-xs text-red-600 mt-1.5">{errors.location.message}</span>}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <textarea disabled={props.readOnly} {...register("description")} id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your description here"></textarea>
        </div>
      </div>
      <div className="flex gap-2">
        <button hidden={props.readOnly} disabled={props.isLoading || Object.keys(errors).length > 0} type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {props.submitLabel}
        </button>
        <Button onClick={() => navigate(-1)} className="px-5 py-2.5 mt-4 sm:mt-6 text-center text-black bg-white hover:bg-gray-100 focus:ring-gray-200 border border-gray-200">
          Cancel
        </Button>
      </div>
    </form>
  )
}