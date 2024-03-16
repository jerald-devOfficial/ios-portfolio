'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { GMailIcon, LoginIcon, LogoutIcon } from './svg-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const AuthButton = () => {
  const pathname = usePathname()
  const session = useSession()

  return session.status === 'authenticated' ? (
    <div className='flex items-center gap-x-4'>
      <Link
        href='/mails'
        className='flex flex-col items-center justify-center gap-y-1.5 cursor-pointer'
      >
        <div className='block relative'>
          {pathname === '/mails' && (
            <span className='absolute -top-2 -right-2 h-5 w-5 z-10 bg-green-500 rounded-full border border-white border-solid animate-pulse' />
          )}
          <GMailIcon className='h-[50px] w-[50px] border-white border border-solid rounded-[12px] hover:border-transparent hover:ring-green-500 hover:ring-solid hover:ring' />
        </div>
      </Link>
      <button className='block' onClick={() => signOut()}>
        <LogoutIcon className='h-[50px] w-[50px] rounded-full hover:ring-green-500 hover:ring-solid hover:ring' />
      </button>
    </div>
  ) : (
    <button className='block' onClick={() => signIn('google')}>
      <LoginIcon className='h-[50px] w-[50px] rounded-full hover:ring-green-500 hover:ring-solid hover:ring' />
    </button>
  )
}

export default AuthButton
