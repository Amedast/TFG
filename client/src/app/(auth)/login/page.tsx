'use client'
import Link from 'next/link'
import { useState } from 'react'
import { apiLogin } from '@/services/user'
import { Button } from '@/components/ui/button'
import ErrorAlert from '@/components/ui/errorAlert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login () {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function login () {
    try {
      const loginResponse = await apiLogin(identifier, password)
      if (
        loginResponse.data.error == 'USER_NOT_FOUND' ||
        loginResponse.data.error == 'EMAIL_NOT_VERIFIED'
      ) {
        setError(loginResponse.data.message as string)
      } else {
        localStorage.setItem('token', loginResponse.data.encodedToken)
        location.replace('/')
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className='h-screen flex items-center'>
      <Card className='mx-auto w-[20rem]'>
        <CardHeader>
          <CardTitle className='text-2xl'>Inicio de sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Correo electrónico</Label>
              <Input
                id='email'
                type='email'
                placeholder='email@email.com'
                value={identifier}
                onChange={event => setIdentifier(event.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Contraseña</Label>
              </div>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
              />
            </div>
            {error != null && <ErrorAlert messages={[error]} />}
            <Button type='submit' className='w-full' onClick={login}>
              Iniciar Sesión
            </Button>
          </div>
          <div className='mt-5 text-sm text-center '>
            ¿No tienes cuenta?{' '}
            <Link href='/register' className='underline'>
              Registrate
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
