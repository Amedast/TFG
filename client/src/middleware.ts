import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { apiGetUserId } from './services/user'

export async function middleware (request: NextRequest) {
  const token = request.cookies.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/profile'
}
