'use client'
import Link from 'next/link'
import { LegacyRef, useEffect, useState } from 'react'
import { deleteCookie } from '@/lib/functions'
import { apiGetUserId } from '@/services/user'
import { useRouter } from 'next/navigation'
import SearchBar from './header/searchBar'
import { useClickAway } from '@uidotdev/usehooks'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { HeaderItems } from '@/lib/exports'
import ProfileAvatar from './header/profileAvatar'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export default function HeaderMobile () {
  const [menu, setMenu] = useState(false)
  const [searchBar, setSearchBar] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const ref = useClickAway(() => {
    setSearchBar(false)
  })

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
        if (isLoggedIn) logout()
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
    <>
      <div className='fixed shadow-xl z-10 w-full lg:hidden'>
        <div
          className={`${
            isScrolled
              ? 'bg-background border-b border-secondary'
              : 'bg-background/60 backdrop-blur-sm'
          } flex items-center justify-around  p-3`}
        >
          <svg
            onClick={() => setMenu(true)}
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-menu-2 rounded-md transition duration-200 cursor-pointer hover:bg-neutral-900 '
            width='40'
            height='40'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='#ffffff'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 6l16 0' />
            <path d='M4 12l16 0' />
            <path d='M4 18l16 0' />
          </svg>
          <Link href={'/'} className='grow justify-center flex'>
            <div className='logo text-5xl w-fit flex '>
              <div>
                <span className='font-black text-primary'>P</span>
                <span className='font-black text-[#E0DFE1]'>O</span>
                <span className='font-black text-primary'>P</span>
              </div>

              <span>DB</span>
            </div>
          </Link>
          <div className='mr-3 rounded-md transition duration-200 cursor-pointer sm:hover:bg-neutral-900 p-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-search'
              onClick={() => setSearchBar(!searchBar)}
              width='30'
              height='30'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#ffffff'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
              <path d='M21 21l-6 -6' />
            </svg>
          </div>
        </div>
        {searchBar && (
          <div
            ref={ref as LegacyRef<HTMLDivElement> | undefined}
            className={`${
              isScrolled
                ? 'bg-background border-b border-secondary'
                : 'bg-background/60 backdrop-blur-sm'
            } flex items-center justify-around border  p-3`}
          >
            <SearchBar mobile={true} />
          </div>
        )}
      </div>

      <aside
        className={`fixed lg:hidden z-10 h-screen bg-background/90 backdrop-blur-sm  group ${
          menu ? 'w-full' : ' w-0'
        }`}
      >
        <div
          className={`flex-1 flex-col justify-between h-screen   ${
            menu ? 'flex' : 'hidden'
          }`}
        >
          <div className='h-24 border-b border-neutral-700 flex items-center justify-end'>
            <svg
              onClick={() => setMenu(false)}
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-x mx-5 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md'
              width='30'
              height='30'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#ffffff'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M18 6l-12 12' />
              <path d='M6 6l12 12' />
            </svg>
          </div>
          <div>
            <Accordion type='single' collapsible>
              {HeaderItems.map(item => (
                <div key={item.title}>
                  {item.popover ? (
                    <AccordionItem value={item.title}>
                      <AccordionTrigger className='mx-5'>
                        {item.title}
                      </AccordionTrigger>
                      {item.popoverItems.map(it => (
                        <Link
                          key={it.url}
                          href={it.url}
                          onClick={() => setMenu(false)}
                        >
                          <AccordionContent className='mx-10'>
                            <div>{it.label}</div>
                          </AccordionContent>
                        </Link>
                      ))}
                    </AccordionItem>
                  ) : (
                    <>
                      <Link
                        href={item.url as string}
                        onClick={() => setMenu(false)}
                      >
                        <div className='mx-5 my-4'>{item.title}</div>
                      </Link>

                      <Separator />
                    </>
                  )}
                </div>
              ))}
              {isLoggedIn && (
                <>
                  <Link href={'/recommendation'} onClick={() => setMenu(false)}>
                    <div className='mx-5 my-4'>Descubre</div>
                  </Link>
                  <Separator />
                  <Link href={'/profile/list'} onClick={() => setMenu(false)}>
                    <div className='mx-5 my-4'>Mi lista</div>
                  </Link>
                  <Separator />
                </>
              )}
            </Accordion>
          </div>
          <div className='grow flex justify-center items-end '>
            {isLoggedIn ? (
              <div className='w-full mx-[10%] mb-[10%]'>
                <div className='mb-2'>
                  <Button
                    variant='outline'
                    className='w-full flex gap-2'
                    onClick={logout}
                  >
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-logout'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#ffffff'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
                        <path d='M9 12h12l-3 -3' />
                        <path d='M18 15l3 -3' />
                      </svg>
                    </span>
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            ) : (
              <div className='w-full mx-[10%] mb-[10%]'>
                <div className='mb-2' onClick={() => setMenu(false)}>
                  <Button variant='outlinePrimary' className='w-full '>
                    <Link href={'/login'}>Iniciar Sesión</Link>
                  </Button>
                </div>
                <div onClick={() => setMenu(false)}>
                  <Button className='w-full'>
                    <Link href={'/register'}>Registrate</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
