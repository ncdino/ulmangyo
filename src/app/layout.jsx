import { Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "오프라인 마트 장바구니 스캔 앱 - 얼만교",
  description:
    "오프라인에서 확인하기 힘든 마트 장바구니를 핸드폰으로 확인해보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <title>오프라인 마트 장바구니 스캔 앱 - 얼만교</title>
        <meta
          name="google-site-verification"
          content="Nlo-8Deet69wIipax_hMm1Y_91hAPtCeFGOhudPEHg4"
        />
        <meta
          name="naver-site-verification"
          content="1401c02025006aa1b7c9ef4118784760ed44264b"
        />
        <link rel="icon" href="./favicon.ico" />
        <link rel="apple-touch-icon" href="./favicon.ico" />
        <meta name="theme-color" content="#232526" />
      </head>
      <body
        className={`${pretendard.variable} ${geistMono.variable} ${galMuri.variable} ${paybook.variable} antialiased overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
