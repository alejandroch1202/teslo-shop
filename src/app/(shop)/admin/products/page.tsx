export const revalidate = 0

// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link'

import { Pagination, Title } from '@/components/ui'
import { redirect } from 'next/navigation'
import { getPaginatedProductsWithImages } from '@/actions/products'
import { formatCurrency } from '@/utils'
import { ProductImage } from '@/components/products'

interface ProductsPageProps {
  searchParams: {
    page?: string
  }
}

export default async function ProductsPage({
  searchParams
}: ProductsPageProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page })
  if (products.length === 0) redirect('/')

  return (
    <>
      <Title title='Productos' />

      <div className='flex justify-end mb-5'>
        <Link
          className='btn-primary'
          href={'/admin/product/new'}
        >
          Nuevo producto
        </Link>
      </div>

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Imagen
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Titulo
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Precio
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Genero
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Stock
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Tallas
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.productImage[0]?.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </Link>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <Link
                    className='hover:underline'
                    href={`/admin/product/${product.slug}`}
                  >
                    {product.title}
                  </Link>
                </td>
                <td className='text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
                  {formatCurrency(product.price)}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {product.gender}
                </td>
                <td className='text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
                  {product.inStock}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
