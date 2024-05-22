'use server'
import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';
const prisma = new PrismaClient();

export const getBudgetInfo = async (budgetId) => {
    const user = await currentUser();
    const userEmail = user.emailAddresses[0].emailAddress;
    
    const budget = await prisma.budgets.findUnique({
        where: {
            id: budgetId ,
            createdBy: userEmail
        },
        select: {
            id: true,
            name: true,
            amount: true,
            icon: true,
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

    const totalSpend = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalItem = budget._count.expenses;

    
    const result = {
        ...budget,
        totalSpend,
        totalItem,
    };

    return result;
};




export const addExpense = async (name , amount , id)=>{
    const Amount = parseFloat(amount)
    const user = await currentUser();
    const result = await prisma.expenses.create({
        data:{
            name,
            amount : Amount,
            budgetId:id,
            createdAt: moment().format('DD/MM/YYYY')
        }
    })
    return result;
}



export const getAllExpenseList = async(budgetId)=>{

    const result = prisma.expenses.findMany({
        where:{
            budgetId: budgetId
        },
        orderBy:{
            id: 'desc'
        }
    })
    return result ;
}




export const deleTeExpense = async (expenseId)=>{
    const result = await prisma.expenses.delete({
        where:{
            id: expenseId
        }
    })
    return result;
}