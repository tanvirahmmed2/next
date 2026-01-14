import { isLogin } from '@/component/lib/middleware'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata={
    title:'Chat | Next',
    description:' Chat page'
}

const ChatLayout = async ({children}: Readonly<{children: React.ReactNode}>) => {
    const auth= await isLogin()
    if(!auth.success){
        return redirect('/login')
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default ChatLayout
