import { useRef } from "react"

export const AlertBox = (type: 'info' | 'success' | 'warning' | 'danger') => {
  const alertRef = useRef<HTMLDivElement>(null)

  const closeAlert = () => {
    if (alertRef.current) {
      alertRef.current.remove()
    }
  }

  return (
    <div id={`${type}-alert`} role="alert" ref={alertRef}
      className={
        `flex sm:items-center p-3 mb-4 text-sm rounded-lg border 
          ${type === 'info' ? 'text-blue-800 bg-blue-100' : ''} 
          ${type === 'success' ? 'text-green-800 bg-green-100' : ''} 
          ${type === 'warning' ? 'text-yellow-800 bg-yellow-100' : ''} 
          ${type === 'danger' ? 'text-red-800 bg-red-100' : ''}`}>
      <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ms-2 text-sm">
        <slot></slot>
      </div>
      <button type="button" onClick={closeAlert}
        className="ms-auto -mx-1.5 -my-1.5 rounded hover:bg-brand-soft inline-flex items-center justify-center h-8 w-8 shrink-0 cursor-pointer">
        <span className="sr-only">Close</span>
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
      </button>
    </div>
  )
}