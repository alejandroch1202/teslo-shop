'use server'

import prisma from '@/lib/db'

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
    return categories
  } catch (error) {
    return []
  }
}
