'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe ser administrador'
    }
  }

  const newRole = role === 'admin' ? 'admin' : 'user'

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      message: 'Rol actualizado correctamente'
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al actualizar el rol'
    }
  }
}
