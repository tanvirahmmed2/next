import Link from 'next/link'
import React from 'react'
import ProductCard from './components/ProductCard'
import About from './about/page'


function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <Link href='/users'>Users</Link>
      <ProductCard/>
      <About/>
    </main>
  )
}

export default Home
