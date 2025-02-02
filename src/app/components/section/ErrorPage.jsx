import Image from "next/image";
import Header from "./Header";

export default function ErrorPage({ src, alt, headerTitle, contentTitle }) {
  return (
    <div>
      <Header>{headerTitle}</Header>
      <div className="relative h-screen bg-gradient-to-r to-[#0f0c29] via-[#302b63] from-[#24243e]">
        <div className="absolute top-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 z-20">
          <span className="font-pretendard tracking-tighter whitespace-nowrap text-white text-2xl font-bold ">
            {contentTitle}
          </span>
        </div>
        <div className="absolute top-1/3 bottom-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 size-48 z-10">
          <Image src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
}
