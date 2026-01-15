'use client'

import { IMessage } from "@/component/lib/model/message"
import axios from "axios"
import { useEffect, useState } from "react"

const ChatIdPage = ({params}:{params:{chatId:string}}) => {
    const {chatId}=  params
    const [messages, setMessages]= useState<IMessage[]>([])

    useEffect(()=>{
        const fetchMessage=async()=>{
            try {
                const response= await axios.get(`/api/message?chatId=${chatId}`, {withCredentials:true})
                setMessages(response.data.message)
            } catch (error:any) {
                console.log(error)
                setMessages([])

                
            }
        }
        fetchMessage()
    },[])

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-between p-2'>
        </div>
    )
}

export default ChatIdPage
