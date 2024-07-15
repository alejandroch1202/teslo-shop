import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Title } from '@/components/ui'
import { ProductsInCart } from './products-in-cart'
import { OrderSummary } from './order-summary'

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
            <ProductsInCart />
          </div>

          {/* order summary */}
          <div className='bg-white rounded-xl shadow-lg p-7 h-fit'>
            <h2 className='text-2xl font-bold mb-5'>Resumen de la orden</h2>

            <OrderSummary />

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
