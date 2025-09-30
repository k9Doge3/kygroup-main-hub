import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    // Main authentication method - credentials
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Here you can add your custom authentication logic
        // For now, we'll create a basic user object
        // In production, validate against your user database
        
        // Example: Check against Yandex Disk stored user data
        try {
          // This is where you'd verify credentials against Yandex Disk
          // For demo purposes, we'll accept any valid email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(credentials.email)) {
            return null
          }

          return {
            id: credentials.email,
            email: credentials.email,
            name: credentials.email.split('@')[0],
            image: null,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id
        
        // Track user login
        try {
          await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/analytics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'login',
              userId: user.id,
              email: user.email,
              name: user.name,
              provider: account.provider
            })
          })
        } catch (error) {
          console.error('Failed to track login:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account }) {
      // Track new user signup
      if (user && account) {
        try {
          await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/analytics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'signup',
              userId: user.id,
              email: user.email,
              name: user.name,
              provider: account.provider
            })
          })
        } catch (error) {
          console.error('Failed to track signup:', error)
        }
      }
      return true
    }
  },
  pages: {
    signIn: "/auth/signin",
    // signUp: "/auth/signup", // Custom signup page
    // error: "/auth/error", // Custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }