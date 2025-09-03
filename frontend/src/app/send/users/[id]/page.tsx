"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { getUser } from '@/app/lib/client/getUser';

export default async function MobileAccountScreen( params: { id: string }) {
  const { id } = params; // URLからidを取得
  console.log(params)
  //const user = await getUser(id); // getUser関数にidを渡す

  const [transferAmount, setTransferAmount] = useState<string>(''); // 空文字で初期化
  const maxNum = 10000 //@Todo ユーザーの口座金額に変更する
  const showAmountError = transferAmount && Number(transferAmount) > maxNum;
  const [message, setMessage] = useState<string>(''); // メッセージ用のstateを追加

  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      {/* Main Content */}
      <div className="px-8 pt-8">
        {/* 送金先テキスト */}
        <div className="mb-2">
          <p className="text-sm text-gray-600">送金先</p>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-8">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center overflow-hidden">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-6 bg-orange-300 rounded-full"></div>
              <div className="absolute w-6 h-6 bg-pink-300 rounded-full mt-2"></div>
            </div>
          </div>
          
          {/* Name */}
          <div>
            <h2 className="text-lg font-medium text-gray-800">サンプル 氏名</h2>
          </div>
        </div>

        {/* 送金上限額 */}
        <div className="mb-8">
          <p className="text-sm text-gray-600">送金上限額</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">50,000円</p>
          </div>
        </div>

        {/* 送金金額 */}
        <div className="mb-8">
          <p className="text-sm text-gray-600">送金金額</p>
        </div>

        {/* 入力フォームのコンテナ */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-center">
            <input
              type="number" // 数字入力用のキーボードを表示
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="text-2xl font-bold text-gray-800 w-full text-center focus:outline-none"
              placeholder="金額を入力"
            />
            <span className="text-2xl font-bold text-gray-800 ml-2">円</span>
          </div>
        </div>

        <div className="h-8 mb-8 flex items-center justify-center">
          {showAmountError && (
            <p className="text-red-500 text-sm text-center">口座残高より大きな金額は送金できません</p>
          )}
        </div>

        {/* メッセージ(任意) */}
        <div className="mb-8">
          <p className="text-sm text-gray-600">メッセージ (任意)</p>
          <div className="mt-2 bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-24 text-gray-800 focus:outline-none"
              placeholder="メッセージを入力"
            ></textarea>
          </div>
        </div>

        {/* 送金ボタン */}
        <div className="flex justify-center mt-8">
          <Link href="../complete">
            <button 
              disabled={!transferAmount || Number(transferAmount) > maxNum}
              className={`w-full font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${
                !transferAmount || Number(transferAmount) > maxNum
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              送金
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
