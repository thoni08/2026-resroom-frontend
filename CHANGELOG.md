# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-15

### Added
- **Initial Release:** Launched the core Frontend application using React, TypeScript, and Vite.
- **Generic Table Component:** Introduced a fully reusable `<Table />` component supporting server-side pagination, dynamic columns, and custom rendering.
- **URL-Driven State:** Implemented `useUrlFilters` hook to manage application state (search, sort, filters) via URL parameters, ensuring shareable views.
- **Global Error Handling:** Added an Axios interceptor to globally handle 500 (Server Error) and 401 (Unauthorized) responses with toast notifications.
- **Room Management:** Implemented full CRUD pages (List, Create, Edit, Delete) for Rooms with advanced side-bar filters.
- **Reservation Management:** Added Reservation booking workflow with dynamic Room Selector and visual status badges.
- **Smart Forms:** Created reusable form components using React Hook Form and Zod validation to prevent invalid submissions.
- **UI Library:** Extracted `ModalBox`, `Dropdown`, and `Button` into a shared UI library for consistent design across features.

### Fixed
- **Infinite Loop:** Resolved a `Maximum update depth exceeded` error in the filter component by stabilizing `useEffect` dependencies.
- **Input State:** Fixed "Controlled input to be uncontrolled" errors by ensuring all form inputs initialize with valid fallback values.
- **Query Caching:** Fixed an issue where applying filters did not trigger an API refresh by including filter parameters in React Query keys.
- **Validation Feedback:** Improved error handling to correctly parse and display ASP.NET Core `400 Bad Request` validation errors inline with form fields.
