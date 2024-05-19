'use client'
import Link from 'next/link'
import { LegacyRef, useRef } from 'react'
import { Input } from '../ui/inputSearch'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { apiGetSearchContent } from '@/services/media'
import { ContentResult } from '@/types/media'
import SearchBarElement from './searchElement'
import { Separator } from '../ui/separator'
import { useClickAway } from '@uidotdev/usehooks'

export default function SearchBar ({ mobile }: { mobile?: boolean }) {
  const fetchTimeout = useRef<NodeJS.Timeout | null>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [searchContent, setSearchContent] = useState<ContentResult[]>([])
  const [openSearch, setOpenSearch] = useState<boolean>(false)

  const ref = useClickAway(() => {
    setOpenSearch(false)
  })
  useEffect(() => {
    const fetchDataWithDelay = async () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current)
      }

      fetchTimeout.current = setTimeout(async () => {
        const res = await apiGetSearchContent(searchText, 1)
        setSearchContent(res.data.results)
      }, 500)
    }

    if (searchText != '' && searchText != undefined) {
      fetchDataWithDelay()
      setOpenSearch(true)
    }

    return () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current)
      }
    }
  }, [searchText])

  function checkOpen () {
    if (searchText != '' && openSearch == false) {
      setOpenSearch(true)
    }
  }
  return (
    <div className='searchbar  relative w-[25rem]'>
      <Input
        onClick={checkOpen}
        type='text'
        placeholder='Buscar por nombre...'
        className='w-full'
        onChange={event => setSearchText(event.target.value)}
      />
      {openSearch == true && searchText != '' && (
        <Card
          ref={ref as LegacyRef<HTMLDivElement> | undefined}
          className='w-full mb-3  absolute bg-background rounded-sm mt-1 '
        >
          <CardContent
            className={` ${
              mobile == true ? 'max-h-60' : 'max-h-64'
            } overflow-auto flex flex-1 flex-col gap-2.5 p-0 py-2.5`}
          >
            {searchContent.length > 0 ? (
              searchContent.slice(0, 10).map((element, idx) => (
                <div key={element.id} onClick={() => setOpenSearch(false)}>
                  <SearchBarElement element={element} />
                  {idx < searchContent.slice(0, 10).length - 1 && <Separator />}
                </div>
              ))
            ) : (
              <div className='text-center'>No se han encontrado resultados</div>
            )}
          </CardContent>
          {searchContent.length > 10 && (
            <CardFooter className='p-0 w-full border-t  rounded-b-sm justify-center text-center hover:bg-primary transition duration-200 cursor-pointer '>
              <Link href={'/search?name=' + searchText}>
                <div className='py-2.5 '>Ver más resultados</div>
              </Link>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  )
}
