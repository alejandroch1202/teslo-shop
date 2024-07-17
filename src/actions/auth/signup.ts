'use server'

import prisma from '@/lib/db'
import bcryptjs from 'bcryptjs'

export const signup = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return {
      ok: true,
      message: 'Usuario creado correctamente',
      data: { user }
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo crear el usuario'
    }
  }
}
