'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface User {
  name: string
  email: string
}

interface HeaderProps {
  title: string
  subtitle?: string
  user: User
}

export default function Header({ title, subtitle, user }: HeaderProps) {
  const router = useRouter()

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-blue-50 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-4">
            {/* User Profile Icon */}
            <div className="relative group">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              {/* Hover Tooltip */}
              <div className="absolute right-0 top-12 bg-white shadow-lg border border-gray-200 rounded-lg p-4 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>

            <Button
              onClick={() => router.push('/login')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}