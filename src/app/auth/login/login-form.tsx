'use client'

import { useEffect } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import Link from 'next/link'
import { authenticate } from '@/actions/auth'
import { IoInformationCircleOutline } from 'react-icons/io5'
import clsx from 'clsx'
// import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  // const router = useRouter()
  const [state, formAction] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (state === 'success') {
      // router.replace('/')
      window.location.replace('/') // no cache
    }
  }, [state])

  return (
    <form
      action={formAction}
      className='flex flex-col'
    >
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
      />

      <label htmlFor='email'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />

      <SubmitButton />

      {state === 'CredentialsSignin' && (
        <div className='flex items-center justify-center pt-5 gap-2'>
          <IoInformationCircleOutline className='h-5 w-5 text-red-500' />
          <p className='text-sm text-red-500'>Credenciales invalidas</p>
        </div>
      )}

      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link
        href='/auth/signup'
        className='btn-secondary text-center'
      >
        Crear una nueva cuenta
      </Link>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending
      })}
      type='submit'
      disabled={pending}
    >
      {pending ? 'Iniciando...' : 'Iniciar sesión'}
    </button>
  )
}
