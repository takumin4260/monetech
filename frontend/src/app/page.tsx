import React from 'react';
import Link from "next/link";

export default function MobileLoginScreen() {

  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      {/* Main Content */}
      <div className="px-8 pt-16">
        {/* Logo/Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center mx-auto mb-6">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-10 h-8 bg-orange-300 rounded-full"></div>
              <div className="absolute w-8 h-8 bg-pink-300 rounded-full mt-3"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ログインしてください</h1>
          <p className="text-sm text-gray-600">アカウントにアクセスするためにログインが必要です</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="パスワードを入力してください"
              />
            </div>

            {/* Login Button */}
            <Link href="/home">
              <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
                ログイン
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}