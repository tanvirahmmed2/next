'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
}

const NewUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { 
        cache: 'no-store' 
      })
      const data: User = await res.json()
      setUser(data)
    }

    fetchUser()
  }, [id])

  if (user === null) return <p>No data found</p>

  return (
    <div>
      Hello {user.name}
    </div>
  )
}

export default NewUser
