import EslLayout from "./components/Card/EslLayout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <EslLayout />
      <Link href="/capture">사진</Link>
    </>
  );
}
