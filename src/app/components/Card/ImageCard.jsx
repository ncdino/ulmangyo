import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function HalfCard({ title, price, className, image }) {
  return (
    <div
      className={twMerge(`font-light rounded-2xl relative h-full`, className)}
      style={{
        backgroundImage: "url('/eslHuman.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0">이만한 혜택</div>
    </div>
  );
}
