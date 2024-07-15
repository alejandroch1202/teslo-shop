'use client'

import { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/components/product'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/stores'

export const AddToCart = ({ product }: { product: Product }) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [errorMessage, setErrorMessage] = useState(false)

  const addToCart = () => {
    if (!size) {
      setErrorMessage(true)
      return
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    setQuantity(1)
    setSize(undefined)
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
