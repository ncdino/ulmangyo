import React, { useState } from "react";

export default function BeforeSetBudget({
  isOpen,
  onRequestClose,
  onBudgetSubmit,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetBudget = () => {
    const newBudget = parseInt(inputValue);
    if (!isNaN(newBudget)) {
      onBudgetSubmit(newBudget);
    } else {
      alert("유효한 숫자를 입력해주세요.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 max-w-xl mx-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-neutral-50 p-4 rounded-2xl mx-8 w-full h-64">
        <h1 className="tracking-tighter text-2xl mb-3 mx-2 text-neutral-800">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bell.png"
            alt="Bell"
            width="50"
            height="50"
            className="mb-4"
          />
          <div>
            <span className="font-bold">쇼핑 예산</span>
            <span className="font-base">을 설정할 수 있어요.</span>
          </div>
        </h1>
        <input
          type="number"
          value={inputValue}
          step={1000}
          onChange={handleInputChange}
          className={`border-3 rounded-2xl bg-neutral-50 px-3 py-2 mb-4 w-full text-neutral-800 appearance-none text-center transition-colors focus:border-blue-400 focus:outline-none duration-300 ${
            inputValue ? "border-blue-400" : "border-neutral-50"
          }`}
          placeholder="0"
        />
        <div className="grid grid-cols-3 gap-4 font-semibold">
          <button
            onClick={onRequestClose}
            className="col-span-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-xl mr-2"
          >
            안할래요
          </button>
          <button
            onClick={handleSetBudget}
            className="col-span-2 bg-blue-500 text-white py-3 px-4 rounded-xl"
          >
            이 금액으로 설정할래요
          </button>
        </div>
      </div>
    </div>
  );
}
