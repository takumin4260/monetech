import React from 'react';
import Link from 'next/link';

export default function TransferRecipientScreen() {
const recipients = [
  { id: 1, name: 'サンプル 氏名', avatar: 'bg-orange-300' },
  { id: 2, name: 'サンプル 氏名', avatar: 'bg-yellow-300' },
  { id: 3, name: 'サンプル 氏名', avatar: 'bg-pink-300' },
  { id: 4, name: 'サンプル 氏名', avatar: 'bg-blue-300' },
  { id: 5, name: 'サンプル 氏名', avatar: 'bg-green-300' },
  { id: 6, name: 'サンプル 氏名', avatar: 'bg-purple-300' },
  { id: 7, name: 'サンプル 氏名', avatar: 'bg-red-300' },
  { id: 8, name: 'サンプル 氏名', avatar: 'bg-teal-300' },
  { id: 9, name: 'サンプル 氏名', avatar: 'bg-indigo-300' },
  { id: 10, name: 'サンプル 氏名', avatar: 'bg-rose-300' },
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
        {recipients.map((recipient) => (
          <Link
            key={recipient.id}
            href="users/1"
            className="block"
          >
            <div
              className="flex items-center space-x-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full ${recipient.avatar} flex items-center justify-center`}>
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