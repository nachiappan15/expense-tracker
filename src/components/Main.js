import React from 'react'
import Feeds from './Feeds'
import Form from './Form'
import useTransactions from '../useTransaction'

const Main = () => {
  const incomeTotal = useTransactions("Income").total
  const ExpenseTotal = useTransactions("Expense").total

  
  return (
    <div className=' min-h-0 lg:w-1/4 w-4/5 bg-card rounded-md flex  flex-col gap-4 overflow-hidden text-cardText'>
        <h1 className='text-2xl font-medium px-3 mt-1'>Expense Tracker</h1>

        <span className='text-lg font-medium  text-center'>
            Total Balance &#8377;{incomeTotal-ExpenseTotal}
        </span>
        
        <Form/>
        <Feeds/>

    </div>
  )
}

export default Main