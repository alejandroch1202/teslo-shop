import Link from 'next/link'
import { Title } from '@/components/ui'
import { initialData } from '@/seed'
import Image from 'next/image'
import { QuantitySelector } from '@/components/product'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px019 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl '>Editar articulos del carrito</span>

            <Link
              href={'/cart'}
              className='underline mb-5'
            >
              Editar carrito
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
                  <p>{product.price} x3</p>
                  <p className='font-bold'>Subtotal {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* order summary */}
          <div className='bg-white rounded-xl shadow-lg p-7'>
            <h2 className='text-2xl font-bold mb-5'>Dirección de entrega</h2>
            <p className='text-xl'>Alejandro Chavez</p>
            <p>Av. Las Fuentes</p>
            <p>Centro</p>
            <p>Hospital Fernando Herrera</p>
            <p>San Felipe</p>
            <p>3231</p>
            <p>04243758698</p>
            {/* divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 my-10'></div>
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

            {/* diclaimer */}
            <p className='mb-5 text-gray-600'>
              <span className='text-xs'>
                Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{' '}
                <a
                  href='#'
                  className='underline'
                >
                  Términos y condiciones
                </a>{' '}
                y la{' '}
                <a
                  href='#'
                  className='underline'
                >
                  Política de privacidad
                </a>
                .
              </span>
            </p>

            <div className='mt-5 mb-2 w-full'>
              <Link
                className='flex btn-primary justify-center'
                href={'/orders/123'}
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
