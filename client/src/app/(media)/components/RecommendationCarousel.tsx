'use client'
import { MediaCardType, MediaType } from '@/types/media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import RecommendationCard from './RecommendationCard'
import { getUrlByType } from '@/lib/functions'

export default function RecommendationCarousel ({
  media
}: {
  media: MediaCardType[]
}) {
  return (
    <div className='select-none w-[80%] sm:w-[85%] md:w-[90%] mx-auto'>
      <Carousel>
        <CarouselContent>
          {media.map((med: MediaCardType) => (
            <CarouselItem key={med.id} className='basis-1/2 sm:basis-1/5'>
              <RecommendationCard item={med} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
