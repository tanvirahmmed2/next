'use client'

import axios from "axios";
import { createContext, useEffect, useState } from "react";


interface Chat {
    _id: string;
    members: { _id: string; name: string }[];
    title: string
}



export const Context = createContext()


const ContextProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {


    const [chats, setChats] = useState<Chat[]>([])


    const fetchChat = async () => {
        try {
            const response = await axios.get('/api/chat', { withCredentials: true })

            setChats(response.data.payload)
        } catch (error: any) {
            console.log(error)
            setChats([])

        }
    }
    
    useEffect(() => {fetchChat() }, [])


    const contextValues = {
        chats, fetchChat
    }

    return <Context.Provider value={contextValues}>
        {children}
    </Context.Provider>
}

export default ContextProvider