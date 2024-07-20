'use server'

import { PayPalOrderStatusResponse } from '@/interfaces'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const accessToken = await getPayPalBearerToken()

  if (!accessToken)
    return {
      ok: false,
      message: 'No se pudo obtener el token de verificacion'
    }

  const response = await verifyPayPalPayment(paypalTransactionId, accessToken)

  if (!response)
    return {
      ok: false,
      message: 'Error al verificar el pago'
    }

  const { status, purchase_units } = response

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aun no se ha pagado en PayPal'
    }
  }

  const { invoice_id: orderId } = purchase_units[0]

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date() }
    })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      message: 'Pago verificado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al verificar el pago'
    }
  }
}

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const OAUTH2_URL = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'post',
    headers: myHeaders,
    body: urlencoded
  }

  try {
    const result = await fetch(OAUTH2_URL, {
      ...requestOptions,
      cache: 'no-store'
    }).then((res) => res.json())
    return result.access_token
  } catch (error) {
    console.log(error)
    return null
  }
}

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  accessToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL ?? ''

  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${accessToken}`)

  const requestOptions = {
    method: 'get',
    headers: myHeaders
  }

  try {
    const result = await fetch(`${PAYPAL_ORDERS_URL}/${paypalTransactionId}`, {
      ...requestOptions,
      cache: 'no-store'
    }).then((res) => res.json())
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}
