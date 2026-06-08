import NextAuthProvider from "./api/lib/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import FlowbiteInit from '@/components/FlowbiteInit'
import './globals.css'

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
    <html lang="ja">
      <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"></link>
      </head>
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <FlowbiteInit />
          {children}
        </NextAuthProvider>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
