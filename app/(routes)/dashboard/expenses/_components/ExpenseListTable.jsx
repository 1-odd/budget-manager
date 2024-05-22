import { Trash } from 'lucide-react'
import React from 'react'
import { deleTeExpense } from '../_actions/expense'
import { toast } from 'sonner'

const ExpenseListTable = ({expenseList , refreshData}) => {


    const deleteExpense = async (expenseId)=>{
       const res = await deleTeExpense(expenseId);
         if(res){
              toast.success('Expense Deleted!')
              refreshData();
         }
    }



  return (
    <div className='mt-3'>
       <div className=" grid grid-cols-4 bg-slate-200 p-2">
        <h2 className=" font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
        
       </div>
         {expenseList.map((expense , index)=>(
            <div key={index} className=" grid grid-cols-4 bg-slate-50 p-2 mt-1">
             <h2 className=' font-semibold' >{expense.name}</h2>
             <h2 >{expense.amount}</h2>
             <h2 >{expense.createdAt}</h2>
             <h2 className=' ' >{ 
             <Trash className='text-red-600 cursor-pointer'
                onClick={()=> deleteExpense(expense.id)}
             /> 
             }</h2>
            </div>
         ))}
    </div>
  )
}

export default ExpenseListTable