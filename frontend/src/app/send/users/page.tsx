import React from 'react';
import Link from 'next/link';
import { components } from "@/app/gen/schema";
import { getUsers } from '@/app/lib/client/getUsers';

type User = components["schemas"]["User"];

export default async function TransferRecipientScreen() {
  const recipients: User[] = await getUsers();

  const avatarColors = [
    'from-orange-400 to-orange-500',
    'from-yellow-400 to-yellow-500', 
    'from-pink-400 to-pink-500',
    'from-blue-400 to-blue-500',
    'from-green-400 to-green-500',
    'from-purple-400 to-purple-500',
    'from-red-400 to-red-500',
    'from-teal-400 to-teal-500',
    'from-indigo-400 to-indigo-500',
    'from-rose-400 to-rose-500',
  ];

  return (
    <div className="w-[400px] min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-rose-600 mx-auto relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-5 w-24 h-24 bg-pink-200 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        <div className="px-6 py-6 pt-12">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-white">送金相手を選択</h1>
          </div>
        </div>

        <div className="px-6 pb-8">
          <div className="space-y-3">
            {recipients.map((user, index) => (
              <Link key={user.id} href="/send/users/1">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 border border-white shadow-lg hover:bg-white transition-all duration-300 cursor-pointer group mb-2">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full"></div>
                      </div>
                    </div>
                                     
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                      <p className="text-gray-600 text-sm">タップして送金</p>
                    </div>
                     
                    <div className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}