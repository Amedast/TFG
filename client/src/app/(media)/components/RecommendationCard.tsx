import { MediaCardType, MediaType, SortType } from '@/types/media'
import Link from 'next/link'
import Image from 'next/image'
import { getImagePath, getUrlByType } from '@/lib/functions'
import MediaRating from '@/components/media/MediaRating'
import { MotionFrame } from '@/components/media/MotionFrame'
import { useRouter } from 'next/navigation'
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export default function RecommendationCard ({ item }: { item: MediaCardType }) {
  const type = item.title ? 'movie' : 'tv'
  const router = useRouter
  return (
    <MotionFrame
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{ delay: 0.25, ease: 'easeInOut', duration: 1 }}
      viewport={{ amount: 0 }}
      className='h-full'
    >
      <Link href={getUrlByType(type) + '' + item.id}>
        <div className='relative group select-none rounded-sm h-full '>
          <div className='absolute w-full h-full rounded-sm bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition duration-200 flex flex-1 flex-col justify-end p-2'>
            <div className='text-center font-semibold'>
              <span>{type == 'tv' ? item.name : item.title}</span>
            </div>
            <div className='mx-auto'>
              <MediaRating rating={item.vote_average} />
            </div>
            <div className='text-center font-semibold'>
              <span>{type == 'tv' ? 'Serie' : 'Película'}</span>
            </div>
          </div>

          <Image
            className={`transition duration-200 rounded-sm h-full`}
            src={getImagePath(false, item.poster_path)}
            alt={type == 'tv' ? (item.name as string) : (item.title as string)}
            width={500}
            height={750}
          />
        </div>
      </Link>
    </MotionFrame>
  )
}
