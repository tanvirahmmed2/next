'use client'
import axios from 'axios'
import React, { useState } from 'react'

const RegisterForm = () => {
    const [formData, setFormData]=useState({
        email:'',
        password:'',
        name:''
    })

    const changeHandler=(e: any)=>{
        const {name, value}= e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const RegisterHandle=async (e:any) => {
        e.preventDefault()
        try {
            const response= await axios.post('/api/user/', formData, {withCredentials:true})
            console.log(response)
            window.location.replace('/profile')
        } catch (error:any) {
            console.log(error)
            alert(error?.response?.data?.message)
        }
        
    }
    return (
        <form onSubmit={RegisterHandle} className=' w-full flex flex-col items-center justify-center gap-2'>
            <div className='w-full flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <input type="name" required name='name' id='name' value={formData.name} onChange={changeHandler} className='w-full px-3 p-1 border outline-none rounded-lg' />
            </div>
            <div className='w-full flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <input type="email" required name='email' id='email' value={formData.email} onChange={changeHandler} className='w-full px-3 p-1 border outline-none rounded-lg' />
            </div>
            <div className='w-full flex flex-col gap-1'>
                <label htmlFor="password">Email</label>
                <input type="password" required name='password' id='password' value={formData.password} onChange={changeHandler} className='w-full px-3 p-1 border outline-none rounded-lg' />
            </div>
            <button type='submit' className='bg-sky-400 px-3 text-white rounded-lg cursor-pointer hover:bg-sky-500'>Register</button>
        </form>
    )
}

export default RegisterForm
