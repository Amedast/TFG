'use client'
import { Input } from '@/components/ui/inputSearch'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProfileAvatar from './header/profileAvatar'
import { apiGetUserId } from '@/services/user'

export default function Header () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    async function checkUser () {
      const token = localStorage.getItem('token')
      if (token) {
        const userId = await apiGetUserId(token)

        if (userId.data != null) {
          setIsLoggedIn(true)
        } else {
          logout()
        }
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
        <div className='navigation justify-center flex items-center gap-[2rem] '>
          <label>Películas</label>
          <label>Series</label>
          <label>Descubre</label>
        </div>
      </div>

      <div className='grow flex justify-end'>
        <div className='searchbar w-fit'>
          <Input
            type='text'
            placeholder='Buscar por nombre...'
            className='w-full'
          />
        </div>
      </div>
      <div className='auth w-[10%] flex justify-center '>
        {isLoggedIn ? (
          <ProfileAvatar logout={logout} />
        ) : (
          <div className='flex gap-3'>
            <Button variant='ghost'>
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
