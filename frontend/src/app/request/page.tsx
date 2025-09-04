"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { components } from '../gen/schema';
import { useRouter } from 'next/navigation';

type MeResponse = components["schemas"]["MeResponse"];
type BillingCreateRequest = components["schemas"]["BillingCreateRequest"];
type URLResponse = components["schemas"]["URLResponse"];

export default function RequestLinkScreen() {
  const [requestAmount, setRequestAmount] = useState<string>(''); // 請求金額
  const [message, setMessage] = useState<string>(''); // メッセージ用のstate
  const [loginUser, setLoginUser] = useState<MeResponse | null>(null);

  const router = useRouter();

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/me", {
      credentials: "include",
    });
    const data = await response.json();
    setLoginUser(data);
  }

  useEffect(() => {
    fetchUserData();
  }, [router]);

  const handleBilling = async () => {
    if (!loginUser || !requestAmount) return;
    const body: BillingCreateRequest = {
      money: parseInt(requestAmount),
      message: message || null,
    }
    const response = await fetch("http://localhost:8000/billing", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: URLResponse = await response.json();
    if (data.url) {
      router.push(`/request/complete?url=${encodeURIComponent(data.url)}`);
    }
  }

  return (
    <div className="w-[400px] min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-rose-600 mx-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-5 w-24 h-24 bg-pink-200 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pt-12 pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">請求リンクの作成</h1>
          <p className="text-red-100">金額とメッセージを設定</p>
        </div>

        {/* Amount Input Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white shadow-lg">
          <div className="mb-3">
            <p className="text-sm text-gray-600">請求金額</p>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 mr-2">¥</span>
            <input
              type="number"
              value={requestAmount}
              onChange={(e) => setRequestAmount(e.target.value)}
              className="text-2xl font-bold text-gray-800 w-full text-center focus:outline-none bg-transparent"
              placeholder="金額を入力"
            />
          </div>
        </div>

        {/* Message Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white shadow-lg">
          <div className="mb-3">
            <p className="text-sm text-gray-600">メッセージ (任意)</p>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-24 text-gray-800 focus:outline-none bg-transparent resize-none"
            placeholder="メッセージを入力"
            rows={3}
          />
        </div>

        {/* Create Link Button */}
        <div className="flex justify-center mt-12">
          <Link href="../request/complete" className="w-full">
            <button
              disabled={!requestAmount || Number(requestAmount) === 0}
              className={`w-full font-bold py-4 px-6 rounded-2xl shadow-lg transition duration-300 ease-in-out ${
                !requestAmount || Number(requestAmount) === 0
                  ? "bg-gray-300/80 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-500 text-gray-200 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-red-200"
              }`}
              onClick={handleBilling}
            >
              リンクを作成
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}