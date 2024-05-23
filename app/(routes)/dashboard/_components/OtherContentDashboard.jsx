'use client'
import React, { useEffect, useState } from 'react'
import { getBudgetList } from '../budgets/_actions/budget';

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
    <div>


    </div>
  )
}

export default OtherContentDashboard