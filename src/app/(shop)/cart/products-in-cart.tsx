'use client'

import Image from 'next/image'
import { useCartStore } from '@/stores'
import { QuantitySelector } from '@/components/product'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const ProductsInCart = () => {
  const [loading, setLoading] = useState(false)
  const productsInCart = useCartStore((state) => state.cart)
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  )
  const removeProduct = useCartStore((state) => state.removeProduct)

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
            <Link
              className='hover:underline cursor-pointer'
              href={`/product/${product.slug}`}
            >
              <p>{`${product.size} - ${product.title}`}</p>
            </Link>
            <p>{product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />

            <button
              onClick={() => removeProduct(product)}
              className='underline mt-3'
              type='button'
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
