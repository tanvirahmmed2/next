import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full flex flex-col items-center justify-center gap-2 p-4 border-t'>
        <p>Developed by <Link href={'https://tanvirahmmed.vercel.app'}>Tanvir Ahmmed</Link></p>
        
      
    </footer>
  )
}

export default Footer
