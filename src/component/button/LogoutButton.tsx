'use client'

import axios from "axios"
import { BASE_URL } from "../lib/database/secret"

const LogoutButton = () => {
    const handleLogout= async()=>{
        try {
            const response= await axios.get(`${BASE_URL}/api/user/login`, {withCredentials:true})
            console.log(response)
            alert(response.data.message)
            window.location.replace('/login')
        } catch (error:any) {

            console.log(error)
            alert(error?.response?.data?.message)
        }
    }
  return (
    <button className='px-4 h-14 w-auto flex items-center justify-center hover:bg-white/10 cursor-pointer' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton
