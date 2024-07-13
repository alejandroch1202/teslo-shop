'use client'

import { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface QuantitySelectorProps {
  quantity: number
}

export const QuantitySelector = ({ quantity }: QuantitySelectorProps) => {
  const [count, setCount] = useState(2)

  const handleAddQuantity = () => {
    if (count > 4) return
    setCount(count + 1)
  }

  const handleRemoveQuantity = () => {
    if (count === 1) return
    setCount(count - 1)
  }

  return (
    <div className='flex items-center'>
      <button
        type='button'
        disabled={count === 1}
        onClick={handleRemoveQuantity}
        className='disabled:opacity-50'
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className='w-20 mx-3 px-5 py-1 bg-gray-100 text-center rounded'>
        {count}
      </span>

      <button
        type='button'
        disabled={count === 5}
        className='disabled:opacity-50'
        onClick={handleAddQuantity}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
