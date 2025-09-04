import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoneTech",
  description: "モダンな送金・決済アプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 華やかなMoneTechヘッダー */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
          <div className="w-[400px] bg-white/95 backdrop-blur-lg border-b border-pink-200 py-5 text-center shadow-lg relative overflow-hidden">
            {/* 背景装飾要素 */}
            <div className="absolute inset-0">
              {/* 大きめの光る円 */}
              <div className="absolute -top-3 right-8 w-10 h-10 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-20 blur-lg animate-pulse"></div>
              <div className="absolute top-2 left-6 w-8 h-8 bg-gradient-to-br from-red-300 to-pink-400 rounded-full opacity-25 blur-md"></div>
              
              {/* 中サイズの装飾円 */}
              <div className="absolute top-4 right-20 w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-30"></div>
              <div className="absolute -top-2 left-16 w-4 h-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-35"></div>
              <div className="absolute top-6 left-36 w-5 h-5 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-25 blur-sm"></div>
              
              {/* 小さな装飾円 */}
              <div className="absolute top-3 right-36 w-3 h-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full opacity-40"></div>
              <div className="absolute top-5 left-12 w-2 h-2 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full opacity-45"></div>
              <div className="absolute top-1 right-28 w-2 h-2 bg-gradient-to-br from-red-400 to-rose-500 rounded-full opacity-50"></div>
              <div className="absolute top-7 left-28 w-2 h-2 bg-gradient-to-br from-pink-600 to-rose-700 rounded-full opacity-35"></div>
              
              {/* きらめく極小点 */}
              <div className="absolute top-4 left-8 w-1 h-1 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
              <div className="absolute top-6 right-16 w-1 h-1 bg-rose-500 rounded-full opacity-70"></div>
              <div className="absolute top-2 left-32 w-1 h-1 bg-red-500 rounded-full opacity-55 animate-pulse"></div>
              <div className="absolute top-5 right-24 w-1 h-1 bg-pink-500 rounded-full opacity-65"></div>
            </div>
            
            <div className="relative z-10">
              {/* 華やかなMoneTechロゴ */}
              <div className="mb-3">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent tracking-wider mb-2 drop-shadow-md filter">
                  MoneTech
                </h1>
                {/* 豪華な装飾ライン */}
                <div className="flex justify-center items-center space-x-1.5">
                  <div className="w-4 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-rose-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full shadow-sm"></div>
                  <div className="w-12 h-1 bg-gradient-to-r from-pink-500 via-rose-500 via-red-500 to-pink-500 rounded-full shadow-md"></div>
                  <div className="w-2 h-2 bg-gradient-to-br from-pink-600 to-rose-700 rounded-full shadow-sm"></div>
                  <div className="w-4 h-0.5 bg-gradient-to-r from-red-400 via-pink-500 to-transparent rounded-full"></div>
                </div>
                {/* 追加の装飾要素 */}
                <div className="flex justify-center mt-1 space-x-3">
                  <div className="w-1 h-1 bg-pink-400 rounded-full opacity-70"></div>
                  <div className="w-1 h-1 bg-rose-500 rounded-full opacity-80"></div>
                  <div className="w-1 h-1 bg-red-400 rounded-full opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* メインコンテンツ（ヘッダーの高さ分マージンを追加） */}
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}