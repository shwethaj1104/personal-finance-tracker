'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // No auth logic as requested - just navigate to dashboard
    router.push('/dashboard')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your Personal Finance Tracker</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-indigo-700 font-medium transition-all duration-200">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}