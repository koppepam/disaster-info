'use client';

import Link from "next/link";
import LineBot from "./LineBot";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  if (session) {
    return (
      <div>
        <div className="bg-green-900 w-full h-12 items-center flex justify-between">
          <h1 className="text-white text-4xl font-bold ml-4">災害情報</h1>
          <ul className="text-white flex text-right divide-x divide-white m-5">
            <li className="px-4">全国</li>
            <li className="px-4">選択地域</li>
            <li className="px-4">気象警報</li>
            <li className="px-4">LINE ログイン</li>
          </ul>
        </div>
        <div className="flex items-center">
          <a href="/register-area" className="my-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            災害情報を受け取る地域を登録する
          </a>
          <LineBot />
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="bg-green-900 w-full h-12 items-center flex justify-between">
        <h1 className="text-white text-4xl font-bold ml-4">災害情報</h1>
        <ul className="text-white flex text-right divide-x divide-white m-5">
          <li className="px-4">全国</li>
          <li className="px-4">選択地域</li>
          <li className="px-4">気象警報</li>
          <li className="px-4">LINE ログイン</li>
        </ul>
      </div>
      <div className="flex items-center">
        {/* <Link href="/register-area" className="my-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          災害情報を受け取る地域を登録する
        </Link> */}
        <LineBot/>
      </div>
    </div>
  );
}