import { getImagePath, getUrlByType } from '@/lib/functions'
import { MediaCardType, MediaType, SortType } from '@/types/media'
import Link from 'next/link'
import Image from 'next/image'
import MediaRating from '../MediaRating'
export default async function MediaContainerCard ({
  type,
  sortType,
  item
}: {
  type: MediaType
  sortType: SortType
  item: MediaCardType
}) {
  return (
    <Link href={getUrlByType(type) + '' + item.id}>
      <div
        key={item.id}
        className='flex gap-5 rounded-sm p-2 hover:bg-neutral-900 transition duration-200 h-full'
      >
        <Image
          className='transition duration-200 rounded-sm h-48 w-32'
          src={getImagePath(false, item.poster_path)}
          alt={type == 'tv' ? (item.name as string) : (item.title as string)}
          width={500}
          height={750}
        />
        <div className='flex flex-1 flex-col'>
          <h5 className='grow'>{item.title || item.name}</h5>
          {sortType == 'upcoming' ? (
            <h5>{item.release_date} </h5>
          ) : (
            <MediaRating rating={item.vote_average} />
          )}
        </div>
      </div>
    </Link>
  )
}
