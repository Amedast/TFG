'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProfileAvatar from './header/profileAvatar'
import { apiGetUserId } from '@/services/user'
import { deleteCookie } from '@/lib/functions'
import { useRouter } from 'next/navigation'
import SearchBar from './header/searchBar'
import { HeaderItems } from '@/lib/exports'

import DesktopHeaderItem from './header/desktopHeaderItem'

export default function Header () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const router = useRouter()
  const logout = () => {
    deleteCookie('token')
    setIsLoggedIn(false)
    router.push('/')
  }

  useEffect(() => {
    async function checkUser () {
      const userId = await apiGetUserId()
      if (userId.data != null) {
        setIsLoggedIn(true)
      } else {
        logout()
      }
    }

    checkUser()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`${
        isScrolled
          ? 'bg-background border-b border-secondary'
          : 'bg-background/60 backdrop-blur-sm'
      } text-neutral-100 p-5 hidden lg:flex gap-[3rem] fixed w-full items-center z-50 transition-colors duration-300 px-[5rem]`}
    >
      <div className='flex gap-[3rem]'>
        <Link href={'/'}>
          <div className='logo text-5xl w-fit flex '>
            <div>
              <span className='font-black text-primary'>P</span>
              <span className='font-black text-[#E0DFE1]'>O</span>
              <span className='font-black text-primary'>P</span>
            </div>

            <span>DB</span>
          </div>
        </Link>
        <div className=' flex items-center '>
          {HeaderItems.map(item => (
            <DesktopHeaderItem
              key={item.title}
              title={item.title}
              popover={item.popover}
              popoverItems={item.popoverItems}
              url={item.url}
            />
          ))}
        </div>
      </div>

      <div className=' grow flex justify-end '>
        <SearchBar />
      </div>
      <div className='auth w-[15%] flex justify-center '>
        {isLoggedIn ? (
          <ProfileAvatar logout={logout} />
        ) : (
          <div className='flex gap-3'>
            <Button variant='outlinePrimary'>
              <Link href={'/login'}>Iniciar Sesión</Link>
            </Button>
            <Button className='bg-primary'>
              <Link href={'/register'}>Registrate</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
