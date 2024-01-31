import Link from "next/link";

export default function LineBot() {
  return(
    <div className="xl:flex">
      <p className="my-5">登録した地域の災害情報をLINEでお知らせ！</p>
      <div className="my-5">
        <a href="https://lin.ee/mZ1T3Vf" className="whitespace-nowrap bg-LineForest hover:bg-LineHover text-white font-semibold hover:text-white py-2 px-4 rounded">
          友だち追加
        </a>
      </div>
    </div>
  );
}