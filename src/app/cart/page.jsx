"use client";
import React, { useState } from "react";
import useStore from "@/app/store/zustand/store";

const Cart = () => {
  const cartItems = useStore((state) => state.cartItems);
  const updateCartItemQuantity = useStore(
    (state) => state.updateCartItemQuantity
  );
  const removeCartItem = useStore((state) => state.removeCartItem);

  // 할인율 상태 관리
  const [discounts, setDiscounts] = useState({});

  // 총 수량 계산
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // 총 가격 계산 (할인율 반영)
  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item.price.replace(/,/g, ""));
    const discountRate = discounts[item.id] || 0; //기본값 0
    const discountedPrice = price * (1 - discountRate / 100);
    return total + discountedPrice * item.quantity;
  }, 0);

  // 할인율 업데이트
  const handleDiscountChange = (id, value) => {
    const discountValue = Math.max(0, Math.min(100, Number(value)));
    setDiscounts((prev) => ({
      ...prev,
      [id]: discountValue,
    }));
  };

  // 수량 증가
  const handleIncrease = (id, name, quantity) => {
    updateCartItemQuantity(id, name, quantity + 1);
  };

  // 수량 감소
  const handleDecrease = (id, name, quantity) => {
    if (quantity - 1 === 0) {
      removeCartItem(id, name);
    } else {
      updateCartItemQuantity(id, name, quantity - 1);
    }
  };

  if (cartItems.length === 0) {
    return <p>카트에 상품이 없습니다.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">카트</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="mb-2">
            <div className="flex flex-col border p-2 rounded">
              <div className="flex justify-between items-center">
                <span>
                  <strong>{item.name}</strong> - {item.price}원
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleDecrease(item.id, item.name, item.quantity)
                    }
                    className="px-2 py-1 border rounded mr-2 bg-red-100"
                  >
                    -
                  </button>
                  <span className="font-bold mx-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncrease(item.id, item.name, item.quantity)
                    }
                    className="px-2 py-1 border rounded bg-green-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <label className="mr-2 font-bold">할인율 (%):</label>
                <input
                  type="number"
                  value={discounts[item.id] || 0}
                  onChange={(e) =>
                    handleDiscountChange(item.id, e.target.value)
                  }
                  className="w-16 px-2 py-1 border rounded"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold">
        총 수량: {totalQuantity}개
        <br />총 가격: {totalPrice.toLocaleString()}원
      </div>
    </div>
  );
};

export default Cart;
