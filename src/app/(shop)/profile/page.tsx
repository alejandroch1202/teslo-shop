import { auth } from '@/auth.config'
import { Title } from '@/components/ui'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) redirect('/')

  return (
    <div>
      <Title title='Perfil' />

      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3 className='text-2xl mb-10'>{session.user.role}</h3>
    </div>
  )
}
