import { MediaType, SortType } from '@/types/media'
import MediaContainerList from './MediaContainerList'

export default async function MediaContainer ({
  type,
  sortTypes
}: {
  type: MediaType
  sortTypes: SortType[]
}) {
  return (
    <div className='border border-secondary w-full lg:w-[48%] rounded-sm p-5'>
      <h3 className='text-xl font-bold text-center'>
        {type == 'tv' ? 'Series' : 'Películas'}
      </h3>
      <div className='flex flex-wrap justify-around gap-5'>
        {sortTypes.map((sortType: SortType) => (
          <MediaContainerList sortType={sortType} type={type} key={sortType} />
        ))}
      </div>
    </div>
  )
}
