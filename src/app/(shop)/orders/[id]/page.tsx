import Link from 'next/link'
import { Title } from '@/components/ui'
import { initialData } from '@/data/seed'
import Image from 'next/image'
import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = params

  // verify user or redirect('/')

  return (
    <div className='flex justify-center items-center mb-72 px019 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden ${id}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}
          <div className='flex flex-col mt-5'>
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': false,
                  'bg-green-700': true
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className='mx-2'>Pendiente de pago</span> */}
              <span className='mx-2'>Orden pagada</span>
            </div>

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

            <div className='mt-5 mb-2 w-full'>
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className='mx-2'>Orden pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
