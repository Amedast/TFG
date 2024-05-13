'use client'
import { MediaCardType, MediaType } from '@/types/media'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { getImagePath, getUrlByType } from '@/lib/functions'
import MediaRating from '@/components/media/MediaRating'
import Link from 'next/link'

export default function MediaCarousel ({
  media,
  type
}: {
  media: MediaCardType[]
  type: MediaType
}) {
  return (
    <div className='select-none w-[80%] sm:w-[85%] md:w-[90%] mx-auto'>
      <Carousel>
        <CarouselContent>
          {media.map((med: MediaCardType) => (
            <CarouselItem key={med.id} className='basis-1/5'>
              <Link href={getUrlByType(type) + '' + med.id}>
                <div className='relative group select-none rounded-sm h-full '>
                  <div className='absolute w-full h-full rounded-sm bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex flex-1 flex-col justify-end p-2'>
                    <div className='text-center font-semibold'>
                      <span>{med.name || med.title}</span>
                    </div>

                    <div className='text-center font-semibold flex justify-center items-center gap-1'>
                      <MediaRating rating={med.vote_average} />
                    </div>
                  </div>

                  <Image
                    className={`transition duration-200 rounded-sm h-full`}
                    src={getImagePath(false, med.poster_path)}
                    alt={(med.name as string) || (med.title as string)}
                    width={500}
                    height={750}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
