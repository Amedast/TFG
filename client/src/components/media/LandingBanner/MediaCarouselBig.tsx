'use client'
import { MediaCardType } from '@/types/media'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import CarouselBanner from './CarouselBanner'

Autoplay.globalOptions = { delay: 8000 }
export default function MediaCarouselBig ({
  items
}: {
  items: { value: MediaCardType; index: number }[]
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 50 }, [
    Autoplay()
  ])
  return (
    <div
      className='w-full md:h-[40rem] overflow-hidden relative'
      ref={emblaRef}
    >
      <div className='flex'>
        {items.map(item => (
          <CarouselBanner item={item} key={item.value.id} />
        ))}
      </div>
    </div>
  )
}
