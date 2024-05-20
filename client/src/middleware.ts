import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { apiGetUserId } from './services/user'

export async function middleware (request: NextRequest) {
  const tokenCookie = request.cookies.get('token')

  const token = tokenCookie?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  } else {
    const isValid = await validateToken(token)
    if (!isValid) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  }
}

async function validateToken (token: string): Promise<boolean> {
  try {
    const userId = await apiGetUserId(token)
    return !!userId
  } catch (error) {
    console.error('Error al validar:', error)
    return false
  }
}

export const config = {
  matcher: '/profile'
}
