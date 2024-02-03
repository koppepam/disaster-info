import NextAuthProvider from "./api/lib/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'flowbite';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '災害情報お知らせアプリ',
  description: '気象庁のAPIを利用して、災害情報をお知らせするアプリです。',
  openGraph: {
    title: '災害情報お知らせアプリ',
    description: '気象庁のAPIを利用して、災害情報をお知らせするアプリです。',
    siteName: '災害情報お知らせアプリ',
    type: 'website'
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"></link>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextAuthProvider session={session}>
          {children}
        </NextAuthProvider>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
      </body>
    </html>
  );
}
