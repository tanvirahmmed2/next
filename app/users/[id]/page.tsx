'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const NewUser = () => {
  const [user,setUser]= useState(null)
  const { id } = useParams()
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { cache: 'no-store' })
     setUser(await res.json())
    }
    fetchUser()
  }, [id])
  if(user=== null) return <p>No data found</p>
  return (
    <div>
      Hello new user {user.name}
    </div>
  )
}

export default NewUser
