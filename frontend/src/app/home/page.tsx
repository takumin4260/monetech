import React from 'react';

export default function MobileAccountScreen() {
  return (
    <div className="w-[400px] min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-rose-600 mx-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 px-6 pt-12 pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">マイウォレット</h1>
          <p className="text-red-100">残高とお取引</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/30 shadow-xl">
          <div className="flex items-center space-x-4 mb-6">
            {/* Modern Avatar with Gradient */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 via-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full"></div>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white">サンプル 氏名</h2>
              <p className="text-red-100 text-sm">口座番号：0000000</p>
              <p className="text-red-100 text-sm">普通預金</p>
            </div>
          </div>

          {/* Balance Display */}
          <div className="text-center">
            <p className="text-sm text-red-100 mb-1">現在の残高</p>
            <p className="text-4xl font-bold text-white mb-2">¥50,000</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          {/* Send Money Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg hover:bg-white/25 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-red-100 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 11 5-5m0 0 5 5m-5-5v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">送金する</h3>
                  <p className="text-red-100 text-sm">友達や家族に送金</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 11 5-5m0 0 5 5m-5-5v12" />
              </svg>
            </div>
          </div>

          {/* Request Money Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg hover:bg-white/25 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-pink-100 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m17 13-5 5m0 0-5-5m5 5V6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">請求する</h3>
                  <p className="text-red-100 text-sm">支払いをリクエスト</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 11 5-5m0 0 5 5m-5-5v12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}