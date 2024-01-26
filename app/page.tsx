import Header from "@/components/Header";
import Login from "@/components/Login";
import Entries from "@/components/Entries";
import LineBot from "@/components/LineBot";

export default function Home() {
  return (
    <div className="">
      <Header/>
      <Login/>
      <Entries/>
    </div>
  )
}