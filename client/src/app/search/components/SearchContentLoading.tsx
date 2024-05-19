'use client'
import { useInView } from 'react-intersection-observer'
import { apiGetSearchContent } from '@/services/media'
import { ContentResult } from '@/types/media'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ContentCard from './ContentCard'

let page = 1

export default function SearchContentLoading () {
  const { ref, inView } = useInView()
  const [data, setData] = useState<ContentResult[]>([])
  const searchParams = useSearchParams()
  const searchText = searchParams.get('name') || ''

  useEffect(() => {
    page = 1
    if (page != 500) {
      getResults()
    }
  }, [searchText])

  useEffect(() => {
    if (inView) {
      if (page != 500) {
        getResults()
      }
    }
  }, [inView])

  const getResults = async () => {
    try {
      const response = await apiGetSearchContent(searchText, page)
      if (response) {
        const res = response.data
        if (res) {
          if (page == 1) {
            setData(res.results)
          } else {
            setData([...data, ...res.results])
          }
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
        Resultados para:
        <span className='text-primary'> {searchText}</span>
      </div>
      {data.length == 0 && <div>No se encuentran resultados</div>}

      <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5'>
        {data.length > 0 &&
          data.map(item => (
            <ContentCard key={item.id} item={item} type={item.media_type} />
          ))}
      </section>
      {page != 500 && (
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
