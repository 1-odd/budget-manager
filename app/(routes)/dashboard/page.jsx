'use server'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import Dashboard from './_components/Dashboard';
import BarChartDashboard from './_components/BarChartDashBoard';
import OtherContentDashboard from './_components/OtherContentDashboard';


const page =  async () => {




const user =  await currentUser();
if(!user){
  redirect('/sign-in')
}




  return (
    <div className="p-8">
      <h2 className='font-bold text-3xl'>Hii,  {user.fullName}  👋</h2>
      <p className='text-gray-500'>Here's what happening with your money, Lets manage your expense</p>
      <Dashboard  />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className=" md:col-span-2">
          <BarChartDashboard/>
        </div>
        <div className=" ">
            <OtherContentDashboard/>
        </div>
      </div>
    </div>
  )
}

export default page