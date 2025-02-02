import Link from "next/link";
import MenuListCard from "../Card/MenuListCard";
import MainPageCard from "../Card/MainPageCard";

export default function Navigation() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <MainPageCard className="text-white col-span-3">
        <nav>
          <ul className="flex flex-col mt-4 mb-4">
            <li>
              <Link href="/">
                <MenuListCard menuTitle={"요약해서 보기 ↩️"} />
              </Link>
            </li>
            <li>
              <Link href="/capture">
                <MenuListCard menuTitle={"가격표 인식하러 가기 📸"} />
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <MenuListCard menuTitle={"현재까지 카트에 담긴 상품 🛒"} />
              </Link>
            </li>
          </ul>
        </nav>
      </MainPageCard>

      {/* <MainPageCard className="bg-white text-black">
        <p className="font-galmuri text-2xl break-words mb-4">얼만교,</p>

        <p className="font-galmuri whitespace-pre-wrap">
          마트에서 장을 볼 때 카트 속 상품과 총 가격을 쉽게 알 수 있는 OCR
          기반의 오프라인 장바구니입니다😊
        </p>
      </MainPageCard> */}
    </div>
  );
}
