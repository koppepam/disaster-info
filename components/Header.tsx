'use client';

import LineBot from "./LineBot";
import Login from "./Login";
import { useSession } from "next-auth/react";


export default function Header() {
  const { data: session } = useSession();

  function deleteRequest() {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/delete`, {
      method: 'DELETE',
    }).then((response) => {
      // reponse が 200 なら / にリダイレクト
      if (response.status === 200) {
        alert('登録した地域をすべて削除しました。');
        location.href = '/';
      } else if (response.status === 401) {
        alert('ログインが必要です。');
        location.href = '/';
      }
    });
  }

  if (session) {
    return (
      <>
        <div className="bg-green-900 w-full h-12 items-center flex justify-between">
          <h1 className="text-white text-4xl font-bold ml-4">災害情報</h1>
          <ul className="text-white flex text-right divide-x divide-white m-5">
            <li className="px-4"><Login/></li>
          </ul>
        </div>
        <div className="xl:flex items-center xl:justify-center xl:mt-0 mt-10 xl:h-20 h-50 xl:ml-auto ml-10 xl:mr-auto">
          <div>
            <a onClick={deleteRequest} className="inline-block w-auto mb-2 xl:mr-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              登録した地域を全て削除する
            </a><br className="xl:hidden"/>
            <a href="/register-area" className="inline-block w-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              災害情報を受け取る地域を登録する
            </a>
          </div>
          <LineBot />
        </div>
        {/* <RegisteredArea/> => fetch の数がおかしいので保留 */}
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