import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lista Multimedia'
}

export default function ListLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
