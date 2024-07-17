'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { login, signup } from '@/actions/auth'
import { useState } from 'react'

interface FormInputs {
  name: string
  email: string
  password: string
}

export const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>()

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage('')
    const { name, email, password } = data
    const response = await signup(name, email, password)

    if (!response.ok) {
      setErrorMessage('No se pudo crear el usuario')
      return
    }

    await login(email.toLowerCase(), password)
    window.location.replace('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col'
    >
      <p className='text-red-500 mb-5'>{errorMessage}</p>

      <label htmlFor='name'>Nombre completo</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name
        })}
        type='text'
        {...register('name', { required: true })}
      />

      <label htmlFor='email'>Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email
        })}
        type='email'
        {...register('email', {
          required: true,
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        })}
      />

      <label htmlFor='email'>Contraseña</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password
        })}
        type='password'
        {...register('password', { required: true, minLength: 6 })}
      />

      <button className='btn-primary'>Ingresar</button>

      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link
        href='/auth/login'
        className='btn-secondary text-center'
      >
        Iniciar sesion
      </Link>
    </form>
  )
}
