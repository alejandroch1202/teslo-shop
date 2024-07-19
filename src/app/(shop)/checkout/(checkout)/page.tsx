import Link from 'next/link'
import { Title } from '@/components/ui'
import { ProductsInCart } from './products-in-cart'
import { PlaceOrder } from './place-order'

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
            <ProductsInCart />
          </div>

          {/* order summary */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}
