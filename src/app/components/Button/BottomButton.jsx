import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function BottomButton({ className, title }) {
  return (
    <Link href="/capture" className="font-pretendard text-xl">
      <button
        className={twMerge(
          `w-full bg-btnHighlight text-center text-white p-4 rounded-2xl shadow-2xl`,
          className
        )}
      >
        {title}
      </button>
    </Link>
  );
}
