import LoginForm from '@/component/form/LoginForm'
import React from 'react'

const Login = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-auto flex flex-col md:flex-row items-center justify-center border rounded-lg overflow-hidden p-2">
        <div className="w-full flex flex-col items-center justify-center">
          <p className=''>Welcome to</p>
          <h1 className='text-4xl font-semibold'>Next</h1>
          <p>messaging app</p>

        </div>
        <LoginForm/>
      </div>

    </div>
  )
}

export default Login
