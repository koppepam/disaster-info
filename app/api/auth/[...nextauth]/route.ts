import NextAuth, { AuthOptions } from 'next-auth';
import LineProvider from 'next-auth/providers/line';
import { DefaultSession } from 'next-auth';
// import LINE from 'next-auth/providers/line';
// import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string | null;
    } & DefaultSession["user"];
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    id?: string | null | undefined;
  }
}

const options: AuthOptions = {
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
  },
  session: {
    strategy: 'jwt',
  }
};

const handler = NextAuth(options);

export { handler as GET, handler as POST, options as authOptions };