import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';
import { authOptions } from './options';

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



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };