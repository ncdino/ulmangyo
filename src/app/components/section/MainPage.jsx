import Link from "next/link";
import Header from "./Header";
import MainSummary from "./MainSummary";

export default function MainPage() {
  return (
    <div className="h-screen max-w-xl mx-auto relative bg-primary">
      {/* 헤더 */}
      <Header>
        <Link href="/">
          <h1 className="font-galmuri text-xl tracking-wide">
            얼만교&nbsp;
            <span className="font-pretendard text-sm font-light tracking-tighter">
              : 온라인 속 오프라인 장바구니
            </span>
          </h1>
        </Link>
      </Header>
      {/* 요약 */}
      <MainSummary />
    </div>
  );
}
