"use client";

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CompleteContent() {
  const searchParams = useSearchParams();

  const generatedUrl = searchParams.get("url");
  const requestLink = generatedUrl ? decodeURIComponent(generatedUrl) : null;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!requestLink) return;
    navigator.clipboard.writeText(requestLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒後に元に戻る
  };

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
        <div className="space-y-4">
          <h1 className="text-xl font-medium text-gray-700">請求リンクが作成されました</h1>
          
          {/* URLとコピーボタンを横並びに配置 */}
          <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4 w-full max-w-sm">
            <p className="text-base font-medium text-gray-700 flex-1 truncate mr-3">{requestLink}</p>
            <button 
              onClick={handleCopyLink}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ease-in-out flex-shrink-0 ${
                copied 
                  ? 'bg-gray-600 text-white'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {copied ? '完了' : 'コピー'}
            </button>
          </div>
        </div>

        {/* トップ画面に戻るボタン */}
        <div className="mt-8">
          <Link href="/home" passHref>
            <button className="w-full max-w-xs px-6 py-4 bg-white text-gray-800 font-medium rounded-full border border-gray-300 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
              トップ画面に戻る
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RequestLinkCompletionPage() {
  return (
    <Suspense fallback={<div className="w-[400px] min-h-screen bg-gray-50 mx-auto flex items-center justify-center">読み込み中...</div>}>
      <CompleteContent />
    </Suspense>
  )
}
