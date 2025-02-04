"use client";

import Link from "next/link";
import MenuListCard from "../Card/MenuListCard";
import MainPageCard from "../Card/MainPageCard";
import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Modal from "./Modal/Modal";
import GoogleSignInButton from "../Button/GoogleSignInButton";
import OAuthLoginButton from "../Button/OAuthLoginButton";

export default function Navigation() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleLoginModalVisible = () => {
    setIsLoginModalOpen(true);
  };
  return (
    <div className="flex flex-col mt-2">
      {isLoginModalOpen && (
        <Modal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          title="복잡한 절차 없이 3초만에 시작해요"
        >
          <div className="flex flex-col gap-3">
            <GoogleSignInButton onClick={() => signIn("google")} />
            <OAuthLoginButton onClick={() => signIn("kakao")} />
          </div>
        </Modal>
      )}
      <MainPageCard className="text-white col-span-3">
        <nav>
          {!session && (
            <button
              className="text-white text-left p-4"
              onClick={handleLoginModalVisible}
            >
              로그인 / 회원가입
            </button>
          )}
          {session && (
            <div className="flex justify-between">
              <span>{session.user.name}님, 환영합니다😊</span>
              <button
                onClick={() => signOut()}
                className="text-white bg-btnHighlight text-left py-2 px-4 rounded-xl font-medium"
              >
                로그아웃
              </button>
            </div>
          )}

          <ul className="flex flex-col mb-4 gap-1">
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
