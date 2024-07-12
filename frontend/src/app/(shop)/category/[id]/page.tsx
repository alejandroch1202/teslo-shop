import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params

  if (id !== 'men' && id !== 'women') {
    notFound()
  }

  return <div>Category Page {id}</div>
}
