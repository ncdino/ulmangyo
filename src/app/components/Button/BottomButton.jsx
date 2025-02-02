import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function BottomButton({ className }) {
  return (
    <Link href="/capture" className="font-pretendard text-xl">
      <button
        className={twMerge(
          `absolute bottom-28 -translate-x-1/2 left-1/2 w-[90%] bg-btnHighlight text-center text-white p-4 rounded-2xl shadow-2xl`,
          className
        )}
      >
        시작하기
      </button>
    </Link>
  );
}
