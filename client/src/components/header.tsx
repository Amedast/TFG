'use client'
import { Input } from '@/components/ui/inputSearch'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProfileAvatar from './header/profileAvatar'

export default function Header () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <div className='bg-black/60 text-neutral-100 p-5 hidden  lg:flex gap-[3rem]   fixed w-full items-center z-50 backdrop-blur-sm px-[5rem]'>
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
