import Esl from "./components/Card/esl";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Esl />
      <Link href="/capture">사진</Link>
    </>
  );
}
