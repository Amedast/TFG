'use client'
import { useInView } from 'react-intersection-observer'
import MediaCard from '@/components/media/MediaCard'
import { apiGetDiscoverContent } from '@/services/media'
import { MediaCardType, MediaType, SortType } from '@/types/media'
import { useEffect, useState } from 'react'
import { getCarouselTitle, parseSortContent } from '@/lib/functions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

let page = 1

export default function MediaLoadingFilter () {
  const { ref, inView } = useInView()
  const [data, setData] = useState<MediaCardType[]>([])
  const [minRating, setMinRating] = useState<number>(0)
  const [maxRating, setMaxRating] = useState<number>(10)
  const [year, setYear] = useState<undefined | string>()
  const [order, setOrder] = useState('desc')
  const [sort, setSort] = useState('popular')
  const [type, setType] = useState<MediaType>('movie')
  const [maxPages, setMaxPages] = useState(500)
  useEffect(() => {
    page = 1
    setData([])
    if (page != 500) {
      getResults()
    }
  }, [sort, minRating, maxRating, year, order, type])

  useEffect(() => {
    if (inView) {
      if (page != 500) {
        getResults()
      }
    }
  }, [inView])

  const getResults = async () => {
    try {
      const response = await apiGetDiscoverContent(
        type,
        page,
        undefined,
        sort ? parseSortContent(sort, type) : undefined,
        order,
        minRating,
        maxRating,
        year == 'year' ? undefined : year
      )
      if (response) {
        const res = response.data
        if (res) {
          if (page == 1) {
            setData(res.results)
          } else {
            setData([...data, ...res.results])
          }
          setMaxPages(res.total_pages)
          if (page != 500) {
            page++
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleType (typeSelected: string) {
    setType(typeSelected as MediaType)
  }
  function handleSort (sortSelected: string) {
    setSort(sortSelected)
  }
  function handleOrder (orderSelected: string) {
    setOrder(orderSelected)
  }
  function handleYear (yearSelected: string) {
    setYear(yearSelected)
  }
  function handleMinRating (inputMinRating: string) {
    let rat: number = parseFloat(inputMinRating)

    if (rat < 0) rat = 0
    if (rat > maxRating) rat = maxRating
    setMinRating(rat)
  }
  function handleMaxRating (inputMaxRating: string) {
    let rat: number = parseFloat(inputMaxRating)

    if (rat < minRating) rat = minRating
    if (rat > 10) rat = 10
    setMaxRating(rat)
  }
  const currentYear = new Date().getFullYear()
  const startYear = 1950
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  )
  return (
    <>
      <div className='font-bold text-3xl mb-10'>
        {getCarouselTitle(type, sort as SortType).media_type}{' '}
        <span className='text-primary'>
          {getCarouselTitle(type, sort as SortType).sort_type}
        </span>
      </div>
      {data.length == 0 && <div>No se encuentran resultados</div>}
      <div className='xl:flex gap-5'>
        <Card className='xl:w-[40%] mb-3 h-fit'>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 md:grid-cols-3 xl:flex xl:flex-1 xl:flex-col gap-5 items-center xl:items-stretch justify-around'>
            <div className='w-full'>
              <Label className='' htmlFor='status'>
                Tipo
              </Label>
              <Select onValueChange={handleType} value={type} required>
                <SelectTrigger className='w-[100%]'>
                  <SelectValue placeholder='Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='movie'>Película</SelectItem>
                  <SelectItem value='tv'>Serie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='w-full'>
              <Label className='' htmlFor='status'>
                Ordenar por
              </Label>
              <Select onValueChange={handleSort} value={sort} required>
                <SelectTrigger className='w-[100%]'>
                  <SelectValue placeholder='Orden' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='popular'>Popular</SelectItem>
                  <SelectItem value='top_rated'>Puntuación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='w-full'>
              <Label className='' htmlFor='status'>
                Orden
              </Label>
              <Select onValueChange={handleOrder} value={order} required>
                <SelectTrigger className='w-[100%]'>
                  <SelectValue placeholder='Orden' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='desc'>Descendente</SelectItem>
                  <SelectItem value='asc'>Ascendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='w-full'>
              <Label className='' htmlFor='status'>
                Año
              </Label>
              <Select onValueChange={handleYear} value={year} required>
                <SelectTrigger className='w-[100%]'>
                  <SelectValue placeholder='Año' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'default'} value={'year'}>
                    Año
                  </SelectItem>
                  {years.map(selectYear => (
                    <SelectItem key={selectYear} value={selectYear.toString()}>
                      {selectYear}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='w-full'>
              <Label className=''>Valoración mínima</Label>
              <div className='flex gap-3'>
                <Input
                  type='number'
                  placeholder='Valoración mínima'
                  onChange={event => handleMinRating(event?.target.value)}
                  min={0}
                  max={maxRating}
                />
              </div>
            </div>
            <div className='w-full'>
              <Label className=''>Valoración máxima</Label>
              <div className='flex gap-3'>
                <Input
                  type='number'
                  placeholder='Valoración máxima'
                  onChange={event => handleMaxRating(event?.target.value)}
                  min={minRating}
                  max={10}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='grow'>
          <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {data.length > 0 &&
              data.map(item => (
                <MediaCard
                  key={item.id}
                  item={item}
                  hover={true}
                  type={type}
                  sortType={sort as SortType}
                  height={60}
                />
              ))}
          </section>
          {page != 500 && page < maxPages && (
            <section ref={ref} className='text-center text-2xl mt-10'>
              <div
                className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-primary'
                role='status'
              >
                <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                  Loading...
                </span>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
