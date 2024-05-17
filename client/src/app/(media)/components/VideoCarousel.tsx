import { VideoType } from '@/types/media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
export default function VideoCarousel ({ videos }: { videos: VideoType[] }) {
  return (
    <div className='select-none w-[80%] sm:w-[85%] md:w-[90%] mx-auto'>
      <Carousel>
        <CarouselContent>
          {videos.map((vid: VideoType, idx: number) => (
            <CarouselItem key={vid.id} className='sm:basis-1/2'>
              <iframe
                className='rounded-sm border border-secondary mx-auto w-full md:h-[15rem]'
                allowFullScreen
                src={'https://www.youtube.com/embed/' + vid.key}
              ></iframe>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
