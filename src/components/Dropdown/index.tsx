import { useCallback, useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { DropdownContext, useDropdownContext } from "./DropdownContext"

type DropdownPosition = "bottom-right" | "bottom-left"

interface DropdownProps {
  children: React.ReactNode
  pos?: DropdownPosition
}

interface DropdownTriggerProps {
  children: React.ReactNode,
  className?: string
}

interface DropdownMenuProps {
  children: React.ReactNode,
  className?: string
}

type DropdownComponent = ((props: DropdownProps) => React.ReactElement) & {
  Trigger: (props: DropdownTriggerProps) => React.ReactElement
  Menu: (props: DropdownMenuProps) => React.ReactElement
}

export const Dropdown: DropdownComponent = ({ children, pos }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  return (
    <DropdownContext.Provider value={{ isOpen, pos, toggle }}>
      <div ref={dropdownRef} className="inline-flex relative">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

Dropdown.Trigger = ({ children, className }) => {
  const { toggle } = useDropdownContext()

  return (
    <div tabIndex={0} onClick={toggle} className={className}>
      {children}
    </div>
  )
}

Dropdown.Menu = ({ children, className }) => {
  const { pos, isOpen } = useDropdownContext()
  const posClass = pos === "bottom-right" ? "right-0 top-full mt-2" : "left-0 top-full mt-2"

  return (
    <div hidden={!isOpen} className={twMerge("absolute w-fit bg-white rounded-lg border border-gray-200 shadow-md z-10", posClass, className)}>
      {children}
    </div>
  )
}