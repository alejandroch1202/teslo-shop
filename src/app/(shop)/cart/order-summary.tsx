'use client'

import { useCartStore } from '@/stores'
import { formatCurrency } from '@/utils'
import { useEffect, useState } from 'react'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const cartSummary = useCartStore((state) => state.getCartSummary())

  useEffect(() => {
    setLoaded(true) // for hydratation
  }, [])

  if (!loaded) return <p>Cargando...</p>

  return (
    <>
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
    </>
  )
}
