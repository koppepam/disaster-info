import Entries from "@/components/Entries";
import Header from "@/components/Header";
import SignUp from "@/components/SignUp";
import LineBot from "@/components/LineBot";

export default async function Home() {
  return (
    <>
      <Header/>
      <Entries/>
      <SignUp/>
      <LineBot/>
    </>
  )
}