'use server'

import prisma from '@/lib/db'

export const removeUserAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.delete({
      where: {
        userId
      }
    })

    if (!userAddress) {
      return {
        ok: false,
        error: 'No se pudo eliminar la direccion del usuario'
      }
    }

    return {
      ok: true,
      message: 'Direccion del usuario eliminada correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      error: 'No se pudo eliminar la direccion del usuario'
    }
  }
}
