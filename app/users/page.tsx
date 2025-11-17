import React from 'react'

interface User{
  id:number,
  name: string,
}

const UsersPage = async() => {
  const res= await fetch('https://jsonplaceholder.typicode.com/users', {cache: 'no-store'})
  const users: User[]= await res.json()
  return (
    <div>
      This is a users page
      <p>{new Date().toLocaleTimeString()}</p>
      {users.map((e)=> {return( <p key={e.id}>{e.name}</p>)})}
    </div>
  )
}

export default UsersPage
