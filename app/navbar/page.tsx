import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex flex-row items-center justify-between p-2 bg-black text-white'>
      <Link href='/'>Next</Link>
      <div>
        <Link href='/users'>Users</Link>
      </div>
      
    </div>
  )
}

export default Navbar
