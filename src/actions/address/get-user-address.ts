'use server'

import prisma from '@/lib/db'

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findFirst({ where: { userId } })
    if (!address) return null
    const { countryId, address2, ...rest } = address
    return {
      ...rest,
      address2: address2 ?? '',
      country: countryId
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
