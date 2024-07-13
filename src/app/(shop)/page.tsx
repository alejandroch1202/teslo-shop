import { ProductsGrid } from '@/components/products'
import { Title } from '@/components/ui'
import { initialData } from '@/seed'

const products = initialData.products

export default function HomePage() {
  return (
    <>
      <Title
        title='Todos'
        subtitle='Articulos para todos'
        className='mb-2'
      />

      <ProductsGrid products={products} />
    </>
  )
}
