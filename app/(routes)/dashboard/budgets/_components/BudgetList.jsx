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
          <CreateBudget refreshData={()=> ab() } />
          {budgetList?.length > 0 ? budgetList.map((budget,index)=>(
            <BudgetListItem key={index} budget={budget} />
          )) : [1,2,3,4,5].map((item , index)=> (
            <div key={index} className=" w-full bg-slate-200 rounded-lg h-[150px] animate-pulse ">

            </div>
          ) )
           }
        </div>
       
    </div>
  )
}

export default BudgetList