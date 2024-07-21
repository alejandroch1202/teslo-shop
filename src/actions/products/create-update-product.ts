'use server'

import { z } from 'zod'
import { Gender, Product, Size } from '@prisma/client'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export const createUpdateProduct = async (formData: FormData) => {
  const dataForm = Object.fromEntries(formData)
  const { data: product, success, error } = productSchema.safeParse(dataForm)

  if (success === false) {
    return {
      ok: false,
      errors: error.errors
    }
  }

  product.slug.toLowerCase().replace(/ /g, '_').trim()

  const { id, ...rest } = product

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product

      const tagsArray = rest.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })

        // proceso de carga y guardado de imagenes
        // recorrer las imagenes y gardarlas
        if (formData.getAll('images')) {
          const images = formData.getAll('images')
          const uploadedImages = await uploadImages(images as File[])
          if (!uploadImages) throw new Error('Error al cargar las imágenes')

          await prisma.productImage.createMany({
            data: uploadedImages!.map((image) => ({
              url: image!,
              productId: product.id
            }))
          })
        }

        return { product }
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })

        // proceso de carga y guardado de imagenes
        // recorrer las imagenes y gardarlas
        if (formData.getAll('images')) {
          const images = formData.getAll('images')
          const uploadedImages = await uploadImages(images as File[])
          if (!uploadImages) throw new Error('Error al cargar las imágenes')

          await prisma.productImage.createMany({
            data: uploadedImages!.map((image) => ({
              url: image!,
              productId: product.id
            }))
          })
        }

        return { product }
      }
    })

    // revalidate paths
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)

    return {
      ok: true,
      data: prismaTx.product
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear/actualizar producto'
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')
        const { secure_url } = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64Image}`,
          {
            folder: 'teslo-shop'
          }
        )
        return secure_url
      } catch (error) {
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)
    return uploadedImages
  } catch (error) {
    console.log(error)
    return null
  }
}
