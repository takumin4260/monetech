"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RequestLinkCompletionPage() {
  const requestLink = "http://localhost:3000/users/2"; //@Todo 請求リンクに変更する
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(requestLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒後に元に戻る
  };

  return (
    <div className="w-[400px] min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-rose-600 mx-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 px-6 pt-32 flex flex-col items-center">
        {/* メインカード */}
        <div className="w-full bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-white shadow-xl">
          {/* チェックマークアイコン */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* 完了メッセージ */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">請求リンクが作成されました</h2>
            <p className="text-gray-600 text-sm">
              以下のリンクをコピーして共有してください
            </p>
          </div>

          {/* URLとコピーボタン */}
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700 flex-1 truncate mr-3 break-all">
                {requestLink}
              </p>
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition duration-300 ease-in-out flex-shrink-0 shadow-md ${
                  copied
                    ? 'bg-gray-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-105'
                }`}
              >
                {copied ? '完了' : 'コピー'}
              </button>
            </div>
          </div>
        </div>

        {/* トップ画面に戻るボタン */}
        <div className="w-full px-2 mt-6">
          <Link href="/home" passHref>
            <button className="w-full bg-white/90 backdrop-blur-lg text-gray-800 font-bold py-4 rounded-2xl border border-white shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>トップ画面に戻る</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}