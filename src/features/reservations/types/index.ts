import type { BaseParams } from "@/types"

type ReservationStatus = "Pending" | "Approved" | "Rejected" | "Cancelled"
type DateType = string

export interface Reservation {
  id: number,
  room: string,
  roomId: number,
  startTime: string,
  endTime: string,
  reservedBy: string,
  purpose?: string,
  status: ReservationStatus
}

export interface ReservationParams extends BaseParams {
  minDate?: DateType,
  maxDate?: DateType,
  reservedBy?: string,
  roomId?: number,
  status?: ReservationStatus
}

export interface ReservationDto {
  roomId: number,
  room?: string,
  startTime: string,
  endTime: string,
  reservedBy: string,
  purpose?: string,
  status: ReservationStatus
}