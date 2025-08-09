"use client";

import React, { useState } from "react";
import useStore from "@/app/store/zustand/store";
import Header from "../components/section/Header";
import MainPageCard from "../components/Card/MainPageCard";
import Link from "next/link";
import emptyBagImg from "../../../public/empty-bag.png";
import ErrorPage from "../components/section/ErrorPage";

const Cart = () => {
  const {
    cartItems,
    modifyProductName,
    updateCartItemQuantity,
    updateCartItemDiscount,
    removeCartItem,
    budget,
  } = useStore();

  const [discounts, setDiscounts] = useState({});

  // 상품명 수정
  const [isEditing, setIsEditing] = useState(null);
  const [isDiscounting, setIsDiscounting] = useState(false);
  const [editedName, setEditedName] = useState(""); // 수정 중인 이름

  const handleEditName = (id) => {
    setIsEditing(id);
    setEditedName(cartItems.find((item) => item.id === id)?.name || "");
  };

  const handleSaveName = () => {
    if (isEditing && editedName.trim() !== "") {
      modifyProductName(isEditing, editedName); // store의 이름 수정 함수 호출
    }
    setIsEditing(null); // 비활성화
    setEditedName(""); // input 초기화
  };

  // const totalQuantity = cartItems.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );

  // 총 가격 계산
  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      typeof item.discountPrice === "string"
        ? parseInt(item.discountPrice.replace(/,/g, ""), 10)
        : item.discountPrice;

    return total + price * item.quantity;
  }, 0);

  // 할인율 업데이트
  const handleDiscountChange = (id, value) => {
    const discountValue = Math.max(0, Math.min(100, Number(value)));

    // discount 값 업데이트
    setDiscounts((prev) => ({
      ...prev,
      [id]: discountValue, // 해당 아이템의 할인율만 업데이트
    }));

    // 해당 아이템의 가격을 할인된 가격으로 갱신 (별도로 변수 주고 개당 가격으로 해야 함)
    updateCartItemDiscount(id, discountValue); // 할인된 가격을 갱신하는 함수 호출
  };

  // 수량 증가
  const handleIncrease = (id, name, quantity) => {
    updateCartItemQuantity(id, name, quantity + 1);
  };

  // 수량 감소
  const handleDecrease = (id, name, quantity) => {
    if (quantity - 1 === 0) {
      // 모달에서 true or false 받고
      // if true - 제거 false 제거 x
      removeCartItem(id, name);
    } else {
      updateCartItemQuantity(id, name, quantity - 1);
    }
  };

  if (cartItems.length === 0) {
    return (
      <ErrorPage
        contentTitle="장바구니가 비어있습니다"
        headerTitle="현재 고객님의 장바구니 입니다.😊"
        src={emptyBagImg}
        alt="Empty bag Image"
      />
    );
  }

  return (
    <div className="bg-primary max-w-xl mx-auto h-screen">
      <Header>현재 고객님의 장바구니 입니다.😊</Header>
      <div className="mx-4 py-4 font-pretendard tracking-tighter text-white">
        <div className="grid grid-cols-2 gap-4">
          <MainPageCard className="bg-black">
            <div className="flex flex-col py-2 font-bold text-lg text-center">
              <h1>현재가격</h1>
              <span className="font-semibold text-xl">
                {totalPrice.toLocaleString()} 원
              </span>
              {budget > 0 && (
                <span className="font-light text-sm">
                  / {budget.toLocaleString()} 원
                </span>
              )}
            </div>
          </MainPageCard>
          <Link href="/capture">
            <MainPageCard className="bg-btnHighlight">
              <div className="flex flex-col py-2 font-bold items-center text-center">
                <span className="font-bold text-2xl">📸</span>
                <span className="font-bold text-xl">가격표 스캔</span>
              </div>
            </MainPageCard>
          </Link>
        </div>
        <ul className="py-4">
          {cartItems.map((item, index) => (
            <li key={item.id} className="mb-2">
              <div className="relative flex flex-col px-3 py-3 rounded-2xl bg-zinc-900">
                <div className="flex justify-between items-center">
                  {/* 수정 */}
                  {isEditing === item.id ? (
                    <div className="flex">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleSaveName} // input out시 저장
                        className="w-fit px-2 py-1 border-2 rounded-xl text-stone-200 bg-zinc-900 font-light"
                      />
                      <button
                        onClick={() => handleEditName(item.id)}
                        className="text-white"
                      >
                        ✏️
                      </button>
                    </div>
                  ) : (
                    <span className="items-center text-center">
                      <span className="tracking-tighter font-bold">
                        <button
                          className="absolute font-bold text-xl text-zinc-800 bg-zinc-100 p-0.5 -top-3 -right-2 rounded-full"
                          onClick={() => {
                            removeCartItem(item.id, item.name);
                          }}
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="#27272a"
                              d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                            />
                          </svg>
                        </button>
                        <div className="flex text-base gap-2">
                          {item.name} - {item.quantity}개
                          <button
                            onClick={() => handleEditName(item.id)} // 수정 버튼 클릭 시
                            className="text-white" // 스타일링
                          >
                            ✏️
                          </button>
                        </div>
                      </span>
                    </span>
                  )}

                  {/* 할인 */}
                  <div className="flex gap-2">
                    <button
                      className="w-fit px-3 rounded-lg font-light text-sm text-zinc-100 bg-gradient-to-tr to-[#323232] via-[#3F3F3F] hover:shadow-lime-200 hover:shadow-xl from-[#1C1C1C]"
                      onClick={() => setIsDiscounting(!isDiscounting)}
                    >
                      할인 및 수량
                    </button>
                    <span className="font-bold inline-flex">
                      <span>{item.discountPrice.toLocaleString()}</span>
                      <span>원</span>
                    </span>
                  </div>
                </div>

                {isDiscounting === true && (
                  <div className="flex justify-between mt-2 gap-4 items-center">
                    <div>
                      <label className="mr-2 font-bold">할인율 (%):</label>
                      <input
                        type="text"
                        value={discounts[item.id] || 0}
                        onChange={(e) =>
                          handleDiscountChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-24 p-2 rounded-lg text-zinc-500 bg-zinc-700"
                        min="0"
                        max="100"
                      />
                    </div>

                    {/* quantity */}

                    <div className="flex items-center">
                      <label>수량: </label>
                      <button
                        onClick={() =>
                          handleDecrease(item.id, item.name, item.quantity)
                        }
                        className="p-4 rounded-full text-xl"
                      >
                        -
                      </button>
                      <span className="font-bold mx-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleIncrease(item.id, item.name, item.quantity)
                        }
                        className="p-4 rounded-full text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
