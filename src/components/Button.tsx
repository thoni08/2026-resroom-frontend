import { twMerge } from 'tailwind-merge'
import React from 'react'

interface ButtonProps {
  onClick?: () => void,
  disabled?: boolean,
  children: React.ReactNode,
  className?: string,
}

export const Button = (props: ButtonProps) => {
  return (
    <button 
      type='button'
      className={twMerge('flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none cursor-pointer', props.className)} 
      disabled={props.disabled} 
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}