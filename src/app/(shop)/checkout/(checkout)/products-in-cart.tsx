'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/stores'
import { formatCurrency } from '@/utils'

export const ProductsInCart = () => {
  const [loading, setLoading] = useState(false)
  const productsInCart = useCartStore((state) => state.cart)

  useEffect(() => {
    setLoading(true) // For hydratation
  }, [])

  if (!loading) {
    return <p>Cargando...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.size}-${product.slug}`}
          className='flex mb-5'
        >
          <Image
            src={`/products/${product.image}`}
            alt={`${product.size}-${product.title}`}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover'
            }}
            width={100}
            height={100}
            className='mr-5 rounded'
          />

          <div>
            <p>{`${product.size} - ${product.title} (${product.quantity})`}</p>
            <p className='font-bold '>
              {formatCurrency(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
