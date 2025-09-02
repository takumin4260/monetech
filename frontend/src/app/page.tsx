import Image from "next/image";

import React from 'react';

export default function MobileAccountScreen() {
  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      {/* Main Content */}
      <div className="px-8 pt-8">
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

        {/* Account Info */}
        <div className="mb-2">
          <p className="text-sm text-gray-600">口座番号：0000000</p>
        </div>
        
        <div className="mb-8">
          <p className="text-sm text-gray-600">普通預金</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">50,000円</p>
          </div>
        </div>
      </div>
    </div>
  );
}