import { z } from "zod";

export const reservationSchema = z.object({
  roomId: z.number().min(1, "Room ID is required"),
  startTime: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start time" }),
  endTime: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end time" }),
  reservedBy: z.string().min(1, "Reserved by is required"),
  purpose: z.string().optional(),
  status: z.enum(["Pending", "Approved", "Rejected", "Cancelled"])
}).refine((data) => new Date(data.endTime) > new Date(data.startTime), {
  message: "End time must be after start time",
  path: ["endTime"]
})

export type ReservationFormValues = z.infer<typeof reservationSchema>