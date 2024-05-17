'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MediaType, MediaDetailsType } from '@/types/media'
import { apiGetUserId } from '@/services/user'
import { apiCheckListItem } from '@/services/mediaList'
import ListMenu from '@/components/list/listMenu'
import { ListItem } from '@/types/mediaList'
import { getCookie } from '@/lib/functions'

export default function ListButton ({
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
    const token = getCookie('token')
    console.log(!!token)
    setIsLogged(!!token)
  }, [])

  useEffect(() => {
    async function checkList () {
      if (isLogged) {
        const userId = await apiGetUserId()
        if (userId.data != null) {
          const res = await apiCheckListItem(userId.data, media.id)
          setIsInList(res.data.exists)
          setContentInList(res.data.content)
        } else {
          location.replace('/login')
        }
      }
    }
    checkList()
  }, [isLogged])

  const openModal = async () => {
    if (isLogged) {
      const userId = await apiGetUserId()
      if (userId.data != null) {
        const res = await apiCheckListItem(userId.data, media.id)
        setIsInList(res.data.exists)
        setIsModalOpen(true)
      } else {
        location.replace('/login')
      }
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
          setIsInList={setIsInList}
          setContentInList={setContentInList}
          isInList={isInList}
          media={media}
          type={type}
          content={contentInList}
        />
      )}
    </>
  )
}
