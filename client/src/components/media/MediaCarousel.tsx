import { MediaCardType, MediaType, SortType } from '@/types/media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import MediaCard from './MediaCard'
import { apiGetMediaList } from '@/services/media'
import { getCarouselTitle } from '@/lib/functions'
export default async function MediaCarousel ({
  type,
  sortType
}: {
  type: MediaType
  sortType: SortType
}) {
  const apiResponse = await apiGetMediaList(type, sortType)
  const results = apiResponse.data.results
  return (
    <div className='pt-5'>
      <div className='flex justify-center w-full mb-3'>
        <div className='w-[80%] text-xl font-bold'>
          {getCarouselTitle(type, sortType).media_type}{' '}
          <span className='text-primary'>
            {getCarouselTitle(type, sortType).sort_type}
          </span>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <Carousel className='w-[80%]'>
          <CarouselContent>
            {results.map((item: MediaCardType) => (
              <CarouselItem
                key={item.id}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 '
              >
                <MediaCard
                  item={item}
                  hover={true}
                  type={type}
                  sortType={sortType}
                  height={40}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className='flex justify-center w-full mt-2'>
        <div className='w-[80%] text-sm justify-end text-end'>
          <label className='hover:underline transition duration-200'>
            Ver más
          </label>
        </div>
      </div>
    </div>
  )
}
