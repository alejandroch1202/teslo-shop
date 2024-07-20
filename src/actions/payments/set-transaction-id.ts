'use server'

import prisma from '@/lib/db'

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })

    if (!order)
      return {
        ok: false,
        message: `Orden ${orderId} no encontrada`
      }

    return { ok: true }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al actualizar la orden'
    }
  }
}
