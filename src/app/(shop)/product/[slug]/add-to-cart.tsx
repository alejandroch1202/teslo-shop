'use client'

import { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/components/product'
import { Product, Size } from '@/interfaces'

export const AddToCart = ({ product }: { product: Product }) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [errorMessage, setErrorMessage] = useState(false)

  const addToCart = () => {
    if (!size) {
      setErrorMessage(true)
      return
    }

    console.log({ size, quantity })
  }

  return (
    <>
      {errorMessage && !size && (
        <span className='mt-2 text-red-500 fade-in'>
          Debe seleccionar una talla
        </span>
      )}
      {/* size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeSelected={setSize}
      />
      {/* quantity selector */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
      {/* add to cart button */}
      <button
        onClick={addToCart}
        className='btn-primary my-5'
      >
        Agregar al carrito
      </button>
    </>
  )
}
