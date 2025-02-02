"use client";

import useStore from "@/app/store/zustand/store";
import MainPageCard from "../Card/MainPageCard";
import AnimatedCounter from "../Motion/AnimatedCounter";
import BeforeSetBudget from "./Modal/BeforeSetBudget";
import BottomButton from "../Button/BottomButton";
import GaugeChart from "../Motion/GaugeChart";

export default function MainSummary() {
  const cartItems = useStore((state) => state.cartItems);
  const { budget, isModalOpen, closeModal, setBudget } = useStore();

  const handleSetBudget = (newBudget) => {
    setBudget(newBudget);
    closeModal();
  };

  // 총 수량 계산
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // 총 가격 계산

  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      typeof item.discountPrice === "string"
        ? parseInt(item.discountPrice.replace(/,/g, ""), 10)
        : item.discountPrice;

    return total + price * item.quantity;
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
      {budget === 0 && isModalOpen === true ? (
        <BeforeSetBudget
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onBudgetSubmit={handleSetBudget}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1">
            <MainPageCard className={"bg-zinc-900 text-white py-8"}>
              <div className="text-sm text-center font-light mb-1">
                현재 총 금액&nbsp;
                <span className="text-base text-stone-400">∨</span>
              </div>
              <div className=" text-center font-medium text-4xl">
                <AnimatedCounter
                  from={799999}
                  to={totalPrice}
                  duration={2.5}
                  currency="원"
                />
              </div>
            </MainPageCard>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MainPageCard
              className={
                "bg-zinc-900 text-white col-span-1 py-2 flex justify-center"
              }
            >
              <div>
                <div className="text-sm text-center font-light mb-1">
                  예산 사용률{" "}
                  <span className="text-base text-stone-400">∨</span>
                </div>
                <GaugeChart
                  value={parseInt(totalPrice)}
                  maxValue={parseInt(budget)}
                  animated={true}
                  color="#FF6500"
                  emptyColor="#31363F"
                  className="w-50 h-50 md:w-100 md:h-100 lg:w-200 lg:h-200"
                  size={60}
                />
              </div>
            </MainPageCard>
            <MainPageCard
              className={
                "bg-zinc-900 text-white col-span-1 py-2 items-center text-center"
              }
            >
              <div className="text-sm font-light mb-1">
                상품 개수 <span className="text-base text-stone-400">∨</span>
              </div>
              <div className="font-medium text-2xl">
                <AnimatedCounter
                  from={10}
                  to={totalQuantity}
                  duration={2.5}
                  currency="개"
                />
              </div>
            </MainPageCard>
          </div>
          <div>
            <MainPageCard className={"bg-zinc-900 text-white col-span-1 py-3"}>
              <div className="text-sm text-center font-light mb-1">
                가장 높은 금액의 제품
                <span className="text-base text-stone-400">∨</span>
              </div>
              <div className=" text-center font-medium">
                {mostExpensiveItem ? (
                  <div className="flex flex-col">
                    <p className="text-base">{mostExpensiveItem.name} / </p>
                    <p className="text-sm">
                      {mostExpensiveItem.price} 원 / 개당
                    </p>
                  </div>
                ) : (
                  <span className="text-sm">장바구니가 비어있습니다</span>
                )}
              </div>
            </MainPageCard>
          </div>

          {/* 하단부 */}
          <BottomButton />
        </div>
      )}
    </div>
  );
}
