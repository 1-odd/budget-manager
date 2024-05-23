'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { addExpense } from '../_actions/expense';
import { toast } from 'sonner';

const AddExpense = ({budgetId , refreshData }) => {
    
    const [name , setName] = useState("");
    const [amount , setAmount] = useState(0);
    

    const addNewExpense = async ()=>{
        
       const result = await  addExpense(name , amount , budgetId);

       setAmount('');
        setName('');

       if(result){
        refreshData();
        toast.success('New Expense Added')
       }

       
    }
    

  return (
    <div className=' border p-5 rounded-lg' >
        <h2 className='text-lg font-bold'>Add Expense</h2>
        <div className="mt-3">
                  <h2 className=" text-black font-md my-2 font-bold ">
                    Expense Name
                  </h2>
                  <Input
                  value={name}
                    placeholder="e.g. Shopping"
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                  />
        </div>
        <div className="mt-3">
                  <h2 className=" text-black font-md my-2 font-bold ">
                    Expense Amount
                  </h2>
                  <Input type="number"
                  value={amount}
                    placeholder="e.g. ₹ 1245"
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }}
                  />
        </div>
        <Button className= ' mt-3 w-full '  
            onClick={()=>addNewExpense() }
        >Add New Expense</Button>
    </div>
  )
}

export default AddExpense