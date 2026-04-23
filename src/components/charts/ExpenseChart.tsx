'use client'

interface ExpenseChartProps {
  data: Array<{
    category: string
    amount: number
    color: string
  }>
}

export default function ExpenseChart({ data }: ExpenseChartProps) {
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Expenses by Category</h3>
      <div className="space-y-5">
        {data.map((item, index) => {
          const percentage = ((item.amount / total) * 100).toFixed(1)
          return (
            <div key={index} className="group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div
                      className="w-5 h-5 rounded-full shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className="absolute inset-0 w-5 h-5 rounded-full opacity-30"
                      style={{ backgroundColor: item.color, filter: 'blur(4px)' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    ${item.amount.toLocaleString()}
                  </div>
                  <div
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    {percentage}%
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg">
          <span className="font-bold text-gray-800">Total Expenses</span>
          <span className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}