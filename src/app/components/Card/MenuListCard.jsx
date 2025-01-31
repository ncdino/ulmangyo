import { twMerge } from "tailwind-merge";

export default function MenuListCard({ menuTitle }) {
  return (
    <div
      className={twMerge(
        `font-paybooc tracking-tighter w-full px-5 py-2 mt-4 hover:bg-[#434343] rounded-xl bg-black`
      )}
    >
      <div className="flex justify-between items-center">
        <div>{menuTitle}</div>
        <div>
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 7L15 12L10 17"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
