import type { Size } from '@/interfaces'

interface SizeSelectorProps {
  selectedSize: Size
  availableSizes: Size[]
}

export const SizeSelector = ({
  selectedSize,
  availableSizes
}: SizeSelectorProps) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            className={`py-2 px-3 mx-2 rounded ${
              selectedSize === size ? 'border-2 border-blue-500' : 'border'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
