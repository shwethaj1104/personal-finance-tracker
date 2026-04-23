import { NextResponse } from 'next/server'

// Mock transactions database
let mockTransactions = [
  {
    id: 1,
    type: 'expense',
    amount: 125.50,
    description: 'Grocery Shopping',
    category: 'Food',
    date: '2024-04-20',
    notes: 'Weekly groceries from Whole Foods'
  },
  {
    id: 2,
    type: 'income',
    amount: 1200.00,
    description: 'Freelance Payment',
    category: 'Freelance',
    date: '2024-04-19',
    notes: 'Web development project payment'
  },
  {
    id: 3,
    type: 'expense',
    amount: 85.30,
    description: 'Gas Bill',
    category: 'Utilities',
    date: '2024-04-18',
    notes: 'Monthly gas bill'
  },
  {
    id: 4,
    type: 'expense',
    amount: 45.00,
    description: 'Movie Tickets',
    category: 'Entertainment',
    date: '2024-04-17',
    notes: 'Movie night with friends'
  },
  {
    id: 5,
    type: 'income',
    amount: 5000.00,
    description: 'Salary',
    category: 'Salary',
    date: '2024-04-16',
    notes: 'Monthly salary deposit'
  }
]

export async function GET() {
  // Return all transactions
  return NextResponse.json({
    transactions: mockTransactions,
    total: mockTransactions.length
  })
}

export async function POST(request: Request) {
  try {
    const transactionData = await request.json()

    // Generate a new ID
    const newId = Math.max(...mockTransactions.map(t => t.id)) + 1

    // Create new transaction
    const newTransaction = {
      id: newId,
      ...transactionData,
      amount: parseFloat(transactionData.amount)
    }

    // Add to mock database
    mockTransactions.unshift(newTransaction)

    return NextResponse.json({
      success: true,
      transaction: newTransaction,
      message: 'Transaction added successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding transaction:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to add transaction'
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Transaction ID is required'
      }, { status: 400 })
    }

    const transactionId = parseInt(id)
    const initialLength = mockTransactions.length

    // Remove transaction from mock database
    mockTransactions = mockTransactions.filter(t => t.id !== transactionId)

    if (mockTransactions.length === initialLength) {
      return NextResponse.json({
        success: false,
        error: 'Transaction not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Transaction deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete transaction'
    }, { status: 500 })
  }
}