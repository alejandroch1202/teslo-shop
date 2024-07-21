import { getCategories, getProductBySlug } from '@/actions/products'
import { Title } from '@/components/ui'
import { redirect } from 'next/navigation'
import { ProductForm } from './product-form'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  // todo: new
  if (!product && slug !== 'new') redirect('/admin/products')

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'

  return (
    <>
      <Title title={title} />

      <ProductForm
        product={product ?? {}}
        categories={categories}
      />
    </>
  )
}
