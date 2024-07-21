export const revalidate = 0

// https://tailwindcomponents.com/component/hoverable-table

import { Title } from '@/components/ui'
import { redirect } from 'next/navigation'
import { UsersTable } from './users-table'
import { getPaginatedUsers } from '@/actions/users'

export default async function UsersPage() {
  const { ok, data: users = [] } = await getPaginatedUsers()
  if (!ok) redirect('/auth/login')

  return (
    <>
      <Title title='Usuarios' />

      <div className='mb-10'>
        <UsersTable users={users} />
      </div>
    </>
  )
}
