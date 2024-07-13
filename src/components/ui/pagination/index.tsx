'use client'

import { generatePaginationNumbers } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface PaginationProps {
  totalPages: number
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageString = searchParams.get('page') ?? 1
  const currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString)
  if (currentPage < 1 || isNaN(Number(pageString))) redirect(pathname)
  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber === '...') {
      return `${pageNumber}?${params.toString()}`
    } else if (Number(pageNumber) <= 0) {
      return `${pathname}`
    } else if (Number(pageNumber) > totalPages) {
      return `${pathname}?${params.toString()}`
    } else {
      params.set('page', pageNumber.toString())
      return `${pathname}?${params.toString()}`
    }
  }

  return (
    <div className='flex justify-center text-center mt-10 mb-32'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
              aria-disabled='true'
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li
              key={`${page}-${index}`}
              className='page-item'
            >
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800  focus:shadow-none',
                  {
                    'bg-blue-500 shadow-md text-white hover:bg-blue-600 hover:text-white':
                      page === currentPage
                  },
                  {
                    'hover:bg-gray-200': page !== currentPage
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
