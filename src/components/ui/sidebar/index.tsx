'use client'

import Link from 'next/link'
import clsx from 'clsx'
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline
} from 'react-icons/io5'
import { logout } from '@/actions/auth'
import { useSideMenuStore } from '@/stores'
import { useSession } from 'next-auth/react'

export const SideBar = () => {
  const isSideMenuOpen = useSideMenuStore((store) => store.isSideMenuOpen)
  const closeSideMenu = useSideMenuStore((store) => store.closeSideMenu)
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div>
      {/* overlay */}
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'></div>
      )}

      {/* blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className='fade-in fixed top-0 left-0 z-10 w-screen h-screen backdrop-filter backdrop-blur-sm'
        ></div>
      )}

      {/* sidemenu */}
      {/* todo: add transition */}
      <nav
        className={clsx(
          'fixed p-5 top-0 right-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-0': isSideMenuOpen,
            'translate-x-full': !isSideMenuOpen
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeSideMenu}
        />

        {/* search */}
        <div className='relative mt-14'>
          <IoSearchOutline
            size={20}
            className='absolute top-2 left-2'
          />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 px-10 py-1 border border-b-2 text-xl border-gray-200 rounded focus:outline-none focus:border-blue-500'
          />
        </div>

        {/* menu */}

        {isAuthenticated && (
          <>
            <Link
              href='/profile'
              onClick={closeSideMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPersonOutline size={30} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link>
            <Link
              href='/orders'
              onClick={closeSideMenu}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={async () => {
              await logout()
              localStorage.removeItem('shopping-cart')
              localStorage.removeItem('address-info')
              window.location.replace('/')
            }}
            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
          >
            <IoLogOutOutline size={30} />

            <span className='ml-3 text-xl'>Cerrar sesion</span>
          </button>
        ) : (
          <Link
            onClick={closeSideMenu}
            href='/auth/login'
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
          >
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Iniciar sesion</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* divider */}
            <div className='w-full h-px bg-gray-200 my-10 rounded'></div>

            <Link
              onClick={closeSideMenu}
              href='/admin/products'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoShirtOutline size={30} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>
            <Link
              onClick={closeSideMenu}
              href='/admin/orders'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
            <Link
              onClick={closeSideMenu}
              href='/admin/users'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPeopleOutline size={30} />
              <span className='ml-3 text-xl'>Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}
