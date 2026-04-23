'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import FilterSidebar from '@/components/ui/FilterSidebar'
import ExpenseChart from '@/components/charts/ExpenseChart'
import MonthlyTrendChart from '@/components/charts/MonthlyTrendChart'

export default function DashboardPage() {
  const router = useRouter()
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [filters, setFilters] = useState({
    dateRange: { start: '2024-01-01', end: '2024-12-31' },
    categories: [],
    transactionType: 'all' as 'all' | 'income' | 'expense',
    amountRange: { min: '', max: '' }
  })

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData()
  }, [filters])

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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Personal Finance Dashboard</h1>
              <p className="text-gray-600">Track your income and expenses</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/login')} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Period:</label>
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Category:</label>
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Rent</option>
                  <option>Travel</option>
                  <option>Entertainment</option>
                </select>
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

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl shadow-sm border border-rose-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-600 font-medium">Total Expenses</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  ${dashboardData.totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-3 rounded-xl shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-sm border ${
            dashboardData.netBalance >= 0
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'
              : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  dashboardData.netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'
                }`}>Net Balance</p>
                <p className={`text-3xl font-bold ${
                  dashboardData.netBalance >= 0
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'
                }`}>
                  ${dashboardData.netBalance.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-xl shadow-sm ${
                dashboardData.netBalance >= 0
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
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
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
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
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
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