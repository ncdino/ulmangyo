import React, { useState } from "react";

export default function BeforeSetBudget({
  isOpen,
  onRequestClose,
  onBudgetSubmit,
}) {
  const [inputValue, setInputValue] = useState(""); // input 값 상태 관리

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetBudget = () => {
    const newBudget = parseInt(inputValue); // input 값을 정수로 변환
    if (!isNaN(newBudget)) {
      // 유효한 숫자인지 확인
      onBudgetSubmit(newBudget); // 부모 컴포넌트에서 전달받은 함수 호출
    } else {
      alert("유효한 숫자를 입력해주세요.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-zinc-800 p-4 rounded-2xl mx-2 w-full h-64">
        <h1 className=" tracking-tighter text-xl mb-4 text-zinc-100">
          <p className="text-2xl mb-2">💡</p>
          <p className="font-base">예산을 설정해서</p>
          <p className="font-semibold">더욱 다양한 정보를 얻을 수 있어요</p>
        </h1>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="border-zinc-700 border-3 rounded-2xl bg-zinc-800 px-3 py-2 mb-4 w-full text-white appearance-none text-center"
          placeholder="0"
        />
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={onRequestClose}
            className="col-span-1 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2"
          >
            괜찮아요
          </button>
          <button
            onClick={handleSetBudget}
            className="col-span-2 bg-btnHighlight text-white font-semibold py-2 px-4 rounded-lg"
          >
            이 금액으로 설정할게요
          </button>
        </div>
      </div>
    </div>
  );
}
