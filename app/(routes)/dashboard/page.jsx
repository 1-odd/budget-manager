import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import Dashboard from './_components/Dashboard';


const page =  async() => {




const user =  await currentUser();
if(!user){
  redirect('/sign-in')
}




  return (
    <div className="p-8">
      <h2 className='font-bold text-3xl'>Hii,  {user.fullName}  👋</h2>
      <p className='text-gray-500'>Here's what happening with your money, Lets manage your expense</p>
      <Dashboard  />
    </div>
  )
}

export default page