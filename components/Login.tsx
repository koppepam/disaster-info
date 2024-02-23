'use client';

import { useSession, signIn, signOut } from "next-auth/react";

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
      {/* <button onClick={() => signIn()}>LINE でログイン</button> */}
      <button onClick={() => alert('データベースの無料期間が終了したため、データベースが必要な機能を停止しました。')}>LINE でログイン</button>
    </>
  );
}