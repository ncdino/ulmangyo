import EslLayout from "./components/Card/EslLayout";
import Link from "next/link";
import Header from "./components/section/Header";
import MainSummary from "./components/section/MainSummary";
// import Ungum from "./components/section/Ungum";

export default function Home() {
  return (
    <div className="h-screen relative bg-[#31363F]">
      <Header>
        <h1 className="font-galmuri text-xl tracking-wide">
          얼만교&nbsp;
          <span className="font-pretendard text-sm font-light tracking-tighter">
            : 핸드폰 속 오프라인 장바구니
          </span>
        </h1>
      </Header>
      {/* <EslLayout
        productName="사진으로 가격표 자동 인식"
        productPrice="0"
      /> */}
      <MainSummary />

      <button className="absolute bottom-5 -translate-x-1/2 left-1/2 w-[90%] bg-[#FF6500] text-center text-white p-4 rounded-2xl shadow-2xl">
        <Link href="/capture" className="font-pretendard text-xl">
          시작하기
        </Link>
      </button>
    </div>
  );
}
