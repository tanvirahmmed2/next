'use client'
import React, { useState } from 'react'

const BookEvent = () => {
    const [email, setEmail]= useState('')
    const [submitted, setSubmitted]= useState(false)

    const Book= async (e: React.FormEvent) => {
        e.preventDefault()
        setTimeout(() => {
            setSubmitted(true)
        }, 2000);
    }
  return (
    <div>
      {
        submitted? (
            <p>Thank you for booking</p>
        ):(
            <form onSubmit={Book}  className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={(e)=> setEmail(e.target.value)} value={email} required className='px-2 p-1 border-2 outline-none rounded-xl'/>
                </div>
                <button type='submit' className='px-3 p-1 bg-sky-600 rounded-4xl text-white'>Book now</button>
            </form>
        )
      }
    </div>
  )
}

export default BookEvent
