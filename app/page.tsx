import Link from 'next/link'
import React from 'react'
import ProductCard from './components/ProductCard'


function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <Link href='/users'>Users</Link>
      <ProductCard/>
    </main>
  )
}

export default Home
