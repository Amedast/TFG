'use client'
import { useEffect, useState } from 'react'
import { ListItem, MediaListType } from '@/types/mediaList'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  getImagePath,
  getMediaType,
  getUrlByType,
  parseItemToMedia,
  parseTypeToText
} from '@/lib/functions'
import Link from 'next/link'
import ListButtonSmall from './ListButtonSmall'

export default function MediaListTable ({
  itemList
}: {
  itemList: MediaListType
}) {
  const [mediaList, setMediaList] = useState<MediaListType>(itemList)

  useEffect(() => {
    setMediaList(itemList)
  }, [itemList])

  function updateList (it: ListItem): void {
    setMediaList(prevList => {
      const updatedList = [...prevList.list]
      const index = updatedList.findIndex(
        item => item.content.contentId == it.content.contentId
      )

      if (index !== -1) {
        updatedList[index] = it
      }

      return { ...prevList, list: updatedList }
    })
  }
  function removeFromList (id: number): void {
    setMediaList(prevList => {
      const updatedList = prevList.list.filter(
        item => item.content.contentId !== id
      )
      return { ...prevList, list: updatedList }
    })
  }
  return (
    <Table>
      <TableHeader className='text-center '>
        <TableRow>
          <TableHead className='hidden w-[100px] sm:table-cell'>
            <span className='sr-only'>Imagen</span>
          </TableHead>
          <TableHead></TableHead>
          <TableHead className='hidden lg:table-cell text-center text-primary'>
            Tipo
          </TableHead>
          <TableHead className='text-center text-primary'>Estado</TableHead>
          <TableHead className='hidden lg:table-cell text-primary'>
            Progreso
          </TableHead>
          <TableHead className='text-center text-primary'>Valoración</TableHead>

          <TableHead>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-center'>
        {mediaList &&
          mediaList.list &&
          mediaList.list.map((item: ListItem, index: number) => (
            <TableRow key={index} className='group'>
              <TableCell className='hidden sm:table-cell '>
                <Link
                  href={
                    getUrlByType(item.content.mediaType) +
                    item.content.contentId
                  }
                >
                  <Image
                    alt={item.content.name}
                    className='aspect-[1/1.5] rounded-md object-cover'
                    width='80'
                    height='200'
                    src={getImagePath(false, item.content.poster)}
                  />
                </Link>
              </TableCell>
              <TableCell className='font-medium truncate text-start'>
                <div className='w-40 hover:underline transition-all duration-200'>
                  <Link
                    href={
                      getUrlByType(item.content.mediaType) +
                      item.content.contentId
                    }
                  >
                    {item.content.name}{' '}
                  </Link>
                </div>
              </TableCell>
              <TableCell className='hidden lg:table-cell'>
                {getMediaType(item.content.mediaType, true)}
              </TableCell>
              <TableCell>{parseTypeToText(item.status)}</TableCell>
              <TableCell className='hidden lg:table-cell '>
                {item.progress}/{item.content.episodes}
              </TableCell>
              <TableCell className='font-bold text-amber-400 '>
                <div className='flex items-center justify-center gap-1'>
                  {item.rating && (
                    <>
                      <span>{item.rating}</span>{' '}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-star-filled'
                        width='15'
                        height='15'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#ffffff'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path
                          d='M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z'
                          strokeWidth='0'
                          fill='currentColor'
                        />
                      </svg>
                    </>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <ListButtonSmall
                  media={parseItemToMedia(item)}
                  type={item.content.mediaType}
                  updateList={updateList}
                  removeFromList={removeFromList}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
