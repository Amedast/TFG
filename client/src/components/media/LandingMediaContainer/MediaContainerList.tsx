import { getCarouselTitle, getUrlByType } from '@/lib/functions'
import { apiGetMediaList } from '@/services/media'
import { MediaCardType, MediaType, SortType } from '@/types/media'
import MediaContainerCard from './MediaContainerCard'
import Link from 'next/link'
export default async function MediaContainerList ({
  type,
  sortType
}: {
  type: MediaType
  sortType: SortType
}) {
  const apiResponse = await apiGetMediaList(type, sortType)
  const results = apiResponse.data.results
  return (
    <div className='w-full sm:w-[48%] lg:w-full xl:w-[48%] mt-5'>
      <h4 className='text-xl text-center font-semibold text-primary'>
        {getCarouselTitle(type, sortType).sort_type}
      </h4>
      <div className='flex flex-1 flex-col gap-5 mt-5 '>
        {results.slice(0, 4).map((item: MediaCardType) => (
          <MediaContainerCard
            type={type}
            item={item}
            sortType={sortType}
            key={item.id}
          />
        ))}
      </div>
      <div className='text-end  flex justify-end'>
        <Link href={getUrlByType(type) + 'search?sort=' + sortType}>
          <div className='hover:underline hover:text-primary transition duration-200'>
            Ver más
          </div>
        </Link>
      </div>
    </div>
  )
}
