
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className=' p-5 shadow-sm border-b flex justify-between '>


        <div></div>


        <div className=' pr-5'>
            <UserButton/>
        </div>


    </div>
  )
}

export default DashboardHeader