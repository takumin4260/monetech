"use client";

import React from 'react';
import Link from 'next/link';

export default function CompletionPage() {
  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      <div className="px-8 pt-20 flex flex-col items-center text-center space-y-6">
        {/* チェックマークアイコン */}
        <div className="w-24 h-24 rounded-full bg-white border-4 border-green-500 flex items-center justify-center shadow-lg">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* 完了メッセージ */}
        <h1 className="text-xl font-medium text-gray-700">送金処理が完了しました</h1>

        {/* トップ画面に戻るボタン */}
        <Link href="/home" passHref>
          <button className="mt-8 px-6 py-3 bg-white text-gray-800 font-bold rounded-full border border-gray-300 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
            トップ画面に戻る
          </button>
        </Link>
      </div>
    </div>
  );
}
