'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions
} from '@paypal/paypal-js'
import { paypalCheckPayment, setTransactionId } from '@/actions/payments'

interface PayPalButtonProps {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = (Math.round(amount * 100) / 100).toString() // 123.12

  if (isPending) {
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-12 bg-gray-300 rounded'></div>
        <div className='h-12 bg-gray-300 rounde mt-3'></div>
      </div>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: roundedAmount
          }
        }
      ]
    })

    const { ok } = await setTransactionId(orderId, transactionId)

    if (!ok) {
      throw new Error('Error al procesar la orden')
    }

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if (!details) return

    await paypalCheckPayment(details.id!)
  }

  return (
    <PayPalButtons
      className='relative z-0'
      createOrder={createOrder}
      onApprove={onApprove}
    />
  )
}
