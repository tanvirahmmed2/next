'use client'
import axios from 'axios'
import React, { useState } from 'react'

const LoginForm = () => {
    const [formData, setFormData]=useState({
        email:'',
        password:''
    })

    const changeHandler=(e: any)=>{
        const {name, value}= e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const loginHandle=async (e:any) => {
        e.preventDefault()
        try {
            const response= await axios.post('/api/user/login', formData, {withCredentials:true})
            console.log(response)
            window.location.replace('/profile')
        } catch (error:any) {
            console.log(error)
            alert(error?.response?.data?.message)
        }
        
    }
    return (
        <form onSubmit={loginHandle} className=' w-full flex flex-col items-center justify-center gap-2'>
            <div className='w-full flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <input type="email" required name='email' id='email' value={formData.email} onChange={changeHandler} className='w-full px-3 p-1 border outline-none rounded-lg' />
            </div>
            <div className='w-full flex flex-col gap-1'>
                <label htmlFor="password">Password</label>
                <input type="password" required name='password' id='password' value={formData.password} onChange={changeHandler} className='w-full px-3 p-1 border outline-none rounded-lg' />
            </div>
            <button type='submit' className='bg-sky-400 px-3 text-white rounded-lg cursor-pointer hover:bg-sky-500'>Login</button>
        </form>
    )
}

export default LoginForm
