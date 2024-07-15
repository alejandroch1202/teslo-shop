// [1,2,3,4,...,50]
export const generatePaginationNumbers = (
  currenPage: number,
  totalPages: number
) => {
  // if the number of pages is less than 5
  // show all pages without '...'
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // if the current page is within the first 3 pages
  // show the first 3 pages, '...', and the last 2
  if (currenPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // if the current page is within the last 3 pages
  // show the first 2 pages, '...', and the last 3
  if (currenPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // if the current page is in the middle
  // show the first page, '...', the current page, '...', and the last page
  return [
    1,
    '...',
    currenPage - 1,
    currenPage,
    currenPage + 1,
    '...',
    totalPages
  ]
}
