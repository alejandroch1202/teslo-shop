export const revalidate = 604800 // 7 days

import { notFound } from 'next/navigation'
import { titleFont } from '@/config/fonts'
import {
  QuantitySelector,
  SizeSelector,
  SlideShow,
  SlideShowMobile,
  StockLabel
} from '@/components/product'
import { getProductBySlug } from '@/actions/products'
import { Metadata, ResolvingMetadata } from 'next'
import { AddToCart } from './add-to-cart'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* mobile slideshow */}
      <div className='bg-gray-200 col-span-1 md:col-span-2 block md:hidden fade-in'>
        <SlideShowMobile
          title={product.title}
          images={product.images}
        />
      </div>

      {/* desktop slideshow */}
      <div className='bg-gray-200 col-span-1 md:col-span-2 hidden md:block rounded-lg fade-in'>
        <SlideShow
          title={product.title}
          images={product.images}
        />
      </div>

      {/* product details */}
      <div className='col-span-1 px-5'>
        {/* ---- */}
        {/* Adding highly dynamic data in a client component and fetching it using server actions */}
        {/* ---- */}
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>{product.price}</p>

        <AddToCart product={product} />

        {/* description */}
        <h3 className='font-bold text-sm '>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
