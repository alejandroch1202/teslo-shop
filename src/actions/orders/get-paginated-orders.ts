'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/db'

export const getPaginatedOrders = async () => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const orders = await prisma?.order.findMany({
    orderBy: {
      createdAt: 'desc'
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
