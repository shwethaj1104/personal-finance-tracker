'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FilterSidebar from '@/components/ui/FilterSidebar'
import ExpenseChart from '@/components/charts/ExpenseChart'
import MonthlyTrendChart from '@/components/charts/MonthlyTrendChart'
import Header from '@/components/layout/Header'

export default function DashboardPage() {
  const router = useRouter()
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [filters, setFilters] = useState({
    dateRange: { start: '2024-01-01', end: '2024-12-31' },
    month: '',
    categories: [],
    transactionType: 'all' as 'all' | 'income' | 'expense',
    amountRange: { min: '', max: '' }
  })

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
  const [selectedPeriod, setSelectedPeriod] = useState('This Month')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [isPeriodOpen, setIsPeriodOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData()
  }, [filters])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isPeriodOpen || isCategoryOpen) {
        setIsPeriodOpen(false)
        setIsCategoryOpen(false)
      }
    }

    if (isPeriodOpen || isCategoryOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isPeriodOpen, isCategoryOpen])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const handleAddTransaction = () => {
    router.push('/add-transaction')
  }

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const handleExportCSV = async () => {
    try {
      const response = await fetch('/api/export?format=csv')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'transactions.csv'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else {
        console.error('Failed to export CSV')
      }
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        title="Personal Finance Dashboard"
        subtitle="Track your income and expenses"
        user={userData}
      />

      {/* Filters Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Period:</label>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsPeriodOpen(!isPeriodOpen)
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center space-x-2 min-w-32"
                  >
                    <span>{selectedPeriod}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isPeriodOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {['This Month', 'Last Month', 'Last 3 Months', 'This Year'].map((period) => (
                        <button
                          key={period}
                          onClick={() => {
                            setSelectedPeriod(period)
                            setIsPeriodOpen(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Category:</label>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsCategoryOpen(!isCategoryOpen)
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center space-x-2 min-w-36"
                  >
                    <span>{selectedCategory}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCategoryOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {['All Categories', 'Food', 'Rent', 'Travel', 'Entertainment', 'Healthcare', 'Shopping', 'Utilities'].map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category)
                            setIsCategoryOpen(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsFilterSidebarOpen(true)}
                variant="outline"
                size="sm"
              >
                More Filters
              </Button>
              <Button onClick={handleAddTransaction} size="sm">
                + Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Total Income</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ${dashboardData.totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-25 to-orange-25 p-6 rounded-xl shadow-sm border border-amber-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600 font-medium">Total Expenses</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  ${dashboardData.totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-3 rounded-xl shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-sm border ${
            dashboardData.netBalance >= 0
              ? 'bg-gradient-to-r from-blue-25 to-indigo-25 border-blue-50'
              : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  dashboardData.netBalance >= 0 ? 'text-blue-400' : 'text-orange-400'
                }`}>Net Balance</p>
                <p className={`text-3xl font-bold ${
                  dashboardData.netBalance >= 0
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'
                }`}>
                  ${dashboardData.netBalance.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-xl shadow-sm ${
                dashboardData.netBalance >= 0
                  ? 'bg-gradient-to-r from-blue-300 to-indigo-300'
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
              }`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 p-6 rounded-xl border border-violet-200 mb-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-3 rounded-xl shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">AI Insights</h3>
              <p className="text-violet-800 leading-relaxed">{dashboardData.aiSummary}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart data={dashboardData.expensesByCategory} />
          <MonthlyTrendChart data={dashboardData.monthlyTrend} />
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 mb-12 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                Export CSV
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto pb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentTransactions.map((transaction: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.type === 'income'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  )
}