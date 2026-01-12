'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const router= useRouter()

  const backButton=()=>{
    router.back()
  }
    
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-semibold'>Page not found</h1>
        <p onClick={backButton} className='cursor-pointer'>Go back to home</p>
      
    </div>
  )
}

export default NotFound
