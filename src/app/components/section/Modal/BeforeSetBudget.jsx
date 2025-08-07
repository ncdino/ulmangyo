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
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-w-xl mx-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-zinc-800 p-4 rounded-2xl mx-2 w-full h-64">
        <h1 className="tracking-tighter text-2xl mb-4 text-zinc-100">
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
          className={`border-3 rounded-2xl bg-zinc-800 px-3 py-2 mb-4 w-full text-white appearance-none text-center transition-colors duration-300 ${
            inputValue ? "border-blue-500" : "border-zinc-700"
          }`}
          placeholder="0원"
        />
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={onRequestClose}
            className="col-span-1 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2"
          >
            안할래요
          </button>
          <button
            onClick={handleSetBudget}
            className="col-span-2 bg-btnHighlight text-white font-semibold py-2 px-4 rounded-lg"
          >
            이 금액으로 설정할래요
          </button>
        </div>
      </div>
    </div>
  );
}
