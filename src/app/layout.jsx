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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${geistMono.variable} ${galMuri.variable} antialiased overflow-x-clip`}
      >
        <QueryClient>{children}</QueryClient>
      </body>
    </html>
  );
}
