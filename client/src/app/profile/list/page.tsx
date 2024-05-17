'use client'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { apiGetList } from '@/services/mediaList'
import { apiGetUserId } from '@/services/user'
import { MediaListType } from '@/types/mediaList'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import MediaListTable from './components/MediaListTable'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function MediaList () {
  const fetchTimeout = useRef<NodeJS.Timeout | null>(null)
  const [mediaList, setMediaList] = useState<MediaListType>({
    data: {
      series: { amount: 0, time: 0, rating: 0 },
      movies: { amount: 0, time: 0, rating: 0 },
      genres: []
    },
    list: []
  })
  const [actualPage, setActualPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [filterName, setFilterName] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<number[]>([])
  const [filterType, setFilterType] = useState<string[]>([])
  const [filterRating, setFilterRating] = useState<number>(0)
  const [blockFetchPage, setBlockFetchPage] = useState(false)
  const status = [
    {
      id: 0,
      label: 'Planeado'
    },
    {
      id: 1,
      label: 'En Curso'
    },
    {
      id: 2,
      label: 'Completado'
    }
  ]
  const types = [
    {
      id: 'tv',
      label: 'Serie'
    },
    {
      id: 'movie',
      label: 'Película'
    }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current)
      }
      setBlockFetchPage(true)
      setActualPage(1)
      setBlockFetchPage(false)
      fetchTimeout.current = setTimeout(async () => {
        fetchData(1, filterName, filterStatus, filterType, filterRating)
      }, 500)
    }

    fetchDataWithDelay()

    return () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current)
      }
    }
  }, [filterName, filterStatus, filterType, filterRating])

  useEffect(() => {
    if (!blockFetchPage) fetchData(actualPage)
  }, [actualPage])

  const fetchData = async (
    newPage?: number,
    name?: string,
    status?: number[],
    types?: string[],
    rating?: number
  ) => {
    try {
      const userIdResponse = await apiGetUserId()
      if (userIdResponse.data != null) {
        const userId = userIdResponse.data

        const apiResponse = await apiGetList(
          userId,
          newPage,
          10,
          name,
          status,
          types,
          rating
        )
        const pagesInTotal = apiResponse.data.totalPages
        setTotalPages(pagesInTotal)
        const list = apiResponse.data.mediaList
        setMediaList(list)
      } else {
        location.replace('/login')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleCheckboxStatusChange = (item: { id: number; label: string }) => {
    const isChecked =
      filterStatus.findIndex((it: number) => it == item.id) != -1

    if (isChecked) {
      setFilterStatus(
        filterStatus.filter(selectedItem => selectedItem != item.id)
      )
    } else {
      setFilterStatus([...filterStatus, item.id])
    }
  }

  const handleCheckboxTypeChange = (item: { id: string; label: string }) => {
    const isChecked = filterType.findIndex((it: string) => it == item.id) != -1

    if (isChecked) {
      setFilterType(filterType.filter(selectedItem => selectedItem != item.id))
    } else {
      setFilterType([...filterType, item.id])
    }
  }

  return (
    <div className='container xl:flex mx-auto py-[10rem] w-full gap-5	'>
      <div className='flex justify-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Card className='w-fit p-0.5 mb-3 xl:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-adjustments-horizontal'
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
                <path d='M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                <path d='M4 6l8 0' />
                <path d='M16 6l4 0' />
                <path d='M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                <path d='M4 12l2 0' />
                <path d='M10 12l10 0' />
                <path d='M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                <path d='M4 18l11 0' />
                <path d='M19 18l1 0' />
              </svg>
            </Card>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <Card className=' mb-3 h-fit bg-transparent border-0'>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-1 flex-col gap-5'>
                <div>
                  <Input
                    type='text'
                    id='filterName'
                    placeholder='Busqueda por nombre'
                    value={filterName}
                    onChange={event => setFilterName(event.target.value)}
                  />
                </div>
                <div>
                  <Label className='text-lg'>Estado</Label>
                  <div className='flex flex-1 flex-col gap-1.5'>
                    {status.map(item => (
                      <div key={item.id} className='flex items-center gap-3'>
                        <Checkbox
                          checked={
                            filterStatus.findIndex(
                              (it: number) => it == item.id
                            ) != -1
                          }
                          onCheckedChange={() => {
                            handleCheckboxStatusChange(item)
                          }}
                        />
                        <div>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className='text-lg'>Tipo</Label>
                  <div className='flex flex-1 flex-col gap-1.5'>
                    {types.map(item => (
                      <div key={item.id} className='flex items-center gap-3'>
                        <Checkbox
                          checked={
                            filterType.findIndex(
                              (it: string) => it == item.id
                            ) != -1
                          }
                          onCheckedChange={() => {
                            handleCheckboxTypeChange(item)
                          }}
                        />
                        <div>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>

      <Card className='w-[20%] mb-3 h-fit hidden xl:block'>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-1 flex-col gap-5'>
          <div>
            <Input
              type='text'
              id='filterName'
              placeholder='Busqueda por nombre'
              value={filterName}
              onChange={event => setFilterName(event.target.value)}
            />
          </div>
          <div>
            <Label className='text-lg'>Estado</Label>
            <div className='flex flex-1 flex-col gap-1.5'>
              {status.map(item => (
                <div key={item.id} className='flex items-center gap-3'>
                  <Checkbox
                    checked={
                      filterStatus.findIndex((it: number) => it == item.id) !=
                      -1
                    }
                    onCheckedChange={() => {
                      handleCheckboxStatusChange(item)
                    }}
                  />
                  <div>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label className='text-lg'>Tipo</Label>
            <div className='flex flex-1 flex-col gap-1.5'>
              {types.map(item => (
                <div key={item.id} className='flex items-center gap-3'>
                  <Checkbox
                    checked={
                      filterType.findIndex((it: string) => it == item.id) != -1
                    }
                    onCheckedChange={() => {
                      handleCheckboxTypeChange(item)
                    }}
                  />
                  <div>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label className='text-lg'>Valoración mínima</Label>
            <div className='flex mt-3 gap-3'>
              <Slider
                onValueChange={rating => setFilterRating(rating[0])}
                defaultValue={[0]}
                max={10}
                step={1}
              />
              <div>{filterRating}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='grow'>
        <CardHeader>
          <CardTitle>Lista Multimedia</CardTitle>
        </CardHeader>
        <CardContent>
          {mediaList.list.length > 0 ? (
            <MediaListTable itemList={mediaList} />
          ) : (
            <div>
              Añada algún contenido a su lista para poder verlo en este apartado
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              {actualPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={() => setActualPage(actualPage - 1)}
                  />
                </PaginationItem>
              )}

              {actualPage - 1 > 1 && <PaginationEllipsis />}
              {actualPage - 1 != 0 && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={() => setActualPage(actualPage - 1)}
                  >
                    {actualPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href='#' className='border'>
                  {actualPage}
                </PaginationLink>
              </PaginationItem>
              {actualPage + 1 <= totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={() => setActualPage(actualPage + 1)}
                  >
                    {actualPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                {actualPage + 1 < totalPages && <PaginationEllipsis />}
              </PaginationItem>
              {actualPage + 1 <= totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={() => setActualPage(actualPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  )
}
