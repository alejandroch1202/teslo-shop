export const revalidate = 60 // 60 seconds

import { redirect } from 'next/navigation'
import { getPaginatedProductsWithImages } from '@/actions/products'
import { ProductsGrid } from '@/components/products'
import { Pagination, Title } from '@/components/ui'

interface HomePageProps {
  searchParams: {
    page?: string
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page })
  if (products.length === 0) redirect('/')

  return (
    <>
      <Title
        title='Todos'
        subtitle='Articulos para todos'
        className='mb-2'
      />

      <ProductsGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
