'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/db'

export const getOrderById = async (id: string) => {
  const session = await auth()

  if (!session?.user)
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id
      },
      include: {
        orderAddress: true,
        orderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                productImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw `${id} no existe`

    if (session.user.role === 'user') {
      if (order.userId !== session.user.id) {
        throw `${id} no pertenece al usuario`
      }
    }

    return {
      ok: true,
      data: order
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener la orden'
    }
  }
}
