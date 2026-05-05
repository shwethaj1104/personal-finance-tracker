'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSignup = (e: React.FormEvent) => {
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">Create Account</h1>
          <p className="text-slate-600">Join Personal Finance Tracker today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
                placeholder="Last name"
                required
              />
            </div>
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 outline-none transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-indigo-700 font-medium transition-all duration-200">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}