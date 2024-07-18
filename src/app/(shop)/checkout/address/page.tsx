import { Title } from '@/components/ui'
import { AddressForm } from './address-form'
import { getCountries } from '@/actions/country'
import { auth } from '@/auth.config'
import { getUserAddress } from '@/actions/address'

export default async function AddressPage() {
  const countries = await getCountries()
  const session = await auth()
  if (!session) return <p className='text-4xl'>No autorizado</p>

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title
          title='Dirección'
          subtitle='Dirección de entrega'
        />

        <AddressForm
          countries={countries}
          userStoredAddress={userAddress}
        />
      </div>
    </div>
  )
}
