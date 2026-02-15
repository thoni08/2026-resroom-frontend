import { Table } from "@/components/ui/Table"
import { useRooms } from "../api/useRooms"
import { useDeleteRoom } from "../api/useDeleteRoom"
import type { TableColumn, TableFilter } from "@/types"
import type { RoomParams } from "../types"
import { useUrlFilters } from "@/hooks/useUrlFilters"


export const RoomList = () => {
  const roomColumns: TableColumn[] = [
    { id: "name", label: "Room Name", type: "text", sortable: true },
    { id: "capacity", label: "Capacity", type: "number", sortable: true },
    { id: "location", label: "Location", type: "text", sortable: false },
    { id: "description", label: "Description", type: "text", sortable: false }
  ]
  const roomFilters: TableFilter[] = [
    {
      id: "capacity",
      label: "Capacity",
      type: "number",
      isRange: true
    }
  ]
  
  const { filters, setFilters } = useUrlFilters<RoomParams>()
  const { data, isLoading, isError } = useRooms(filters)

  const { mutate: deleteRoom } = useDeleteRoom()

  if (isLoading) {
    return <div>Loading rooms...</div>
  }

  if (isError) {
    return <div>Failed to load rooms.</div>
  }

  if (!data) {
    return null
  }

  return (
    <Table<RoomParams> 
      for="rooms" 
      data={data} 
      columns={roomColumns} 
      filters={roomFilters} 
      filterHandler={{ get: filters, set: setFilters }} 
      isLoading={isLoading} 
      deleteService={deleteRoom} />
  )
}