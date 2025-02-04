"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>로딩 중...</p>;
  if (!session) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="p-4">
      <h1>대시보드</h1>
      <p>이름: {session.user.name}</p>
      <p>이메일: {session.user.email}</p>
      <p>{session.expires}</p>
      <p>{session.user.image}</p>

      <button
        onClick={() => signOut()}
        className="mt-4 p-2 bg-red-500 text-white"
      >
        로그아웃
      </button>
    </div>
  );
}
