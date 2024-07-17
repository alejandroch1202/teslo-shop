import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { z } from 'zod'
import prisma from './lib/db'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup'
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnCheckout = nextUrl.pathname.startsWith('/checkout')
      if (isOnCheckout) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/checkout', nextUrl))
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },

    async session({ session, token }) {
      session.user = token.user as any
      return session
    }
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        })

        if (!user) return null

        if (!bcryptjs.compareSync(password, user.password)) return null

        const { password: _, ...userWithoutPassword } = user

        return userWithoutPassword
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
