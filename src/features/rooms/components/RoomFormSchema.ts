import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(1, "Room name is required").max(100, "Room name must be at most 100 characters"),
  capacity: z.number().min(1, "Capacity must be at least 1").max(1000, "Capacity must be at most 1000"),
  location: z.string().min(1, "Location is required").max(300, "Location must be at most 300 characters"),
  description: z.string().optional()
})

export type RoomFormValues = z.infer<typeof roomSchema>