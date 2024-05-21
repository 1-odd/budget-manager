'use client'
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { getBudgetList } from '../_actions/budget';
import { useUser } from '@clerk/nextjs';
import BudgetListItem from './BudgetListItem';


const BudgetList = () => {


  const [budgetList , setBudgetList] = useState([]);

   
const {user} = useUser();


const ab = async ()=>{
  const res = await getBudgetList();
  setBudgetList(res)
}


  
    useEffect(() => {
      user && ab();
    }, [user])
 
  

  return (
    <div className=' mt-7'>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <CreateBudget/>
          {budgetList.map((budget,index)=>(
            <BudgetListItem  budget={budget} />
          ))}
        </div>
       
    </div>
  )
}

export default BudgetList