'use client'
import { Person } from '@/types/media'
import Link from 'next/link'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { getImagePath } from '@/lib/functions'
export default function CastCarousel ({ cast }: { cast: Person[] }) {
  return (
    <div className='select-none w-[80%] sm:w-[85%] md:w-[90%] mx-auto '>
      <Carousel>
        <CarouselContent>
          {cast.map((person: Person, idx: number) => (
            <CarouselItem
              key={person.id}
              className='basis-1/2 sm:basis-1/3 md:basis-1/5 xl:basis-1/6'
            >
              <Link href={'/cast/' + person.id}>
                <div className='relative group select-none rounded-sm h-full '>
                  <div className='absolute rounded-sm w-full h-full bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex flex-1 flex-col justify-end p-2'>
                    <div className='text-center font-bold'>
                      <span>{person.name}</span>
                    </div>

                    <div className='text-center  flex justify-center items-center gap-1'>
                      <span className=''>
                        {person.character || person.department}
                      </span>
                    </div>
                  </div>

                  <Image
                    height={50}
                    width={150}
                    src={getImagePath(false, person.profile_path)}
                    alt=''
                    className='rounded-sm border border-secondary cursor-pointer h-full'
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
