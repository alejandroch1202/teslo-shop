import { initialData } from '.'
import { countries } from './seed-countries'
import prisma from '../lib/db'

async function main() {
  // remove prev data
  await prisma.userAddress.deleteMany()
  await prisma.user.deleteMany()
  await prisma.country.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // add categories
  const { categories, products, users } = initialData

  await prisma.user.createMany({
    data: users
  })

  const categoriesData = categories.map((category) => ({ name: category }))
  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDb = await prisma.category.findMany()
  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)

  // add products
  products.forEach(async (product) => {
    const { type, images, ...rest } = product
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()]
      }
    })

    // add images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })

  // add countries
  // countries.forEach(async (country) => {
  //   await prisma.country.create({
  //     data: country
  //   })
  // })

  await prisma.country.createMany({
    data: countries
  })

  console.log('Seed successfully excecuted')
}

;(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})()
