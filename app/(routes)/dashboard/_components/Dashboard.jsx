"use client";
import React, { useEffect, useState } from "react";
import CardsInfo from "./CardsInfo";
import { getBudgetList } from "../budgets/_actions/budget";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { user } = useUser();

  const [budgetList , setBudgetList] = useState([]);

  const getBudget = async () => {
    const result = await getBudgetList();
    setBudgetList(result);
  };
  useEffect(() => {
    user && getBudget();
  }, [user]);

  return (
    <div>
      <CardsInfo budgetList={budgetList} />
    </div>
  );
};

export default Dashboard;
