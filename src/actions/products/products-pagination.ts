'use server'

import { Gender } from '@prisma/client'
import prisma from '@/lib/db'

interface PaginationOptions {
  page?: number
  limit?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  limit = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  if (isNaN(Number(limit))) limit = 12
  if (limit < 1) limit = 12

  try {
    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: {
        productImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: {
        gender: gender
      }
    })

    const totalPages = Math.ceil(
      (await prisma.product.count({ where: { gender: gender } })) / limit
    )

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImage.map((image) => image.url)
      }))
    }
  } catch (error) {
    throw new Error('No se pudo cargar los productos')
  }
}
