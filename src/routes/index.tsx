import { createBrowserRouter, Navigate } from "react-router"
import { MainLayout } from "@/layouts/MainLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { CreateRoomPage } from "@/features/rooms/pages/CreateRoomPage"
import { EditRoomPage } from "@/features/rooms/pages/EditRoomPage"
import { RoomListPage } from "@/features/rooms/pages/RoomListPage"

export const router = createBrowserRouter([
  { 
    path: import.meta.env.VITE_BASE_URL || "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="rooms" replace />
      },
      {
        path: 'rooms',
        children: [
          { index: true, element: <RoomListPage />, },
          { path: 'new', element: <CreateRoomPage /> },
          { path: ':id', element: <EditRoomPage /> },
          { path: ':id/edit', element: <EditRoomPage /> }
        ]
      },
    ]
  }
])