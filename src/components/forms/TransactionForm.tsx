'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void
  onCancel: () => void
}

export interface TransactionFormData {
  type: 'income' | 'expense'
  amount: string
  description: string
  category: string
  date: string
  notes?: string
}

export default function TransactionForm({ onSubmit, onCancel }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    type: 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const categories = {
    expense: ['Food', 'Rent', 'Travel', 'Entertainment', 'Healthcare', 'Shopping', 'Utilities', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Bonus', 'Other']
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' && { category: '' })
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description'
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Transaction</h2>
        <p className="text-gray-600">Enter the details of your income or expense</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Income</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Expense</span>
            </label>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className={`w-full pl-7 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                errors.amount ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter transaction description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
              errors.category ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories[formData.type].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
              errors.date ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
            placeholder="Add any additional notes..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-4 pt-6">
          <Button type="submit" className="flex-1">
            Add Transaction
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}