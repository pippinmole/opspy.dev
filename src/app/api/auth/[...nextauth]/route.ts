import NextAuth, {AuthOptions} from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/db";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
    })
  ],
  callbacks: {
    async session({token, session, user}) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.isOnboarded = token.isOnboarded
      }

      console.log("Session: ", session)
      console.log("Token: ", token)

      return session
    },
    async jwt({token, user}) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
          token.isOnboarded = false
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        isOnboarded: dbUser.isOnboarded,
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }