'use client'
import { Season } from '@/types/media'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { getImagePath } from '@/lib/functions'

export default function SeasonCarousel ({ seasons }: { seasons: Season[] }) {
  return (
    <div className='select-none w-[80%] sm:w-[85%] md:w-[90%] mx-auto'>
      <Carousel>
        <CarouselContent>
          {seasons.map((season: Season) => (
            <CarouselItem key={season.id} className='basis-1/5'>
              <div className='relative group select-none rounded-sm h-full '>
                <div className='absolute w-full h-full rounded-sm bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex flex-1 flex-col justify-end p-2'>
                  <div className='text-center font-semibold'>
                    <span>{season.name}</span>
                  </div>

                  <div className='text-center font-semibold flex justify-center items-center gap-1'>
                    <span className=''>{season.episode_count} episodios</span>
                  </div>
                </div>

                <Image
                  className={`transition duration-200 rounded-sm h-full`}
                  src={getImagePath(false, season.poster_path)}
                  alt={season.name}
                  width={500}
                  height={750}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
