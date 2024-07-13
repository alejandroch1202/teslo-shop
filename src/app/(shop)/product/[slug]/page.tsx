import { notFound } from 'next/navigation'
import { initialData } from '@/data/seed'
import { titleFont } from '@/config/fonts'
import {
  QuantitySelector,
  SizeSelector,
  SlideShow,
  SlideShowMobile
} from '@/components/product'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const product = initialData.products.find((product) => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* mobile slideshow */}
      <div className='bg-gray-200 col-span-1 md:col-span-2 block md:hidden'>
        <SlideShowMobile
          title={product.title}
          images={product.images}
        />
      </div>

      {/* desktop slideshow */}
      <div className='bg-gray-200 col-span-1 md:col-span-2 hidden md:block rounded-lg'>
        <SlideShow
          title={product.title}
          images={product.images}
        />
      </div>

      {/* product details */}
      <div className='col-span-1 px-5'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>{product.price}</p>

        {/* size selector */}
        <SizeSelector
          selectedSize={product.sizes[1]}
          availableSizes={product.sizes}
        />

        {/* quantity selector */}
        <QuantitySelector quantity={2} />

        {/* add to cart button */}
        <button className='btn-primary my-5'>Agregar al carrito</button>

        {/* description */}
        <h3 className='font-bold text-sm '>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
