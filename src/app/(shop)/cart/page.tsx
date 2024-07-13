import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Title } from '@/components/ui'
import { initialData } from '@/data/seed'
import Image from 'next/image'
import { QuantitySelector } from '@/components/product'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function CartPage() {
  // redirect('/empty')

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl '>Agregar más articulos</span>

            <Link
              href={'/'}
              className='underline mb-5'
            >
              Continuar comprando
            </Link>

            {/* items */}
            {productsInCart.map((product) => (
              <div
                key={product.slug}
                className='flex mb-5'
              >
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
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
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={3} />

                  <button
                    className='underline mt-3'
                    type='button'
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* order summary */}
          <div className='bg-white rounded-xl shadow-lg p-7 h-fit'>
            <h2 className='text-2xl font-bold mb-5'>Resumen de la orden</h2>

            <div className='flex justify-between mb-5'>
              <p>Número de productos</p>
              <p>3</p>
            </div>

            <div className='flex justify-between mb-5'>
              <p>Subtotal</p>
              <p>$100.00</p>
            </div>

            <div className='flex justify-between mb-5'>
              <p>Impuestos 16%</p>
              <p>$12.00</p>
            </div>

            <div className='flex justify-between mb-5 font-bold'>
              <p>Total</p>
              <p>$999.00</p>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <Link
                className='flex btn-primary justify-center'
                href={'/checkout/address'}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
