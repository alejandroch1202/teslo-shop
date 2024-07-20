import { Title } from '@/components/ui'
import Image from 'next/image'
import { getOrderById } from '@/actions/orders/get-order-by-id'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/utils'
import { PayPalButton } from '@/components/paypal'
import { OrderStatus } from '@/components/order'

interface OrderPageProps {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = params
  // call the server action
  const { ok, data: order } = await getOrderById(id)

  if (!ok) notFound()

  const address = order!.orderAddress

  // verify user or redirect('/')

  return (
    <div className='flex justify-center items-center mb-72 px019 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* cart */}
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={order!.isPaid} />

            {/* items */}
            {order!.orderItem.map((product) => (
              <div
                key={product.product.slug}
                className='flex mb-5'
              >
                <Image
                  src={`/products/${product.product.productImage[0].url}`}
                  alt={product.product.title}
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
                  <p>{product.product.title}</p>
                  <p>{product.price} x3</p>
                  <p className='font-bold'>Subtotal {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* order summary */}
          <div className='bg-white rounded-xl shadow-lg p-7'>
            <h2 className='text-2xl font-bold mb-5'>Dirección de entrega</h2>
            <p className='text-xl'>
              {address?.name} {address?.lastName}
            </p>
            <p>{address?.address}</p>
            <p>{address?.address2}</p>
            <p>{address?.postalCode}</p>
            <p>
              {address?.city}, {address?.countryId}
            </p>
            <p>{address?.phone}</p>
            {/* divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 my-5'></div>
            <h2 className='text-2xl font-bold mb-5'>Resumen de la orden</h2>
            <div className='flex justify-between mb-5'>
              <p>Número de productos</p>
              <p>{order!.itemsInOrder}</p>
            </div>
            <div className='flex justify-between mb-5'>
              <p>Subtotal</p>
              <p>{formatCurrency(order!.subTotal)}</p>
            </div>
            <div className='flex justify-between mb-5'>
              <p>Impuestos 16%</p>
              <p>{formatCurrency(order!.tax)}</p>
            </div>
            <div className='flex justify-between mb-5 font-bold'>
              <p>Total</p>
              <p>{formatCurrency(order!.total)}</p>
            </div>

            <div className='mt-5 mb-2 w-full'>
              {order?.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PayPalButton
                  orderId={order!.id}
                  amount={order!.total}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
