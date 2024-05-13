'use client'
import { ImageType } from '@/types/media'
import { useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { getImagePath } from '@/lib/functions'
export default function ImageCarousel ({
  images,
  vertical
}: {
  images: ImageType[]
  vertical?: boolean
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const openModal = (image: number) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='select-none w-[80%] sm:w-[85%] md:w-[90%] mx-auto'>
      <Carousel>
        <CarouselContent>
          {images.map((img: ImageType, idx: number) => (
            <CarouselItem
              key={img.file_path}
              className={vertical ? 'sm:basis-1/5' : 'sm:basis-1/3'}
            >
              <Image
                height={img.height}
                width={img.width}
                src={getImagePath(false, img.file_path)}
                alt=''
                className='rounded-sm border border-secondary cursor-pointer'
                onClick={() => openModal(idx)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex justify-center items-center '>
          <div
            className='relative w-screen h-screen  inset-0 z-50 flex justify-center items-center bg-background/80 '
            onClick={closeModal}
          >
            <button className='absolute top-4 right-4 text-white text-xl  rounded-full p-2'>
              ✕
            </button>
          </div>
          <div className='fixed w-[50%]  h-fit m-auto  inset-0 z-50 flex justify-center items-center '>
            <div className=' rounded-sm '>
              <Image
                src={getImagePath(false, images[selectedImage].file_path, 1280)}
                alt=''
                width={images[selectedImage].width}
                height={images[selectedImage].height}
                placeholder='blur'
                blurDataURL='/ImagePlaceholder.png'
                className='rounded-sm'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
