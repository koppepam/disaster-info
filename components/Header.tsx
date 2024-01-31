'use client';

import Link from "next/link";
import LineBot from "./LineBot";
import Login from "./Login";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  // const userId = session?.user?.id;
  if (session) {
    return (
      <>
        <div className="bg-green-900 w-full h-12 items-center flex justify-between">
          <h1 className="text-white text-4xl font-bold ml-4">災害情報</h1>
          <ul className="text-white flex text-right divide-x divide-white m-5">
            <li className="px-4"><Login/></li>
          </ul>
        </div>
        <div className="xl:flex items-center xl:justify-center xl:mt-0 mt-10 xl:h-20 h-40 xl:ml-auto ml-10 xl:mr-auto">
          <a href="/register-area" className="md:my-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            災害情報を受け取る地域を登録する
          </a>
          <LineBot />
        </div>
      </>
    )
  }
  return (
    <>
      <div className="bg-green-900 w-full h-12 items-center flex justify-between">
        <h1 className="text-white text-4xl font-bold ml-4">災害情報</h1>
        <ul className="text-white flex text-right divide-x divide-white m-5">
          <li className="px-4"><Login/></li>
        </ul>
      </div>
      <div className="items-center ml-auto mr-auto w-5/12">
        <LineBot/>
      </div>
    </>
  );
}