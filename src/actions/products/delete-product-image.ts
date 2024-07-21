'use server'

import prisma from '@/lib/db'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageId: string, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'Url invalida'
    }
  }
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

  try {
    await cloudinary.uploader.destroy(`teslo-shop/${imageName}`)

    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId
      },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    // revalidate paths
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/products/${deletedImage.product.slug}`)
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al eliminar la imagen'
    }
  }
}
