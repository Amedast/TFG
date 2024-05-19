'use client'
import { useInView } from 'react-intersection-observer'
import MediaCard from '@/components/media/MediaCard'
import { apiGetDiscoverContent } from '@/services/media'
import { MediaCardType, MediaType, SortType } from '@/types/media'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCarouselTitle, parseSortContent } from '@/lib/functions'

let page = 1

export default function MediaLoading ({ type }: { type: MediaType }) {
  const { ref, inView } = useInView()
  const [data, setData] = useState<MediaCardType[]>([])
  const searchParams = useSearchParams()
  const [maxPages, setMaxPages] = useState(500)
  const sort = searchParams.get('sort')

  useEffect(() => {
    page = 1
    setData([])
    if (page != 500) {
      getResults()
    }
  }, [sort])
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
        sort ? parseSortContent(sort, type) : undefined
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

  return (
    <>
      <div className='font-bold text-3xl mb-10'>
        {getCarouselTitle(type, sort as SortType).media_type}{' '}
        <span className='text-primary'>
          {getCarouselTitle(type, sort as SortType).sort_type}
        </span>
      </div>
      {data.length == 0 && <div>No se encuentran resultados</div>}

      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5'>
        {data.length > 0 &&
          data.map(item => (
            <MediaCard
              key={item.id}
              item={item}
              hover={true}
              type={type}
              sortType={sort as SortType}
              height={90}
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
    </>
  )
}
