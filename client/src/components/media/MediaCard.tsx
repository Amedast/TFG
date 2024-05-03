import { MediaCardType, MediaType, SortType } from '@/types/media'
import Link from 'next/link'
import Image from 'next/image'
import { getImagePath, getUrlByType } from '@/lib/functions'
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
          <div className='absolute w-full h-full bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex flex-1 flex-col justify-end p-2'>
            <div className='text-center font-semibold'>
              <span>{type == 'tv' ? item.name : item.title}</span>
            </div>
            {sortType != 'upcoming' ? (
              <div className='text-center font-semibold flex justify-center items-center gap-1'>
                <span className='text-amber-400'>
                  {item.vote_average.toFixed(1)}
                </span>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-star-filled '
                    width='15'
                    height='15'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#ffffff'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path
                      d='M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z'
                      strokeWidth='0'
                      fill='currentColor'
                      className='fill-amber-400'
                    />
                  </svg>
                </span>
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
