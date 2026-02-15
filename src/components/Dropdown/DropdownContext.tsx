import { createContext, useContext } from "react"

export interface DropdownContextValue {
  isOpen: boolean,
  pos?: string
  toggle: () => void
}

export const DropdownContext = createContext<DropdownContextValue | undefined>(undefined)
export const useDropdownContext = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdownContext must be used within a DropdownProvider')
  }
  return context
}