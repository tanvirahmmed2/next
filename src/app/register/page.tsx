import RegisterForm from '@/component/form/RegisterForm'
import React from 'react'

const Register = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-auto  min-w-100 flex flex-col md:flex-row items-center justify-center border rounded-lg overflow-hidden p-2">
        <div className="w-full flex flex-col items-center justify-center">
          <p className=''>Welcome to</p>
          <h1 className='text-4xl font-semibold'>Next</h1>
          <p>messaging app</p>

        </div>
        <RegisterForm/>
      </div>

    </div>
  )
}

export default Register
