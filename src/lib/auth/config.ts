import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import PrismaAdapter from "./prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";

export function buildNextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions  {
 return {
  adapter: PrismaAdapter(req, res),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user
      }
    },
  }
 }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}