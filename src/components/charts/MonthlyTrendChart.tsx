'use client'

interface MonthlyTrendChartProps {
  data: Array<{
    month: string
    income: number
    expenses: number
  }>
}

export default function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  const maxAmount = Math.max(
    ...data.flatMap(item => [item.income, item.expenses])
  )

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Monthly Trend</h3>
      <div className="space-y-6">
        {data.map((item, index) => {
          const netAmount = item.income - item.expenses
          const isPositive = netAmount >= 0
          return (
            <div key={index} className="group hover:bg-gray-50 p-4 rounded-lg transition-all duration-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-800">{item.month}</span>
                <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                  isPositive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}>
                  Net: {isPositive ? '+' : ''}${netAmount.toLocaleString()}
                </div>
              </div>
              <div className="space-y-3">
                {/* Income Bar */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold text-emerald-600 w-18">Income</span>
                  <div className="flex-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full shadow-sm transition-all duration-300 hover:shadow-md"
                      style={{ width: `${(item.income / maxAmount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-20 text-right">
                    ${item.income.toLocaleString()}
                  </span>
                </div>
                {/* Expense Bar */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold text-rose-600 w-18">Expenses</span>
                  <div className="flex-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full shadow-sm transition-all duration-300 hover:shadow-md"
                      style={{ width: `${(item.expenses / maxAmount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-20 text-right">
                    ${item.expenses.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}