import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  return {
    async createUser(user) {
      const prismaUser = await prisma.user.create({
        data: {
          name: user.name!,
          email: user.email,
        }
      })

      return {
        id: prismaUser.id,
        name: prismaUser?.name,
        created_at: prismaUser?.created_at,
        avatar_url:prismaUser?.avatar_url,
        email: prismaUser?.email!,
        emailVerified: null
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user?.name,
        created_at: user?.created_at,
        avatar_url:user?.avatar_url,
        email: user?.email!,
        emailVerified: null
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user?.name,
        created_at: user?.created_at,
        avatar_url:user?.avatar_url,
        email: user?.email!,
        emailVerified: null
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId
          }
        },
        include: { user: true }
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user?.name,
        created_at: user?.created_at,
        avatar_url:user?.avatar_url,
        email: user?.email!,
        emailVerified: null
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },


    async updateUser(user) {
      const userUpdated = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name!,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: userUpdated.id,
        name: userUpdated?.name,
        created_at: userUpdated?.created_at,
        avatar_url:userUpdated?.avatar_url,
        email: userUpdated?.email!,
        emailVerified: null
      }
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: { user_id: userId, expires, session_token: sessionToken },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: { session_token: sessionToken },
        include: { user: true },
      })

      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          id: user.id,
          name: user?.name,
          created_at: user?.created_at,
          avatar_url:user?.avatar_url,
          email: user?.email!,
          emailVerified: null
        },
      }
    },

    async updateSession({ sessionToken, userId, expires  }) {
      const sessionUpdated = await prisma.session.update({
        where: { session_token: sessionToken },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        expires: sessionUpdated.expires,
        sessionToken: sessionUpdated.session_token,
        userId: sessionUpdated.user_id,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: { session_token: sessionToken },
      })
    },
  }
}