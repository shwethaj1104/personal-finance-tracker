'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TransactionForm, { TransactionFormData } from '@/components/forms/TransactionForm'
import Header from '@/components/layout/Header'

export default function AddTransactionPage() {
  const router = useRouter()

  // Mock user data - would be fetched from API based on login
  const getMockUserData = () => {
    const mockUsers = [
      { name: 'John Smith', email: 'john.smith@gmail.com' },
      { name: 'Sarah Johnson', email: 'sarah.johnson@yahoo.com' },
      { name: 'Mike Davis', email: 'mike.davis@outlook.com' },
      { name: 'Lisa Chen', email: 'lisa.chen@hotmail.com' },
      { name: 'Alex Rodriguez', email: 'alex.rodriguez@gmail.com' }
    ]

    // Simple hash based on current time for demo purposes
    const index = Date.now() % mockUsers.length
    return mockUsers[index]
  }

  const [userData] = useState(getMockUserData())

  const handleSubmit = async (data: TransactionFormData) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Show success message or redirect to dashboard
        router.push('/dashboard')
      } else {
        console.error('Failed to add transaction')
      }
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        title="Add Transaction"
        subtitle="Record your income or expense"
        user={userData}
        showBackButton={true}
        backButtonText="Back to Dashboard"
        backButtonPath="/dashboard"
      />

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form */}
          <TransactionForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  )
}