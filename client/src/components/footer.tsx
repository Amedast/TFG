import { Separator } from '@/components/ui/separator'
export default function Footer () {
  return (
    <div className='bg-primary text-neutral-100 px-5 py-[5rem] w-full mt-[5rem]'>
      <div className='flex justify-around items-center text-lg w-[60%] mx-auto'>
        <label className='hover:underline transition duration-200 cursor-pointer'>
          Inicio
        </label>
        <label className='hover:underline transition duration-200 cursor-pointer'>
          Películas
        </label>
        <label className='hover:underline transition duration-200 cursor-pointer'>
          Series
        </label>
        <label className='hover:underline transition duration-200 cursor-pointer'>
          Descubre
        </label>
      </div>
      <Separator className='my-[3rem] w-[60%] mx-auto bg-neutral-300' />
      <div className='flex justify-around items-center w-[40%] mx-auto'>
        <div className='rounded-full bg-background p-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-brand-github stroke-neutral-200 fill-transparent hover:fill-neutral-200 transition-all duration-200'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#ffffff'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5' />
          </svg>
        </div>
        <div className='rounded-full bg-background p-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-brand-x stroke-neutral-200 fill-transparent hover:fill-neutral-200 transition-all duration-200'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#ffffff'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 4l11.733 16h4.267l-11.733 -16z' />
            <path d='M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772' />
          </svg>
        </div>
        <div className='rounded-full bg-background p-2 group'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-brand-instagram stroke-neutral-200'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#ffffff'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z' />
            <path
              d='M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'
              className=' fill-transparent group-hover:fill-neutral-200 transition-all duration-200'
            />
            <path d='M16.5 7.5l0 .01' />
          </svg>
        </div>
      </div>
    </div>
  )
}
