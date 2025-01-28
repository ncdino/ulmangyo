"use client";

import React, { useState, useRef, useEffect } from "react";
import useStore from "@/app/store/zustand/store";
import EslLayout from "../components/Card/EslLayout";
import Checked from "../components/Card/Checked";

export default function SelectPage() {
  const { detectedTexts, addCartItem, resetDetectedTexts } = useStore();
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [isCheckVisible, setIsCheckVisible] = useState(false);

  const [currentStep, setCurrentStep] = useState("name"); // "name" -> "price" -> "done"
  const timerRef = useRef(null);

  const handleSelect = (id, type, value) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: value,
      },
    }));
  };

  const handleNextStep = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsCheckVisible(true);

    timerRef.current = setTimeout(() => {
      setIsCheckVisible(false);
    }, 2000);

    if (currentStep === "name") {
      setCurrentStep("price");
    } else if (currentStep === "price") {
      setCurrentStep("done");
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleAddToCart = (id) => {
    const selected = selectedCandidates[id];
    if (selected?.name && selected?.price) {
      addCartItem(id, selected.name, selected.price);
      setSelectedCandidates((prev) => ({
        ...prev,
        [id]: { name: null, price: null },
      }));
      setIsCheckVisible(true);
      alert("카트에 추가되었습니다!");
      resetDetectedTexts();
      setCurrentStep("name"); // 초기화 후 다시 상품명 단계로 이동
    } else {
      alert("상품명과 가격을 모두 선택해주세요!");
    }
  };

  return (
    <div className="relative container h-screen">
      {detectedTexts.length > 0 ? (
        <div>
          {isCheckVisible && (
            <div className="absolute top-1/2 left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 z-[30]">
              <Checked />
            </div>
          )}
          <ul>
            {detectedTexts.map((item) => (
              <div key={item.id}>
                <h3>ID: {item.id}</h3>

                {/* 상품명 선택 단계 */}
                {currentStep === "name" &&
                  item.productNameCandidates?.length > 0 && (
                    <div>
                      <h2>상품명 후보</h2>
                      <ul>
                        {item.productNameCandidates.map((candidate, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              handleSelect(item.id, "name", candidate.text)
                            }
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                selectedCandidates[item.id]?.name ===
                                candidate.text
                                  ? "underline"
                                  : "none",
                              color:
                                selectedCandidates[item.id]?.name ===
                                candidate.text
                                  ? "blue"
                                  : "white",
                            }}
                          >
                            {candidate.text}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={handleNextStep}
                        disabled={!selectedCandidates[item.id]?.name}
                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                      >
                        확인
                      </button>
                    </div>
                  )}

                {/* 가격 선택 단계 */}
                {currentStep === "price" &&
                  item.priceCandidates?.length > 0 && (
                    <div>
                      <h2>가격 후보</h2>
                      <ul>
                        {item.priceCandidates.map((candidate, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              handleSelect(item.id, "price", candidate.text)
                            }
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                selectedCandidates[item.id]?.price ===
                                candidate.text
                                  ? "underline"
                                  : "none",
                              color:
                                selectedCandidates[item.id]?.price ===
                                candidate.text
                                  ? "blue"
                                  : "white",
                            }}
                          >
                            {candidate.text}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={handleNextStep}
                        disabled={!selectedCandidates[item.id]?.price}
                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                      >
                        확인
                      </button>
                    </div>
                  )}

                {/* 카트 추가 단계 */}
                {currentStep === "done" && (
                  <div>
                    <EslLayout
                      key={item.id}
                      productName={selectedCandidates[item.id]?.name}
                      productPrice={selectedCandidates[item.id]?.price}
                    />
                    이거 맞죠?
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                    >
                      카트에 추가
                    </button>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>분석 중이거나 결과가 없습니다.</p>
      )}
    </div>
  );
}
