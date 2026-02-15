import { useSearchParams } from "react-router";
import type { BaseParams } from "@/types";

export const useUrlFilters = <T extends BaseParams>(initialExtras?: Partial<T>) => {
  const [ searchParams, setSearchParams ] = useSearchParams()

  const filters = {
    ...initialExtras,
    pageNumber: Number(searchParams.get("pageNumber")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
    searchTerm: searchParams.get("searchTerm") || "",
    sortDirection: (searchParams.get("sortDirection") as "asc" | "desc") || "asc",
    sortBy: searchParams.get("sortBy") || "",
    ...Object.fromEntries(searchParams.entries())
  } as T

  const setFilters = (updates: Partial<T>) => {
    setSearchParams((prev) => {
      const current = Object.fromEntries(prev.entries())
      const merged = { ...current, ...updates }

      // Remove undefined or null values
      Object.keys(merged).forEach((key) => {
        if (merged[key as keyof T] === undefined || merged[key as keyof T] === null) {
          delete merged[key as keyof T]
        }
      })

      if (!updates.pageNumber) {
        merged.pageNumber = 1 as T["pageNumber"];
      }

      return merged as any
    })
  }

  const resetFilters = () => {
    setSearchParams({})
  }

  return {
    filters,
    setFilters,
    resetFilters
  }
}