'use client'

import React, { useEffect } from 'react'
import SideNavbar from './_components/SideNavbar'
import DashboardHeader from './_components/DashboardHeader'
import checkUserBudget from './budgets/_actions/budget'
import { useUser } from '@clerk/nextjs'




const DashboardLayout = ({children}) => {
  const {user} = useUser();
  
useEffect(() => {
  user && checkUserBudget();
}, [user])




  return (
    <div>
        <div className=' fixed md:w-64 hidden md:block '>
            <SideNavbar/>
        </div>
        <div className=' md:ml-64 '>
          <DashboardHeader/>
            {children}
        </div>
       
    </div>
  )
}

export default DashboardLayout