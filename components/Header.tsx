export default function Header() {
  return (
    <div className="bg-green-900 w-full h-12 items-center flex justify-between">
      <h1 className="text-white text-4xl font-bold ml-4">災害情報</h1>
      <ul className="text-white flex text-right divide-x divide-white m-5">
        <li className="px-4">全国</li>
        <li className="px-4">選択地域</li>
        <li className="px-4">気象警報</li>
        <li className="px-4">LINE ログイン</li>
      </ul>
    </div>
  );
}