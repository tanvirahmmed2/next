import Link from 'next/link'
import React from 'react'

const Users = () => {
  return (
    <div className=' flex flex-col items-center justify-center w-full'>
      <h1>Users Dashboard</h1>
      <Link href='/dashboard/users/1'>User 1</Link>
      <Link href='/dashboard/users/2'>User 2</Link>
    </div>
  )
}

export default Users
