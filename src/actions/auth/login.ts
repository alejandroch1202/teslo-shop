'use server'

import { signIn } from '@/auth.config'

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2)
    await signIn('credentials', Object.fromEntries(formData))
  } catch (error) {
    return 'CredentialsSignin'
  }
}
