import { MediaCardType } from '@/types/media'
import Image from 'next/image'
import { getImagePath, getMediaType, getUrlByType } from '@/lib/functions'
import Link from 'next/link'
export default function CarouselBanner ({
  item
}: {
  item: { value: MediaCardType; index: number }
}) {
  return (
    <div key={item.value.id} className='flex-[0_0_100%] relative'>
      <Link href={getUrlByType(item.value.media_type) + '' + item.value.id}>
        <div className='absolute w-full mt-1 h-full lg:h-[40rem] items-center flex bg-gradient-to-t from-background to-transparent p-10 text-neutral-100 select-none embla__slide'>
          <div className='mt-[8.5rem] sm:mt-[17rem] md:w-[50%] lg:w-[50%] lg:mt-[20rem]'>
            <h2 className='text-2xl lg:text-5xl font-black hover:text-primary w-fit transition duration-200'>
              {item.value.media_type == 'tv'
                ? (item.value.name as string)
                : (item.value.title as string)}
            </h2>

            <h4 className='text-xl hidden lg:block'>
              #{item.index} En{' '}
              <span className='text-primary font-bold'>Tendencias</span> en{' '}
              {getMediaType(item.value.media_type)}
            </h4>
            <p className='text-neutral-200 lg:line-clamp-4 hidden'>
              {item.value.overview}
            </p>
          </div>
        </div>

        <Image
          className='transition duration-200 '
          src={getImagePath(true, item.value.backdrop_path)}
          width={2560}
          height={1440}
          alt={
            item.value.media_type == 'tv'
              ? (item.value.name as string)
              : (item.value.title as string)
          }
        />
      </Link>
    </div>
  )
}
