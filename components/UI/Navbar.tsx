'use client'

import Link from "next/link"


const Navbar = () => {
  return (
    <header>
      <nav className="w-full flex flex-row items-center justify-between p-2 px-6 bg-black text-white">
        <Link href='/' className="text-2xl font-semibold">Next</Link>
        <div className="flex flex-row items-center justify-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/createevents">Create Events</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
