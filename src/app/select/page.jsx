"use client";

import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import useStore from "@/app/store/zustand/store";
import EslLayout from "../components/Card/EslLayout";
import Checked from "../components/PopUpIcon/Checked";
import ItemListCard from "../components/Card/ItemListCard";
import useCountDown from "@/hooks/useCountDown";
import CandidateList from "../components/section/CandidateList";
import Header from "../components/section/Header";
import AddComplete from "../components/PopUpIcon/AddComplete";

export default function SelectPage() {
  const { detectedTexts, addCartItem, resetDetectedTexts } = useStore();
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [isCheckVisible, setIsCheckVisible] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const countdown = useCountDown({
    time: 3, // 3초? 5초?
    path: "/cart",
    isStart: isStart,
    id: Object.keys(selectedCandidates)[0],
    selectedCandidates: selectedCandidates,
  });

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
    handleNextStep();

    if (currentStep === "done") {
      handleAddToCart(id);
    }
  };

  const handleNextStep = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      // setIsStart(false);
    }

    setIsCheckVisible(true);

    timerRef.current = setTimeout(() => {
      setIsCheckVisible(false);

      if (currentStep === "name") {
        setCurrentStep("price");
      } else if (currentStep === "price") {
        setCurrentStep("done");
        setIsStart(true);
      }
    }, 1000);

    // if (currentStep === "name") {
    //   setCurrentStep("price");
    // } else if (currentStep === "price") {
    //   setCurrentStep("done");
    // }
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
      setCurrentStep("name");
    } else {
      alert("상품명과 가격을 모두 선택해주세요!");
    }
  };

  return (
    <div className="relative font-pretendard h-screen text-black">
      {detectedTexts.length > 0 ? (
        <div>
          {isCheckVisible && (
            <div className="absolute top-1/2 left-1/2 bottom-1/3 -translate-x-1/2 -translate-y-1/2 z-[30]">
              <Checked />
            </div>
          )}
          <ul>
            {detectedTexts.map((item, index) => (
              <div key={item.id}>
                {/* 상품명 선택 단계 */}
                {currentStep === "name" &&
                  item.productNameCandidates?.length > 0 && (
                    <div>
                      <Header>
                        <span>
                          <span className="text-xl font-extrabold">🧾</span>
                          <span className="text-xl font-extrabold">
                            사진 속 상품명
                          </span>
                          으로 인식된 문자들입니다.
                        </span>
                      </Header>
                      <CandidateList
                        title={{ step: "1", label: "상품명" }}
                        candidates={item.productNameCandidates}
                        onSelect={(value) =>
                          handleSelect(item.id, "name", value)
                        }
                        selectedValue={selectedCandidates[item.id]?.name}
                      />
                    </div>
                  )}

                {/* 가격 선택 단계 */}
                {currentStep === "price" &&
                  item.priceCandidates?.length > 0 && (
                    <div>
                      <Header>
                        <span>
                          <span className="text-xl font-extrabold">💸</span>
                          <span className="text-xl font-extrabold">
                            {selectedCandidates[item.id]?.name}의 가격
                          </span>
                          으로 인식된 숫자입니다.
                        </span>
                      </Header>
                      <CandidateList
                        title={{ step: "2", label: "가격" }}
                        candidates={item.priceCandidates}
                        onSelect={(value) =>
                          handleSelect(item.id, "price", value)
                        }
                        selectedValue={selectedCandidates[item.id]?.price}
                      />
                    </div>
                  )}

                {/* 카트 추가 단계 */}
                {currentStep === "done" && (
                  <div>
                    <Header className="mb-10">
                      {countdown > 0 && (
                        <div>
                          <div className="flex flex-col">
                            <span className="text-xl font-extrabold">
                              {countdown}초 후,
                            </span>
                            <span className="text-sm font-semibold">
                              저장이 완료되고 장바구니로 이동합니다.
                            </span>
                          </div>
                        </div>
                      )}
                    </Header>
                    <div className="flex flex-col items-center justify-center">
                      <EslLayout
                        key={item.id}
                        productName={selectedCandidates[item.id]?.name}
                        productPrice={selectedCandidates[item.id]?.price}
                        className="mt-10"
                      />
                    </div>
                    <div className="text-4xl font-bold text-gray-800">
                      {countdown > 0 && (
                        <div className="absolute top-1/2 left-1/2 bottom-1/3 -translate-x-1/2 -translate-y-1/2 z-[30]">
                          <AddComplete />
                        </div>
                      )}
                    </div>
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
