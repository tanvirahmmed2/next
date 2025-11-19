import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex flex-row items-center justify-between p-2 bg-black text-white'>
      <Link href='/'>Next</Link>
      <div>
        <h1>Hey</h1>
      </div>
      
    </div>
  )
}

export default Navbar
