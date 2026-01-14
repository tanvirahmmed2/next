import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full relative p-2'>
      <nav className='w-full h-14 bg-sky-400 rounded-lg text-white flex flex-row items-center justify-around px-4'>
        <Link href={'/'} className='text-2xl font-semibold'>Next</Link>
        <div className='w-auto flex flex-row items-center justify-center gap-1'>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'}>Register</Link>
          <Link href={'/chat'}>Chat</Link>

        </div>

      </nav>
      
    </div>
  )
}

export default Navbar
