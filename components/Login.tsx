'use client';

import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {/* {session.user?.name} でログイン中<br /> */}
        <button onClick={() => signOut()}>ログアウト</button>
      </>
    );
  }
  return (
    <>
      {/* LINE でログインする<br /> */}
      <button onClick={() => signIn()}>LINE でログイン</button>
    </>
  );
}