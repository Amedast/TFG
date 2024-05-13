import { MediaCardType, MediaType, SortType } from '@/types/media'
import Link from 'next/link'
import Image from 'next/image'
import { getImagePath, getUrlByType } from '@/lib/functions'
import MediaRating from './MediaRating'
export default async function MediaCard ({
  item,
  hover,
  type,
  sortType,
  height
}: {
  item: MediaCardType
  hover: boolean
  type: MediaType
  sortType: SortType
  height: number
}) {
  return (
    <Link href={getUrlByType(type) + '' + item.id}>
      <div className='relative group select-none rounded-sm h-full '>
        {hover && (
          <div className='absolute w-full h-full rounded-sm bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex flex-1 flex-col justify-end p-2'>
            <div className='text-center font-semibold'>
              <span>{type == 'tv' ? item.name : item.title}</span>
            </div>
            {sortType != 'upcoming' ? (
              <div className='mx-auto'>
                <MediaRating rating={item.vote_average} />
              </div>
            ) : (
              <div className='text-center font-semibold flex justify-center items-center gap-1'>
                <span className=''>{item.release_date}</span>
              </div>
            )}
          </div>
        )}

        <Image
          className={`transition duration-200 rounded-sm h-full ${
            'w-' + height.toString
          }`}
          src={getImagePath(false, item.poster_path)}
          alt={type == 'tv' ? (item.name as string) : (item.title as string)}
          width={500}
          height={750}
        />
      </div>
    </Link>
  )
}
