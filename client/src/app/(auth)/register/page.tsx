'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  apiRegister,
  apiCheckEmail,
  apiCheckPassword,
  apiCheckUser
} from '@/services/user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ErrorAlert from '@/components/ui/errorAlert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckResponse } from '@/types/user'

export default function Register () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [emptyFields, setEmptyFields] = useState(false)

  const [userAvailable, setUserAvailable] = useState<CheckResponse>({
    value: true
  })
  const [emailAvailable, setEmailAvailable] = useState<CheckResponse>({
    value: true
  })
  const [passErrors, setPassErrors] = useState<CheckResponse>({
    value: true
  })

  const [equalPass, setEqualPass] = useState(true)

  const [registered, setRegistered] = useState(false)

  async function checkEmail () {
    try {
      await apiCheckEmail(email).then(response => {
        setEmailAvailable(response.data)
      })
    } catch (err) {
      console.error(err)
    }
  }
  async function checkUser () {
    try {
      await apiCheckUser(username).then(response => {
        setUserAvailable(response.data)
      })
    } catch (err) {
      console.error(err)
    }
  }
  async function checkPass () {
    try {
      await apiCheckPassword(password).then(response => {
        setPassErrors(response.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function register () {
    if (
      username == '' ||
      email == '' ||
      password == '' ||
      passwordConfirm == ''
    ) {
      setEmptyFields(true)
    } else if (
      !(
        userAvailable.errors ||
        emailAvailable.errors ||
        passErrors.errors ||
        equalPass == false
      )
    ) {
      try {
        await apiRegister(username, password, email)

        setRegistered(true)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className='h-screen flex items-center'>
      <Card className='mx-auto w-[25rem] '>
        {!registered ? (
          <>
            <CardHeader>
              <CardTitle className='text-2xl'>Crea tu cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Correo electrónico</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='email@email.com'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    onBlur={() => checkEmail()}
                    required
                  />
                  {!emailAvailable.value && (
                    <ErrorAlert messages={emailAvailable.errors as string[]} />
                  )}
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Usuario</Label>
                  <Input
                    id='user'
                    type='text'
                    placeholder='Nombre de usuario'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    onBlur={() => checkUser()}
                    required
                  />
                  {!userAvailable.value && (
                    <ErrorAlert messages={userAvailable.errors as string[]} />
                  )}
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
                    onBlur={() => checkPass()}
                    required
                  />
                  {!passErrors.value && (
                    <ErrorAlert messages={passErrors.errors as string[]} />
                  )}
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='passwordConfirm'>
                      Confirmar contraseña
                    </Label>
                  </div>
                  <Input
                    id='passwordConfirm'
                    type='password'
                    value={passwordConfirm}
                    onChange={event => setPasswordConfirm(event.target.value)}
                    onBlur={() => setEqualPass(password === passwordConfirm)}
                    required
                  />
                  {!equalPass && (
                    <ErrorAlert messages={['Las contraseñas no coinciden.']} />
                  )}
                </div>
                {emptyFields && (
                  <ErrorAlert
                    messages={['Por favor rellene todos los campos.']}
                  />
                )}
                <Button type='submit' className='w-full' onClick={register}>
                  Registrate
                </Button>
              </div>
              <div className='mt-5 text-sm text-center '>
                ¿Ya tienes cuenta?{' '}
                <Link href='/login' className='underline'>
                  Iniciar sesión
                </Link>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className='text-2xl'>Verifica tu cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center'>
                <div className='flex justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-mail-check'
                    width='68'
                    height='68'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#ffffff'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M11 19h-6a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6' />
                    <path d='M3 7l9 6l9 -6' />
                    <path d='M15 19l2 2l4 -4' />
                  </svg>
                </div>

                <div>
                  <p>
                    Hemos enviado a <label className='font-bold'>{email}</label>{' '}
                    un correo para que actives tu cuenta.
                  </p>
                </div>
              </div>
              <div className='mt-5 text-sm text-center '>
                <Link href='/login' className='underline'>
                  Iniciar sesión
                </Link>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
