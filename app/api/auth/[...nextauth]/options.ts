import { AuthOptions } from 'next-auth';
import LineProvider from 'next-auth/providers/line';
import { PrismaClient } from '@prisma/client';

export const authOptions: AuthOptions = {
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user && typeof token.uid === 'string') session.user.id = token.uid;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) token.uid = user.id;
      return token;
    },
    signIn: async ({ user }) => {
      const prisma = new PrismaClient({ log: [ 'query' ] });
      const data = {
        userId: user.id,
        username: user.name || '名無し',
      }
      await prisma.user.upsert({
        where: { userId: user.id },
        create: data,
        update: data
      });
      return true;
    }
  },
  session: {
    strategy: 'jwt',
  }
};