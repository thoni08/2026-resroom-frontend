import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import type { UseMutateFunction } from "@tanstack/react-query"
import { Button } from "../Button"
import { Dropdown } from "../Dropdown"
import { ModalBox } from "../ModalBox"
import type { BaseParams, PaginatedResponse, TableColumn, TableFilter } from "@/types"

interface TableProps<T> {
  for: string,
  data?: PaginatedResponse<any>
  columns: TableColumn[]
  filters: TableFilter[]
  filterHandler: {
    get: T,
    set: (value: T) => void
  }
  isLoading?: boolean
  deleteService: UseMutateFunction<any, Error, number, unknown>
  onPageChange?: (page: number) => void
}

export const Table = <T extends BaseParams,>(props: TableProps<T>) => {
  const [ itemToDelete, setItemToDelete ] = useState<number | null>(null)
  const [ draftFilters, setDraftFilters ] = useState<T>(props.filterHandler.get)
  const [ searchTemp, setSearchTemp ] = useState<string>(props.filterHandler.get.searchTerm || "")
  const navigate = useNavigate()

  const pagination = props.data?.pagination
  const currentPage = pagination?.CurrentPage || 1
  const totalPages = pagination?.TotalPages || 1
  const totalCount = pagination?.TotalCount || 0
  const hasNext = pagination?.HasNext || false
  const hasPrevious = pagination?.HasPrevious || false

  useEffect(() => {
    setDraftFilters(props.filterHandler.get)
  }, [JSON.stringify(props.filterHandler.get)])

  const handleSearch = () => {
    if (draftFilters.searchTerm !== searchTemp) {
      setDraftFilters(prev => ({ ...prev, searchTerm: searchTemp }))
      props.filterHandler.set({ ...draftFilters, searchTerm: searchTemp })
    }
  }

  const handleDraftChange = (key: keyof T, value: T[keyof T]) => {
    setDraftFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    props.filterHandler.set(draftFilters)
  }

  const handleResetFilters = () => {
    const defaults: T = {
      pageNumber: 1,
      pageSize: 10,
      view: 'active',
      ...Object.fromEntries(
        props.filters.flatMap(f => {
          if (f.isRange) {
            const cap = f.id.replace(/^./, char => char.toUpperCase())
            return [
              ['min' + cap, ''],
              ['max' + cap, ''],
            ]
          }
          return [[f.id, '']]
        })
      )
    } as T
    console.log(defaults)
    setDraftFilters(defaults)
    props.filterHandler.set(defaults)
  }

  const isDirty = JSON.stringify(draftFilters) !== JSON.stringify(props.filterHandler.get)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && props.onPageChange) {
      props.onPageChange(page)
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="bg-white relative shadow-md sm:rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTemp}
                onChange={(e) => setSearchTemp(e.target.value)}
                onBlur={handleSearch}
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2" placeholder="Search" required />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
          <Button onClick={() => navigate(`/${props.for}/new`)}>
            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Add {props.for.slice(0, -1)}
          </Button>
          <div hidden={props.filters.length === 0} className="flex items-center w-full md:w-auto">
            <Dropdown pos="bottom-right">
              <Dropdown.Trigger>
                <Button className="w-full md:w-auto text-gray-900  bg-white border border-gray-200 hover:bg-gray-100 focus:ring-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filter
                  <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu className="w-fit p-3">
                {props.filters.map((filter, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <h6 className="mb-2 text-sm font-medium text-gray-900">{(filter.label).replace(/^./, char => char.toUpperCase())}</h6>
                    {filter.isRange ? (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <input
                          type={filter.type}
                          value={
                            draftFilters['min'+(filter.id).replace(/^./, char => char.toUpperCase()) as keyof T] !== undefined
                              ? String(draftFilters['min'+(filter.id).replace(/^./, char => char.toUpperCase()) as keyof T])
                              : ''
                          }
                          onChange={(e) => handleDraftChange('min'+(filter.id).replace(/^./, char => char.toUpperCase()) as keyof T, e.target.value as T[keyof T])}
                          placeholder="Min"
                          className="min-w-18 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                        <span className="text-sm text-gray-500">to</span>
                        <input
                          type={filter.type}
                          value={
                            draftFilters['max'+(filter.id).replace(/^./, char => char.toUpperCase()) as keyof T] !== undefined
                              ? String(draftFilters['max'+(filter.id).replace(/^./, char => char.toUpperCase()) as keyof T])
                              : ''
                          }
                          onChange={(e) => handleDraftChange('max'+(filter.id).replace(/^./, char => char.toUpperCase()) as keyof T, e.target.value as T[keyof T])}
                          placeholder="Max"
                          className="min-w-18 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                    ) : (
                      filter.type === 'select' ? (
                        <select
                          value={
                            draftFilters[filter.id as keyof T] !== undefined
                              ? String(draftFilters[filter.id as keyof T])
                              : ''
                          }
                          onChange={(e) => handleDraftChange(filter.id as keyof T, e.target.value as T[keyof T])}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                          <option value="">Select an option</option>
                          {filter.options?.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={filter.type}
                          value={
                              draftFilters[filter.id as keyof T] !== undefined
                                ? String(draftFilters[filter.id as keyof T])
                                : ''
                            }
                          onChange={(e) => handleDraftChange(filter.id as keyof T, e.target.value as T[keyof T])}
                          placeholder={filter.label}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      )
                    )}
                  </div>
                ))}
                <div className="w-full flex gap-2">
                  <Button onClick={handleApplyFilters} disabled={!isDirty} className={`w-full bg-gray-50 border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1 focus:outline-none ${!isDirty ? "focus:ring-0! hover:bg-gray-50! opacity-50 cursor-not-allowed" : ""}`}>Apply</Button>
                  <Button onClick={handleResetFilters} className="w-full bg-gray-50 border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1 focus:outline-none">Clear</Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">#</th>
              {props.columns.map((column, index) => (
                <th key={index} scope="col" className="px-4 py-3">{column.label}</th>
              ))}
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {props.data?.items.map((item, index) => (
              <tr key={index} className={index > 0 ? "border-t border-gray-300" : ""}>
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{index + 1}</th>
                {props.columns.map((column, index) => (
                  <td key={index} className="px-4 py-3">{
                    column.type === "datetime" ? new Date(item[column.id as keyof typeof item] as string).toLocaleString() 
                      : column.type === "date" ? new Date(item[column.id as keyof typeof item] as string).toLocaleDateString() 
                      : String(item[column.id as keyof typeof item])}
                  </td>
                ))}
                <td className="px-4 py-3 flex items-center justify-end relative">
                  <Dropdown pos="bottom-right">
                    <Dropdown.Trigger className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none cursor-pointer">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </Dropdown.Trigger>
                    <Dropdown.Menu className="w-44 divide-y divide-gray-100">
                      <ul className="text-sm text-gray-700">
                        <li>
                          <NavLink to={`/${props.for}/${item.id}`} className="block py-2 px-4 hover:bg-gray-100 rounded-t-lg">Show</NavLink>
                        </li>
                        <li>
                          <NavLink to={`/${props.for}/${item.id}/edit`} className="block py-2 px-4 hover:bg-gray-100">Edit</NavLink>
                        </li>
                      </ul>
                      <div>
                        <span className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg cursor-pointer" onClick={() => setItemToDelete(item.id)}>Delete</span>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav hidden={totalCount == 0} className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 border-t border-gray-300">
        <span className="text-sm font-normal text-gray-500">
          Showing
          <span className="font-semibold text-gray-900">
            {' '}{((currentPage - 1) * (pagination?.PageSize || 10)) + 1}-{Math.min(currentPage * (pagination?.PageSize || 10), totalCount)}{' '}
          </span>
          of
          <span className="font-semibold text-gray-900"> {totalCount}</span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevious}
              className="h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-none rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          </li>
          {getPageNumbers().map((page, index) => (
            <li key={index}>
              {page === '...' ? (
                <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white rounded-none border border-gray-300">
                  ...
                </span>
              ) : (
                <Button
                  onClick={() => handlePageChange(page as number)}
                  className={`py-2 leading-tight ${
                    currentPage === page
                      ? 'z-10 text-blue-600 bg-blue-50 rounded-none border border-blue-300 hover:bg-blue-100 hover:text-blue-700 focus:ring-0'
                      : 'text-gray-500 bg-white rounded-none border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:ring-0'
                  }`}>
                  {page}
                </Button>
              )}
            </li>
          ))}
          <li>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNext}
              className="h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-none rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          </li>
        </ul>
      </nav>
      <ModalBox hidden={itemToDelete === null} onConfirm={() => { props.deleteService(itemToDelete!); setItemToDelete(null); }} onCancel={() => setItemToDelete(null)} />
    </div>
  )
}