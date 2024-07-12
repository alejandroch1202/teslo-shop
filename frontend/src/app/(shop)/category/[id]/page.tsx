import { notFound } from 'next/navigation'
import { ProductsGrid } from '@/components/products'
import { Title } from '@/components/ui'
import { initialData } from '@/data/seed'
import { Category } from '@/interfaces'

const products = initialData.products

const labels = {
  men: 'hombres',
  women: 'mujeres',
  kid: 'niños'
}

interface CategoryPageProps {
  params: {
    id: Category
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params

  if (id !== 'men' && id !== 'women' && id !== 'kid') {
    notFound()
  }

  return (
    <>
      <Title
        title={`${labels[id]}`}
        subtitle={`Articulos para ${labels[id]}`}
        className='mb-2'
      />

      <ProductsGrid
        products={products.filter((product) => product.gender === id)}
      />
    </>
  )
}
