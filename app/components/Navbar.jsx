'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex flex-row items-center justify-between p-2 bg-black text-white'>
      <Link href='/'>Next</Link>
      <div className='flex flex-row gap-4 items-center justify-center'>
        <Link href='/dashboard/users'>Users</Link>
        <Link href='/dashboard/analytics'>Analytics</Link>
        <Link href='/about'>About</Link>
      </div>
      
    </div>
  )
}

export default Navbar
