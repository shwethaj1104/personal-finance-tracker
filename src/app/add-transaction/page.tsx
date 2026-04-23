'use client'

import { useRouter } from 'next/navigation'
import TransactionForm, { TransactionFormData } from '@/components/forms/TransactionForm'

export default function AddTransactionPage() {
  const router = useRouter()

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Form */}
        <TransactionForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}