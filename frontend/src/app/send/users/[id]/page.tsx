"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/app/lib/client/getUser";
import { components } from "@/app/gen/schema";

type MeResponse = components["schemas"]["MeResponse"];
type UserDetailResponse = components["schemas"]["UserDetailResponse"];
type TransferCreateRequest = components["schemas"]["TransferCreateRequest"];
type CompletedResponse = components["schemas"]["CompletedResponse"];

function TransferComponent() {
  const searchParams = useSearchParams();
  const moneyParam = searchParams.get("money");
  const modeParam = searchParams.get("mode");
  
  const { id } = useParams<{ id: string }>();

  const [loginUser, setLoginUser] = useState<MeResponse | null>(null);
  const [user, setUser] = useState<UserDetailResponse | null>(null);
  
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
    }, [router])

  useEffect(() => {
    (async () => {
      const data = await getUser(id);
      setUser(data);
    })();
  }, [id]);

  const handleTransfer = async () => {
    if (!loginUser || !user || !transferAmount) return;
    const body: TransferCreateRequest = {
      to_user_id: user.user.id,
      money: parseInt(transferAmount),
      message: message || null,
    }
    const response = await fetch("http://localhost:8000/transfers", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: CompletedResponse = await response.json();
    if (data.completed === true) {
      router.push("../complete");
    }
  }

  const [transferAmount, setTransferAmount] = useState<string>(String(moneyParam || ""));
  const maxNum = loginUser?.account?.deposit || 0;
  const showAmountError = transferAmount && Number(transferAmount) > maxNum;
  const [message, setMessage] = useState<string>("");

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
          <h1 className="text-2xl font-bold text-white mb-2">送金</h1>
          <p className="text-red-100">金額とメッセージを入力</p>
        </div>

        {/* Recipient Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white shadow-xl">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">送金先</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center shadow-lg overflow-hidden">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center relative">
                <div className="w-8 h-6 bg-orange-300 rounded-full"></div>
                <div className="absolute w-6 h-6 bg-pink-300 rounded-full mt-2"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.user?.name ?? "サンプル 氏名"}
              </h2>
            </div>
          
          </div>
        </div>

        {/* Limit Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white shadow-lg">
          <div className="mb-3">
            <p className="text-sm text-gray-600">送金上限額</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{loginUser?.account?.deposit}円</p>
          </div>
        </div>

        {/* Amount Input Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-4 border border-white shadow-lg">
          <div className="mb-3">
            <p className="text-sm text-gray-600">送金金額</p>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 mr-2">¥</span>
            <input
              type="number"
              value={transferAmount}
              min={0}
              disabled={modeParam === "billing"}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="text-2xl font-bold text-gray-800 w-full text-center focus:outline-none bg-transparent"
              placeholder="金額を入力"
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="h-8 mb-6 flex items-center justify-center">
          {showAmountError && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              <p className="text-red-600 text-sm text-center">
                口座残高より大きな金額は送金できません
              </p>
            </div>
          )}
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
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-center">
          <Link href="../complete" className="w-full">
             <button
              disabled={!transferAmount || Number(transferAmount) > maxNum}
              className={`w-full font-bold py-4 px-6 rounded-2xl shadow-lg transition duration-300 ease-in-out ${
                !transferAmount || Number(transferAmount) > maxNum
                  ? "bg-gray-300/80 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-500 text-gray-200 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-red-200"
              }`}
              onClick={handleTransfer}
            >
              送金する
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MobileAccountScreen({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="w-[400px] min-h-screen bg-gray-50 mx-auto flex items-center justify-center">読み込み中...</div>}>
      <TransferComponent />
    </Suspense>
  )
}
