"use client";
import React, { useEffect, useState } from "react";
import { deleteCurrentBudget, getAllExpenseList, getBudgetInfo } from "../_actions/expense";
import { useUser } from "@clerk/nextjs";
import BudgetListItem from "../../budgets/_components/BudgetListItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudgetDialog from "../_components/EditBudgetDialog";

const Expenses = ({ params }) => {

  const router = useRouter();

  const budgetId = parseInt(params.id);
  const { user } = useUser();

  const [budgetInfo, setBudgetInfo] = useState();
  const [expenses, setExpenses] = useState([]);

  const currentBudgetInfo = async (id) => {
    const result = await getBudgetInfo(id);
    setBudgetInfo(result);
    getExpenseList(budgetId);
  };

  useEffect(() => {
    user && currentBudgetInfo(budgetId);
  }, [params.id, user]);

  const getExpenseList = async (budgetId) => {
    const result = await getAllExpenseList(budgetId);
    setExpenses(result);
  };

  const deleteBudget = async (budgetId)=>{
    const result = await deleteCurrentBudget(budgetId);
    if(result){
      toast.success("Budget deleted successfully");
      router.replace('/dashboard/budgets')
    }
  }

  return (
    <div className="p-10">
      <h2 className=" text-2xl font-bold flex justify-between items-center">My Expenses
        
        <div className="flex gap-5 items-center">

          <EditBudgetDialog budgetInfo ={budgetInfo} refreshData={()=> currentBudgetInfo(budgetId)  } />


          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex gap-2 font-bold">
                Delete Budget
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  budget and all expenses associated with it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={()=>deleteBudget(budgetId)}
                >Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        

      </h2>

      <div className=" grid grid-cols-1 md:grid-cols-2  mt-6 gap-6">
        {budgetInfo ? (
          <BudgetListItem budget={budgetInfo} />
        ) : (
          <div className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"></div>
        )}
        <AddExpense
          budgetId={budgetId}
          refreshData={() => currentBudgetInfo(budgetId)}
        />
      </div>
      <div className=" mt-4">
        <h2 className=" font-bold text-lg ">Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenses}
          refreshData={() => currentBudgetInfo(budgetId)}
        />
      </div>
    </div>
  );
};

export default Expenses;
