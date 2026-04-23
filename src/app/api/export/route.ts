import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'

    // Mock transaction data for export
    const transactions = [
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
      }
    ]

    if (format === 'csv') {
      // Generate CSV content
      const csvHeader = 'Date,Description,Category,Type,Amount\n'
      const csvRows = transactions
        .map(t => `${t.date},"${t.description}","${t.category}","${t.type}",${t.amount}`)
        .join('\n')

      const csvContent = csvHeader + csvRows

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="transactions.csv"'
        }
      })
    } else if (format === 'json') {
      return NextResponse.json({
        data: transactions,
        exportedAt: new Date().toISOString(),
        totalTransactions: transactions.length
      })
    } else {
      return NextResponse.json({
        error: 'Unsupported format. Use csv or json.'
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({
      error: 'Failed to export data'
    }, { status: 500 })
  }
}