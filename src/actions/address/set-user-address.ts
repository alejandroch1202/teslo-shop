'use server'

import { Address } from '@/interfaces'
import prisma from '@/lib/db'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const addressSaved = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: addressSaved
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      error: 'No se pudo guardar la direccion del usuario'
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findFirst({
      where: {
        userId
      }
    })

    const addressToSave = {
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      name: address.name,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      userId
    }

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    } else {
      await prisma.userAddress.update({
        where: { userId },
        data: addressToSave
      })
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      error: 'No se pudo crear la direccion del usuario'
    }
  }
}
