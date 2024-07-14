import type { Size } from '@/interfaces'

interface SizeSelectorProps {
  availableSizes: Size[]
  selectedSize?: Size
  onSizeSelected: (size: Size) => void
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeSelected
}: SizeSelectorProps) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            onClick={() => onSizeSelected(size)}
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
