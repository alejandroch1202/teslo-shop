'use client'

import { createUpdateProduct, deleteProductImage } from '@/actions/products'
import { ProductImage } from '@/components/products'
import { Category, Product, ProductImage as IProductImage } from '@/interfaces'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface Props {
  product: Partial<Product> & { productImage?: IProductImage[] }
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface FormInput {
  title: string
  slug: string
  description: string
  price: number
  inStock: number
  sizes: string[]
  tags: string
  gender: string
  categoryId: string
  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid }
  } = useForm<FormInput>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '), // Convertir el array de tags en una cadena
      sizes: product.sizes || [], // Asegurarse de que sizes sea un array
      images: undefined
    }
  })

  watch('sizes')

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes)) // convertir el set a un arreglo
  }

  const onSubmit = async (data: FormInput) => {
    const { images, ...productToSave } = data

    const formData = new FormData()
    if (product.id) {
      formData.append('id', product.id)
    }
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('tags', productToSave.tags)
    formData.append('categoryId', productToSave.categoryId)
    formData.append('gender', productToSave.gender)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, data: newProduct } = await createUpdateProduct(formData)

    if (!ok) {
      alert('Error al guardar el producto')
      return
    }

    router.replace(`/admin/product/${newProduct?.slug}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'
    >
      {/* Textos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Título</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register('title', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register('slug', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Descripción</span>
          <textarea
            rows={5}
            className='p-2 border rounded-md bg-gray-200'
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Price</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Tags</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register('tags', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Gender</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...register('gender', { required: true })}
          >
            <option value=''>[Seleccione]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Categoria</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...register('categoryId', { required: true })}
          >
            <option value=''>[Seleccione]</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className='btn-primary w-full'>Guardar cambios</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Stock</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>

        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Tallas</span>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              //
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  'flex items-center cursor-pointer justify-center w-10 h-10 mr-2 border rounded-md',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size)
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col mb-2'>
            <span>Fotos</span>
            <input
              type='file'
              multiple
              className='p-2 border rounded-md bg-gray-200'
              accept='image/png, image/jpeg, image/avif'
              {...register('images')}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {product.productImage?.map((image) => (
              <div
                key={image.id}
                className='border rounded-md overflow-hidden'
              >
                <ProductImage
                  src={image.url}
                  alt={image.id}
                  width={300}
                  height={300}
                  className='rounded shadow-md'
                />

                <button
                  type='button'
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className='btn-danger w-full mt-2'
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
