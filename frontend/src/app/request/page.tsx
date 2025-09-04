"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RequestLinkScreen() {
  const [requestAmount, setRequestAmount] = useState<string>(''); // 請求金額
  const [message, setMessage] = useState<string>(''); // メッセージ用のstate

  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-medium text-gray-800 text-center">請求リンクの作成</h1>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        
        {/* 請求金額セクション */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            請求金額
          </label>
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-4">
            <div className="flex items-center">
              <input
                type="number"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
                className="flex-1 text-lg font-medium text-gray-800 bg-transparent border-none outline-none"
                placeholder="金額を入力"
              />
              <span className="text-lg font-medium text-gray-800 ml-2">円</span>
            </div>
          </div>
        </div>

        {/* メッセージセクション */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            メッセージ（任意）
          </label>
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-base text-gray-800 bg-transparent border-none outline-none resize-none"
              placeholder="メッセージを入力"
              rows={3}
            />
          </div>
        </div>

      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[352px]">
        <Link href="../request/complete">
          <button 
            disabled={!requestAmount || Number(requestAmount) === 0}
            className={`w-full font-medium py-4 px-6 rounded-full transition duration-300 ease-in-out ${
              !requestAmount || Number(requestAmount) === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-400 hover:bg-red-500 text-white shadow-lg'
            }`}
          >
            リンクを作成
          </button>
        </Link>
      </div>
    </div>
  );
}
