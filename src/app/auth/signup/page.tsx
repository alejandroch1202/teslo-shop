import { titleFont } from '@/config/fonts'
import { SignupForm } from './signup-form'

export default function SignupPage() {
  return (
    <div className='flex flex-col min-h-screen pt-32 sm:pt-52'>
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

      <SignupForm />
    </div>
  )
}
