'use server'

import { signIn } from '@/auth.config'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2)
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })
    return 'success'
  } catch (error) {
    console.log({ error })
    // if ((error as any).type === 'CredentialsSignin') {
    //   return 'CredentialsSignin'
    // }
    // return 'unknown error'

    return 'CredentialsSignin'
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password })
    return {
      ok: true
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo iniciar sesión'
    }
  }
}
