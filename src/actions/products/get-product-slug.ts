'use server'

import prisma from '@/lib/db'

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: {
          select: {
            url: true,
            id: true
          }
        }
      },
      where: {
        slug: slug
      }
    })

    if (!product) return null

    return {
      ...product,
      images: product.productImage.map((image) => image.url)
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener el producto')
  }
}
