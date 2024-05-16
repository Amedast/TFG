'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { es } from 'date-fns/locale'
import { MediaType, MediaDetailsType } from '@/types/media'
import Image from 'next/image'
import { getImagePath } from '@/lib/functions'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ListItem } from '@/types/mediaList'
import { apiGetUserId } from '@/services/user'
import {
  apiAddToList,
  apiCheckListItem,
  apiDeleteFromList,
  apiEditListItem
} from '@/services/mediaList'

interface Props {
  setIsModalOpen: (isOpen: boolean) => void
  setIsInList: (onList: boolean) => void
  setContentInList: (cont: ListItem | undefined) => void
  removeFromList?: (id: number) => void
  isInList: boolean
  media: MediaDetailsType
  type: MediaType
  content?: ListItem
}

export default function ListMenu ({
  setIsModalOpen,
  setIsInList,
  setContentInList,
  removeFromList,
  isInList,
  media,
  type,
  content
}: Props) {
  const { toast } = useToast()
  const [status, setStatus] = useState<string | undefined>(
    isInList && content ? content.status.toString() : undefined
  )
  const [rating, setRating] = useState<number | undefined>(
    isInList && content ? content.rating : undefined
  )
  const [progress, setProgress] = useState<number | undefined>(
    isInList && content ? content.progress : undefined
  )
  const [startDate, setStartDate] = useState<Date | undefined>(
    isInList && content ? content.startDate : undefined
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    isInList && content ? content.endDate : undefined
  )
  const [notes, setNotes] = useState<string | undefined>(
    isInList && content ? content.notes : undefined
  )

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleStatus = (value: string) => {
    setStatus(value)
  }

  useEffect(() => {
    if (status == '2') {
      setProgress(type == 'tv' ? media.number_of_episodes : 1)
    }
  }, [status])

  async function saveList () {
    if (status === undefined) {
      showToast({
        title: 'Error',
        description: 'El campo Estado no puede estar vacío',
        variant: 'destructive'
      })
      return
    }

    if (rating && rating > 10) {
      showToast({
        title: 'Error',
        description: 'La valoración no puede ser mayor que 10.',
        variant: 'destructive'
      })
      return
    }

    if (
      progress &&
      progress > (type === 'movie' ? 1 : media.number_of_episodes)
    ) {
      showToast({
        title: 'Error',
        description:
          'El progreso no puede ser mayor que el número máximo de episodios.',
        variant: 'destructive'
      })
      return
    }

    let item: ListItem = {
      content: {
        contentId: media.id,
        name: type == 'movie' ? media.title : media.name,
        genres: media.genres,
        poster: media.poster_path,
        background: media.backdrop_path,
        mediaType: type,
        episodes: type == 'movie' ? 1 : media.number_of_episodes,
        runtime:
          type == 'movie'
            ? media.runtime
            : media.episode_run_time.length == 0
            ? 20
            : media.episode_run_time[0]
      },
      status: parseInt(status),
      timeWatched: 0,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      notes: notes || '',
      progress: 0
    }
    if (rating != undefined) item.rating = rating
    if (progress != undefined) {
      item.progress = progress
      item.timeWatched =
        type == 'movie'
          ? media.runtime * progress
          : media.episode_run_time.length == 0
          ? 20 * progress
          : media.episode_run_time[0] * progress
    }

    const token = localStorage.getItem('token') as string
    const userId = await apiGetUserId(token)
    if (isInList) {
      try {
        const res = await apiEditListItem(userId.data, media.id, item)
        if (res.data.error) {
          showToast({
            title: 'Error',
            description: 'Se ha producido un error al añadir el contenido',
            variant: 'destructive'
          })
        } else {
          showToast({
            title: 'Contenido editado correctamente',
            description: res.data.message,
            variant: 'correct'
          })
          setContentInList(item)
        }
      } catch (error) {
        showToast({
          title: 'Error',
          description: 'Se ha producido un error al editar el contenido',
          variant: 'destructive'
        })
      }
      closeModal()
    } else {
      try {
        const res = await apiAddToList(userId.data, item)
        if (res.data.error) {
          showToast({
            title: 'Error',
            description: 'Se ha producido un error al añadir el contenido',
            variant: 'destructive'
          })
        } else {
          showToast({
            title: 'Contenido añadido correctamente',
            description: res.data.message,
            variant: 'correct'
          })
          setIsInList(true)
          setContentInList(item)
        }
      } catch (error) {
        showToast({
          title: 'Error',
          description: 'Se ha producido un error al añadir el contenido',
          variant: 'destructive'
        })
      }
      closeModal()
    }
  }
  async function removeItem () {
    const token = localStorage.getItem('token') as string
    const userId = await apiGetUserId(token)
    try {
      const res = await apiDeleteFromList(userId.data, media.id)
      if (res.data.error) {
        showToast({
          title: 'Error',
          description: 'Se ha producido un error al eliminar el contenido',
          variant: 'destructive'
        })
      } else {
        showToast({
          title: 'Contenido eliminado correctamente',
          description: res.data.message,
          variant: 'correct'
        })
        setIsInList(false)
        if (removeFromList != undefined) {
          removeFromList(media.id)
        }
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Se ha producido un error al eliminar el contenido',
        variant: 'destructive'
      })
    }
    closeModal()
  }
  function showToast (item: {
    title: string
    description: string
    variant?: 'default' | 'destructive' | 'correct' | null
  }) {
    return toast(item)
  }

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center '>
      <div
        className='relative w-screen h-screen  inset-0 z-50 flex justify-center items-center bg-background/80 '
        onClick={closeModal}
      ></div>
      <div className='fixed w-[100%] sm:w-[80%] 2xl:w-[50%] overflow-auto max-h-[90%]  h-fit m-auto  inset-0 z-50  justify-center items-center bg-neutral-900 border border-secondary rounded-sm'>
        <div className='w-full h-60  overflow-hidden relative rounded-t-sm'>
          <div className='absolute w-full h-full items-center flex bg-gradient-to-t from-neutral-900 to-transparent p-10 text-neutral-100 select-none'></div>
          <Image
            className='transition duration-200 '
            src={getImagePath(true, media.backdrop_path)}
            width={2560}
            height={1440}
            alt={media.title || media.name}
          />
        </div>
        <div className='container mx-auto absolute w-full top-[3rem] flex flex-wrap xl:flex-nowrap gap-5 items-center justify-center xl:justify-start'>
          <div className='w-[10rem]'>
            <Image
              className='transition duration-200 rounded-sm w-96 shadow-md border border-secondary'
              src={getImagePath(true, media.poster_path)}
              width={200}
              height={300}
              alt={media.title || media.name}
              placeholder='blur'
              blurDataURL='/ImagePlaceholder.png'
            />
          </div>

          <div className='hidden xl:block w-full xl:w-[80%] text-center xl:text-start mt-[3rem]'>
            <h1 className='text-3xl  font-bold'>{media.name || media.title}</h1>
          </div>
        </div>
        <div className='container mx-auto mb-5 mt-[5rem]'>
          <div className='grid grid-cols-6 gap-5 justify-around  w-full'>
            <div className='col-span-6 lg:col-span-2'>
              <Label htmlFor='status'>Estado</Label>
              <Select onValueChange={handleStatus} value={status} required>
                <SelectTrigger className='w-[100%]'>
                  <SelectValue placeholder='Estado' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='2'>Completado</SelectItem>
                  <SelectItem value='1'>En Curso</SelectItem>
                  <SelectItem value='0'>Planeado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='col-span-6 lg:col-span-2'>
              <Label htmlFor='rating'>Valoración</Label>
              <Input
                type='number'
                id='rating'
                placeholder='Valoración'
                value={rating}
                onChange={event => setRating(parseFloat(event.target.value))}
                min={0}
                max={10}
                step={0.5}
              />
            </div>
            <div className='col-span-6 lg:col-span-2'>
              <Label htmlFor='progress'>Progreso</Label>
              <Input
                type='number'
                id='progress'
                placeholder='Progreso'
                value={progress}
                onChange={event => setProgress(parseFloat(event.target.value))}
                min={0}
                max={type == 'movie' ? 1 : media.number_of_episodes}
              />
            </div>
            <div className='col-span-6 md:col-span-3'>
              <Label>Fecha de Inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {startDate ? (
                      format(startDate, 'PPP')
                    ) : (
                      <span>Fecha de Inicio</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    locale={es}
                    disabled={{ after: endDate as Date }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='col-span-6 md:col-span-3'>
              <Label>Fecha de Fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {endDate ? (
                      format(endDate, 'PPP')
                    ) : (
                      <span>Fecha de Fin</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    locale={es}
                    disabled={{ before: startDate as Date }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='col-span-6'>
              <Label>Notas</Label>
              <Textarea
                placeholder='Notas...'
                value={notes}
                onChange={event => setNotes(event.target.value)}
              />
            </div>
          </div>
          <div className='w-full flex gap-5 justify-end mt-5'>
            {isInList && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outlinePrimary'}>Eliminar</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Advertencia</DialogTitle>
                    <DialogDescription>
                      ¿Estás seguro de que quieres eliminar este contenido de tu
                      lista multimedia?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <div className='flex gap-5 justify-center sm:justify-end'>
                      <DialogClose asChild>
                        <Button onClick={removeItem} variant={'outlinePrimary'}>
                          Aceptar
                        </Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button>Cancelar</Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button onClick={saveList}>Guardar</Button>
          </div>
        </div>
        <button
          onClick={closeModal}
          className='absolute top-4 right-4 text-white bg-background/50 hover:bg-background/80 transition duration-200 text-xl rounded-full px-2 py-1'
        >
          ✕
        </button>
      </div>
    </div>
  )
}
