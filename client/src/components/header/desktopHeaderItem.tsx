import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import Link from 'next/link'

export default function DesktopHeaderItem ({
  title,
  popover,
  popoverItems,
  url
}: {
  title: string
  popover: boolean
  popoverItems: { label: string; url: string }[]
  url?: string
}) {
  return (
    <div>
      {popover ? (
        <Popover>
          <PopoverTrigger>
            <div className='flex gap-1 justify-center items-center hover:bg-secondary/60 transition duration-200 p-2.5 rounded-sm '>
              {title}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-chevron-down'
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
                <path d='M6 9l6 6l6 -6' />
              </svg>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-fit p-2.5 select-none'>
            {popoverItems.map(item => (
              <Link key={item.url} href={item.url} prefetch={false}>
                <div
                  key={item.label}
                  className='p-2.5 hover:bg-secondary/80 transition duration-200 mb-0.5 rounded-sm'
                >
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </PopoverContent>
        </Popover>
      ) : (
        <Link href={url as string} prefetch={false}>
          <div className='flex gap-1 justify-center items-center hover:bg-secondary/60 transition duration-200 p-2.5 rounded-sm '>
            {title}
          </div>
        </Link>
      )}
    </div>
  )
}
