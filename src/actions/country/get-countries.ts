'use server'

import prisma from '@/lib/db'

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return countries
  } catch (error) {
    console.log(error)
    return []
  }
}
