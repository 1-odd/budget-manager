'use server'


import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




const checkUserBudget = async ()=>{
  const user = await currentUser();
  const email = user.emailAddresses[0].emailAddress
    const res = await prisma.budgets.findFirst({
      where:{
        createdBy: email
      }
    })
    console.log(res)
    if(res === null){
      redirect('/dashboard/budgets')
    }
    
  }
  export default checkUserBudget ;


  export const createNewBudget = async ( name , amount , emoji )=>{
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress
    const res = await prisma.budgets.create({
      data:{
        name,
        amount,
        createdBy: email,
        icon:emoji
      }
    })
    return res;
  }




 export const getBudgetList = async () => {

    const user = await currentUser();
    const userEmail = user.emailAddresses[0].emailAddress;
    const budgets = await prisma.budgets.findMany({
      where: {
        createdBy: userEmail
      },
      select: {
        id: true,
        name: true,
        amount:true,
        icon:true,
        createdBy: true,
        _count: {
          select: { expenses: true },
        },
        expenses: {
          select: {
            amount: true,
          },
        },
      },
    });
  
    const result = budgets.map(budget => {
      const totalSpend = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const totalItem = budget._count.expenses;
      
      return {
        ...budget,
        totalSpend,
        totalItem,
      };
    });
  
    console.log(result);
    return result;
  };