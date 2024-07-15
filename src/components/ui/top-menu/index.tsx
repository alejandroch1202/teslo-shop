'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoCartOutline, IoSearch } from 'react-icons/io5'
import { titleFont } from '@/config/fonts'
import { useCartStore, useSideMenuStore } from '@/stores'

export const TopMenu = () => {
  const [loaded, setLoaded] = useState(false)
  const openSideMenu = useSideMenuStore((state) => state.openSideMenu)
  const totalItemsInCart = useCartStore((state) => state.getTotalItems()) // excecuting

  useEffect(() => {
    setLoaded(true) // component mounted. now we can render the data and avoid hydratation error
  }, [])

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/men'}
        >
          Hombres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/women'}
        >
          Mujeres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href={'/gender/kid'}
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center'>
        <Link
          href='/search'
          className='mx-2'
        >
          <IoSearch className='w-5 h-5' />
        </Link>

        <Link
          href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
          className='mx-2'
        >
          <div className='relative'>
            {loaded && totalItemsInCart > 0 && (
              <span className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Menu
        </button>
      </div>
    </nav>
  )
}
