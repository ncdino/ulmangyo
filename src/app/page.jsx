import Esl from "./components/Card/ESL";
import PhotoAnalysis from "./components/section/PhotoAnalaysis";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Esl />
      <Link href="/capture">사진</Link>
    </>
  );
}
