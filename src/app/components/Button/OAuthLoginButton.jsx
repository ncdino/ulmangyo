export default function OAuthLoginButton({ onClick }) {
  return (
    <button
      className="w-full relative inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-xl font-medium text-gray-700 bg-[#FEE500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:cursor-default disabled:bg-gray-200 disabled:opacity-38 transition ease-in-out duration-218"
      onClick={onClick}
    >
      <div className="flex items-center w-full h-full">
        <div className="h-5 w-5 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <g clipPath="url(#clip0_1_106)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99997 0.600006C4.02913 0.600006 -4.57764e-05 3.71296 -4.57764e-05 7.55229C-4.57764e-05 9.94003 1.55836 12.045 3.93148 13.297L2.93298 16.9445C2.84476 17.2668 3.21337 17.5237 3.49642 17.3369L7.8733 14.4482C8.24266 14.4839 8.61803 14.5047 8.99997 14.5047C13.9704 14.5047 17.9999 11.3918 17.9999 7.55229C17.9999 3.71296 13.9704 0.600006 8.99997 0.600006Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_106">
                <rect width="17.9999" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span className="flex-grow font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          카카오로 시작하기
        </span>
      </div>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-218"></div>
    </button>
  );
}
