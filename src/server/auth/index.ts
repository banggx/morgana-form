import { AuthOptions, DefaultSession, getServerSession as nextAuthGetServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GitlabProvider from 'next-auth/providers/gitlab'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { Adapter } from 'next-auth/adapters'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db as any) as Adapter,
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
      }
      return session
    }
  },
  
  providers: [
    GithubProvider({
      clientId: `${process.env.GIT_HUB_CLIENT_ID as string}`,
      clientSecret: `${process.env.GIT_HUB_CLIENT_SECRET as string}`,
      httpOptions: {
        timeout: 10000,
      }
    }),
    GitlabProvider({
      clientId: `${process.env.GITLAB_CLIENT_ID as string}`,
      clientSecret: `${process.env.GITLAB_CLIENT_SECRET as string}`,
    }),
  ],
  secret: `${process.env.NEXT_AUTH_SECRET as string}`,
}

export function getServerSession() {
  return nextAuthGetServerSession(authOptions)
}