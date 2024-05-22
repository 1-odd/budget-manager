'use client'
import React, { useEffect, useState } from 'react'
import { getAllExpenseList, getBudgetInfo } from '../_actions/expense'
import { useUser } from '@clerk/nextjs';
import BudgetListItem from '../../budgets/_components/BudgetListItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';


const Expenses = ({params}) => {

  const budgetId = parseInt(params.id);
  const {user} = useUser();

  const [budgetInfo , setBudgetInfo] = useState();
  const [expenses , setExpenses] = useState([]);

 const currentBudgetInfo = async (id)=>{
    const result = await getBudgetInfo(id);
    setBudgetInfo(result); 
    getExpenseList(budgetId);
 }

    useEffect(() => {
       user && currentBudgetInfo(budgetId); 
    }, [params.id , user])
    
  const getExpenseList = async (budgetId)=>{
    const result = await getAllExpenseList(budgetId);
    setExpenses(result);
  }


  return (
    <div className='p-10'>
        <h2 className=' text-2xl font-bold'>My Expenses</h2>
        <div className=" grid grid-cols-1 md:grid-cols-2  mt-6 gap-6">
          { budgetInfo ? <BudgetListItem budget={budgetInfo}  />
            : <div className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"></div>
          }
          <AddExpense budgetId={budgetId} refreshData={ ()=> 
            currentBudgetInfo(budgetId)
          } />
        </div>
          <div className=" mt-4">
            <h2 className=' font-bold text-lg ' >Latest Expenses</h2>
            <ExpenseListTable expenseList={expenses} refreshData={()=>currentBudgetInfo(budgetId)} />
          </div>
    </div>
  )
}

export default Expenses;