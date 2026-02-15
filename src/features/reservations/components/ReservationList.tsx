import { Table } from "@/components/ui/Table"
import { useReservations } from "../api/useReservations"
import { useDeleteReservation } from "../api/useDeleteReservation"
import type { TableColumn, TableFilter } from "@/types"
import type { ReservationParams } from "../types"
import { useUrlFilters } from "@/hooks/useUrlFilters"
import { useRooms } from "@/features/rooms/api/useRooms"

export const ReservationList = () => {
  const { data: roomsData } = useRooms({pageSize: 0, sortBy: 'name', sortDirection: 'asc'})
  const reservationColumns: TableColumn[] = [
    { id: "roomName", label: "Room Name", type: "text", sortable: true },
    { id: "startTime", label: "Start Time", type: "datetime", sortable: true },
    { id: "endTime", label: "End Time", type: "datetime", sortable: true },
    { id: "reservedBy", label: "Reserved By", type: "text", sortable: true },
    { id: "purpose", label: "Purpose", type: "text", sortable: false },
    { id: "status", label: "Status", type: "text", sortable: true }
  ]
  const reservationFilters: TableFilter[] = [
    {
      id: "view",
      label: "View",
      type: "select",
      options: [
        { label: "Active reservations", value: "active" },
        { label: "Past reservations", value: "history" }
      ]
    },
    {
      id: "date",
      label: "Date Range",
      type: "date",
      isRange: true
    },
    {
      id: "reservedBy",
      label: "Reserved By",
      type: "text"
    },
    {
      id: "roomId",
      label: "Room",
      type: "select",
      options: roomsData?.items.map(room => ({ label: room.name, value: room.id })) || []
    },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
        { label: "Cancelled", value: "Cancelled" }
      ]
    }
  ]

  const { filters, setFilters } = useUrlFilters<ReservationParams>()
  const { data, isLoading, isError } = useReservations(filters)

  const { mutate: deleteReservation } = useDeleteReservation()

  if (isLoading) {
    return <div>Loading reservations...</div>
  }

  if (isError) {
    return <div>Failed to load reservations.</div>
  }

  if (!data) {
    return null
  }

  return (
    <Table<ReservationParams> 
      for="reservations" 
      data={data} 
      columns={reservationColumns} 
      filters={reservationFilters} 
      filterHandler={{ get: filters, set: setFilters }} 
      isLoading={isLoading} 
      deleteService={deleteReservation} />
  )
}