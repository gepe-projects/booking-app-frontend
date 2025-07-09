import { LoginResponse } from '@/types'
import { AxiosError, AxiosResponse } from 'axios'
import NextAuth, { CredentialsSignin, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import { axiosServer } from '../axios'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new InvalidLoginError()
        }
        const email = credentials.email as string;
        const password = credentials.password as string;
        try {
          const res: AxiosResponse<LoginResponse> = await axiosServer.post('/auth/login', {
            email,
            password
          })
          const { user, access_token, refresh_token } = res.data.data
          return { ...user, access_token, refresh_token }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.data.errors == 'unauthorized') {
              throw new InvalidLoginError()
            }
          }
          console.log("error not from axios", { error });
          throw new InvalidLoginError()
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.email = user.email;
        token.full_name = user.full_name;
        token.phone_number = user.phone_number;
        token.role = user.role;
        token.avatar_url = user.avatar_url;
      }
      return token;
    },
    async session({ session, token }) {
      // Inisialisasi session.user sebagai objek kosong bertipe User
      session.user = {
        id: token.id as string,
        email: token.email as string,
        full_name: token.full_name as string,
        phone_number: token.phone_number as string,
        role: token.role as string,
        avatar_url: token.avatar_url as string,
        access_token: token.access_token as string,
        refresh_token: token.refresh_token as string,
      } as AdapterUser & User;
      return session;
    }
  },

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/auth/login'
  }
})
