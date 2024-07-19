'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/db'

export const getOrdersByUser = async () => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const orders = await prisma?.order.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      orderAddress: {
        select: {
          name: true,
          lastName: true
        }
      }
    }
  })

  return {
    ok: true,
    data: orders
  }
}
