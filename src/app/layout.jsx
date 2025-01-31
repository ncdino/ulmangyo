import { Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryClient from "./store/queryClient/queryClient";
import localFont from "next/font/local";

const galMuri = localFont({
  src: [
    {
      path: "./fonts/Galmuri14.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-galmuri",
});
const paybook = localFont({
  src: [
    {
      path: "./fonts/paybook-light.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-paybook",
});

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "오프라인 마트 장바구니 - 얼만교",
  description:
    "오프라인에서 확인하기 힘든 마트 장바구니를 핸드폰으로 확인해보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${geistMono.variable} ${galMuri.variable} ${paybook.variable} antialiased overflow-x-clip`}
      >
        <QueryClient>{children}</QueryClient>
      </body>
    </html>
  );
}
