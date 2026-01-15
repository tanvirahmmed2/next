'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";


interface Chat {
  _id: string;
  members: { _id: string; name: string }[];
}

interface User {
  _id: string;
  name: string;
}


const Chat = () => {
  const [users, setUsers] = useState<User[]>([])
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get('/api/user', { withCredentials: true })
        console.log(response)
        setUsers(response.data.payload)
      } catch (error: any) {
        console.log(error)
        setUsers([])

      }
    }
    fetchChat()
  }, [])


  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get('/api/chat', { withCredentials: true })
        console.log(response)
        setChats(response.data.payload)
      } catch (error: any) {
        console.log(error)
        setChats([])

      }
    }
    fetchChat()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-4">
      
      {
        users!== null && <div>
          {
            users.map((user)=>(
              <div key={user._id}>
                <p><IoIosPersonAdd/></p>
                <p>{user.name}</p>
                <button >Add</button>
              </div>
            ))
          }
        </div>
      }
      
      
      
      
      
      <h1 className="text-2xl font-bold mb-4">Chats</h1>

      {chats.map(chat => (
        <Link
          key={chat._id}
          href={`/chat/${chat._id}`}
          className="block p-3 border rounded mb-2 hover:bg-gray-100"
        >
          Chat ID: {chat._id.slice(-6)}
        </Link>
      ))}
    </div>
  );
}

export default Chat
