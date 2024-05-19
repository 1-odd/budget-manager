import React from 'react'
import { LogoMobile } from './Logo'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <div className=' p-5 flex justify-between items-center border shadow-sm' >
        <LogoMobile/>
        <Button>Get started</Button>
    </div>
  )
}

export default Header