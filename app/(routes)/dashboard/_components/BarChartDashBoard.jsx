"use client";
import React, { useEffect, useState } from "react";
import { getBudgetList } from "../budgets/_actions/budget";
import { useUser } from "@clerk/nextjs";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const BarChartDashBoard = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  const getBudget = async () => {
    const result = await getBudgetList();
    setBudgetList(result);
  };
  useEffect(() => {
    user && getBudget();
  }, [user]);

  const normalizedBudgetList = budgetList.map(budget => ({
    ...budget,
    amount: Number(budget.amount),
    totalSpend: Number(budget.totalSpend)
  }));

  return (
    <MyBarChart budgetList={normalizedBudgetList} />
  )
};


const MyBarChart = ({ budgetList }) => {
  return (
    <div className=" border rounded-lg p-5 " >
      <h2 className="font-bold text-lg pb-5">Activity</h2>
      <BarChart width={500} height={300} data={budgetList} margin={{top:7}} >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" key="totalSpend" />
      <Bar dataKey="amount" stackId="a" fill="#C3C2FF" key="amount" />
    </BarChart>
    </div>
  );
};

export default BarChartDashBoard;
