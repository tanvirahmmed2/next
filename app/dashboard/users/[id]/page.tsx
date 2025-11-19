import React from 'react'

const User = async({params}: {params: Promise<{id: string}>}) => {
    const {id}=await params
  return (
    <div>
      User {id}
    </div>
  )
}

export default User
