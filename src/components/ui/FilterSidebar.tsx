'use client'

import { useState } from 'react'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    dateRange: { start: string; end: string }
    month: string
    categories: string[]
    transactionType: 'all' | 'income' | 'expense'
    amountRange: { min: string; max: string }
  }
  onFiltersChange: (filters: any) => void
}

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const categories = ['Food', 'Rent', 'Travel', 'Entertainment', 'Healthcare', 'Shopping', 'Utilities', 'Other']

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleCategoryToggle = (category: string) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Advanced Filters</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Date Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={localFilters.dateRange.start}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={localFilters.dateRange.end}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Month Picker */}
          <div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Month</label>
              <input
                type="month"
                placeholder=""
                value={localFilters.month}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  month: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Type</h3>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Transactions' },
                { value: 'income', label: 'Income Only' },
                { value: 'expense', label: 'Expenses Only' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="transactionType"
                    value={option.value}
                    checked={localFilters.transactionType === option.value}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      transactionType: e.target.value as 'all' | 'income' | 'expense'
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Amount Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Amount</label>
                <input
                  type="number"
                  placeholder="0"
                  value={localFilters.amountRange.min}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    amountRange: { ...prev.amountRange, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Amount</label>
                <input
                  type="number"
                  placeholder="∞"
                  value={localFilters.amountRange.max}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    amountRange: { ...prev.amountRange, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-6 bg-white border-t">
          <div className="flex space-x-3">
            <button
              onClick={handleApplyFilters}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}