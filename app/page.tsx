import Header from "@/components/Header";
import Login from "@/components/Login";
import Entries from "@/components/Entries";

export default function Home() {
  return (
    <>
      <Header/>
      <Entries limit={30}/>
    </>
  );
}