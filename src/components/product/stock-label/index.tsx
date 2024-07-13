'use client'

import { getStockBySlug } from '@/actions/products'
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface StockLabelProps {
  slug: string
}

export const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState(0)
  const [loading, setLoading] = useState(true)

  const getStockFromDb = async (slug: string) => {
    const dbStock = await getStockBySlug(slug)
    setStock(dbStock)
    setLoading(false)
  }

  useEffect(() => {
    getStockFromDb(slug)
  }, [slug])

  return (
    <>
      {loading ? (
        <p
          className={
            'bg-gray-200 animate-pulse max-w-32 rounded font-light px-4 text-sm'
          }
        >
          Cargando...
        </p>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-md`}>
          Stock: {stock}
        </h1>
      )}
    </>
  )
}
