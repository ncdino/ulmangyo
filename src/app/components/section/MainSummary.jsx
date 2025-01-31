"use client";

import useStore from "@/app/store/zustand/store";
import MainPageCard from "../Card/MainPageCard";

export default function MainSummary() {
  const cartItems = useStore((state) => state.cartItems);

  // 총 수량 계산
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // 총 가격 계산
  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      item.price && typeof item.price === "string"
        ? Number(item.price.replace(/,/g, ""))
        : 0;

    return price * item.quantity;
  }, 0);

  const sortedCartItems = [...cartItems].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/,/g, ""));
    const priceB = parseFloat(b.price.replace(/,/g, ""));

    return priceA - priceB; // 가격 오름차순으로 정렬
  });

  const mostExpensiveItem = sortedCartItems[sortedCartItems.length - 1];
  //   const mostExpensivePrice = parseFloat(mostExpensiveItem.price.replace(/,/g, ''));
  //   const mostExpensiveName = mostExpensiveItem.name;

  return (
    <div className="container mt-10 font-pretendard tracking-tighter">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1">
          <MainPageCard className={"bg-zinc-900 text-white py-8"}>
            <div className="text-sm text-center font-light mb-1">
              현재 총 금액&nbsp;
              <span className="text-base text-stone-400">∨</span>
            </div>
            <div className=" text-center font-medium text-4xl">
              {totalPrice.toLocaleString()} 원
            </div>
          </MainPageCard>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MainPageCard className={"bg-zinc-900 text-white col-span-1 py-8"}>
            <div className="text-sm text-center font-light mb-1">
              가장 높은 금액의 제품
              <span className="text-base text-stone-400">∨</span>
            </div>
            <div className=" text-center font-medium">
              {mostExpensiveItem ? (
                <div>
                  <p className="text-base">{mostExpensiveItem.name} / </p>
                  <p className="text-sm">{mostExpensiveItem.price} 원</p>
                </div>
              ) : (
                <span className="text-sm">장바구니가 비어있습니다</span>
              )}
            </div>
          </MainPageCard>
          <MainPageCard className={"bg-zinc-900 text-white col-span-1 py-8"}>
            <div className="text-sm text-center font-light mb-1">
              상품 개수 <span className="text-base text-stone-400">∨</span>
            </div>
            <div className=" text-center font-medium text-2xl">
              {totalQuantity} 개
            </div>
          </MainPageCard>
        </div>
      </div>
    </div>
  );
}
