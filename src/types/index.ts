export interface BaseParams {
  view?: string,
  searchTerm?: string,
  sortBy?: string,
  sortDirection?: 'asc' | 'desc',
  pageNumber?: number,
  pageSize?: number
}

export interface TableColumn {
  id: string,
  label: string,
  type: 'text' | 'number' | 'datetime' | 'date',
  sortable?: boolean
}

export interface TableFilter {
  id: string,
  label: string,
  type: 'text' | 'number' | 'date' | 'select',
  isRange?: boolean,
  options?: { label: string, value: string | number }[]
}

export interface TableFilterHandler {
  filters: any,
  draftFilters: any,
  setDraftFilters: (filters: any) => void,
  handleDraftChange: (key: any, value: any) => void,
  handleApplyFilters: () => void,
  handleResetFilters: () => void,
  isDirty: boolean
}

export interface PaginationMetadata {
  TotalCount: number,
  PageSize: number,
  CurrentPage: number,
  TotalPages: number,
  HasNext: boolean,
  HasPrevious: boolean
}

export interface PaginatedResponse<T> {
  items: T[],
  pagination: PaginationMetadata
}