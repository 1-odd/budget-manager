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
        <ExpenseListTable expenseList={expensesList} refreshData={()=>allExpenses()} />
    </div>
  )
}

export default Page