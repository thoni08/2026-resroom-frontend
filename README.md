# ResRoom - Frontend

## Description
A modern, responsive Front-end Web Application for managing campus room reservations. Built with **React**, **TypeScript**, and **Vite**, featuring a robust architecture and seamless integration with the ASP.NET Core Backend.

## Features

### User Interface
* **Room Browsing:** View available rooms with infinite scroll / pagination.
* **Advanced Filtering:** Filter rooms by capacity, location, and search by name.
* **Room Details:** View comprehensive details including description and amenities.
* **Reservations:** Interactive calendar/form to book rooms with conflict detection.
* **Intuitive Design:** Using **Tailwind CSS** framework as styling.

### Technical Highlights
* **Type Safety:** End-to-end type safety with **TypeScript** interfaces matching Back-end DTOs.
* **State Management:** Server state management using **TanStack Query (React Query)** for caching, background updates, and optimistic UI.
* **Form Handling:** Robust form validation using **React Hook Form** and **Zod** schemas.
* **Routing:** Client-side routing with **React Router v7**.
* **HTTP Client:** Centralized **Axios** instance with interceptors for global error handling.

## Tech Stack
| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core** | [React](https://react.dev/) | UI Library |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Static Typing |
| **Build Tool** | [Vite](https://vitejs.dev/) | Next Generation Frontend Tooling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **State/Cache** | [TanStack Query](https://tanstack.com/query) | Async State Management |
| **Routing** | [React Router](https://reactrouter.com/) | Declarative Routing |
| **Forms** | [React Hook Form](https://react-hook-form.com/) | Performant, flexible forms |
| **Validation** | [Zod](https://zod.dev/) | TypeScript-first schema validation |
| **Error Display** | [React Hot Toast](https://react-hot-toast.com/) | Toast Notification for Global API Errors |
| **HTTP** | [Axios](https://axios-http.com/) | Promise based HTTP client |

## Project Structure
The project follows a **Feature-based Architecture** for scalability and maintainability.

```bash
src/
├── assets/             # Static assets (images, fonts)
├── components/         # Shared UI components (Buttons, Modals, Inputs)
│   └── ui/             # Generic, reusable UI elements
├── features/           # Domain-specific logic (The core of the app)
│   ├── rooms/          # Room management feature
│   │   ├── api/        # API hooks (useRooms, useCreateRoom)
│   │   ├── components/ # Feature-specific components (RoomCard, RoomList)
│   │   └── types/      # TypeScript interfaces (Room, CreateRoomDto)
│   └── reservations/   # Reservation management feature
├── hooks/              # Custom global hooks (useDebounce, useAuth)
├── layouts/            # Page layouts (DashboardLayout, AuthLayout)
├── lib/                # Library configurations (Axios, Utils)
├── pages/              # Route components (LoginPage, RoomPage)
├── routes/             # Router configuration
└── App.tsx             # Root component
```

## Getting Started
### Prerequisites
* **Node.js**
* **npm** or **yarn**
* **Back-end API** running

### Installation
1. **Clone the repository**
```bash
git clone https://github.com/thoni08/2026-resroom-frontend.git
cd 2026-resroom-frontend
```
2. **Install dependencies**
```bash
npm install
```
3. **Set up Environment Variables**
Copy the example environment file:
```bash
cp .env.example .env
```
4. **Configure Environment**
Update your .env:
```env
VITE_API_BASE_URL=http://localhost:5xxx/api
```
5. **Run Development Server**
```bash
npm run dev
```
Access the app at `http://localhost:5173`.

## Environment Variables
The application requires the following environment variables to be set in `.env`:

| Variable | Description |
| :--- | :--- |
| `VITE_API_BASE_URL` | Back-end API base URL |
| `VITE_BASE_URL` | Front-end app's base URL |

## Key Scripts
* `npm run dev`: Starts the development server.
* `npm run build`: Builds the app for production.
* `npm run preview`: Locally preview the production build.
* `npm run lint`: Runs ESLint to check for code quality issues.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/amazing-feature`.
3. Commit your changes: `git commit -m 'feat: add amazing feature'`.
4. Push to the branch: `git push origin feat/amazing-feature`.
5. Open a Pull Request.

## License
This project is licensed under the Unlicense License.