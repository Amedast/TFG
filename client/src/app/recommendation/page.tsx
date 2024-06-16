'use client'
import { useState, useEffect } from 'react'
import { apiGetUserId } from '@/services/user'

import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { UserRecommendation } from '@/types/user'
import { apiGetRecommendedContent } from '@/services/recommendation'
import RecommendationCarousel from '../(media)/components/RecommendationCarousel'

export default function Recommendation () {
  const router = useRouter()
  const { toast } = useToast()
  const [recommendations, setRecommendations] = useState<UserRecommendation[]>(
    []
  )
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      if (!loading) {
        setLoading(true)
        try {
          const userIdResponse = await apiGetUserId()
          if (userIdResponse.data != null) {
            if (recommendations.length == 0) {
              const listResponse = await apiGetRecommendedContent(
                userIdResponse.data
              )

              setRecommendations([...recommendations, ...listResponse.data])
            }
          } else {
            showToast({
              title: 'Error',
              description: 'Debe iniciar sesión para acceder a esa URL',
              variant: 'destructive'
            })
            router.push('/login')
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  function showToast (item: {
    title: string
    description: string
    variant?: 'default' | 'destructive' | 'correct' | null
  }) {
    return toast(item)
  }

  return (
    <div className='container xl:flex mx-auto py-[10rem] w-full gap-5	'>
      {loading ? (
        <div className=' h-[20rem] w-[100%] flex justify-center items-center '>
          <div
            className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-primary'
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className='flex flex-1 flex-col gap-5'>
          {recommendations && recommendations.length === 0 ? (
            <div className='text-lg xl:text-2xl mb-3 text-center font-bold'>
              Añade algun contenido a tu lista para poder empezar a ver
              recomendaciones
            </div>
          ) : (
            recommendations.map(recommendation => (
              <div key={recommendation.listItem.content.contentId}>
                <div className='text-lg xl:text-2xl mb-3'>
                  Porque has visto{' '}
                  <span className='font-bold'>
                    {recommendation.listItem.content.name}
                  </span>
                </div>
                <RecommendationCarousel
                  media={recommendation.recommendations}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
