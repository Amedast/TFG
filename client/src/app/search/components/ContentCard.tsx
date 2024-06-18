import { ContentResult, MediaType } from '@/types/media'
import Link from 'next/link'
import Image from 'next/image'
import { getImagePath, getUrlByType } from '@/lib/functions'
import MediaRating from '@/components/media/MediaRating'
import { MotionFrame } from '@/components/media/MotionFrame'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export default function ContentCard ({
  item,
  type
}: {
  item: ContentResult
  type: string
}) {
  return (
    <MotionFrame
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{ delay: 0.25, ease: 'easeInOut', duration: 1 }}
      viewport={{ amount: 0 }}
    >
      <Link href={getUrlByType(type) + '' + item.id}>
        <div className='relative group select-none rounded-sm h-full '>
          <div className='absolute w-full h-full rounded-sm bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex flex-1 flex-col justify-end p-2'>
            <div className='text-center font-semibold'>
              <span>{type == 'movie' ? item.title : item.name}</span>
            </div>
            {type != 'person' ? (
              <div className='mx-auto'>
                <MediaRating rating={item.vote_average as number} />
              </div>
            ) : (
              <div className='mx-auto'>{item.known_for_department}</div>
            )}
          </div>

          <Image
            className={`transition duration-200 rounded-sm h-full W-60`}
            src={getImagePath(false, item.poster_path)}
            alt={
              type == 'movie' ? (item.title as string) : (item.name as string)
            }
            width={500}
            height={750}
          />
        </div>
      </Link>
    </MotionFrame>
  )
}
