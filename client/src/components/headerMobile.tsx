'use client'
import Link from 'next/link'
import { Input } from '@/components/ui/inputSearch'
import { useState } from 'react'

export default function HeaderMobile () {
  const [menu, setMenu] = useState(false)
  const [searchBar, setSearchBar] = useState(false)

  return (
    <>
      <div className='fixed shadow-xl z-10 w-full lg:hidden'>
        <div className='bg-background  border-b border-neutral-700 flex items-center justify-around  p-3'>
          <svg
            onClick={() => setMenu(true)}
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-menu-2 rounded-md transition duration-200 cursor-pointer hover:bg-neutral-900 '
            width='50'
            height='50'
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
          <div className='mr-3 rounded-md transition duration-200 cursor-pointer hover:bg-neutral-900 p-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-search'
              onClick={() => setSearchBar(!searchBar)}
              width='40'
              height='40'
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
          <div className='bg-background border-b border-neutral-700 '>
            <Input
              type='text'
              placeholder='Buscar por nombre...'
              className='w-full'
            />
          </div>
        )}
      </div>

      <aside
        className={`compact-nav-mobile  fixed lg:hidden left-0 top-0 z-10 h-screen border-r bg-neutral-900/50 backdrop-blur-sm border-neutral-700 hover:shadow-xl group ${
          menu ? 'w-full' : ' w-0'
        }`}
      >
        <div
          className={` flex-col justify-between  ${menu ? 'flex' : 'hidden'}`}
        >
          <div>
            <div className='h-24 border-b border-neutral-700 flex items-center justify-end'>
              <svg
                onClick={() => setMenu(false)}
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-x mx-5 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md'
                width='50'
                height='50'
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
            <div className='my-6'>
              <ul className='px-2.5 space-y-2.5 font-medium tracking-wide '>
                <li>
                  <Link
                    className={`flex items-center gap-5 overflow-hidden pl-2.5 pr-2 py-2.5 rounded-md transition duration-200 cursor-pointer`}
                    href={'/'}
                    passHref
                  >
                    <div className='grow'>
                      <span className='truncate '>PRUEBA</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className=' border-b border-neutral-700 flex items-center mx-2.5'></div>
            <div className='my-6'>
              <ul className='px-2.5 space-y-5 font-medium tracking-wide'>
                <li>
                  <Link
                    className={`flex items-center gap-5 overflow-hidden pl-2.5 pr-2 py-2.5 rounded-md transition duration-200 cursor-pointer`}
                    href={'/'}
                    passHref
                  >
                    <div className='grow'>
                      <span className='truncate '>PRUEBA</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
