import Image from 'next/image'
import Link from 'next/link'

export default function ErrorComponent ({ text }: { text: string }) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <div className=' flex justify-center'>
          <Image
            src={'/not-found.png'}
            alt='notfound'
            width={300}
            height={200}
          />
        </div>
        <div className='text-center text-3xl font-bold'>{text}</div>
        <div className='text-center text-primary text-2xl font-semibold'>
          <Link prefetch={false} href={'/'}>
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
