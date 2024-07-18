'use client'

import { useCartStore } from '@/stores'
import { useAddressStore } from '@/stores/address'
import { formatCurrency, sleep } from '@/utils'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore((state) => state.address)
  const cart = useCartStore((state) => state.cart)
  const cartSummary = useCartStore((state) => state.getCartSummary())

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    console.log({ address, productsToOrder })

    setIsPlacingOrder(false)
  }

  if (!loaded) return <p>Cargando...</p>

  return (
    <div className='bg-white rounded-xl shadow-lg p-7'>
      <h2 className='text-2xl font-bold mb-5'>Dirección de entrega</h2>
      <p className='text-xl'>
        {address.name} {address.lastName}
      </p>
      <p>{address.address}</p>
      <p>{address.address2}</p>
      <p>{address.postalCode}</p>
      <p>
        {address.city}, {address.country}
      </p>
      <p>{address.phone}</p>
      {/* divider */}

      <div className='w-full h-0.5 rounded bg-gray-200 my-5'></div>

      <h2 className='text-2xl font-bold mb-5'>Resumen de la orden</h2>
      <div className='flex justify-between mb-5'>
        <p>Número de productos</p>
        <p>
          {cartSummary.itemsInCart > 1
            ? `${cartSummary.itemsInCart} articulos`
            : `${cartSummary.itemsInCart} articulo`}
        </p>
      </div>

      <div className='flex justify-between mb-5'>
        <p>Subtotal</p>
        <p>{formatCurrency(cartSummary.subTotal)}</p>
      </div>

      <div className='flex justify-between mb-5'>
        <p>Impuestos 16%</p>
        <p>{formatCurrency(cartSummary.tax)}</p>
      </div>

      <div className='flex justify-between mb-5 font-bold text-xl'>
        <p>Total</p>
        <p>{formatCurrency(cartSummary.total)}</p>
      </div>

      {/* diclaimer */}
      <p className='mb-5 text-gray-600'>
        <span className='text-xs'>
          Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros{' '}
          <a
            href='#'
            className='underline'
          >
            Términos y condiciones
          </a>{' '}
          y la{' '}
          <a
            href='#'
            className='underline'
          >
            Política de privacidad
          </a>
          .
        </span>
      </p>

      {/* <p className='text-red-500'>Error al colocar la orden</p> */}

      <div className='mt-5 mb-2 w-full'>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary w-full': !isPlacingOrder,
            'btn-disabled w-full': isPlacingOrder
          })}
          // href={'/orders/123'}
        >
          Colocar orden
        </button>
      </div>
    </div>
  )
}
