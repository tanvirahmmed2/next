import Link from 'next/link'
import { isLogin } from '../lib/middleware'
import LogoutButton from '../button/LogoutButton'

const Navbar = async () => {
  const auth = await isLogin()
  return (
    <div className='w-full relative p-2'>
      <nav className='w-full h-14 bg-sky-400 rounded-lg text-white flex flex-row items-center justify-around px-4'>
        <Link href={'/'} className='text-2xl font-semibold'>Next</Link>
        <div className='w-auto flex flex-row items-center justify-center gap-1'>
          {
            auth.success ? <div className='w-auto flex flex-row items-center justify-center gap-1'>
              <Link href={'/chat'} className='px-4 h-14 w-auto flex items-center justify-center hover:bg-white/10 cursor-pointer'>Chat</Link>
              <Link href={'/profile'} className='px-4 h-14 w-auto flex items-center justify-center hover:bg-white/10 cursor-pointer'>Profile</Link>
              <LogoutButton/>
            </div> : <div className='w-auto flex flex-row items-center justify-center gap-1'>
              <Link href={'/login'} className='px-4 h-14 w-auto flex items-center justify-center hover:bg-white/10 cursor-pointer'>Login</Link>
              <Link href={'/register'} className='px-4 h-14 w-auto flex items-center justify-center hover:bg-white/10 cursor-pointer'>Register</Link>
            </div>
          }


        </div>

      </nav>

    </div>
  )
}

export default Navbar
