'use client'
import React, { useEffect, useState } from 'react'
import { getAllExpenses } from './_actions/expense'
import { useUser } from '@clerk/nextjs'
import ExpenseListTable from './_components/ExpenseListTable';

function Page() {

    const {user} = useUser();
    const [expensesList , setExpensesList] = useState([]);

    const allExpenses = async ()=>{
        const res = await getAllExpenses();
        setExpensesList(res);
        
    }

    useEffect(()=>{
       user && allExpenses();
    },[user])


  return (
    <div>
      <h2 className='font-bold text-2xl p-5'>All Expenses Listed Here</h2>
      <div className='m-5'>
      <ExpenseListTable expenseList={expensesList} refreshData={()=>allExpenses()} />
      </div>
    </div>
  )
}

export default Page