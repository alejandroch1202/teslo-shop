'use server'

import { auth } from '@/auth.config'
import { Address, Size } from '@/interfaces'
import prisma from '@/lib/db'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth()
  const userId = session?.user.id

  // verify user session
  if (!userId)
    return {
      ok: false,
      message: 'No se pudo obtener el id del usuario'
    }

  // get the products info
  // note: remember that we can place two+ products with the same id

  const products = await prisma.product.findMany({
    where: { id: { in: productsIds.map((p) => p.productId) } }
  })

  // calculate the amount to pay
  const itemsInOrder = productsIds.reduce(
    (total, product) => total + product.quantity,
    0
  )

  // tax, subtotal and total
  const { tax, subTotal, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find((p) => p.id === item.productId)

      if (!product)
        throw new Error(`Product with id '${item.productId}' not found`)

      const subTotal = product.price * productQuantity
      totals.subTotal += subTotal
      totals.tax += subTotal * 0.16
      totals.total += subTotal * 1.16

      return totals
    },
    { tax: 0, subTotal: 0, total: 0 }
  )

  // create the database transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // update the products stock
      const updatedProductsPromises = products.map((product) => {
        // accumulate values
        const productQuantity = productsIds
          .filter((p) => p.productId === product.id)
          .reduce((total, item) => item.quantity + total, 0)

        if (productQuantity === 0) throw new Error('Invalid product quantity')

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity <-- dont do
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      // check negative values in stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(
            `Producto '${product.title}', no tiene suficiente stock`
          )
      })

      // create the order
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          tax,
          subTotal,
          total,

          orderItem: {
            createMany: {
              data: productsIds.map((item) => ({
                quantity: item.quantity,
                size: item.size,
                productId: item.productId,
                price: products.find((p) => p.id === item.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      // to do
      // validate if some price is zero, throw an error

      // create the order address
      const { country, ...rest } = address

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...rest,
          orderId: order.id,
          countryId: country
        }
      })

      return {
        updatedProducts,
        order,
        orderAddress
      }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}
