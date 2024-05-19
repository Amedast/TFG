import Link from 'next/link'
import { ContentResult } from '@/types/media'
import Image from 'next/image'
import { getImagePath, getUrlByType } from '@/lib/functions'
import MediaRating from '../media/MediaRating'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
export default function SearchBarElement ({
  element
}: {
  element: ContentResult
}) {
  return (
    <Link href={getUrlByType(element.media_type) + '' + element.id}>
      <div className='flex gap-3 hover:bg-secondary/90 transition duration-200 cursor-pointer p-2.5 mx-2.5 rounded-sm'>
        <Image
          className='rounded-sm'
          src={getImagePath(
            false,
            element.media_type == 'person'
              ? element.profile_path
              : element.poster_path
          )}
          alt={(element.title || element.name) as string}
          width={50}
          height={100}
        />
        <div className=' flex flex-1 flex-col'>
          <span className='text-md line-clamp-1'>
            {element.title || element.name}
          </span>

          <div className='grow '>
            <div className='text-sm flex gap-3'>
              {element.media_type == 'movie' && (
                <>
                  <span>{element.release_date?.slice(0, 4)}</span>

                  <div className='text-amber-500 font-semibold flex gap-0.5 items-center'>
                    {element.vote_average?.toFixed(1)}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-star-filled'
                      width='12'
                      height='12'
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
                      />
                    </svg>
                  </div>
                </>
              )}
              {element.media_type == 'tv' && (
                <>
                  <span>{element.first_air_date?.slice(0, 4)}</span>
                  <div className='text-amber-500 font-semibold flex gap-0.5 items-center'>
                    {element.vote_average?.toFixed(1)}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-star-filled '
                      width='12'
                      height='12'
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
                      />
                    </svg>
                  </div>
                </>
              )}
              {element.media_type == 'person' && (
                <span>
                  {element.known_for_department == 'Acting'
                    ? element.gender == 2
                      ? 'Actor'
                      : 'Actriz'
                    : 'Otro'}
                </span>
              )}
            </div>
          </div>
          <div className='flex-grow flex justify-end items-end '>
            <Badge
              className={element.media_type == 'person' ? `bg-purple-500` : ``}
            >
              {element.media_type == 'person'
                ? 'Persona'
                : element.media_type == 'tv'
                ? 'Serie'
                : 'Película'}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
