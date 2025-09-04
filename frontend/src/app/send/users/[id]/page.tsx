"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/app/lib/client/getUser";
import { components } from "@/app/gen/schema";

type MeResponse = components["schemas"]["MeResponse"];
type UserDetailResponse = components["schemas"]["UserDetailResponse"];
type TransferCreateRequest = components["schemas"]["TransferCreateRequest"];
type CompletedResponse = components["schemas"]["CompletedResponse"];

export default function MobileAccountScreen({ params }: { params: { id: string } }) {
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

  const [transferAmount, setTransferAmount] = useState<string>("");
  const maxNum = loginUser?.account.deposit || 0;
  const showAmountError = transferAmount && Number(transferAmount) > maxNum;
  const [message, setMessage] = useState<string>("");

  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      <div className="px-8 pt-8">
        <div className="mb-2">
          <p className="text-sm text-gray-600">送金先</p>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center overflow-hidden">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-6 bg-orange-300 rounded-full"></div>
              <div className="absolute w-6 h-6 bg-pink-300 rounded-full mt-2"></div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">
              {user?.user.name ?? "サンプル 氏名"}
            </h2>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-600">送金上限額</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{loginUser?.account.deposit}円</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-600">送金金額</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-center">
            <input
              type="number"
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
            <p className="text-red-500 text-sm text-center">
              口座残高より大きな金額は送金できません
            </p>
          )}
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-600">メッセージ (任意)</p>
          <div className="mt-2 bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-24 text-gray-800 focus:outline-none"
              placeholder="メッセージを入力"
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="../complete">
            <button
              disabled={!transferAmount || Number(transferAmount) > maxNum}
              className={`w-full font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${
                !transferAmount || Number(transferAmount) > maxNum
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={handleTransfer}
            >
              送金
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
