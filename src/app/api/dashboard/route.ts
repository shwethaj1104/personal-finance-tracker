import { NextResponse } from 'next/server'

export async function GET() {
  // Mock dashboard data - replace with actual database queries later
  const mockData = {
    totalIncome: 8500,
    totalExpenses: 6200,
    netBalance: 2300,
    aiSummary: "You spent 30% more on food this month compared to last month. Consider setting a monthly budget for dining out to better control expenses.",
    expensesByCategory: [
      { category: 'Food', amount: 1500, color: '#f97316' }, // Modern orange
      { category: 'Rent', amount: 2000, color: '#3b82f6' }, // Modern blue
      { category: 'Travel', amount: 800, color: '#10b981' }, // Modern emerald
      { category: 'Entertainment', amount: 600, color: '#8b5cf6' }, // Modern violet
      { category: 'Healthcare', amount: 300, color: '#ef4444' }, // Modern red
      { category: 'Shopping', amount: 700, color: '#ec4899' }, // Modern pink
      { category: 'Utilities', amount: 300, color: '#06b6d4' } // Modern cyan
    ],
    monthlyTrend: [
      { month: 'Jan 2024', income: 8000, expenses: 5500 },
      { month: 'Feb 2024', income: 8200, expenses: 5800 },
      { month: 'Mar 2024', income: 8500, expenses: 6200 },
      { month: 'Apr 2024', income: 8300, expenses: 6000 }
    ],
    recentTransactions: [
      {
        date: '2024-04-20',
        description: 'Grocery Shopping',
        category: 'Food',
        type: 'expense',
        amount: 125.50
      },
      {
        date: '2024-04-19',
        description: 'Freelance Payment',
        category: 'Freelance',
        type: 'income',
        amount: 1200.00
      },
      {
        date: '2024-04-18',
        description: 'Gas Bill',
        category: 'Utilities',
        type: 'expense',
        amount: 85.30
      },
      {
        date: '2024-04-17',
        description: 'Movie Tickets',
        category: 'Entertainment',
        type: 'expense',
        amount: 45.00
      },
      {
        date: '2024-04-16',
        description: 'Salary',
        category: 'Salary',
        type: 'income',
        amount: 5000.00
      },
      {
        date: '2024-04-15',
        description: 'Coffee Shop',
        category: 'Food',
        type: 'expense',
        amount: 12.75
      }
    ]
  }

  return NextResponse.json(mockData)
}

export async function POST(request: Request) {
  try {
    const filters = await request.json()

    // In a real app, you would filter the data based on the filters
    // For now, just return the same mock data
    const mockData = {
      totalIncome: 8500,
      totalExpenses: 6200,
      netBalance: 2300,
      aiSummary: `Based on your filters, you spent 25% more on ${filters.categories?.[0] || 'selected categories'} this period.`,
      expensesByCategory: [
        { category: 'Food', amount: 1500, color: '#f97316' }, // Modern orange
        { category: 'Rent', amount: 2000, color: '#3b82f6' }, // Modern blue
        { category: 'Travel', amount: 800, color: '#10b981' }, // Modern emerald
        { category: 'Entertainment', amount: 600, color: '#8b5cf6' } // Modern violet
      ],
      monthlyTrend: [
        { month: 'Jan 2024', income: 8000, expenses: 5500 },
        { month: 'Feb 2024', income: 8200, expenses: 5800 },
        { month: 'Mar 2024', income: 8500, expenses: 6200 },
        { month: 'Apr 2024', income: 8300, expenses: 6000 }
      ],
      recentTransactions: [
        {
          date: '2024-04-20',
          description: 'Grocery Shopping',
          category: 'Food',
          type: 'expense',
          amount: 125.50
        },
        {
          date: '2024-04-19',
          description: 'Freelance Payment',
          category: 'Freelance',
          type: 'income',
          amount: 1200.00
        }
      ]
    }

    return NextResponse.json(mockData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}