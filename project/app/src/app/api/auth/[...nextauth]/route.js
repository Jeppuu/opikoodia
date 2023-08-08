import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import db from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'JaneDoe123' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials

        await db.connect()

        const user = await User.findOne({ username })

        if (!user) {
          throw new Error('Invalid username or password')
        }

        const comparePass = await bcrypt.compare(password, user.password)

        //if passwords don't match
        if (!comparePass) {
          throw new Error('Invalid username or password')
        } else {
          const { password, ...currentUser } = user._doc

          const accessToken = signJwtToken(currentUser, { expiresIn: '7d' })

          return {
            ...currentUser,
            accessToken
          }
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token._id = user._id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id
        session.user.accessToken = token.accessToken
      }
      return session
    }
  }


})


export { handler as GET, handler as POST }
