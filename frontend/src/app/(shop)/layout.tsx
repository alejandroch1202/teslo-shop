import { TopMenu } from '@/components/ui'

export default function ShopLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='min-h-screen'>
      <TopMenu />

      <div className='px-0 sm:px-5'>{children}</div>
    </main>
  )
}
