"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {session ? (
        <>
          <p>환영합니다, {session.user.name}님!</p>
          <button onClick={() => signOut()} className="mt-4 p-2 bg-red-500 text-white">
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signIn("google")} className="p-2 bg-blue-500 text-white">
            Google 로그인
          </button>
          <button onClick={() => signIn("kakao")} className="mt-2 p-2 bg-yellow-500 text-black">
            Kakao 로그인
          </button>
        </>
      )}
    </div>
  );
}
