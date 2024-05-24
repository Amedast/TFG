import Image from 'next/image'
import {
  Genre,
  MediaCardType,
  MediaDetailsType,
  MediaType,
  SpokenLanguage
} from '@/types/media'

import { apiGetSimilarContent } from '@/services/recommendation'
import { getCarouselTitle, getImagePath } from '@/lib/functions'
import { Suspense } from 'react'
import RecommendationCarousel from './RecommendationCarousel'

export default async function ContentRecommendation ({
  contentId,
  type
}: {
  contentId: number
  type: MediaType
}) {
  const recommendResponse = await apiGetSimilarContent(type, contentId)
  const recommendedContent = recommendResponse.data

  return (
    <div>
      <h3 className='text-2xl font-semibold mb-3'>
        Contenido
        <span className='text-primary'> Recomendado</span>
      </h3>
      <Suspense
        fallback={
          <div
            className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-primary'
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        }
      >
        <div className=' mt-5 flex flex-wrap gap-3'>
          <RecommendationCarousel media={recommendedContent} />
        </div>
      </Suspense>
    </div>
  )
}
