import type { BaseParams } from "@/types"

export interface Room {
  id: number,
  name: string,
  capacity: number,
  location: string,
  description: string
}

export interface RoomParams extends BaseParams {
  minCapacity?: number,
  maxCapacity?: number
}

export interface RoomDto {
  name: string,
  capacity: number,
  location: string,
  description?: string
}