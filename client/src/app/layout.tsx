import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import HeaderMobile from '@/components/headerMobile'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: 'POPDB',
    template: 'POPDB | %s'
  },
  icons: {
    icon: '/profileIcon.png'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <header>
          <Header />
          <HeaderMobile />
        </header>
        <main className=' min-h-screen '>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
