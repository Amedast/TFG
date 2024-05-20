import { Suspense } from 'react'
import MediaLoading from '../../components/MediaLoading'
export default function MovieSearch () {
  return (
    <div className='container mx-auto py-[10rem] w-full'>
      <Suspense
        fallback={
          <div
            className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-primary'
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        }
      >
        <MediaLoading type='tv' />
      </Suspense>
    </div>
  )
}