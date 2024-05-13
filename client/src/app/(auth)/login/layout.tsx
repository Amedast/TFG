import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicio de Sesión'
}

export default function LoginLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
