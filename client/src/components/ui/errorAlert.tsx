interface errorAlertProps {
  messages: string[]
}

export default function ErrorAlert ({ messages }: errorAlertProps) {
  return (
    <div className='rounded-md bg-red-500/40 p-2 flex gap-2 items-center'>
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-x w-6 fill-neutral-200 stroke-neutral-200'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#ffffff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </div>

      <div>
        {messages.map(message => (
          <p key={message} className='text-sm'>
            {message}
          </p>
        ))}
      </div>
    </div>
  )
}
