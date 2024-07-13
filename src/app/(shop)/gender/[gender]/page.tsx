export const revalidate = 60 // 60 seconds

import { notFound, redirect } from 'next/navigation'
import { ProductsGrid } from '@/components/products'
import { Pagination, Title } from '@/components/ui'
import { getPaginatedProductsWithImages } from '@/actions/products'

const labels = {
  men: 'hombres',
  women: 'mujeres',
  kid: 'niños'
}

interface CategoryPageProps {
  params: {
    gender: string
  }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps) {
  const { gender } = params

  if (gender !== 'men' && gender !== 'women' && gender !== 'kid') {
    notFound()
  }

  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender })
  if (products.length === 0) redirect(`/gender/${gender}`)

  return (
    <>
      <Title
        title={`${labels[gender]}`}
        subtitle={`Articulos para ${labels[gender]}`}
        className='mb-2'
      />

      <ProductsGrid
        products={products.filter((product) => product.gender === gender)}
      />

      <Pagination totalPages={totalPages} />
    </>
  )
}
