import Header from "@/components/Header";
import Login from "@/components/Login";
import Entries from "@/components/Entries";
import LineBot from "@/components/LineBot";

export default async function Home() {
  return (
    <>
      <Header/>
      <Login/>
      <Entries/>
      <LineBot/>
    </>
  )
}