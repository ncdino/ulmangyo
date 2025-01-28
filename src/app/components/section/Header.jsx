import Link from "next/link";

export default function Header({ children }) {
  return (
    <div className="font-pretendard font-bold tracking-tighter bg-gradient-to-r from-[#000000] to-[#434343] backdrop-blur top-0 sticky z-[100] py-2">
      <div className="flex justify-between items-center px-4 text-zinc-100">
        {children}
        <Link href="/cart">
          <button>
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 2C8.67157 2 8 2.67157 8 3.5V4.5C8 5.32843 8.67157 6 9.5 6H14.5C15.3284 6 16 5.32843 16 4.5V3.5C16 2.67157 15.3284 2 14.5 2H9.5Z"
                fill="#ffffff"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 4.03662C5.24209 4.10719 4.44798 4.30764 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.552 4.30764 18.7579 4.10719 17.5 4.03662V4.5C17.5 6.15685 16.1569 7.5 14.5 7.5H9.5C7.84315 7.5 6.5 6.15685 6.5 4.5V4.03662ZM15.5117 12.5483C15.8146 12.2657 15.8309 11.7911 15.5483 11.4883C15.2657 11.1855 14.7911 11.1691 14.4883 11.4517L10.7143 14.9741L9.51174 13.8517C9.20893 13.5691 8.73434 13.5855 8.45171 13.8883C8.16909 14.1911 8.18545 14.6657 8.48826 14.9483L10.2025 16.5483C10.4907 16.8172 10.9379 16.8172 11.226 16.5483L15.5117 12.5483Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
