import React from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium'

  const activeClasses = props.disabled
    ? ''
    : 'transition-colors cursor-pointer'

  const buttonStyle = props.disabled
    ? 'bg-gray text-graphite opacity-50 cursor-not-allowed'
    : variant === 'primary'
      ? 'bg-amber text-graphite hover:bg-mustard'
      : 'bg-gray text-graphite hover:bg-titanium'

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseClasses} ${buttonStyle} ${activeClasses} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button