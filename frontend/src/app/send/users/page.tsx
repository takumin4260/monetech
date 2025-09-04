"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { components } from "@/app/gen/schema";
import { getUsers } from '@/app/lib/client/getUsers';

type User = components["schemas"]["User"];

export default function TransferRecipientScreen() {
  const [recipients, setRecipients] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getUsers();
      console.log("data", data);
      setRecipients(data);
    })();
  }, []);
  console.log("recipients", recipients);

  const avatarColors = [
    'bg-orange-300', 'bg-yellow-300', 'bg-pink-300', 'bg-blue-300',
    'bg-green-300', 'bg-purple-300', 'bg-red-300', 'bg-teal-300',
    'bg-indigo-300', 'bg-rose-300',
  ];

  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h1 className="text-lg font-medium text-gray-800">送金相手を選択</h1>
        <div className="w-6"></div> {/* Spacer for center alignment */}
      </div>

      {/* Recipients List */}
      <div className="px-6 py-4">
        {recipients.users?.map((recipient, index) => (
          <Link
            key={recipient.id}
            href={`/send/users/${recipient.id}`}
            className="block"
          >
            <div
              className="flex items-center space-x-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center`}>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>

              {/* Name */}
              <div className="flex-1">
                <p className="text-base font-medium text-gray-800">{recipient.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
