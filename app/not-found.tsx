
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-semibold'>Page not found</h1>
        <Link href="/" >Go back to home</Link>
      
    </div>
  )
}

export default NotFound
