import { ProductsGrid } from '@/components/products'
import { Title } from '@/components/ui'
import { initialData } from '@/data/seed'

const products = initialData.products

export default function HomePage() {
  return (
    <>
      <Title
        title='Tienda'
        subtitle='Todos los productos'
        className='mb-2'
      />

      <ProductsGrid products={products} />
    </>
  )
}
