'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange
}: QuantitySelectorProps) => {
  const handleAddQuantity = () => {
    if (quantity > 4) return
    onQuantityChange(quantity + 1)
  }

  const handleRemoveQuantity = () => {
    if (quantity === 1) return
    onQuantityChange(quantity - 1)
  }

  return (
    <div className='flex items-center'>
      <button
        type='button'
        disabled={quantity === 1}
        onClick={handleRemoveQuantity}
        className='disabled:opacity-50'
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className='w-20 mx-3 px-5 py-1 bg-gray-100 text-center rounded'>
        {quantity}
      </span>

      <button
        type='button'
        disabled={quantity === 5}
        className='disabled:opacity-50'
        onClick={handleAddQuantity}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
