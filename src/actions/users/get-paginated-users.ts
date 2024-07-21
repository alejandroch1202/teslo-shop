'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/db'

export const getPaginatedUsers = async () => {
  const session = await auth()

  if (session?.user.role !== 'admin')
    return {
      ok: false,
      message: 'Debe ser un usuario administrador'
    }

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc'
    }
  })

  return {
    ok: true,
    data: users
  }
}
