import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95'

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gradient-to-r from-slate-600 to-gray-600 text-white hover:from-slate-700 hover:to-gray-700 focus:ring-slate-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-gradient-to-r from-blue-200 to-indigo-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 focus:ring-blue-500 hover:border-blue-300'
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  )
}