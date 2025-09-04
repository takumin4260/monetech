"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/app/lib/client/getUser";

export default function MobileAccountScreen({ params }: { params: { id: string } }) {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await getUser(id);
      setUser(data);
    })();
  }, [id]);

  const [transferAmount, setTransferAmount] = useState<string>("");
  const maxNum = user?.account?.deposit || 0;
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
              {user?.name ?? "サンプル 氏名"}
            </h2>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-600">送金上限額</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">50,000円</p>
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
            >
              送金
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
