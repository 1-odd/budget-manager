'use client'
import React, { useEffect, useState } from 'react'
import { getBudgetList } from '../budgets/_actions/budget';
import { useUser } from '@clerk/nextjs';
import BudgetListItem from '../budgets/_components/BudgetListItem';

const OtherContentDashboard = () => {


    const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  const getBudget = async () => {
    const result = await getBudgetList();
    setBudgetList(result);
  };
  useEffect(() => {
    user && getBudget();
  }, [user]);




  return (
    <div className='grid gap-5'>

        <h2 className='font-bold text-lg' >Latest Budget</h2>

        {budgetList.map((budget , index)=>(
            <BudgetListItem key={index} budget={budget} />
        ))}
   
    </div>
  )
}

export default OtherContentDashboard