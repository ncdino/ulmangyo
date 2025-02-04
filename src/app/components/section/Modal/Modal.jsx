import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="font-pretendard fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primary p-6 rounded-3xl shadow-lg w-80">
        {title && (
          <h2 className="tracking-tighter text-xl font-bold mb-4 text-white">
            {title}
          </h2>
        )}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-zinc-500 text-white p-2 rounded-xl"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
