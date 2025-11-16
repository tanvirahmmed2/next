import Link from 'next/link'
import React from 'react'


function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <Link href='/users'>Users</Link>
    </main>
  )
}

export default Home
