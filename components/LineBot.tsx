import Link from "next/link";

export default function LineBot() {
  return(
    <>
      <p className="my-5 ml-5">登録した地域の災害情報をLINEでお知らせ！</p>
      <div className="my-5">
        <Link href="https://lin.ee/mZ1T3Vf" className="bg-LineForest hover:bg-LineHover text-white font-semibold hover:text-white py-2 px-4 rounded">
          友だち追加
        </Link>
        {/* <a href="https://lin.ee/mZ1T3Vf">
          <img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加"/>
        </a> */}
      </div>
    </>
  );
}