'use client'

import { Context } from "@/component/helper/Context";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";


interface Chat {
  _id: string;
  members: { _id: string; name: string }[];
  title: string
}

interface User {
  _id: string;
  name: string;
}


const Chat = () => {
  const { chats, fetchChat } = useContext(Context)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get('/api/user', { withCredentials: true })

        setUsers(response.data.payload)
      } catch (error: any) {
        console.log(error)
        setUsers([])

      }
    }
    fetchChat()
  }, [])




  const createChat = async (otherUserId: string) => {
    try {
      const response = await axios.post('/api/chat', { otherUserId }, { withCredentials: true })
      console.log(response)
      fetchChat()
    } catch (error: any) {
      console.log(error)
      alert(error?.response?.data?.message || "Failed to create chat")

    }
  }

  return (
    <div className="w-full px-2 flex flex-col min-h-screen gap-4">


      {
        users !== null && <div className="w-full flex flex-row items-center justify-center gap-2 border-b p-1">
          {
            users.map((user) => (
              <div key={user._id} className="w-25 h-30 text-center flex flex-col items-center justify-center p-2 border border-black/10 rounded-lg shadow">
                <button onClick={() => createChat(user._id)} className="text-4xl"><IoIosPersonAdd /></button>
                <p>{user.name}</p>
              </div>
            ))
          }
        </div>
      }




      {
        chats !== null && <div className="w-full flex flex-col items-center justify-center gap-2">
          {chats.map(chat => (
            <Link
              key={chat._id}
              href={`/chat/${chat._id}`}
              className="w-full "
            >
              <h3 className="font-semibold">{chat.title}</h3>

            </Link>
          ))}
        </div>
      }

    </div>
  );
}

export default Chat
