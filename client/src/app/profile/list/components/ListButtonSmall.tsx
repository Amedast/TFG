'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MediaType, MediaDetailsType } from '@/types/media'
import { apiGetUserId } from '@/services/user'
import { apiCheckListItem } from '@/services/mediaList'
import ListMenu from '@/components/list/listMenu'
import { ListItem } from '@/types/mediaList'

export default function ListButton ({
  media,
  type,
  updateList,
  removeFromList
}: {
  media: MediaDetailsType
  type: MediaType
  updateList: (it: ListItem) => void
  removeFromList: (id: number) => void
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [isInList, setIsInList] = useState(false)
  const [contentInList, setContentInList] = useState<ListItem | undefined>()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLogged(!!token)
  }, [])

  useEffect(() => {
    async function checkList () {
      if (isLogged) {
        const token = localStorage.getItem('token') as string
        const userId = await apiGetUserId(token)
        const res = await apiCheckListItem(userId.data, media.id)
        setIsInList(res.data.exists)
        setContentInList(res.data.content)
      }
    }
    checkList()
  }, [isLogged])

  useEffect(() => {
    if (contentInList != undefined) updateList(contentInList)
  }, [contentInList])

  const openModal = async () => {
    if (isLogged) {
      const token = localStorage.getItem('token') as string
      const userId = await apiGetUserId(token)
      const res = await apiCheckListItem(userId.data, media.id)
      setIsInList(res.data.exists)
      setIsModalOpen(true)
    } else {
      location.replace('/login')
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div
        onClick={openModal}
        className='p-1  w-fit rounded-sm cursor-pointer transition duration-200  hover:bg-primary opacity-0 group-hover:opacity-100 '
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-edit '
          width='25'
          height='25'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
          <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
          <path d='M16 5l3 3' />
        </svg>
      </div>
      {isModalOpen && (
        <ListMenu
          setIsModalOpen={setIsModalOpen}
          setIsInList={setIsInList}
          setContentInList={setContentInList}
          removeFromList={removeFromList}
          isInList={isInList}
          media={media}
          type={type}
          content={contentInList}
        />
      )}
    </>
  )
}
