'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MediaType, MediaDetailsType } from '@/types/media'
import { apiGetUserId } from '@/services/user'
import { apiCheckListItem } from '@/services/mediaList'
import ListMenu from '@/components/list/listMenu'
import { ListItem } from '@/types/mediaList'

export default function AddToList ({
  media,
  type
}: {
  media: MediaDetailsType
  type: MediaType
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
      <div className='pt-[8.3rem]'>
        {isInList ? (
          <Button
            className='text-xl font-semibold w-full rounded-sm'
            variant={'outlinePrimary'}
            onClick={openModal}
          >
            Editar
          </Button>
        ) : (
          <Button
            className='text-xl font-semibold w-full rounded-sm'
            onClick={openModal}
          >
            Añadir a la lista
          </Button>
        )}
      </div>
      {isModalOpen && (
        <ListMenu
          setIsModalOpen={setIsModalOpen}
          isInList={isInList}
          media={media}
          type={type}
          content={contentInList}
        />
      )}
    </>
  )
}
