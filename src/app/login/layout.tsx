import { isLogin } from '@/component/lib/middleware'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata={
    title:'Login | Next',
    description:' Login page'
}

const LoginLayout = async ({children}: Readonly<{children: React.ReactNode}>) => {
    const auth= await isLogin()
    if(auth.success){
        return redirect('/chat')
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default LoginLayout
