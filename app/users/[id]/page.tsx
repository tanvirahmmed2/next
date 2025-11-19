import Link from 'next/link'
import React from 'react'

interface User {
  id: number,
  name: string,
}

const UserPage = async () => {
  
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' })
  const user: User[] = await res.json()
  return (
    <div>
      This is a users page
      <p>{new Date().toLocaleTimeString()}</p>
      {user.map((e) => {
        return (
          <div key={e.id}>
            <Link href={`/user/${e.id}`}>{e.name}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default UserPage
